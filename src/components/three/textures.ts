import * as THREE from 'three';

/**
 * Procedural pixel-art textures for Minecraft-style voxel blocks.
 * Everything is generated on a <canvas> at runtime so the site ships
 * zero binary texture assets — keeps the bundle light and the look crisp.
 */

const TILE = 16; // 16x16 logical pixels, the classic Minecraft texel grid

type RGB = [number, number, number];

const cache = new Map<string, THREE.CanvasTexture>();

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function rgb([r, g, b]: RGB): string {
  return `rgb(${r},${g},${b})`;
}

/** Deterministic pseudo-random so textures look identical every render. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/**
 * Paint a 16x16 tile by calling `shade(x, y, rng)` for each texel.
 * Returns a NearestFilter CanvasTexture so the pixels stay sharp.
 */
function buildTile(
  key: string,
  base: RGB,
  shade: (x: number, y: number, rand: () => number) => number,
): THREE.CanvasTexture {
  const cached = cache.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = TILE;
  canvas.height = TILE;
  const ctx = canvas.getContext('2d')!;
  const rand = makeRng(key.split('').reduce((a, c) => a + c.charCodeAt(0), 7));

  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const t = shade(x, y, rand);
      ctx.fillStyle = rgb(mix(base, t < 0 ? [0, 0, 0] : [255, 255, 255], Math.abs(t)));
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

const noise = (amp: number) => (_x: number, _y: number, rand: () => number) =>
  (rand() - 0.5) * 2 * amp;

const GRASS_GREEN: RGB = [104, 168, 73];
const DIRT_BROWN: RGB = [134, 96, 67];
const STONE_GREY: RGB = [128, 128, 128];
const DIAMOND_ORE: RGB = [120, 124, 130];
const DIAMOND_CRYSTAL: RGB = [120, 222, 224];

export function grassTop() {
  return buildTile('grass-top', GRASS_GREEN, noise(0.22));
}

export function grassSide() {
  return buildTile('grass-side', DIRT_BROWN, (x, y, rand) => {
    // Top 4 rows are the green grass lip, the rest is dirt.
    if (y < 4) {
      const edge = y === 3 ? (rand() > 0.5 ? -0.1 : 0.15) : 0;
      // Encode grass by returning a strong positive that we override below.
      return edge;
    }
    return (rand() - 0.5) * 0.45;
  });
}

export function dirt() {
  return buildTile('dirt', DIRT_BROWN, noise(0.4));
}

export function stone() {
  return buildTile('stone', STONE_GREY, noise(0.3));
}

export function diamondOre() {
  return buildTile('diamond-ore', DIAMOND_ORE, (x, y, rand) => {
    // Scatter a few bright diamond specks on a stony backdrop.
    const speck = (x % 5 === 2 && y % 6 === 3) || (x % 7 === 5 && y % 4 === 1);
    if (speck) return 0.5;
    return (rand() - 0.5) * 0.35;
  });
}

export function diamond() {
  return buildTile('diamond', DIAMOND_CRYSTAL, (x, y) => {
    const edge = x === 0 || y === 0 || x === TILE - 1 || y === TILE - 1;
    if (edge) return -0.25;
    if ((x + y) % 4 === 0) return 0.25;
    return 0;
  });
}

/** The grass-side tile needs a real two-tone look; build it explicitly. */
export function grassSideTwoTone(): THREE.CanvasTexture {
  const key = 'grass-side-two-tone';
  const cached = cache.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = TILE;
  canvas.height = TILE;
  const ctx = canvas.getContext('2d')!;
  const rand = makeRng(99);

  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const isGrass = y < 4 || (y === 4 && rand() > 0.55);
      const base = isGrass ? GRASS_GREEN : DIRT_BROWN;
      const shade = (rand() - 0.5) * (isGrass ? 0.3 : 0.45);
      ctx.fillStyle = rgb(mix(base, shade < 0 ? [0, 0, 0] : [255, 255, 255], Math.abs(shade)));
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}
