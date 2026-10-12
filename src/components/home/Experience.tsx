import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Crown,
  GraduationCap,
  HeartHandshake,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import SupplyDrop from '@/components/ui/SupplyDrop';
import { cn } from '@/lib/utils';
import { rarityClass, type Rarity } from '@/lib/rarity';

const listContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const rewardItem: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const experiences = [
  {
    title: 'Undergraduate Researcher, First Author',
    rarity: 'legendary' as Rarity,
    org: 'University of New Brunswick · Supervisor: Dr. Andrew Fisher',
    date: 'July 2026 - Present',
    link: { to: '/research', label: 'Read about the research' },
    location: 'Fredericton, NB',
    points: [
      'Undergraduate research on whether a multi-step agent pipeline (planner, coder, checker) beats single-prompt generation when a small local LLM writes Arduino firmware, giving both sides the same compiler evidence and attempt limit so the study measures structure, not feedback.',
      'Built the Python research harness that grades firmware by running it in a Wokwi simulator against hidden checks, so a program that prints "LED ON" without ever driving the pin fails.',
    ],
  },
  {
    title: 'Best Student Team Award',
    rarity: 'mythic' as Rarity,
    org: 'Anthropic Halifax Hackathon',
    date: 'September 2026',
    location: 'Halifax, NS',
    points: [
      'Won Best Student Team for ShoreCheck, a beach water-quality dashboard combining official lab samples, a self-scoring rain-based prediction model, and Sentinel-2 satellite monitoring of 43 untested lakes.',
    ],
  },
  {
    title: 'Participant',
    org: 'HackAtlantic 2026',
    rarity: 'rare' as Rarity,
    date: '2026',
    points: [
      'Built Keepline, a company-memory tool that turns Slack, email, and ticket history into versioned, cited facts, flags knowledge held by only one person, and writes handoff packs for departing employees.',
    ],
  },
  {
    title: 'Participant',
    org: 'Dual-Use Technology Hackathon, UNB',
    rarity: 'rare' as Rarity,
    date: 'May 2026',
    location: 'Fredericton, NB',
    points: [
      'Built Fluo in a 48-hour team sprint: a defence procurement workflow using n8n-style automation, vendor risk checks, and a blockchain audit ledger for tamper-evident procurement events.',
    ],
  },
  {
    title: 'Open Source Contributor',
    org: 'GirlScript Summer of Code',
    rarity: 'uncommon' as Rarity,
    date: '2026',
    location: 'Remote',
    points: [
      'Active contributor in a large open-source mentorship program, resolving issues and landing merged pull requests across community-maintained repositories.',
    ],
  },
  {
    title: 'Participant',
    org: 'Fredericton Ideation Boost Camp 2026',
    rarity: 'rare' as Rarity,
    date: 'January 2026',
    location: 'Fredericton, NB',
    points: [
      'Participated in the 48-hour camp to design and pitch Auctus, an AI funding-discovery platform, and ship a working MVP.',
    ],
  },
  {
    title: 'Finalist',
    org: 'Google Developer Groups Hackathon',
    rarity: 'epic' as Rarity,
    date: '2025',
    points: [
      'Reached the finals with MedBuddy, a voice-enabled medication assistant with speech input, spoken responses, and a live medication checklist, built with Next.js, Express, and the Groq API.',
    ],
  },
  {
    title: 'Open Source Contributor',
    org: 'CodeSocial',
    rarity: 'uncommon' as Rarity,
    date: '2025',
    location: 'Remote',
    points: [
      'Contributed to open-source projects through the CodeSocial program, fixing issues and getting pull requests merged.',
    ],
  },
];

const certifications: { name: string; issuer: string; date: string; rarity: Rarity; icon: LucideIcon }[] = [
  { name: 'Best Student Team Award', issuer: 'Anthropic Halifax Hackathon', date: 'Sep 2026', rarity: 'mythic', icon: Crown },
  { name: 'RAG Bootcamp', issuer: 'Udemy', date: 'May 2026', rarity: 'rare', icon: BookOpen },
  { name: 'Oracle GenAI Certified', issuer: 'Oracle', date: 'Nov 2025', rarity: 'epic', icon: BadgeCheck },
  { name: 'Oracle APEX Cloud Developer Certified Professional', issuer: 'Oracle', date: 'Nov 2025', rarity: 'epic', icon: BadgeCheck },
  { name: 'HackFest Hackathon Finalist', issuer: 'GDG Cloud New Delhi', date: 'Nov 2025', rarity: 'epic', icon: Trophy },
];

const XP: Record<Rarity, string> = {
  common: '5,000',
  uncommon: '10,000',
  rare: '25,000',
  epic: '50,000',
  legendary: '80,000',
  mythic: '100,000',
};

// The degree is the "season": its tier tracks how far through it I am today.
const SEASON_START = new Date(2024, 8, 1);
const SEASON_END = new Date(2028, 3, 30);

const seasonProgress = () => {
  const total = SEASON_END.getTime() - SEASON_START.getTime();
  const done = Math.min(Math.max(Date.now() - SEASON_START.getTime(), 0), total);
  return done / total;
};

