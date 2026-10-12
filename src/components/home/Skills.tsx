import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import Section from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { rarityClass, type Rarity } from '@/lib/rarity';

// Colored, transparent-background brand logos from devicon (jsDelivr CDN).
// Anything not listed here gets a lettered tile in the shop instead.
const dev = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const LOGOS: Record<string, string> = {
  Python: dev('python'),
  JavaScript: dev('javascript'),
  TypeScript: dev('typescript'),
  Java: dev('java'),
  Rust: dev('rust'),
  C: dev('c'),
  'React.js': dev('react'),
  'Next.js': dev('nextjs'),
  'Node.js': dev('nodejs'),
  'Express.js': dev('express'),
  FastAPI: dev('fastapi'),
  'Spring Boot': dev('spring'),
  gRPC: dev('grpc'),
  HTML: dev('html5'),
  CSS: dev('css3'),
  'Tailwind CSS': dev('tailwindcss'),
  Supabase: dev('supabase'),
  PostgreSQL: dev('postgresql'),
  MongoDB: dev('mongodb'),
  SQLite: dev('sqlite'),
  Neo4j: dev('neo4j'),
  Kafka: dev('apachekafka'),
  Git: dev('git'),
  'GitHub Actions': dev('githubactions'),
  Docker: dev('docker'),
  Kubernetes: dev('kubernetes'),
  pytest: dev('pytest'),
  Vitest: dev('vitest'),
  Vite: dev('vitejs'),
  Vercel: dev('vercel'),
  'Chrome Extensions': dev('chrome'),
  Solidity: dev('solidity'),
  Hardhat: dev('hardhat'),
};

// Display order pairs groups of similar size on wide screens (12+12, 7+8);
// the odd one out spans the full row.
const skillGroups: { category: string; rarity: Rarity; skills: string[] }[] = [
  {
    category: 'AI & Agents',
    rarity: 'mythic',
    skills: ['LangChain', 'LangGraph', 'LangSmith', 'DSPy', 'Spring AI', 'MCP', 'RAG', 'BM25', 'LLM APIs', 'Ollama', 'Prompt engineering', 'Provider orchestration'],
  },
  {
    category: 'Frontend & Backend',
    rarity: 'epic',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'Spring Boot', 'axum', 'HTML', 'CSS', 'Tailwind CSS', 'REST APIs', 'gRPC'],
  },
  {
    category: 'Programming',
    rarity: 'legendary',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Rust', 'C', 'SQL'],
  },
  {
    category: 'Testing & Platforms',
    rarity: 'uncommon',
    skills: ['pytest', 'Vitest', 'Vite', 'Vercel', 'Chrome Extensions', 'Solidity', 'Hardhat', 'ethers.js'],
  },
  {
    category: 'Databases & Tools',
    rarity: 'rare',
    skills: ['PostgreSQL', 'SQLite', 'MongoDB', 'Supabase', 'Neo4j', 'Kafka', 'Docker', 'Kubernetes', 'Git', 'GitHub Actions'],
  },
];

// Big letters for skills without a logo: "MCP", "LangGraph" -> "LG",
// "Prompt engineering" -> "PE", "REST APIs" -> "REST".
const monogram = (label: string) => {
  const words = label.split(/[s.]+/).filter(Boolean);
  if (/^[A-Z0-9]{2,4}$/.test(words[0])) return words[0];
  if (words.length > 1) return words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  const caps = label.match(/[A-Z]/g) ?? [];
  return caps.length >= 2 ? caps.slice(0, 3).join('') : label.slice(0, 2).toUpperCase();
};

// "Shop refreshes in" — counts down to local midnight, like the real one.
const ShopTimer: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const left = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <span className="fn-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
      <Timer className="h-4 w-4 text-[#ffe14d]" />
      Shop refreshes in{' '}
      <span className="font-mono tabular-nums text-[#ffe14d]">
        {pad(Math.floor(left / 3600))}:{pad(Math.floor((left % 3600) / 60))}:{pad(left % 60)}
      </span>
    </span>
  );
};

const ShopTile: React.FC<{ label: string }> = ({ label }) => {
  const logo = LOGOS[label];
  return (
    <div className="fn-tile flex aspect-square flex-col">
      <div className="flex flex-1 items-center justify-center p-2">
        {logo ? (
          <img
            src={logo}
            alt=""
            loading="lazy"
            className="h-9 w-9 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] md:h-10 md:w-10"
          />
        ) : (
          <span className="fn-italic text-xl text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.35)] md:text-2xl">
            {monogram(label)}
          </span>
        )}
      </div>
      <span className="fn-italic line-clamp-2 bg-black/55 px-1 py-1 text-center text-[11px] leading-tight text-white">
        {label}
      </span>
    </div>
  );
};
const Skills: React.FC = () => {
  return (
    <Section id="skills" className="fn-stage">
      <div className="relative mb-12 space-y-4 text-center">
        <img
          src="/fortnite-llama-2.svg"
          alt=""
          aria-hidden
          className="fn-bob pointer-events-none absolute -top-4 right-0 h-14 w-14 md:right-6 md:h-24 md:w-24"
        />
        <span className="fn-banner px-4 py-1 text-sm">
          <span>Item Shop</span>
        </span>
        <h2 className="fn-heading font-title text-4xl font-bold md:text-5xl">Technical Skills</h2>
        <p className="mx-auto max-w-2xl text-lg text-white/85">
          Tools I use across AI developer tooling, retrieval systems, and full-stack product work.
        </p>
        <ShopTimer />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (gi % 2) * 0.08 }}
            className={cn(
              'fn-glass rounded-xl p-4 md:p-5',
              rarityClass(group.rarity),
              gi === skillGroups.length - 1 && skillGroups.length % 2 === 1 && 'lg:col-span-2',
            )}
          >
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="fn-italic fn-rarity-text text-xs">{group.rarity}</p>
                <h3 className="font-title text-2xl leading-tight text-white">{group.category}</h3>
              </div>
              <span className="text-xs text-white/60">{group.skills.length} items</span>
            </div>
            <div
              className={cn(
                'grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:gap-3',
                gi === skillGroups.length - 1 && skillGroups.length % 2 === 1 && 'lg:grid-cols-10',
              )}
            >
              {group.skills.map((skill) => (
                <ShopTile key={skill} label={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
