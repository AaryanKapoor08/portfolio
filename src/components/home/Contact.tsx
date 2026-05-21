import React from 'react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <Section id="contact" crossSection>
      <div className="mx-auto max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am always open to interesting conversations, collaborations, and opportunities.
            Reach out if you want to build something useful with AI and the web.
          </p>
        </div>

        <Button size="lg" asChild>
          <a href="mailto:aaryan.kapoor@unb.ca">
            <Mail className="mr-2 h-4 w-4" />
            aaryan.kapoor@unb.ca
          </a>
        </Button>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/AaryanKapoor08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/aaryan-kapoor-88a007332/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-5xl border-t border-border pt-8">
        <p className="text-center text-xs text-muted-foreground">
          (c) {new Date().getFullYear()} Aaryan Kapoor. Built with React and Tailwind CSS.
        </p>
      </div>
    </Section>
  );
};

export default Contact;
