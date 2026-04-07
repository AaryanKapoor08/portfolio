import React from 'react';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative flex flex-col h-full p-6 rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/50">
      <div className="flex-grow space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <div className="flex gap-2">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        <ul className="space-y-2 pt-2">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button variant="outline" size="sm" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors" asChild>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
