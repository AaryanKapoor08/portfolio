import React, { Suspense, lazy } from 'react';
import Section from '@/components/ui/Section';

const MidasScene = lazy(() => import('@/components/three/MidasScene'));

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
        <div className="group relative aspect-[4/5] cursor-grab overflow-hidden rounded-2xl border border-border bg-card shadow-lg active:cursor-grabbing">
          {/* Fixed dark display case (same in light + dark) so the gold pops */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(40_45%_16%)] via-[hsl(245_30%_10%)] to-[hsl(222_30%_6%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,hsl(45_85%_55%/0.16),transparent_62%)]" />
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <MidasScene autoRotate={!reduced} />
            </Suspense>
          </div>
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
            Midas · Star Wand · drag to spin
          </span>
        </div>
      </div>
    </Section>
  );
};

export default About;
