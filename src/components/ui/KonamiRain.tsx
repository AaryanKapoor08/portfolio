import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

// Minecraft-y block palette: grass, dirt, diamond, gold, emerald, redstone.
const COLORS = ['#68a849', '#866043', '#78dee0', '#fcdb3f', '#3fcf6b', '#e23b3b'];

interface Block {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
}

function spawnBlocks(count: number): Block[] {
  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2.4 + Math.random() * 1.8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotate: (Math.random() - 0.5) * 360,
  }));
}

/**
 * Hidden reward: type the Konami code (↑↑↓↓←→←→ B A) anywhere and the
 * screen rains pixel blocks. A small wink for anyone who grew up on Minecraft.
 */
export default function KonamiRain() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === SEQUENCE[progress] ? progress + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (progress === SEQUENCE.length) {
        progress = 0;
        toast('Creeper? Aw man.', { description: 'You found the secret block rain.' });
        setBlocks(spawnBlocks(60));
        window.setTimeout(() => setBlocks([]), 5000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {blocks.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: -60, opacity: 0, rotate: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0.8], rotate: b.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: b.duration, delay: b.delay, ease: 'easeIn' }}
            style={{ left: `${b.left}%`, backgroundColor: b.color }}
            className="absolute top-0 h-7 w-7 rounded-[3px] shadow-md ring-2 ring-black/20"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
