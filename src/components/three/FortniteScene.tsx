import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, OrbitControls } from '@react-three/drei';
import BattleBus from './BattleBus';
import LootLlama from './LootLlama';
import Pickaxe from './Pickaxe';
import { Cloud, VBucks } from './Props';

/**
 * The "Off the clock" stage: a Fortnite drop scene the visitor can orbit —
 * Battle Bus front and centre, loot llama and pickaxe flanking it, with
 * V-Bucks and clouds drifting around. Lit with plain lights (no CDN HDRI)
 * so it always renders, online or not.
 */
export default function FortniteScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [0, 1, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <hemisphereLight args={['#bfe3ff', '#3a3320', 0.7]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#9ec5ff" />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#37c6d0" />

        {/* Centre: the Battle Bus */}
        <group position={[0, 0.4, 0]}>
          <BattleBus scale={0.85} />
        </group>

        {/* Right: loot llama */}
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <group position={[3.1, -0.8, -0.5]}>
            <LootLlama scale={0.55} />
          </group>
        </Float>

        {/* Left: spinning pickaxe */}
        <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
          <group position={[-3.2, 0.2, 0]}>
            <Pickaxe scale={0.6} />
          </group>
        </Float>

        {/* Floating V-Bucks */}
        <VBucks position={[-1.8, 1.8, 1.5]} scale={0.7} />
        <VBucks position={[2.0, 1.4, 1]} scale={0.55} />
        <VBucks position={[0.4, -1.6, 2]} scale={0.6} />

        {/* Sky */}
        <Cloud position={[-4, 2.4, -4]} scale={1.1} />
        <Cloud position={[4.2, 1.8, -5]} scale={1.3} />
        <Cloud position={[0, -2.2, -6]} scale={1.6} />

        {/* Storm-circle glow ring on the ground */}
        <mesh position={[0, -2.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.55, 64]} />
          <meshBasicMaterial color="#37c6d0" transparent opacity={0.55} toneMapped={false} />
        </mesh>
        <mesh position={[0, -2.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.2, 64]} />
          <meshBasicMaterial color="#37c6d0" transparent opacity={0.06} toneMapped={false} />
        </mesh>

        <ContactShadows position={[0, -2.1, 0]} opacity={0.3} scale={14} blur={2.6} far={5} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.9}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Suspense>
    </Canvas>
  );
}
