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
            I am a Full Stack AI Developer with a passion for building intelligent, scalable, and 
            user-centric applications. My expertise lies at the intersection of Large Language 
            Models (LLMs) and modern web technologies.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I strive to bridge the gap between complex AI capabilities and seamless user experiences, 
            ensuring that technology serves as a tool for empowerment and efficiency.
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
