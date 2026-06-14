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

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="play" crossSection>
      <div className="text-center space-y-4 mb-8">
        <Badge variant="secondary" className="gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5" />
          Off the clock
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Battle Bus Drop</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          When I'm not shipping AI tools, I'm probably hot-dropping in Fortnite. Drag to orbit the
          Battle Bus, loot llama, pickaxe, and V-Bucks — all hand-built live in the browser with
          Three.js, no assets downloaded.
        </p>
      </div>

      <div
        ref={ref}
        className="relative mx-auto h-[460px] w-full max-w-4xl cursor-grab overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-sky-400/10 via-accent/5 to-transparent active:cursor-grabbing"
      >
        {visible ? (
          <Suspense fallback={<StageHint label="Loading the lobby…" />}>
            <FortniteScene />
          </Suspense>
        ) : (
          <StageHint label="Scroll a little to drop in…" />
        )}
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          drag to orbit
        </span>
      </div>
    </Section>
  );
};

export default PlayStage;
