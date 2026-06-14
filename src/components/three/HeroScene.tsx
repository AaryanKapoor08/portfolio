import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import MinecraftBlock, { type BlockKind } from './MinecraftBlock';

interface FloatingBlock {
  position: [number, number, number];
  kind: BlockKind;
  scale: number;
  speed: number;
}

// A loose, asymmetric scatter so the scene never reads as a grid.
const BLOCKS: FloatingBlock[] = [
  { position: [-4.6, 1.1, -2], kind: 'grass', scale: 1.1, speed: 0.9 },
  { position: [4.6, -1.0, -1], kind: 'diamond', scale: 0.85, speed: 1.2 },
  { position: [-3.6, -2.0, -3], kind: 'stone', scale: 0.7, speed: 0.7 },
  { position: [4.9, 2.6, -4], kind: 'grass', scale: 0.65, speed: 1.0 },
  { position: [-1.6, 3.4, -6], kind: 'diamond', scale: 0.6, speed: 1.4 },
  { position: [-5.8, -0.6, -5], kind: 'diamond', scale: 0.5, speed: 1.1 },
  { position: [6.0, 0.6, -6], kind: 'stone', scale: 0.55, speed: 0.8 },
];

/** Tilts the whole block field gently toward the cursor for parallax depth. */
function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.3, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-6, -2, 2]} intensity={0.4} color="#9ec5ff" />

        <ParallaxGroup>
          {BLOCKS.map((b, i) => (
            <Float key={i} speed={b.speed} rotationIntensity={0.4} floatIntensity={0.6}>
              <MinecraftBlock
                position={b.position}
                kind={b.kind}
                scale={b.scale}
                speed={b.speed}
              />
            </Float>
          ))}
          <Sparkles count={40} scale={[14, 8, 6]} size={2} speed={0.3} opacity={0.5} color="#9ec5ff" />
        </ParallaxGroup>
      </Suspense>
    </Canvas>
  );
}
