import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import MidasLoadout from './MidasLoadout';

/**
 * Showcase stage for Midas holding the Star Wand. Procedural Lightformer
 * environment (no CDN) keeps the gold reading; drag to spin him.
 */
export default function MidasScene({ autoRotate = true }: { autoRotate?: boolean }) {
  const maxDpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2.5) : 2;
  const targetSize = 3.4;

  return (
    <Canvas
      dpr={[1.25, maxDpr]}
      shadows
      camera={{ position: [0, 0.4, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 7, 4]} intensity={1.7} castShadow shadow-mapSize={[2048, 2048]} />
        <spotLight position={[-4, 6, 3]} intensity={0.8} color="#ffe9a8" angle={0.7} penumbra={0.7} />

        <MidasLoadout targetSize={targetSize} spinSpeed={autoRotate ? 0.5 : 0} />

        <ContactShadows position={[0, -targetSize / 2 - 0.05, 0]} opacity={0.45} scale={targetSize * 2.4} blur={2.2} far={4} />

        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.4} position={[0, 4, -3]} scale={[8, 6, 1]} color="#fff3d6" />
          <Lightformer intensity={1.5} position={[-5, 1, 2]} scale={[4, 6, 1]} color="#ffffff" />
          <Lightformer intensity={1.3} position={[5, 2, 2]} scale={[4, 6, 1]} color="#ffd98a" />
          <Lightformer intensity={0.8} position={[0, -3, 1]} scale={[6, 3, 1]} color="#caa24a" />
        </Environment>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.95}
        />
      </Suspense>
    </Canvas>
  );
}
