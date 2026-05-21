import React from 'react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { profileLinks } from '@/data/profile';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <Section id="contact" crossSection>
      <Card className="mx-auto max-w-3xl bg-card/80">
        <CardContent className="p-8 text-center md:p-10">
        <div className="space-y-8">
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
          <a href={`mailto:${profileLinks.email}`}>
            <Mail className="mr-2 h-4 w-4" />
            {profileLinks.email}
          </a>
        </Button>

        <div className="flex items-center justify-center gap-3">
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
        </div>
        </div>
        </CardContent>
      </Card>

      <div className="mx-auto mt-20 max-w-5xl border-t border-border pt-8">
        <p className="text-center text-xs text-muted-foreground">
          (c) {new Date().getFullYear()} Aaryan Kapoor. Built with React and Tailwind CSS.
        </p>
      </div>
    </Section>
  );
};

export default Contact;
