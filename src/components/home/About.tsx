import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';

const MidasScene = lazy(() => import('@/components/three/MidasScene'));

const PARAGRAPHS = [
  'I am a rising third-year Computer Science student at the University of New Brunswick and an Oracle GenAI Certified developer. I build AI developer tools, Chrome extensions, and retrieval-agent systems.',
  'My work spans TypeScript, Python, React, LangGraph, RAG, and LLM provider orchestration, with shipped open-source projects focused on making model behavior reliable in real workflows.',
];

// Word-by-word fade-in. Continuous stagger across both paragraphs reads as one
// flowing reveal; baseIndex keeps the delay running between paragraphs.
const WordReveal: React.FC<{ text: string; start: boolean; baseIndex: number }> = ({
  text,
  start,
  baseIndex,
}) => (
  <>
    {text.split(' ').map((word, i) => (
      <span
        key={i}
        style={{ transitionDelay: `${(baseIndex + i) * 55}ms` }}
        className={`inline-block transition-all duration-500 ease-out ${
          start ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        {word}&nbsp;
      </span>
    ))}
  </>
);

const About: React.FC = () => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const caseRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  const [revealed, setRevealed] = useState(reduced);

  // Fire the shoot once when the showcase scrolls into view (skip if reduced).
  useEffect(() => {
    if (reduced || !caseRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(caseRef.current);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-[hsl(45_90%_88%)] via-[hsl(245_70%_86%)] to-[hsl(205_75%_85%)] dark:from-[hsl(40_45%_16%)] dark:via-[hsl(245_30%_10%)] dark:to-[hsl(222_30%_6%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,hsl(265_85%_70%/0.22),transparent_62%)] dark:bg-[radial-gradient(circle_at_50%_42%,hsl(45_85%_55%/0.16),transparent_62%)]" />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-title">
            About Me
          </h2>
          <p className="text-lg text-black dark:text-white leading-relaxed">
            <WordReveal text={PARAGRAPHS[0]} start={revealed} baseIndex={0} />
          </p>
          <p className="text-lg text-black dark:text-white leading-relaxed">
            <WordReveal
              text={PARAGRAPHS[1]}
              start={revealed}
              baseIndex={PARAGRAPHS[0].split(' ').length}
            />
          </p>
        </div>
        <div ref={caseRef} className="group relative aspect-[4/5.6] cursor-grab active:cursor-grabbing">
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <MidasScene play={play} onShot={() => setRevealed(true)} />
            </Suspense>
          </div>
          <span className="pointer-events-none absolute right-6 -top-6 text-right text-[11px] font-medium uppercase tracking-[0.15em] text-black/70 dark:text-white/70">
            Midas · drag to spin
          </span>
        </div>
      </div>
    </Section>
  );
};

export default About;
