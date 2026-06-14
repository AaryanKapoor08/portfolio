import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A stylized take on Fortnite's default harvesting pickaxe — a teal-accented
 * metal head on a grippy handle. Slowly spins so the silhouette reads.
 */

const HANDLE = '#6b7280';
const GRIP = '#2b2f36';
const METAL = '#cfd6dd';
const TEAL = '#37c6d0';

function Part({
  position,
  size,
  color,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.45} metalness={0.35} flatShading />
    </mesh>
  );
}

export default function Pickaxe({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.8;
  });

  return (
    <group ref={group} scale={scale} rotation={[0, 0, 0.25]}>
      {/* Handle */}
      <Part position={[0, -0.9, 0]} size={[0.22, 2.2, 0.22]} color={HANDLE} />
      {/* Grip wrap */}
      <Part position={[0, -1.5, 0]} size={[0.26, 0.7, 0.26]} color={GRIP} />
      {/* Pommel */}
      <Part position={[0, -1.95, 0]} size={[0.3, 0.18, 0.3]} color={TEAL} />

      {/* Head crossbar */}
      <Part position={[0, 0.4, 0]} size={[2.0, 0.32, 0.34]} color={METAL} />
      {/* Head centre block with teal core */}
      <Part position={[0, 0.4, 0]} size={[0.5, 0.5, 0.42]} color={TEAL} />

      {/* Left blade tip */}
      <mesh position={[-1.15, 0.55, 0]} rotation={[0, 0, Math.PI / 2 + 0.35]} castShadow>
        <coneGeometry args={[0.22, 0.6, 4]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.4} flatShading />
      </mesh>
      {/* Right blade tip (flat chisel) */}
      <Part position={[1.15, 0.35, 0]} size={[0.45, 0.5, 0.34]} color={METAL} rotation={[0, 0, -0.25]} />
    </group>
  );
}
