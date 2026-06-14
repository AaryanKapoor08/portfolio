import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** A spinning V-Bucks-style coin. */
export function VBucks({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const seed = useRef(Math.random() * 10).current;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 1.6 + seed;
    ref.current.position.y = position[1] + Math.sin(t * 1.2 + seed) * 0.25;
  });

  return (
    <group ref={ref} position={position} scale={scale} rotation={[0.3, 0, 0]}>
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 24]} />
        <meshStandardMaterial color="#37c6d0" roughness={0.3} metalness={0.6} flatShading />
      </mesh>
      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.06, 12, 24]} />
        <meshStandardMaterial color="#a7f0f4" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* A blocky "V" face */}
      <mesh position={[-0.12, 0.05, 0.07]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.08, 0.34, 0.04]} />
        <meshStandardMaterial color="#0e3a3e" />
      </mesh>
      <mesh position={[0.12, 0.05, 0.07]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.08, 0.34, 0.04]} />
        <meshStandardMaterial color="#0e3a3e" />
      </mesh>
    </group>
  );
}

/** A soft low-poly cloud built from a few overlapping spheres. */
export function Cloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const seed = useRef(Math.random() * 10).current;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2 + seed) * 0.4;
  });

  const puffs: [number, number, number, number][] = [
    [0, 0, 0, 0.7],
    [0.6, -0.1, 0, 0.5],
    [-0.6, -0.1, 0, 0.5],
    [0.25, 0.25, 0.2, 0.45],
  ];

  return (
    <group ref={ref} position={position} scale={scale}>
      {puffs.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 16, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={1} flatShading transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}
