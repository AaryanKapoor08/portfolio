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

// ponytail: aim-pose euler offsets (radians) added to the left arm bones — this
// is the visual tuning knob, bone local axes aren't predictable from the rig.
// Tune these against the rendered result, don't trust the numbers blind.
const AIM = {
  upperarm: new THREE.Euler(0, 0, -1.15),
  lowerarm: new THREE.Euler(0, 0, 0.35),
};

const easeInOut = (t: number) => t * t * (3 - 2 * t);

// Lower-arm aim as a quaternion (constant). Upper-arm is rebuilt each frame
// because recoil nudges its Z.
const AIM_LOWER_Q = new THREE.Quaternion().setFromEuler(AIM.lowerarm);
// Scratch objects reused each frame to avoid per-frame allocations.
const _idleQ = new THREE.Quaternion();
const _targetQ = new THREE.Quaternion();
const _offsetQ = new THREE.Quaternion();
const _upperE = new THREE.Euler();

// Apply a fixed local-space rotation `offset` on top of the bone's current
// (idle) orientation, eased in by `blend`. Composing via quaternion multiply +
// slerp makes the result independent of the idle phase — unlike adding euler
// components, which gimbal-flips depending on the base pose (the "hand rotates
// the other way" bug).
function applyAim(bone: THREE.Object3D, offset: THREE.Quaternion, blend: number) {
  _idleQ.copy(bone.quaternion);
  _targetQ.copy(_idleQ).multiply(offset);
  bone.quaternion.copy(_idleQ).slerp(_targetQ, blend);
}

interface MidasLoadoutProps {
  targetSize?: number;
  spinSpeed?: number;
  animate?: boolean;
  /** Constant yaw so he faces the camera (model ships facing +Z, toward us). */
  facingY?: number;
  /** When true, runs the raise-aim-shoot sequence once. */
  play?: boolean;
  /** Fired once at the shoot frame (muzzle flash) — drives the text reveal. */
  onShot?: () => void;
}

/**
 * Midas (rigged) standing in his idle pose, holding his default gold pistol.
 * Centred and height-normalized so he drops cleanly into the showcase stage.
 */
export default function MidasLoadout({
  targetSize = 3.4,
  spinSpeed = 0,
  animate = true,
  facingY = 0,
  play = false,
  onShot,
}: MidasLoadoutProps) {
  const { scene, animations } = useGLTF(MIDAS);
  const gl = useThree((s) => s.gl);
  const root = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, root);

  // Bone + muzzle-flash refs resolved once the rig is in the graph.
  const upperarmL = useRef<THREE.Object3D | null>(null);
  const lowerarmL = useRef<THREE.Object3D | null>(null);
  const flash = useRef<THREE.PointLight | null>(null);

  // Sequence clock state.
  const start = useRef<number | null>(null);
  const fired = useRef(false);
  const finished = useRef(false);

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
    if (animate) action.reset().fadeIn(0.4).play();
    else action.reset().play().paused = true; // freeze on the idle pose
    return () => void action.fadeOut(0.2);
  }, [actions, animate]);

  // Centre the whole rig at the origin and normalize its height.
  const fit = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { scale: targetSize / maxDim, center };
  }, [scene, targetSize]);

  // Registered after useAnimations' mixer frame, so these bone offsets layer on
  // top of the idle pose for this frame rather than being overwritten.
  useFrame((state, delta) => {
    if (play) {
      if (start.current === null) start.current = state.clock.elapsedTime;
      const t = state.clock.elapsedTime - start.current;

      if (t >= LOWER_END) {
        finished.current = true;
      } else {
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

        const ua = upperarmL.current;
        const la = lowerarmL.current;
        if (ua) {
          _upperE.set(AIM.upperarm.x, AIM.upperarm.y, AIM.upperarm.z - recoil);
          _offsetQ.setFromEuler(_upperE);
          applyAim(ua, _offsetQ, blend);
        }
        if (la) applyAim(la, AIM_LOWER_Q, blend);
      }
    }

    // Stay fixed facing the description until the shoot+lower is done, then
    // start the idle spin.
    if (spinSpeed && spinner.current && finished.current) spinner.current.rotation.y += spinSpeed * delta;
  });

  return (
    <group ref={root}>
      <group ref={spinner}>
        <group rotation={[0, facingY, 0]}>
          <group
            scale={fit.scale}
            position={[-fit.center.x * fit.scale, -fit.center.y * fit.scale, -fit.center.z * fit.scale]}
          >
            <primitive object={scene} />
          </group>
        </group>
      </group>
    </group>
  );
}
