import React from 'react';
import Section from '@/components/ui/Section';

const About: React.FC = () => {
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
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.18),transparent_28%),linear-gradient(135deg,hsl(var(--muted)),hsl(var(--background)))]" />
          <div className="absolute inset-8 rounded-2xl border border-border/70 bg-background/70 backdrop-blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-border bg-foreground text-4xl font-bold tracking-normal text-background shadow-xl">
              AK
            </div>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Full Stack AI
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
