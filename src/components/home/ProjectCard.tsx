import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Project } from '@/data/projects';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

// ponytail: Minecraft GUI panel styling lives in .mc-* classes (index.css),
// scoped to the projects section only.
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
  const spotlight = useMotionTemplate`radial-gradient(420px circle at calc(${glowX} * 100%) calc(${glowY} * 100%), hsl(var(--accent) / 0.18), transparent 70%)`;

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
      <div className="mc-panel group relative flex h-full flex-col gap-2 p-2">
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Title bar */}
        <div className="mc-titlebar flex items-center justify-between gap-3 px-3 py-2">
          <div className="min-w-0">
            <h3 className="font-title text-xl font-normal leading-tight text-[#1f1f1f] md:text-2xl">
              {project.name}
            </h3>
            <p className="text-xs text-[#3a3a3a]">{project.date}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} GitHub repository`}
                className="mc-btn flex h-8 w-8 items-center justify-center"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live demo`}
                className="mc-btn flex h-8 w-8 items-center justify-center"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Dark "screen" well — description + highlights */}
        <div className="mc-well flex flex-grow flex-col gap-3 p-3">
          <p className="text-sm leading-relaxed text-[#d9d9d9]">{project.description}</p>
          <ul className="space-y-1.5">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm leading-relaxed text-[#bdbdbd]">
                <span className="mt-0.5 text-accent">▸</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 px-1">
          {project.techStack.map((tech) => (
            <span key={tech} className="mc-chip px-2 py-0.5 text-[0.7rem] font-medium">
              {tech}
            </span>
          ))}
        </div>

        {/* Action button */}
        {primaryUrl && (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mc-btn flex items-center justify-center px-3 py-2 text-sm font-medium"
          >
            {project.demoUrl ? 'Live Demo' : 'View Code'}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
