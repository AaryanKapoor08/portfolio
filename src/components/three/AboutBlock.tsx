import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import MinecraftBlock from './MinecraftBlock';

/** A single hovering diamond block the visitor can nudge around. */
export default function AboutBlock() {
  return (
    <Canvas dpr={[1, 1.8]} camera={{ position: [2.2, 1.6, 2.6], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 3]} intensity={1.4} />
        <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#9ec5ff" />
        <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.8}>
          <MinecraftBlock position={[0, 0, 0]} kind="diamond" scale={1.4} rotate={false} />
        </Float>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Suspense>
    </Canvas>
  );
}
