import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  grassTop,
  dirt,
  grassSideTwoTone,
  diamondOre,
  stone,
} from './textures';

export type BlockKind = 'grass' | 'diamond' | 'stone';

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
    const mat = (tex: THREE.Texture) =>
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, metalness: 0.05 });

    if (kind === 'grass') {
      const side = mat(grassSideTwoTone());
      // BoxGeometry face order: +x, -x, +y, -y, +z, -z
      return [
        side,
        side,
        mat(grassTop()),
        mat(dirt()),
        side,
        side,
      ];
    }
    if (kind === 'diamond') {
      const ore = mat(diamondOre());
      return [ore, ore, ore, ore, ore, ore];
    }
    const st = mat(stone());
    return [st, st, st, st, st, st];
  }, [kind]);
}

/** A single drifting, slowly tumbling Minecraft cube. */
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
  });

  return (
    <mesh ref={ref} position={position} scale={scale} material={materials} castShadow>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
