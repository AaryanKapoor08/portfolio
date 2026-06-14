import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profileLinks } from '@/data/profile';
import { Button } from '@/components/ui/button';

const BUILT_WITH = ['React', 'TypeScript', 'Tailwind', 'Three.js', 'Framer Motion', 'shadcn/ui'];

const Footer: React.FC = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-muted/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
        <div className="flex flex-col items-center gap-8 text-center">
          <button
            onClick={scrollTop}
            className="bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text text-2xl font-bold text-transparent animate-aurora"
          >
            Aaryan Kapoor
          </button>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <a href={profileLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={profileLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`mailto:${profileLinks.email}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Built with</span>
            {BUILT_WITH.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Aaryan Kapoor</span>
            <button onClick={scrollTop} className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
