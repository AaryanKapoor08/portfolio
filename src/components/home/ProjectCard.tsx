import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const primaryUrl = project.demoUrl ?? project.githubUrl;

  // Pointer-driven 3D tilt + spotlight position.
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const glowX = useMotionTemplate`${useSpring(px, { stiffness: 150, damping: 20 })}`;
  const glowY = useMotionTemplate`${useSpring(py, { stiffness: 150, damping: 20 })}`;
  const spotlight = useMotionTemplate`radial-gradient(420px circle at calc(${glowX} * 100%) calc(${glowY} * 100%), hsl(var(--accent) / 0.14), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    px.set(relX);
    py.set(relY);
    rotateY.set((relX - 0.5) * 8);
    rotateX.set((0.5 - relY) * 8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="h-full [transform-style:preserve-3d]"
    >
    <Card className="group relative flex h-full flex-col overflow-hidden bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl">
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold group-hover:text-accent transition-colors">
              {project.name}
            </CardTitle>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {project.date}
            </p>
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button variant="secondary" size="icon" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} GitHub repository`}>
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="secondary" size="icon" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} live demo`}>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <ul className="space-y-2 pt-2">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              {highlight}
            </li>
          ))}
        </ul>
      </CardContent>

      {primaryUrl && (
        <CardFooter>
          <Button variant={project.demoUrl ? 'default' : 'outline'} size="sm" className="w-full" asChild>
            <a href={primaryUrl} target="_blank" rel="noopener noreferrer">
              {project.demoUrl ? 'Live Demo' : 'View Code'}
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
    </motion.div>
  );
};

export default ProjectCard;
