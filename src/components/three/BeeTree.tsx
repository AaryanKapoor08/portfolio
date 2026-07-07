import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import MinecraftBlock, { type BlockKind } from './MinecraftBlock';

/**
 * A small floating Minecraft oak: trunk, a full rounded leaf canopy, a bee
 * nest hanging under the leaves beside the trunk (entrance facing the
 * camera) and pixel bees buzzing lazy orbits around it. Blocks reuse
 * MinecraftBlock so they share textures and the click dig-sound/bounce
 * behavior; bees are two-frame billboard sprites like Ferris.
 */

/* --------------------------------- Bees ---------------------------------- */

const BEE_W = 16;
const BEE_H = 12;

type RGB = [number, number, number];

const BEE_YELLOW: RGB = [240, 195, 78];
const BEE_STRIPE: RGB = [66, 52, 32];
const BEE_WING: RGB = [214, 226, 244];
const BEE_EYE: RGB = [24, 20, 16];

const beeFrames = new Map<number, THREE.CanvasTexture>();

function beeTexture(frame: 0 | 1): THREE.CanvasTexture {
  const cached = beeFrames.get(frame);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = BEE_W;
  canvas.height = BEE_H;
  const ctx = canvas.getContext('2d')!;
  const px = (x: number, y: number, [r, g, b]: RGB) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
  };

  // Fuzzy rounded body, facing left: yellow front, two stripes, dark rear.
  for (let y = 4; y <= 10; y++) {
    for (let x = 2; x <= 13; x++) {
      const corner = (x === 2 || x === 13) && (y === 4 || y === 10);
      if (corner) continue;
      const stripe = x === 7 || x === 10;
      const rear = x >= 12;
      px(x, y, stripe || rear ? BEE_STRIPE : BEE_YELLOW);
    }
  }
  // Big eye, antenna, stinger.
  px(3, 6, BEE_EYE);
  px(4, 6, BEE_EYE);
  px(3, 7, BEE_EYE);
  px(4, 7, BEE_EYE);
  px(4, 3, BEE_STRIPE);
  px(3, 2, BEE_STRIPE);
  px(14, 7, BEE_STRIPE);
  // Wings: raised on frame 0, folded onto the back on frame 1.
  const wy = frame === 0 ? 0 : 2;
  for (let x = 6; x <= 10; x++) {
    px(x, wy, BEE_WING);
    px(x, wy + 1, BEE_WING);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  beeFrames.set(frame, tex);
  return tex;
}

interface BeeProps {
  /** Orbit center in tree-local units. */
  center: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
  scale?: number;
}

function Bee({ center, radius, speed, phase, scale = 0.42 }: BeeProps) {
  const ref = useRef<THREE.Mesh>(null);
  const frames = useMemo(() => [beeTexture(0), beeTexture(1)] as const, []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: frames[0],
        transparent: true,
        alphaTest: 0.1,
        side: THREE.DoubleSide,
      }),
    [frames],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const a = t * speed + phase;

    ref.current.position.set(
      center[0] + Math.cos(a) * radius,
      center[1] + Math.sin(t * 2.1 + phase) * 0.25,
      center[2] + Math.sin(a) * radius * 0.6,
    );
    // Fast wing flap + face the direction of travel (sprite is drawn facing left).
    material.map = frames[Math.floor(t / 0.08) % 2];
    const movingLeft = -Math.sin(a) < 0;
    ref.current.scale.x = Math.abs(ref.current.scale.x) * (movingLeft ? 1 : -1);
  });

  return (
    <mesh ref={ref} scale={[scale * (BEE_W / BEE_H), scale, scale]} material={material} userData={{ kind: 'bee' }}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

/* --------------------------------- Tree ---------------------------------- */

function treeBlocks(): Array<{ position: [number, number, number]; kind: BlockKind }> {
  const blocks: Array<{ position: [number, number, number]; kind: BlockKind }> = [
    // Free-floating trunk, like a cut tree drifting in the sky.
    { position: [0, 0, 0], kind: 'log' },
    { position: [0, 1, 0], kind: 'log' },
    { position: [0, 2, 0], kind: 'log' },
  ];
  // Lower canopy: full 3x3 ring around the trunk top.
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      if (x === 0 && z === 0) continue; // trunk occupies the center
      blocks.push({ position: [x, 2, z], kind: 'leaves' });
    }
  }
  // Middle canopy: full 3x3 cap.
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      blocks.push({ position: [x, 3, z], kind: 'leaves' });
    }
  }
  // Top: plus-shape crown.
  blocks.push(
    { position: [0, 4, 0], kind: 'leaves' },
    { position: [-1, 4, 0], kind: 'leaves' },
    { position: [1, 4, 0], kind: 'leaves' },
    { position: [0, 4, -1], kind: 'leaves' },
    { position: [0, 4, 1], kind: 'leaves' },
  );
  // The nest hangs under the canopy beside the trunk, like in the game.
  blocks.push({ position: [-1, 1, 0], kind: 'beeNest' });
  return blocks;
}

const TREE_BLOCKS = treeBlocks();

interface BeeTreeProps {
  position: [number, number, number];
  scale?: number;
}

export default function BeeTree({ position, scale = 0.55 }: BeeTreeProps) {
  return (
    <group position={position} scale={scale}>
      {TREE_BLOCKS.map((b, i) => (
        <MinecraftBlock key={i} position={b.position} kind={b.kind} rotate={false} floatRange={0} />
      ))}
      <Bee center={[-0.6, 1.4, 0.8]} radius={1.7} speed={0.55} phase={0} />
      <Bee center={[0.2, 3.6, 0.6]} radius={2.2} speed={0.42} phase={2.1} />
      <Bee center={[-0.2, 2.4, 0.9]} radius={2.6} speed={0.34} phase={4.2} />
    </group>
  );
}
