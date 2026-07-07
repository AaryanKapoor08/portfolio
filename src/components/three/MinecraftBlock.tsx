import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  grassTop,
  dirt,
  grassSideTwoTone,
  diamondOre,
  diamond,
  emerald,
  stone,
  cobblestone,
  tntSide,
  tntTop,
  logSide,
  logTop,
  glowstone,
  goldOre,
  obsidian,
  leaves,
  beeNestSide,
  beeNestFront,
  beeNestTop,
} from './textures';

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

function useBlockMaterials(kind: BlockKind) {
  return useMemo(() => {
    const mat = (tex: THREE.Texture, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, metalness: 0.05, ...opts });
    const solid = (m: THREE.Material) => [m, m, m, m, m, m];

    switch (kind) {
      case 'grass': {
        const side = mat(grassSideTwoTone());
        // BoxGeometry face order: +x, -x, +y, -y, +z, -z
        return [side, side, mat(grassTop()), mat(dirt()), side, side];
      }
      case 'diamondOre':
        return solid(mat(diamondOre(), { emissive: '#4fd8dc', emissiveIntensity: 0.06, emissiveMap: diamondOre() }));
      case 'diamond':
        return solid(mat(diamond(), { roughness: 0.35, metalness: 0.25, emissive: '#2fb9bd', emissiveIntensity: 0.12, emissiveMap: diamond() }));
      case 'emerald':
        return solid(mat(emerald(), { roughness: 0.35, metalness: 0.25, emissive: '#1f9e58', emissiveIntensity: 0.12, emissiveMap: emerald() }));
      case 'gold':
        return solid(mat(goldOre(), { emissive: '#c9a521', emissiveIntensity: 0.05, emissiveMap: goldOre() }));
      case 'tnt': {
        const side = mat(tntSide());
        const cap = mat(tntTop());
        return [side, side, cap, cap, side, side];
      }
      case 'log': {
        const side = mat(logSide());
        const cap = mat(logTop());
        return [side, side, cap, cap, side, side];
      }
      case 'glowstone':
        return solid(
          mat(glowstone(), { emissive: '#ffb84d', emissiveIntensity: 0.7, emissiveMap: glowstone(), roughness: 1 }),
        );
      case 'obsidian':
        return solid(mat(obsidian(), { roughness: 0.45, metalness: 0.15 }));
      case 'leaves':
        return solid(mat(leaves()));
      case 'beeNest': {
        const side = mat(beeNestSide());
        const cap = mat(beeNestTop());
        // Entrance hole faces the camera (+z).
        return [side, side, cap, cap, mat(beeNestFront()), side];
      }
      case 'cobble':
        return solid(mat(cobblestone()));
      default:
        return solid(mat(stone()));
    }
  }, [kind]);
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
  const materials = useBlockMaterials(kind);
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
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      material={materials}
      castShadow
      userData={{ kind }}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
