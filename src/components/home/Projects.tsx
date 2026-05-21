import React from 'react';
import Section from '@/components/ui/Section';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const Projects: React.FC = () => {
  return (
    <Section id="projects" crossSection>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Featured Projects
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A curated view of AI tools, full-stack apps, hackathon builds, and developer experiments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;
