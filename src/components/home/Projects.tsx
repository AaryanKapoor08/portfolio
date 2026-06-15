import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import ProjectCard from './ProjectCard';
import { projects, type ProjectCategory } from '@/data/projects';
import { cn } from '@/lib/utils';

type Filter = 'All' | ProjectCategory;

const FILTERS: Filter[] = ['All', 'AI Agents', 'RAG', 'Full-Stack', 'Dev Tools'];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Section id="projects" crossSection>
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground font-title">
          Featured Projects
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A curated view of AI tools, full-stack apps, hackathon builds, and developer experiments.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                active ? 'text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {f}
              <span className={cn('ml-1.5 text-xs', active ? 'opacity-80' : 'opacity-60')}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
};

export default Projects;