const SeasonCard: React.FC = () => {
  const progress = seasonProgress();
  const tier = Math.max(1, Math.round(progress * 100));
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="fn-glass mb-10 grid gap-6 rounded-xl p-5 md:grid-cols-[auto_1fr] md:items-center md:p-6"
    >
      <div className="flex items-center gap-4">
        <span className="rarity-legendary fn-tile flex h-16 w-16 shrink-0 items-center justify-center">
          <GraduationCap className="h-8 w-8 text-white drop-shadow" />
        </span>
        <div>
          <p className="fn-italic text-xs text-[#ffe14d]">Current season</p>
          <h3 className="font-title text-2xl leading-tight text-white">University of New Brunswick</h3>
          <p className="text-sm text-white/75">BSc Computer Science (3rd Year) · Sept 2024 – Apr 2028 · Fredericton, NB</p>
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="fn-italic text-lg text-white">
            Tier <span className="text-3xl text-[#ffe14d]">{tier}</span>
            <span className="text-white/50"> / 100</span>
          </span>
          <span className="text-xs text-white/60">{Math.round(progress * 100)}% of the degree done</span>
        </div>
        <div className="fn-xp">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: `${progress * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </div>
        <p className="mt-3 text-sm text-white/70">
          Relevant coursework: Data Structures & Algorithms, Computer Networks, Computer Architecture & Machine
          Language, Java, C, SQL, Statistics, Data Analysis.
        </p>
      </div>
    </motion.div>
  );
};

const Experience: React.FC = () => {
  return (
    <Section id="experience" className="fn-stage">
      <div className="relative mb-12 space-y-4 text-center">
        <SupplyDrop className="pointer-events-none absolute -top-6 right-0 h-20 w-14 md:right-8 md:h-32 md:w-24" />
        <span className="fn-banner px-4 py-1 text-sm">
          <span>Battle Pass</span>
        </span>
        <h2 className="fn-heading font-title text-4xl font-bold md:text-5xl">Experience</h2>
        <p className="mx-auto max-w-2xl text-lg text-white/85">
          Quests completed, rewards unlocked, and the season still in progress.
        </p>
      </div>

      <SeasonCard />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="fn-italic mb-5 text-xl text-white">Quests</h3>
          <motion.div
            className="space-y-5"
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {experiences.map((experience) => {
              const live = experience.date.includes('Present');
              return (
                <motion.div key={experience.org} variants={listItem}>
                  <div
                    className={cn(
                      'fn-glass relative overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1',
                      rarityClass(experience.rarity),
                    )}
                  >
                    <span aria-hidden className="fn-rarity-stripe absolute inset-y-0 left-0 w-1.5" />
                    <div className="p-5 pl-6 md:p-6 md:pl-7">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="fn-italic fn-rarity-text text-xs">{experience.rarity} quest</span>
                        {experience.rarity === 'mythic' && (
                          <span className="fn-banner px-2 py-0.5 text-[11px]">
                            <span>#1 Victory Royale</span>
                          </span>
                        )}
                        <span
                          className={cn(
                            'ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            live ? 'bg-[#ffe14d] text-[#12164a]' : 'bg-white/15 text-white',
                          )}
                        >
                          {live ? (
                            <>
                              <span className="fn-pulse h-1.5 w-1.5 rounded-full bg-[#12164a]" /> In progress
                            </>
                          ) : (
                            <>
                              <Check className="h-3.5 w-3.5" /> Complete
                            </>
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-white/65">
                        {experience.date}
                        {experience.location && ` · ${experience.location}`}
                      </p>
                      <h4 className="font-title text-2xl leading-tight text-white">{experience.title}</h4>
                      <p className="mt-0.5 text-sm font-medium text-white/75">{experience.org}</p>
                      <ul className="mt-4 space-y-2.5">
                        {experience.points.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                            <span className="fn-rarity-stripe mt-2 h-1.5 w-1.5 shrink-0 rotate-45" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        {experience.link ? (
                          <Link
                            to={experience.link.to}
                            className="group inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-[#ffe14d] hover:underline"
                          >
                            {experience.link.label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        ) : (
                          <span />
                        )}
                        <span className="fn-italic text-xs text-white/60">+{XP[experience.rarity]} XP</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Sticky on wide screens so the rewards ride alongside the long quest log. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h3 className="fn-italic mb-5 text-xl text-white">Rewards unlocked</h3>
          <motion.div
            className="space-y-3"
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {certifications.map(({ name, issuer, date, rarity, icon: Icon }) => (
              <motion.div
                key={name}
                variants={rewardItem}
                className={cn('fn-glass flex items-center gap-4 rounded-xl p-3', rarityClass(rarity))}
              >
                <span className="fn-tile flex h-14 w-14 shrink-0 items-center justify-center">
                  <Icon className="h-7 w-7 text-white drop-shadow" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="fn-italic fn-rarity-text text-[11px]">{rarity}</p>
                  <p className="font-title leading-tight text-white">{name}</p>
                  <p className="text-sm text-white/65">{issuer}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white">
                  {date}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <h3 className="fn-italic mb-5 mt-10 text-xl text-white">Volunteer</h3>
          <div className="rarity-uncommon fn-glass flex items-center gap-4 rounded-xl p-3">
            <span className="fn-tile flex h-14 w-14 shrink-0 items-center justify-center">
              <HeartHandshake className="h-7 w-7 text-white drop-shadow" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-title leading-tight text-white">Atlantic AI Summit 2026</p>
              <p className="text-sm text-white/65">
                Supported on-site logistics across keynotes, panels, and workshops for UNB's RIDSAI applied-AI gathering.
              </p>
            </div>
            <span className="shrink-0 self-start whitespace-nowrap rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white">
              Jun 2026
            </span>
          </div>

          <div className="mt-10 hidden justify-center lg:flex">
            <img src="/fortnite-llama-1.svg" alt="" aria-hidden className="fn-bob h-28 w-28" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
