import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { profileLinks } from '@/data/profile';
import { projects } from '@/data/projects';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24 lg:px-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.45)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/10 to-transparent" />
        {/* Soft animated glow behind the headline */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <div className="space-y-5">
          <motion.div variants={item}>
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              Rising third-year UNB CS student
            </Badge>
          </motion.div>
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-foreground">
            Aaryan Kapoor
          </motion.h1>
          <motion.p variants={item} className="text-xl md:text-2xl font-medium text-muted-foreground">
            Full Stack AI Developer
          </motion.p>
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed"
          >
            Building AI developer tools, Chrome extensions, and retrieval-agent systems with TypeScript, Python, React, and LangGraph.
          </motion.p>
        </div>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in Touch
          </Button>
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-center gap-3 pt-2">
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
        </motion.div>

        <motion.div variants={item} className="grid gap-3 pt-4 sm:grid-cols-3">
          {[
            [projects.length.toString(), 'featured projects'],
            ['AI', 'RAG, prompts, agents'],
            ['UNB', 'Computer Science'],
          ].map(([value, label]) => (
            <Card key={label} className="bg-card/70 backdrop-blur transition-colors hover:border-accent/50">
              <CardContent className="p-4">
                <p className="text-2xl font-semibold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
