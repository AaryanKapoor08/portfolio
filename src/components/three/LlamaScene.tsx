import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Float } from '@react-three/drei';
import LootLlama from './LootLlama';

/** Drag-to-spin stage for the loot llama. Auto-rotates until you grab it. */
export default function LlamaScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [3.5, 2, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[-4, 5, -2]} intensity={0.6} color="#9ec5ff" />

        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <LootLlama scale={0.85} />
        </Float>

        <ContactShadows position={[0, -1.3, 0]} opacity={0.35} scale={8} blur={2.4} far={4} />
        <Environment preset="city" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Suspense>
    </Canvas>
  );
}
