import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GltfModelProps {
  url: string;
  /** Longest dimension is normalized to this many world units. */
  targetSize?: number;
  /** Gentle hover bob (good for vehicles). */
  bob?: boolean;
}

/**
 * Loads any GLB and normalizes it: measures the bounding box, scales the
 * longest side to `targetSize`, and recentres it at the origin — so framing is
 * predictable regardless of how the artist exported scale or pivot.
 */
export default function GltfModel({ url, targetSize = 4, bob = false }: GltfModelProps) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const scale = targetSize / (Math.max(size.x, size.y, size.z) || 1);
    const position = box.getCenter(new THREE.Vector3()).multiplyScalar(-scale);
    return { clone, scale, position };
  }, [scene, targetSize]);

  useFrame((state) => {
    if (bob && ref.current) ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  return (
    <group ref={ref}>
      <group scale={model.scale} position={model.position}>
        <primitive object={model.clone} />
      </group>
    </group>
  );
}
