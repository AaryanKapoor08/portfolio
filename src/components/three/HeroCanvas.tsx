import { Suspense, lazy, useEffect, useState } from 'react';

const HeroScene = lazy(() => import('./HeroScene'));

/**
 * Mounts the WebGL hero scene only when it makes sense: skips it for users
 * who prefer reduced motion and defers it a tick so the text paints first.
 */
export default function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip the hero scene on phones only: the blocks crowd the headline and
    // it costs battery. (We intentionally still show it for reduced-motion
    // users — the 3D is the whole point of this site.)
    const tooSmall = window.matchMedia('(max-width: 767px)').matches;
    if (tooSmall) return;
    // Let the hero copy render before we spin up WebGL.
    const id = window.setTimeout(() => setEnabled(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_84%,transparent)]">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  );
}
