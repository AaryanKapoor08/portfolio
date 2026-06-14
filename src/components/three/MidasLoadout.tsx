import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const MIDAS = '/models/midas.glb';
const WAND = '/models/star-wand.glb';
useGLTF.preload(MIDAS);
useGLTF.preload(WAND);

// --- Grip tuning: the wand's transform inside the right-hand bone. ---
// These are in the hand bone's local space; adjust visually until the wand
// sits in the palm like a harvesting tool.
const WAND_SCALE = 1;
const WAND_POS: [number, number, number] = [0, 0, 0];
const WAND_ROT: [number, number, number] = [0, 0, 0];

interface MidasLoadoutProps {
  targetSize?: number;
  spinSpeed?: number;
  animate?: boolean;
  /** Constant yaw so he faces the camera (model ships facing -Z). */
  facingY?: number;
}

/** True when this mesh (or any of its materials) is the default pistol. */
function isPistol(mesh: THREE.Mesh): boolean {
  const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  return mats.some((m) => m && /Top_Tier_Pistol/i.test(m.name || ''));
}

/**
 * Midas (rigged) holding the Star Wand like an equipped harvesting tool.
 * Plays his idle animation, hides the default pistol, and parents the wand to
 * the right-hand bone (hand_r_037) so it follows the pose.
 */
export default function MidasLoadout({
  targetSize = 3.4,
  spinSpeed = 0,
  animate = true,
  facingY = Math.PI,
}: MidasLoadoutProps) {
  const { scene, animations } = useGLTF(MIDAS);
  const wandGltf = useGLTF(WAND);
  const root = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, root);

  // One-time setup: hide the pistol, swap in the wand on the right hand.
  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh && isPistol(mesh)) mesh.visible = false;
    });
    const hand = scene.getObjectByName('hand_r_037');
    if (hand && !hand.getObjectByName('__starwand')) {
      const wand = wandGltf.scene.clone(true);
      wand.name = '__starwand';
      wand.scale.setScalar(WAND_SCALE);
      wand.position.set(...WAND_POS);
      wand.rotation.set(...WAND_ROT);
      wand.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.castShadow = true;
      });
      hand.add(wand);
    }
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
  }, [scene, wandGltf]);

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

  useFrame((_, delta) => {
    if (spinSpeed && spinner.current) spinner.current.rotation.y += spinSpeed * delta;
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
