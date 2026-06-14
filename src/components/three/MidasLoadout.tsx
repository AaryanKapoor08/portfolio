import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const MIDAS = '/models/midas.glb';
useGLTF.preload(MIDAS);

interface MidasLoadoutProps {
  targetSize?: number;
  spinSpeed?: number;
  animate?: boolean;
  /** Constant yaw so he faces the camera (model ships facing +Z, toward us). */
  facingY?: number;
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
}: MidasLoadoutProps) {
  const { scene, animations } = useGLTF(MIDAS);
  const gl = useThree((s) => s.gl);
  const root = useRef<THREE.Group>(null);
  const spinner = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, root);

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
