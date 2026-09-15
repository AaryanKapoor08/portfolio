import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const MIDAS = '/models/midas.glb';
useGLTF.preload(MIDAS);

// Shoot timeline (seconds from trigger). The arm blends additively on top of
// the idle, fires at SHOOT_AT, then lowers back to idle.
const RAISE_END = 2.2;
const SHOOT_AT = 2.4;
const LOWER_START = 2.9;
const LOWER_END = 3.7;

// Aim-pose euler offsets (radians) added to the left arm bones — this is the
// visual tuning knob, bone local axes aren't predictable from the rig. Tune
// these against the rendered result, don't trust the numbers blind.
const AIM_UPPER = new THREE.Euler(0, 0, -1.15);
const AIM_LOWER_Q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0.35));

const easeInOut = (t: number) => t * t * (3 - 2 * t);

// Scratch objects reused each frame to avoid per-frame allocations.
const _targetQ = new THREE.Quaternion();
const _offsetQ = new THREE.Quaternion();
const _upperE = new THREE.Euler();

// Apply a fixed local-space rotation `offset` on top of `baseQ` (the idle pose
// snapshotted once when the sequence started), eased in by `blend`. Composing
// via quaternion multiply + slerp makes the result gimbal-safe and shortest-arc.
// Critically, we slerp from the captured `baseQ`, never from the bone's live
// quaternion: reading the bone back each frame would compound `offset` onto our
// own previous output whenever the mixer hasn't reset the bone first, spinning
// the arm through several full turns (the "rotates the other way" bug).
function applyAim(bone: THREE.Object3D, baseQ: THREE.Quaternion, offset: THREE.Quaternion, blend: number) {
  _targetQ.copy(baseQ).multiply(offset);
  bone.quaternion.copy(baseQ).slerp(_targetQ, blend);
}

interface MidasLoadoutProps {
  targetSize?: number;
  /** When true, runs the raise-aim-shoot sequence once. */
  play?: boolean;
  /** Fired once at the shoot frame (muzzle flash) — drives the text reveal. */
  onShot?: () => void;
}

/**
 * Midas (rigged) standing in his idle pose, holding his default gold pistol.
 * Centred and height-normalized so he drops cleanly into the showcase stage.
 */
export default function MidasLoadout({ targetSize = 3.4, play = false, onShot }: MidasLoadoutProps) {
  const { scene, animations } = useGLTF(MIDAS);
  const gl = useThree((s) => s.gl);
  const root = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, root);

  // Idle action, bones and muzzle flash resolved once the rig is in the graph.
  const idle = useRef<THREE.AnimationAction | null>(null);
  const upperarmL = useRef<THREE.Object3D | null>(null);
  const lowerarmL = useRef<THREE.Object3D | null>(null);
  const flash = useRef<THREE.PointLight | null>(null);
  // Idle pose captured once at sequence start; the aim slerps from these.
  const upperBaseQ = useRef(new THREE.Quaternion());
  const lowerBaseQ = useRef(new THREE.Quaternion());

  // Sequence clock state.
  const start = useRef<number | null>(null);
  const fired = useRef(false);

  // Enable shadows and keep the high-res textures crisp: GLB textures import
  // with anisotropy = 1, which makes detailed maps look blurry/pixelated at
  // grazing angles. Crank every map to the GPU's max anisotropy.
  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      mats.forEach((mat) => {
        const std = mat as THREE.MeshStandardMaterial;
        [std.map, std.normalMap, std.roughnessMap, std.metalnessMap, std.emissiveMap, std.aoMap].forEach((t) => {
          if (t && t.anisotropy !== maxAniso) {
            t.anisotropy = maxAniso;
            t.needsUpdate = true;
          }
        });
      });
    });
  }, [scene, gl]);

  // Grab the left-arm bones and hang a muzzle-flash light off the pistol.
  useEffect(() => {
    scene.traverse((o) => {
      if (!upperarmL.current && /^upperarm_l/.test(o.name)) upperarmL.current = o;
      if (!lowerarmL.current && /^lowerarm_l/.test(o.name)) lowerarmL.current = o;
      if (!flash.current && /^pistol_l/.test(o.name)) {
        const light = new THREE.PointLight(0xffd070, 0, 4, 2);
        o.add(light);
        flash.current = light;
      }
    });
  }, [scene]);

  // Play the idle so he's posed and alive.
  useEffect(() => {
    const action = Object.values(actions)[0];
    if (!action) return;
    idle.current = action;
    action.reset().fadeIn(0.4).play();
    return () => void action.fadeOut(0.2);
  }, [actions]);

  // Centre the whole rig at the origin and normalize its height.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    return { scale: targetSize / (Math.max(size.x, size.y, size.z) || 1), center };
  }, [scene, targetSize]);

  // Registered after useAnimations' mixer frame, so these bone offsets layer on
  // top of the idle pose for this frame rather than being overwritten.
  useFrame((state) => {
    if (!play) return;
    if (start.current === null) {
      // Wait for the idle fade-in so the captured base is the true idle pose
      // (matters when `play` arrives before the model finished loading).
      if (idle.current && idle.current.getEffectiveWeight() < 1) return;
      // Freeze the clean idle pose now (mixer has posed it for this frame),
      // so the raise always slerps from a fixed base and can't accumulate.
      start.current = state.clock.elapsedTime;
      if (upperarmL.current) upperBaseQ.current.copy(upperarmL.current.quaternion);
      if (lowerarmL.current) lowerBaseQ.current.copy(lowerarmL.current.quaternion);
    }
    const t = state.clock.elapsedTime - start.current;
    if (t >= LOWER_END) return;

    const blend =
      t < RAISE_END ? easeInOut(t / RAISE_END)
      : t < LOWER_START ? 1
      : 1 - easeInOut((t - LOWER_START) / (LOWER_END - LOWER_START));

    // Recoil kick + muzzle flash around the shoot frame.
    const sinceShot = t - SHOOT_AT;
    const recoil = sinceShot >= 0 && sinceShot < 0.25 ? (1 - sinceShot / 0.25) * 0.4 : 0;
    if (flash.current) {
      flash.current.intensity = sinceShot >= 0 && sinceShot < 0.12 ? (1 - sinceShot / 0.12) * 6 : 0;
    }
    if (!fired.current && t >= SHOOT_AT) {
      fired.current = true;
      onShot?.();
    }

    if (upperarmL.current) {
      _upperE.set(AIM_UPPER.x, AIM_UPPER.y, AIM_UPPER.z - recoil);
      applyAim(upperarmL.current, upperBaseQ.current, _offsetQ.setFromEuler(_upperE), blend);
    }
    if (lowerarmL.current) applyAim(lowerarmL.current, lowerBaseQ.current, AIM_LOWER_Q, blend);
  });

  return (
    <group ref={root}>
      <group
        scale={fit.scale}
        position={[-fit.center.x * fit.scale, -fit.center.y * fit.scale, -fit.center.z * fit.scale]}
      >
        <primitive object={scene} />
      </group>
    </group>
  );
}
