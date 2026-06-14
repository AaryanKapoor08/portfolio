import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import GltfModel from './GltfModel';

interface ModelShowcaseProps {
  url: string;
  /** Longest side is normalized to this; pairs with the camera distance below. */
  targetSize?: number;
  rotationY?: number;
  /** Constant lean in degrees; negative leans right. */
  tiltDeg?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  /** Accent colour for the fill light + studio reflections. */
  tint?: string;
  camera?: [number, number, number];
  fov?: number;
  bob?: boolean;
}

/**
 * Generic single-model stage: centres + normalizes any GLB (via GltfModel),
 * lights it with a procedural Lightformer environment (no CDN HDRI so it
 * always renders), drops a contact shadow, and lets you drag to orbit.
 */
export default function ModelShowcase({
  url,
  targetSize = 2.6,
  rotationY = 0,
  tiltDeg = 0,
  autoRotate = true,
  autoRotateSpeed = 1.4,
  tint = '#9ec5ff',
  camera = [0, 0.3, 5],
  fov = 40,
  bob = false,
}: ModelShowcaseProps) {
  // The model is centred at the origin, so its bottom sits at -targetSize/2.
  const groundY = -targetSize / 2 - 0.05;
  // Render at the device's real pixel density (capped) so edges stay crisp.
  const maxDpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2.5) : 2;
  const tilt = (tiltDeg * Math.PI) / 180;
  const spinSpeed = autoRotate ? autoRotateSpeed * 0.45 : 0;

  return (
    <Canvas
      dpr={[1.25, maxDpr]}
      shadows
      camera={{ position: camera, fov }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 7, 4]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-5, 3, -2]} intensity={0.45} color={tint} />

        <GltfModel
          url={url}
          targetSize={targetSize}
          rotationY={rotationY}
          tilt={tilt}
          spinSpeed={spinSpeed}
          bob={bob}
        />

        <ContactShadows position={[0, groundY, 0]} opacity={0.4} scale={targetSize * 3} blur={2.4} far={4} />

        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 4, -3]} scale={[8, 5, 1]} color="#ffffff" />
          <Lightformer intensity={1.3} position={[-5, 1, 2]} scale={[4, 5, 1]} color={tint} />
          <Lightformer intensity={1.1} position={[5, 2, 2]} scale={[4, 5, 1]} color={tint} />
          <Lightformer intensity={0.7} position={[0, -3, 1]} scale={[6, 3, 1]} color={tint} />
        </Environment>

        {/* Manual drag only — the idle spin is done on the model itself so the
            tilt stays put. */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Suspense>
    </Canvas>
  );
}
