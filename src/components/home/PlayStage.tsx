import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

const LlamaScene = lazy(() => import('@/components/three/LlamaScene'));

/**
 * A playful interlude: a draggable Fortnite-style loot llama, mounted only
 * once it scrolls into view so the WebGL context isn't created up front.
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
          <Sparkles className="h-3.5 w-3.5" />
          Off the clock
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Drag the Llama</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          When I'm not shipping AI tools, I'm probably in a game lobby. Spin this little
          loot llama around — built live in the browser with Three.js, no assets downloaded.
        </p>
      </div>

      <div
        ref={ref}
        className="relative mx-auto h-[380px] w-full max-w-3xl cursor-grab overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-accent/5 to-transparent active:cursor-grabbing"
      >
        {visible && (
          <Suspense fallback={null}>
            <LlamaScene />
          </Suspense>
        )}
      </div>
    </Section>
  );
};

export default PlayStage;
