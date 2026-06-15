import React from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Marquee, { type MarqueeItem } from '@/components/ui/Marquee';

interface SkillGroup {
  category: string;
  skills: string[];
}

// Colored, transparent-background brand logos from devicon (jsDelivr CDN).
// Anything not listed here keeps its text chip in the marquee.
const dev = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const LOGOS: Record<string, string> = {
  Python: dev('python'),
  JavaScript: dev('javascript'),
  TypeScript: dev('typescript'),
  Java: dev('java'),
  C: dev('c'),
  'React.js': dev('react'),
  'Next.js': dev('nextjs'),
  'Node.js': dev('nodejs'),
  'Express.js': dev('express'),
  HTML: dev('html5'),
  CSS: dev('css3'),
  'Tailwind CSS': dev('tailwindcss'),
  Supabase: dev('supabase'),
  PostgreSQL: dev('postgresql'),
  MongoDB: dev('mongodb'),
  SQLite: dev('sqlite'),
  Git: dev('git'),
  'GitHub Actions': dev('githubactions'),
  Docker: dev('docker'),
  pytest: dev('pytest'),
  Vitest: dev('vitest'),
  Vite: dev('vitejs'),
  Vercel: dev('vercel'),
  'Chrome Extensions': dev('chrome'),
  Solidity: dev('solidity'),
  Hardhat: dev('hardhat'),
};

const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C'],
  },
  {
    category: 'Frontend & Backend',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS', 'REST APIs'],
  },
  {
    category: 'AI & Retrieval',
    skills: ['RAG fundamentals', 'LangChain', 'LangGraph', 'LangSmith', 'LLM APIs', 'Prompt engineering', 'Provider orchestration', 'BM25'],
  },
  {
    category: 'Databases & Tools',
    skills: ['Supabase', 'PostgreSQL', 'MongoDB', 'SQL', 'SQLite', 'Git', 'GitHub Actions', 'Docker'],
  },
  {
    category: 'Testing & Platforms',
    skills: ['pytest', 'Vitest', 'Vite', 'Vercel', 'Chrome Extensions', 'Solidity', 'Hardhat', 'ethers.js'],
  },
];

// Evenly interleave two lists so the (fewer) text-only chips are spread
// through the logos instead of clustering at the end.
const weave = <T,>(a: T[], b: T[]): T[] => {
  const out: T[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && i / a.length <= j / b.length)) out.push(a[i++]);
    else out.push(b[j++]);
  }
  return out;
};

const allItems: MarqueeItem[] = skillGroups
  .flatMap((g) => g.skills)
  .map((skill) => ({ label: skill, logo: LOGOS[skill] }));

const marqueeItems = weave(
  allItems.filter((it) => typeof it !== 'string' && it.logo),
  allItems.filter((it) => typeof it !== 'string' && !it.logo),
);

const Skills: React.FC = () => {
  return (
    <Section id="skills" className="fn-shop">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground font-title">
          Technical Skills
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tools I use across AI developer tooling, retrieval systems, and full-stack product work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group) => (
          <Card key={group.category} className="bg-card/80">
            <CardHeader>
              <CardTitle className="font-title text-xl font-normal">
              {group.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 md:mt-24 space-y-4">
        <Marquee items={marqueeItems.slice(0, 18)} duration={36} />
        <Marquee items={marqueeItems.slice(18)} duration={30} reverse />
      </div>
    </Section>
  );
};

export default Skills;
