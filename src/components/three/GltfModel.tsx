import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface GltfModelProps {
  url: string;
  /** Longest dimension is normalized to this many world units. */
  targetSize?: number;
  /** Initial yaw so the model faces the camera. */
  rotationY?: number;
  /** Constant lean (radians) around Z, applied to a fixed parent so it reads
   *  the same no matter how the model spins. Negative leans to the right. */
  tilt?: number;
  /** Self-spin speed in rad/sec around the model's own vertical axis. */
  spinSpeed?: number;
  /** Gentle hover bob (good for vehicles, off for grounded characters). */
  bob?: boolean;
  /** Sit the model on y=0 instead of centring it vertically (for characters). */
  grounded?: boolean;
}

/**
 * Loads any GLB and normalizes it: measures the bounding box, scales the
 * longest side to `targetSize`, and recentres it at the origin — so framing is
 * predictable regardless of how the artist exported scale or pivot.
 *
 * Layering: an outer group holds a constant `tilt` (so a leaning pose stays
 * put), an inner group does the idle self-spin, and the innermost group applies
 * the measured centre/scale.
 */
export default function GltfModel({
  url,
  targetSize = 4,
  rotationY = 0,
  tilt = 0,
  spinSpeed = 0,
  bob = false,
  grounded = false,
}: GltfModelProps) {
  const { scene } = useGLTF(url);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;
    const y = grounded ? box.min.y : center.y;
    return { clone, scale, offset: new THREE.Vector3(center.x, y, center.z) };
  }, [scene, targetSize, grounded]);

  const tiltRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (spinSpeed && spinRef.current) spinRef.current.rotation.y += spinSpeed * delta;
    if (bob && tiltRef.current) tiltRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });

  return (
    <group ref={tiltRef} rotation={[0, 0, tilt]}>
      <group ref={spinRef} rotation={[0, rotationY, 0]}>
        <group
          scale={model.scale}
          position={[
            -model.offset.x * model.scale,
            -model.offset.y * model.scale,
            -model.offset.z * model.scale,
          ]}
        >
          <primitive object={model.clone} />
        </group>
      </group>
    </group>
  );
}
