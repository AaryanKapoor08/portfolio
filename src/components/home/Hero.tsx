import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24 lg:px-24">
      {/* T008: Animated background texture/gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* T006: Hero content */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Aaryan Kapoor
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Full Stack AI Developer
          </p>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Building intelligent systems and elegant user experiences at the intersection of AI and Web.
          </p>
        </div>

        {/* T007: CTA Buttons & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in Touch
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4">
          <a href="https://github.com/AaryanKapoor08" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <Github className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/aaryan-kapoor-88a007332/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="mailto:aaryan.kapoor@unb.ca" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
