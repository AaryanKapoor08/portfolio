import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { profileLinks } from '@/data/profile';
import { projects } from '@/data/projects';
import { Github, Linkedin, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24 lg:px-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.45)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/10 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-5">
          <Badge variant="secondary" className="gap-2 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            UNB CS student building AI products
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Aaryan Kapoor
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground">
            Full Stack AI Developer
          </p>
          <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Building intelligent systems and elegant user experiences at the intersection of AI and Web.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in Touch
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
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

        <div className="grid gap-3 pt-4 sm:grid-cols-3">
          {[
            [projects.length.toString(), 'public project repos'],
            ['AI', 'RAG, prompts, agents'],
            ['UNB', 'Computer Science'],
          ].map(([value, label]) => (
            <Card key={label} className="bg-card/70 backdrop-blur">
              <CardContent className="p-4">
                <p className="text-2xl font-semibold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
