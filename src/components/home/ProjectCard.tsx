import React from 'react';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-2xl font-bold group-hover:text-accent transition-colors">
            {project.name}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} GitHub repository`}>
                <Github className="h-4 w-4" />
              </a>
            </Button>
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

      <CardFooter>
        <Button variant={project.demoUrl ? 'default' : 'outline'} size="sm" className="w-full" asChild>
          <a href={project.demoUrl ?? project.githubUrl} target="_blank" rel="noopener noreferrer">
            {project.demoUrl ? 'Live Demo' : 'View Code'}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
