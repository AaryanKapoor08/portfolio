import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import MinecraftBlock, { type BlockKind } from './MinecraftBlock';
import Ferris from './Ferris';
import BeeTree from './BeeTree';
import { ClaudeSpark, OpenClaw } from './FloatingLogos';
import { playBoom, playBuzz, playChime, playDig, playSnip, playXp, type DigMaterial } from '@/lib/sounds';

interface FloatingBlock {
  position: [number, number, number];
  kind: BlockKind;
  scale: number;
  speed: number;
}

// A loose, asymmetric scatter so the scene never reads as a grid. Bigger,
// brighter blocks near the edges; small deep-parallax ones drift behind the
// headline.
const BLOCKS: FloatingBlock[] = [
  { position: [-4.6, 1.4, -2], kind: 'grass', scale: 1.0, speed: 0.9 },
  { position: [4.6, -1.0, -1], kind: 'diamond', scale: 0.85, speed: 1.2 },
  { position: [4.9, 2.6, -4], kind: 'grass', scale: 0.65, speed: 1.0 },
  { position: [-1.6, 3.4, -6], kind: 'glowstone', scale: 0.6, speed: 1.4 },
  { position: [6.0, 0.6, -6], kind: 'log', scale: 0.55, speed: 0.8 },
  { position: [-6.3, 2.5, -4], kind: 'tnt', scale: 0.6, speed: 1.0 },
  { position: [5.6, -2.7, -3], kind: 'obsidian', scale: 0.75, speed: 0.7 },
  { position: [2.3, 3.3, -7], kind: 'gold', scale: 0.5, speed: 1.2 },
  { position: [0.6, -3.5, -7], kind: 'stone', scale: 0.45, speed: 0.9 },
];

/** Which dig sound each block kind makes when clicked. */
const DIG_SOUND: Record<string, DigMaterial> = {
  grass: 'grass',
  stone: 'stone',
  cobble: 'stone',
  diamondOre: 'stone',
  gold: 'stone',
  obsidian: 'stone',
  diamond: 'glass',
  emerald: 'glass',
  glowstone: 'glass',
  log: 'wood',
  leaves: 'grass',
  beeNest: 'wood',
};

/**
 * Window-level click raycaster. The canvas wrapper is pointer-events-none so
 * the hero buttons stay clickable, so we listen on window and raycast
 * manually. A hit stamps `userData.kickAt` (the block/Ferris animates itself)
 * and plays the matching Minecraft-style sound.
 */
function ClickInteractions() {
  const { camera, scene, clock, gl } = useThree();

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      const r = gl.domElement.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster
        .intersectObjects(scene.children, true)
        .find((h) => h.object.userData?.kind);
      if (!hit) return;

      const kind = hit.object.userData.kind as string;
      hit.object.userData.kickAt = clock.elapsedTime;
      if (kind === 'ferris') playXp();
      else if (kind === 'bee') playBuzz();
      else if (kind === 'claude') playChime();
      else if (kind === 'claw') playSnip();
      else if (kind === 'tnt') playBoom();
      else playDig(DIG_SOUND[kind] ?? 'stone');
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [camera, scene, clock, gl]);

  return null;
}

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
        {/* Warm halo around the glowstone block. */}
        <pointLight position={[-1.6, 3.4, -5]} intensity={6} distance={7} color="#ffb84d" />

        <ClickInteractions />

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

          {/* Ferris the Rustacean drifts along with the blocks. */}
          <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
            <Ferris position={[3.6, 1.9, -3]} scale={1.1} />
          </Float>

          {/* Floating oak tree with a hanging bee nest and orbiting bees.
              No rotation — trees should stay upright. */}
          <Float speed={0.7} rotationIntensity={0} floatIntensity={0.35}>
            <BeeTree position={[-5.5, -2.7, -3]} scale={0.6} />
          </Float>

          {/* Claude starburst + OpenClaw pincer, floating with everything else. */}
          <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.5}>
            <ClaudeSpark position={[-3.9, 3.1, -4]} scale={0.9} />
          </Float>
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
            <OpenClaw position={[2.9, -3.0, -5]} scale={0.95} />
          </Float>

          <Sparkles count={40} scale={[14, 8, 6]} size={2} speed={0.3} opacity={0.7} color="#cfe3ff" />
          <Sparkles count={12} scale={[3, 2, 2]} position={[-1.6, 3.4, -6]} size={3} speed={0.4} opacity={0.8} color="#ffd27f" />
        </ParallaxGroup>
      </Suspense>
    </Canvas>
  );
}
