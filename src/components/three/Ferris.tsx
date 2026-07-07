import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ferris the Rustacean 🦀 — the Rust language mascot, drawn as procedural
 * pixel art (same zero-asset approach as the Minecraft block textures) and
 * floated among the blocks as a two-frame sprite: claws bob up and down.
 * Clicking him (scene raycaster) plays the XP pling and he does a backflip.
 */

const W = 28;
const H = 20;

type RGB = [number, number, number];

const BODY: RGB = [231, 77, 30]; // rust orange
const DARK: RGB = [168, 48, 12];
const LIGHT: RGB = [255, 138, 84];
const WHITE: RGB = [255, 255, 255];
const BLACK: RGB = [30, 20, 16];

/** Half-width of the shell for each row (row 7 through 15). */
const SHELL_ROWS: Array<[number, number]> = [
  [7, 5], [8, 7], [9, 9], [10, 10], [11, 10], [12, 10], [13, 9], [14, 8], [15, 6],
];

const frameCache = new Map<number, THREE.CanvasTexture>();

function ferrisTexture(frame: 0 | 1): THREE.CanvasTexture {
  const cached = frameCache.get(frame);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const px = (x: number, y: number, [r, g, b]: RGB) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, y, 1, 1);
  };

  // Shell (centered on x = 13.5).
  for (const [y, hw] of SHELL_ROWS) {
    const x0 = 14 - hw;
    const x1 = 13 + hw;
    for (let x = x0; x <= x1; x++) {
      const edge = x === x0 || x === x1 || y === 15;
      const shine = y <= 8 && x > x0 + 2 && x < x1 - 2;
      px(x, y, edge ? DARK : shine ? LIGHT : BODY);
    }
  }

  // Spikes along the top silhouette.
  const spikes: Array<[number, number]> = [[-8, 8], [-4, 6], [0, 5], [4, 6], [8, 8]];
  for (const [o, y] of spikes) {
    px(13 + o, y + 1, BODY);
    px(14 + o, y + 1, BODY);
    px(o <= 0 ? 13 + o : 14 + o, y, DARK);
  }

  // Eyes + pupils.
  for (const ex of [10, 16]) {
    px(ex, 9, WHITE);
    px(ex + 1, 9, WHITE);
    px(ex, 10, WHITE);
    px(ex + 1, 10, WHITE);
  }
  px(11, 10, BLACK);
  px(16, 10, BLACK);

  // Little smile.
  px(12, 12, DARK);
  px(13, 13, DARK);
  px(14, 13, DARK);
  px(15, 12, DARK);

  // Claws — the animated part: down on frame 0, raised on frame 1.
  const cy = frame === 0 ? 12 : 9;
  // Left claw (notch on the outer edge so it reads as pincers).
  for (let y = cy; y <= cy + 2; y++) {
    for (let x = 2; x <= 4; x++) {
      if (x === 2 && y === cy + 1) continue; // pincer gap
      px(x, y, x === 2 ? DARK : BODY);
    }
  }
  px(5, cy + 1, DARK); // arm
  px(6, cy + 2, DARK);
  // Right claw (mirror).
  for (let y = cy; y <= cy + 2; y++) {
    for (let x = 23; x <= 25; x++) {
      if (x === 25 && y === cy + 1) continue;
      px(x, y, x === 25 ? DARK : BODY);
    }
  }
  px(22, cy + 1, DARK);
  px(21, cy + 2, DARK);

  // Legs.
  const legs: Array<[number, number]> = [
    [9, 16], [8, 17], [11, 16], [10, 17],
    [16, 16], [17, 17], [18, 16], [19, 17],
  ];
  for (const [x, y] of legs) px(x, y, DARK);

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  frameCache.set(frame, tex);
  return tex;
}

const FLIP_DURATION = 0.8;

interface FerrisProps {
  position: [number, number, number];
  scale?: number;
}

export default function Ferris({ position, scale = 1 }: FerrisProps) {
  const ref = useRef<THREE.Mesh>(null);
  const frames = useMemo(() => [ferrisTexture(0), ferrisTexture(1)] as const, []);
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
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // Claw-bob sprite animation.
    material.map = frames[Math.floor(t / 0.45) % 2];

    ref.current.position.y = position[1] + Math.sin(t * 0.8 + seed) * 0.3;

    // Click backflip beats the idle sway while it runs.
    const kickAt = ref.current.userData.kickAt as number | undefined;
    if (kickAt !== undefined) {
      const dt = t - kickAt;
      if (dt >= 0 && dt < FLIP_DURATION) {
        const p = dt / FLIP_DURATION;
        const ease = 1 - Math.pow(1 - p, 3);
        ref.current.rotation.z = -Math.PI * 2 * ease;
        return;
      }
      delete ref.current.userData.kickAt;
      ref.current.rotation.z = 0;
    }
    ref.current.rotation.z = Math.sin(t * 0.9 + seed) * 0.08;
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      material={material}
      userData={{ kind: 'ferris' }}
    >
      <planeGeometry args={[W / H, 1]} />
    </mesh>
  );
}
