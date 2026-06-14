import React, { Suspense, lazy } from 'react';
import Section from '@/components/ui/Section';

const ModelShowcase = lazy(() => import('@/components/three/ModelShowcase'));

const About: React.FC = () => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am a rising third-year Computer Science student at the University of New Brunswick
            and an Oracle GenAI Certified developer. I build AI developer tools, Chrome extensions,
            and retrieval-agent systems.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            My work spans TypeScript, Python, React, LangGraph, RAG, and LLM provider orchestration,
            with shipped open-source projects focused on making model behavior reliable in real workflows.
          </p>
        </div>
        <div className="group relative aspect-square cursor-grab overflow-hidden rounded-2xl border border-border bg-card shadow-lg active:cursor-grabbing">
          {/* Fixed dark display case (same in light + dark) so the wand pops */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(258_45%_15%)] via-[hsl(248_32%_10%)] to-[hsl(222_30%_6%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(265_70%_58%/0.14),transparent_60%)]" />
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <ModelShowcase
                url="/models/star-wand.glb"
                targetSize={3.1}
                tint="#a06bf0"
                camera={[1.6, 0.6, 4.4]}
                tiltDeg={-28}
                autoRotateSpeed={2}
                autoRotate={!reduced}
              />
            </Suspense>
          </div>
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
            Star Wand · drag to spin
          </span>
        </div>
      </div>
    </Section>
  );
};

export default About;
