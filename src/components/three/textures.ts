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

/** Faceted gem block (diamond / emerald / …): dark rim + diagonal glints. */
function gemBlock(key: string, base: RGB) {
  return buildTile(key, base, (x, y) => {
    const edge = x === 0 || y === 0 || x === TILE - 1 || y === TILE - 1;
    if (edge) return -0.28;
    const inner = x === 1 || y === 1 || x === TILE - 2 || y === TILE - 2;
    if (inner) return 0.18;
    if ((x + y) % 4 === 0) return 0.28;
    return 0;
  });
}

export function diamond() {
  return gemBlock('diamond', DIAMOND_CRYSTAL);
}

export function emerald() {
  return gemBlock('emerald', EMERALD_GREEN);
}

/**
 * Free-form painter for tiles that need real multi-color art (TNT, logs, …).
 * `px(x, y, color, jitter?)` fills one texel, optionally noise-shaded.
 */
function buildArtTile(
  key: string,
  paint: (px: (x: number, y: number, color: RGB, jitter?: number) => void, rand: () => number) => void,
): THREE.CanvasTexture {
  const cached = cache.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = TILE;
  canvas.height = TILE;
  const ctx = canvas.getContext('2d')!;
  const rand = makeRng(key.split('').reduce((a, c) => a + c.charCodeAt(0), 7));

  const px = (x: number, y: number, color: RGB, jitter = 0) => {
    const t = (rand() - 0.5) * 2 * jitter;
    ctx.fillStyle = rgb(mix(color, t < 0 ? [0, 0, 0] : [255, 255, 255], Math.abs(t)));
    ctx.fillRect(x, y, 1, 1);
  };

  paint(px, rand);

  const tex = new THREE.CanvasTexture(canvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

const EMERALD_GREEN: RGB = [80, 200, 120];
const TNT_RED: RGB = [200, 58, 40];
const TNT_SAND: RGB = [216, 196, 160];
const BARK_BROWN: RGB = [107, 84, 51];
const WOOD_TAN: RGB = [178, 143, 88];
const GLOW_AMBER: RGB = [244, 191, 90];
const GLOW_DIRT: RGB = [130, 96, 48];
const OBSIDIAN_BLACK: RGB = [22, 16, 34];
const OBSIDIAN_PURPLE: RGB = [66, 48, 104];
const GOLD_YELLOW: RGB = [250, 238, 77];

/** Cobblestone: rounded grey blobs separated by dark mortar. */
export function cobblestone() {
  return buildArtTile('cobblestone', (px) => {
    const MORTAR: RGB = [72, 72, 72];
    const blobs: Array<[number, number, number, number]> = [
      // [cx, cy, radius, brightness]
      [3, 3, 3.1, 0.06],
      [11, 2, 2.7, -0.05],
      [8, 8, 2.5, 0.12],
      [3, 12, 2.9, -0.02],
      [12, 12, 3.2, 0.08],
      [15, 7, 2.2, 0.0],
    ];
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        let hit: RGB | null = null;
        for (const [cx, cy, r, b] of blobs) {
          if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) {
            hit = mix(STONE_GREY, b < 0 ? [0, 0, 0] : [255, 255, 255], Math.abs(b));
            break;
          }
        }
        px(x, y, hit ?? MORTAR, hit ? 0.18 : 0.1);
      }
    }
  });
}

/** TNT side: red stick rows with the white TNT label band. */
export function tntSide() {
  return buildArtTile('tnt-side', (px) => {
    // 3x5 pixel letters for the label.
    const T = ['111', '010', '010', '010', '010'];
    const N = ['101', '111', '111', '101', '101'];
    const letters = [T, N, T];
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        if (y >= 5 && y <= 10) {
          px(x, y, [235, 231, 222], 0.05); // white band
        } else {
          // Red sticks with a dark seam every 4 texels.
          const seam = x % 4 === 0;
          px(x, y, seam ? mix(TNT_RED, [0, 0, 0], 0.35) : TNT_RED, 0.12);
        }
      }
    }
    letters.forEach((glyph, i) => {
      const ox = 2 + i * 4;
      glyph.forEach((row, gy) => {
        row.split('').forEach((c, gx) => {
          if (c === '1') px(ox + gx, 6 + gy, [30, 26, 24]);
        });
      });
    });
  });
}

/** TNT top: red rim around the sandy dynamite ends. */
export function tntTop() {
  return buildArtTile('tnt-top', (px) => {
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        const rim = x < 3 || y < 3 || x > TILE - 4 || y > TILE - 4;
        px(x, y, rim ? TNT_RED : TNT_SAND, rim ? 0.12 : 0.15);
      }
    }
    // Fuse dot in the middle.
    px(7, 7, [60, 50, 40]);
    px(8, 7, [60, 50, 40]);
    px(7, 8, [60, 50, 40]);
    px(8, 8, [60, 50, 40]);
  });
}

