import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { pixelTexture, spriteMaterial, type RGB } from './textures';

/**
 * Pixel-art logo sprites floating with the Minecraft blocks — same
 * zero-asset procedural-canvas approach as the block textures and Ferris.
 *
 * ClaudeSpark: the Claude starburst in Anthropic rust-orange, idly spinning;
 * clicking it (scene raycaster) plays a chime and gives it a spin boost.
 * OpenClaw: an open lobster pincer; clicking it snips it shut twice.
 */

interface SpriteProps {
  position: [number, number, number];
  scale?: number;
}

/* ------------------------------- Claude spark ---------------------------- */

const CLAUDE_ORANGE: RGB = [217, 119, 87];

// Slightly irregular ray lengths so it reads as the hand-drawn starburst,
// not a perfect gear.
const RAY_LENGTHS = [15, 11, 14, 10, 15, 12, 14, 10, 15, 11, 13, 10];

function claudeSparkTexture() {
  return pixelTexture('claude-spark', 32, 32, (px) => {
    const c = 15.5;
    RAY_LENGTHS.forEach((len, i) => {
      const a = (i / RAY_LENGTHS.length) * Math.PI * 2;
      const dx = Math.cos(a);
      const dy = Math.sin(a);
      // Chunky tapered ray: wide at the hub, narrowing to a 1px tip.
      for (let t = 1; t <= len; t += 0.3) {
        const half = 1.8 * (1 - t / len) + 0.35;
        for (let s = -half; s <= half; s += 0.3) {
          px(c + dx * t - dy * s, c + dy * t + dx * s, CLAUDE_ORANGE);
        }
      }
    });
  });
}

const SPIN_DURATION = 0.9;

export function ClaudeSpark({ position, scale = 1 }: SpriteProps) {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(() => spriteMaterial(claudeSparkTexture()), []);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.7 + seed) * 0.3;

    let spin = t * 0.35 + seed; // lazy idle rotation
    const kickAt = ref.current.userData.kickAt as number | undefined;
    if (kickAt !== undefined) {
      const dt = t - kickAt;
      if (dt >= 0 && dt < SPIN_DURATION) {
        const p = dt / SPIN_DURATION;
        spin += Math.PI * 2 * (1 - Math.pow(1 - p, 3)); // extra full turn, eased out
      } else {
        delete ref.current.userData.kickAt;
      }
    }
    ref.current.rotation.z = spin;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} material={material} userData={{ kind: 'claude' }}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

/* -------------------------------- OpenClaw ------------------------------- */

const CLAW_RED: RGB = [203, 58, 41];
const CLAW_DARK: RGB = [140, 32, 22];
const CLAW_LIGHT: RGB = [236, 116, 86];

type Tri = [[number, number], [number, number], [number, number]];

/** Point-in-triangle via sign tests. */
function inTri(px: number, py: number, [a, b, c]: Tri) {
  const sign = (p1: [number, number], p2: [number, number], p3: [number, number]) =>
    (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
  const d1 = sign([px, py], a, b);
  const d2 = sign([px, py], b, c);
  const d3 = sign([px, py], c, a);
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNeg && hasPos);
}

function openClawTexture(closed: boolean) {
  return pixelTexture(closed ? 'claw-closed' : 'claw-open', 24, 24, (px) => {
    // Upper (movable) jaw is a chunky wedge that swings down when closed;
    // lower jaw is fixed. Both are quads (two triangles) from the palm to
    // a blunt 2px tip so they read as crab pincers, not fins.
    const upperTris: Tri[] = closed
      ? [[[16, 8], [16, 11], [4, 11]], [[16, 8], [4, 11], [4, 7]]]
      : [[[16, 7], [16, 11], [3, 7]], [[16, 7], [3, 7], [3, 3]]];
    const lowerTris: Tri[] = [[[16, 13], [16, 17], [3, 21]], [[16, 13], [3, 21], [3, 17]]];
    const tris = [...upperTris, ...lowerTris];

    const inShape = (x: number, y: number): boolean => {
      if (Math.hypot(x - 16, y - 12) <= 5.2) return true; // palm
      if (x >= 20 && x <= 23 && y >= 10 && y <= 14) return true; // arm
      return tris.some((t) => inTri(x, y, t));
    };

    for (let y = 0; y < 24; y++) {
      for (let x = 0; x < 24; x++) {
        if (!inShape(x, y)) continue;
        const edge = !inShape(x - 1, y) || !inShape(x + 1, y) || !inShape(x, y - 1) || !inShape(x, y + 1);
        const shine = Math.hypot(x - 16, y - 12) <= 3.5 && x < 16 && y < 12;
        px(x, y, edge ? CLAW_DARK : shine ? CLAW_LIGHT : CLAW_RED);
      }
    }
  });
}

const SNIP_DURATION = 0.55;

export function OpenClaw({ position, scale = 1 }: SpriteProps) {
  const ref = useRef<THREE.Mesh>(null);
  const frames = useMemo(() => [openClawTexture(false), openClawTexture(true)] as const, []);
  const material = useMemo(() => spriteMaterial(frames[0]), [frames]);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.75 + seed) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.8 + seed) * 0.12;

    // Click: snip shut twice (open/closed alternating), then reopen.
    let frame: 0 | 1 = 0;
    const kickAt = ref.current.userData.kickAt as number | undefined;
    if (kickAt !== undefined) {
      const dt = t - kickAt;
      if (dt >= 0 && dt < SNIP_DURATION) {
        frame = (dt % 0.28) < 0.14 ? 1 : 0;
      } else {
        delete ref.current.userData.kickAt;
      }
    }
    material.map = frames[frame];
  });

  return (
    <mesh ref={ref} position={position} scale={scale} material={material} userData={{ kind: 'claw' }}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}
