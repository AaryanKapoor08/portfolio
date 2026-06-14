import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei';
import GltfModel from './GltfModel';

useGLTF.preload('/models/battle-bus.glb');

/**
 * The "Off the clock" stage: the real downloaded Battle Bus model, lit with a
 * small procedural studio environment (Lightformers — no CDN HDRI, so it
 * always renders) and parked on a glowing storm ring. Drag to orbit.
 */
export default function FortniteScene({ autoRotate = true }: { autoRotate?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [3.6, 1.6, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-6, 3, -4]} intensity={0.4} color="#9ec5ff" />

        <GltfModel url="/models/battle-bus.glb" targetSize={4.4} bob />

        {/* Storm-circle glow ring under the bus */}
        <mesh position={[0, -2.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.0, 3.35, 64]} />
          <meshBasicMaterial color="#37c6d0" transparent opacity={0.5} toneMapped={false} />
        </mesh>

        <ContactShadows position={[0, -2.25, 0]} opacity={0.4} scale={12} blur={2.4} far={5} />

        {/* Procedural reflections so the PBR materials read correctly. */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 4, -3]} scale={[10, 5, 1]} color="#cfe6ff" />
          <Lightformer intensity={1.3} position={[-5, 1, 2]} scale={[4, 4, 1]} color="#ffffff" />
          <Lightformer intensity={1.1} position={[5, 2, 2]} scale={[4, 4, 1]} color="#9ec5ff" />
          <Lightformer intensity={0.8} position={[0, -3, 1]} scale={[8, 3, 1]} color="#2f6fd0" />
        </Environment>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.9}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Suspense>
    </Canvas>
  );
}
