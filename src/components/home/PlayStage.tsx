import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Gamepad2 } from 'lucide-react';

const FortniteScene = lazy(() => import('@/components/three/FortniteScene'));

/** Centred placeholder shown before the scene mounts / while it loads. */
const StageHint: React.FC<{ label: string }> = ({ label }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="animate-pulse text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </p>
  </div>
);

/**
 * A playful interlude: a draggable Fortnite drop scene (Battle Bus, llama,
 * pickaxe, V-Bucks), mounted only once it scrolls into view so the WebGL
 * context isn't created up front.
 */
const PlayStage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Reduced-motion users still get the scene — we just don't auto-spin it.
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If it's already on screen (deep-link, fast scroll), mount right away.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="play" className="fn-shop">
      <div className="text-center space-y-4 mb-8">
        <Badge variant="secondary" className="gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5" />
          Off the clock
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground font-title">Battle Bus Drop</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          When I'm not shipping AI tools, I'm probably hot-dropping in Fortnite. Drag to orbit the
          iconic Battle Bus, rendered in real time with Three.js and React Three Fiber.
        </p>
      </div>

      <div
        ref={ref}
        className="relative mx-auto h-[460px] w-full max-w-4xl cursor-grab overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-sky-400/10 via-accent/5 to-transparent active:cursor-grabbing"
      >
        {visible ? (
          <Suspense fallback={<StageHint label="Loading the lobby…" />}>
            <FortniteScene autoRotate={!reduced} />
          </Suspense>
        ) : (
          <StageHint label="Loading the lobby…" />
        )}
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          drag to orbit
        </span>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground/70">
        Battle Bus model by{' '}
        <a
          href="https://sketchfab.com/RamonaFlowers"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          RamonaFlowers
        </a>{' '}
        · licensed CC BY. Fortnite is a trademark of Epic Games.
      </p>
    </Section>
  );
};

export default PlayStage;
