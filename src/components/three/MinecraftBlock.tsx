import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as tex from './textures';

export type BlockKind =
  | 'grass'
  | 'stone'
  | 'cobble'
  | 'diamondOre'
  | 'diamond'
  | 'emerald'
  | 'gold'
  | 'tnt'
  | 'log'
  | 'glowstone'
  | 'obsidian'
  | 'leaves'
  | 'beeNest';

interface MinecraftBlockProps {
  position: [number, number, number];
  kind?: BlockKind;
  scale?: number;
  /** Per-block float speed + rotation feel. */
  speed?: number;
  floatRange?: number;
  rotate?: boolean;
}

const mat = (map: THREE.Texture, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
  new THREE.MeshStandardMaterial({ map, roughness: 0.85, metalness: 0.05, ...opts });
/** Self-lit variant: the texture doubles as its own emissive map. */
const glow = (map: THREE.Texture, emissive: string, emissiveIntensity: number, opts = {}) =>
  mat(map, { emissive, emissiveIntensity, emissiveMap: map, ...opts });
const solid = (m: THREE.Material) => [m, m, m, m, m, m];

// BoxGeometry face order: +x, -x, +y, -y, +z, -z
function buildMaterials(kind: BlockKind): THREE.Material[] {
  switch (kind) {
    case 'grass': {
      const side = mat(tex.grassSideTwoTone());
      return [side, side, mat(tex.grassTop()), mat(tex.dirt()), side, side];
    }
    case 'diamondOre':
      return solid(glow(tex.diamondOre(), '#4fd8dc', 0.06));
    case 'diamond':
      return solid(glow(tex.diamond(), '#2fb9bd', 0.12, { roughness: 0.35, metalness: 0.25 }));
    case 'emerald':
      return solid(glow(tex.emerald(), '#1f9e58', 0.12, { roughness: 0.35, metalness: 0.25 }));
    case 'gold':
      return solid(glow(tex.goldOre(), '#c9a521', 0.05));
    case 'tnt': {
      const side = mat(tex.tntSide());
      const cap = mat(tex.tntTop());
      return [side, side, cap, cap, side, side];
    }
    case 'log': {
      const side = mat(tex.logSide());
      const cap = mat(tex.logTop());
      return [side, side, cap, cap, side, side];
    }
    case 'glowstone':
      return solid(glow(tex.glowstone(), '#ffb84d', 0.7, { roughness: 1 }));
    case 'obsidian':
      return solid(mat(tex.obsidian(), { roughness: 0.45, metalness: 0.15 }));
    case 'leaves':
      return solid(mat(tex.leaves()));
    case 'beeNest': {
      const side = mat(tex.beeNestSide());
      const cap = mat(tex.beeNestTop());
      // Entrance hole faces the camera (+z).
      return [side, side, cap, cap, mat(tex.beeNestFront()), side];
    }
    case 'cobble':
      return solid(mat(tex.cobblestone()));
    default:
      return solid(mat(tex.stone()));
  }
}

// Materials are never mutated per block, so every block of a kind shares one set.
const materialCache = new Map<BlockKind, THREE.Material[]>();
function blockMaterials(kind: BlockKind) {
  let m = materialCache.get(kind);
  if (!m) materialCache.set(kind, (m = buildMaterials(kind)));
  return m;
}

/** How long the click "kick" bounce lasts, in seconds. */
const KICK_DURATION = 0.5;

/**
 * A single drifting, slowly tumbling Minecraft cube. Clicking it (handled by
 * the scene-level raycaster) stamps `userData.kickAt` with the clock time and
 * the block answers with a squash-and-spin bounce.
 */
export default function MinecraftBlock({
  position,
  kind = 'grass',
  scale = 1,
  speed = 1,
  floatRange = 0.4,
  rotate = true,
}: MinecraftBlockProps) {
  const ref = useRef<THREE.Mesh>(null);
  const seed = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.6 * speed + seed) * floatRange;
    if (rotate) {
      ref.current.rotation.y = t * 0.25 * speed + seed;
      ref.current.rotation.x = Math.sin(t * 0.3 * speed + seed) * 0.18;
    }

    // Click bounce: pop up in scale, ease back down.
    let s = scale;
    const kickAt = ref.current.userData.kickAt as number | undefined;
    if (kickAt !== undefined) {
      const dt = t - kickAt;
      if (dt >= 0 && dt < KICK_DURATION) {
        s = scale * (1 + Math.sin((dt / KICK_DURATION) * Math.PI) * 0.25);
        ref.current.rotation.y += (KICK_DURATION - dt) * 0.15;
      } else {
        delete ref.current.userData.kickAt;
      }
    }
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={position} scale={scale} material={blockMaterials(kind)} userData={{ kind }}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
