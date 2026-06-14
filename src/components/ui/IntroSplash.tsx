import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const COLORS = ['#68a849', '#866043', '#78dee0', '#fcdb3f', '#3fcf6b'];

/**
 * A brief boot screen: a 5x5 grid of blocks pops in one by one (a nod to a
 * world loading in), then the whole thing lifts away to reveal the page.
 * Shows once per browser session and is skipped for reduced-motion users.
 */
export default function IntroSplash() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('intro-seen');
    if (reduced || seen) return;
    setShow(true);
    sessionStorage.setItem('intro-seen', '1');
    const t = window.setTimeout(() => setShow(false), 1900);
    return () => window.clearTimeout(t);
  }, []);

  const blocks = Array.from({ length: 25 });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-background"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grid grid-cols-5 gap-1.5">
            {blocks.map((_, i) => (
              <motion.div
                key={i}
                className="h-6 w-6 rounded-[3px] ring-1 ring-black/10"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.02 * i, type: 'spring', stiffness: 400, damping: 18 }}
              />
            ))}
          </div>
          <motion.p
            className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Building world…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