/** Oak log bark: vertical stripes with darker furrows. */
export function logSide() {
  return buildArtTile('log-side', (px, rand) => {
    for (let x = 0; x < TILE; x++) {
      const furrow = x % 4 === 1;
      for (let y = 0; y < TILE; y++) {
        const base = furrow ? mix(BARK_BROWN, [0, 0, 0], 0.3) : BARK_BROWN;
        const knot = furrow && rand() > 0.92;
        px(x, y, knot ? mix(BARK_BROWN, [0, 0, 0], 0.5) : base, 0.14);
      }
    }
  });
}

/** Oak log top: tree rings on tan end-grain with a bark border. */
export function logTop() {
  return buildArtTile('log-top', (px) => {
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        const border = x < 2 || y < 2 || x > TILE - 3 || y > TILE - 3;
        if (border) {
          px(x, y, BARK_BROWN, 0.16);
          continue;
        }
        const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5)); // square rings
        const ring = Math.floor(d) % 2 === 0;
        px(x, y, ring ? WOOD_TAN : mix(WOOD_TAN, [0, 0, 0], 0.22), 0.08);
      }
    }
  });
}

/** Glowstone: bright amber crystal clusters in a dark honey matrix. */
export function glowstone() {
  return buildArtTile('glowstone', (px, rand) => {
    const seeds: Array<[number, number]> = [
      [2, 3], [7, 1], [12, 4], [4, 8], [10, 9], [14, 12], [1, 13], [7, 13],
    ];
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        let d = Infinity;
        for (const [sx, sy] of seeds) {
          d = Math.min(d, Math.abs(x - sx) + Math.abs(y - sy));
        }
        const bright = d <= 1 ? 1 : d <= 2 && rand() > 0.4 ? 0.6 : 0;
        if (bright === 1) px(x, y, mix(GLOW_AMBER, [255, 255, 255], 0.25), 0.08);
        else if (bright > 0) px(x, y, GLOW_AMBER, 0.12);
        else px(x, y, GLOW_DIRT, 0.2);
      }
    }
  });
}

/** Gold ore: stone with chunky 2x2 gold nuggets. */
export function goldOre() {
  return buildArtTile('gold-ore', (px, rand) => {
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) px(x, y, STONE_GREY, 0.15);
    }
    const nuggets: Array<[number, number]> = [[3, 4], [10, 2], [12, 10], [5, 11]];
    for (const [nx, ny] of nuggets) {
      px(nx, ny, GOLD_YELLOW, 0.05);
      px(nx + 1, ny, mix(GOLD_YELLOW, [0, 0, 0], 0.2));
      px(nx, ny + 1, mix(GOLD_YELLOW, [0, 0, 0], 0.25));
      px(nx + 1, ny + 1, GOLD_YELLOW, 0.05);
      if (rand() > 0.5) px(nx + 2, ny + 1, mix(GOLD_YELLOW, [0, 0, 0], 0.35));
    }
  });
}

const LEAF_GREEN: RGB = [66, 130, 46];
const NEST_TAN: RGB = [200, 150, 86];
const NEST_DARK: RGB = [152, 104, 52];
const NEST_LIGHT: RGB = [225, 183, 118];

/** Oak leaves: soft green with sparse darker pockets. */
export function leaves() {
  return buildTile('leaves', LEAF_GREEN, (_x, _y, rand) => {
    if (rand() < 0.07) return -0.34; // occasional shadow pocket
    return (rand() - 0.5) * 0.34;
  });
}

/** Bee nest side: layered honey-wax bands. */
export function beeNestSide() {
  return buildArtTile('bee-nest-side', (px) => {
    for (let y = 0; y < TILE; y++) {
      const band = y % 4 === 3 ? NEST_DARK : y % 4 === 1 ? NEST_LIGHT : NEST_TAN;
      for (let x = 0; x < TILE; x++) px(x, y, band, 0.1);
    }
  });
}

/** Bee nest front: same bands plus the dark entrance hole. */
export function beeNestFront() {
  return buildArtTile('bee-nest-front', (px) => {
    for (let y = 0; y < TILE; y++) {
      const band = y % 4 === 3 ? NEST_DARK : y % 4 === 1 ? NEST_LIGHT : NEST_TAN;
      for (let x = 0; x < TILE; x++) px(x, y, band, 0.1);
    }
    for (let y = 9; y <= 13; y++) {
      for (let x = 6; x <= 9; x++) px(x, y, [66, 46, 26], 0.12);
    }
  });
}

/** Bee nest top: plain wax. */
export function beeNestTop() {
  return buildArtTile('bee-nest-top', (px) => {
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        const rim = x === 0 || y === 0 || x === TILE - 1 || y === TILE - 1;
        px(x, y, rim ? NEST_DARK : NEST_LIGHT, 0.12);
      }
    }
  });
}

/** Obsidian: near-black with violet swirl streaks. */
export function obsidian() {
  return buildArtTile('obsidian', (px, rand) => {
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        const swirl = (x * 3 + y * 5) % 11 === 0 && rand() > 0.35;
        const spark = rand() > 0.97;
        if (spark) px(x, y, mix(OBSIDIAN_PURPLE, [255, 255, 255], 0.4));
        else if (swirl) px(x, y, OBSIDIAN_PURPLE, 0.15);
        else px(x, y, OBSIDIAN_BLACK, 0.12);
      }
    }
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
