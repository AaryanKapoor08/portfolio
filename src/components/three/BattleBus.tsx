import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Fortnite's Battle Bus: a blue bus slung under a balloon with a spinning
 * turbine on top. The single most recognizable thing in the game, so it
 * earns the centre of the scene.
 */

const BUS_BLUE = '#2f6fd0';
const BUS_DARK = '#244e93';
const WINDOW = '#bfe3ff';
const BALLOON = '#3f7fe0';
const BALLOON_DARK = '#2a5db0';
const YELLOW = '#f6c945';
const TIRE = '#23262e';
const HUB = '#e8edf2';

function Box({
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
      <meshStandardMaterial color={color} roughness={0.55} metalness={0.1} flatShading />
    </mesh>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.26, 0.26, 0.2, 16]} />
      <meshStandardMaterial color={TIRE} roughness={0.7} flatShading />
    </mesh>
  );
}

export default function BattleBus({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null);
  const fan = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.9) * 0.12;
      group.current.rotation.z = Math.sin(t * 0.7) * 0.04;
    }
    if (fan.current) fan.current.rotation.y = t * 6;
  });

  return (
    <group ref={group} scale={scale}>
      {/* Bus body */}
      <Box position={[0, -0.7, 0]} size={[2.2, 0.85, 1.0]} color={BUS_BLUE} />
      {/* Roof */}
      <Box position={[0, -0.25, 0]} size={[2.0, 0.18, 0.95]} color={BUS_DARK} />
      {/* Window strip */}
      <Box position={[0, -0.55, 0.46]} size={[1.9, 0.34, 0.06]} color={WINDOW} />
      <Box position={[0, -0.55, -0.46]} size={[1.9, 0.34, 0.06]} color={WINDOW} />
      {/* Bumpers */}
      <Box position={[1.12, -0.9, 0]} size={[0.1, 0.4, 1.0]} color={YELLOW} />
      <Box position={[-1.12, -0.9, 0]} size={[0.1, 0.4, 1.0]} color={YELLOW} />
      {/* Wheels */}
      <Wheel position={[0.7, -1.15, 0.5]} />
      <Wheel position={[-0.7, -1.15, 0.5]} />
      <Wheel position={[0.7, -1.15, -0.5]} />
      <Wheel position={[-0.7, -1.15, -0.5]} />

      {/* Balloon tethers */}
      <Box position={[0.7, 0.3, 0]} size={[0.05, 1.0, 0.05]} color={BUS_DARK} rotation={[0, 0, -0.15]} />
      <Box position={[-0.7, 0.3, 0]} size={[0.05, 1.0, 0.05]} color={BUS_DARK} rotation={[0, 0, 0.15]} />

      {/* Balloon */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[1.15, 24, 20]} />
        <meshStandardMaterial color={BALLOON} roughness={0.5} flatShading />
      </mesh>
      {/* Balloon stripes */}
      <mesh position={[0, 1.5, 0]} scale={[1.01, 0.34, 1.01]} castShadow>
        <sphereGeometry args={[1.15, 24, 20]} />
        <meshStandardMaterial color={BALLOON_DARK} roughness={0.5} flatShading />
      </mesh>
      {/* Balloon collar */}
      <Box position={[0, 0.55, 0]} size={[0.6, 0.28, 0.6]} color={YELLOW} />

      {/* Turbine on top */}
      <group ref={fan} position={[0, 2.75, 0]}>
        <Box position={[0, 0, 0]} size={[0.12, 0.12, 0.7]} color={HUB}/>
        <Box position={[0, 0, 0]} size={[0.7, 0.12, 0.12]} color={HUB} />
      </group>
      <Box position={[0, 2.62, 0]} size={[0.18, 0.18, 0.18]} color={BUS_DARK} />
    </group>
  );
}
