import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A low-poly nod to Fortnite's Supply Llama, assembled entirely from boxes.
 * Teal body with the piñata triangle accents people recognize instantly.
 */

const TEAL = '#37c6d0';
const TEAL_DARK = '#1f9aa6';
const PINK = '#ef5fa7';
const PURPLE = '#7b5ce0';
const CREAM = '#f4e9d0';

function Box({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} flatShading />
    </mesh>
  );
}

/** A flat triangle decal, like the piñata's paper fringe. */
function Triangle({
  position,
  color,
  rotation = 0,
}: {
  position: [number, number, number];
  color: string;
  rotation?: number;
}) {
  return (
    <mesh position={position} rotation={[0, 0, rotation]}>
      <coneGeometry args={[0.18, 0.32, 3]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

export default function LootLlama({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    // Gentle bob so it feels alive even when the user isn't dragging.
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  return (
    <group ref={group} scale={scale} rotation={[0, -0.5, 0]}>
      {/* Body */}
      <Box position={[0, 0.2, 0]} size={[1.5, 1.1, 0.9]} color={TEAL} />
      {/* Saddle / loot lid */}
      <Box position={[0, 0.85, 0]} size={[1.3, 0.25, 0.95]} color={TEAL_DARK} />

      {/* Neck */}
      <Box position={[0.7, 0.95, 0]} size={[0.5, 1.0, 0.55]} color={TEAL} />
      {/* Head */}
      <Box position={[0.95, 1.55, 0]} size={[0.7, 0.55, 0.6]} color={TEAL} />
      {/* Snout */}
      <Box position={[1.35, 1.45, 0]} size={[0.35, 0.35, 0.45]} color={CREAM} />
      {/* Ears */}
      <Box position={[0.8, 1.95, 0.18]} size={[0.14, 0.34, 0.14]} color={TEAL_DARK} />
      <Box position={[0.8, 1.95, -0.18]} size={[0.14, 0.34, 0.14]} color={TEAL_DARK} />
      {/* Eyes */}
      <Box position={[1.18, 1.62, 0.22]} size={[0.1, 0.1, 0.06]} color="#1a1a2e" />
      <Box position={[1.18, 1.62, -0.22]} size={[0.1, 0.1, 0.06]} color="#1a1a2e" />

      {/* Legs */}
      <Box position={[0.5, -0.65, 0.3]} size={[0.28, 0.8, 0.28]} color={TEAL_DARK} />
      <Box position={[0.5, -0.65, -0.3]} size={[0.28, 0.8, 0.28]} color={TEAL_DARK} />
      <Box position={[-0.5, -0.65, 0.3]} size={[0.28, 0.8, 0.28]} color={TEAL_DARK} />
      <Box position={[-0.5, -0.65, -0.3]} size={[0.28, 0.8, 0.28]} color={TEAL_DARK} />

      {/* Tail */}
      <Box position={[-0.85, 0.4, 0]} size={[0.25, 0.5, 0.25]} color={CREAM} />

      {/* Piñata triangle fringe along the body */}
      <Triangle position={[-0.4, 0.85, 0.48]} color={PINK} />
      <Triangle position={[0, 0.85, 0.48]} color={PURPLE} rotation={0.1} />
      <Triangle position={[0.4, 0.85, 0.48]} color={PINK} rotation={-0.1} />
      <Triangle position={[-0.4, 0.85, -0.48]} color={PURPLE} />
      <Triangle position={[0, 0.85, -0.48]} color={PINK} />
      <Triangle position={[0.4, 0.85, -0.48]} color={PURPLE} />
    </group>
  );
}
