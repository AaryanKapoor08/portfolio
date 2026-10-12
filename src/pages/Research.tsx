import React, { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Cpu,
  Download,
  Lock,
  Mail,
  RefreshCw,
  WifiOff,
  Wallet,
  X,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MinecraftSky from '@/components/three/MinecraftSky';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { profileLinks } from '@/data/profile';
import { cn } from '@/lib/utils';

/* ---------------------------------------------------------------------------
   Content
--------------------------------------------------------------------------- */

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'setups', label: 'Setups' },
  { id: 'tasks', label: 'Task Suite' },
  { id: 'judging', label: 'Judging' },
  { id: 'testing', label: 'Testing' },
  { id: 'fairness', label: 'Fairness' },
  { id: 'determinism', label: 'Determinism' },
  { id: 'audit', label: 'Audit' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'progress', label: 'Progress' },
];

const HOTBAR = [
  { value: '46', label: 'hand-built tasks' },
  { value: '5', label: 'setups compared' },
  { value: '59K', label: 'lines of Python' },
  { value: '900+', label: 'tests' },
  { value: '4', label: 'attempts per run' },
  { value: '0', label: 'LLM judges' },
];

const WHY_LOCAL = [
  { icon: Lock, title: 'Private', text: 'Hardware teams often cannot send proprietary designs and firmware to a cloud API.' },
  { icon: WifiOff, title: 'Offline', text: 'The model runs on the team’s own machine, with no network dependency.' },
  { icon: Wallet, title: 'Cheap', text: 'Once the GPU is there, each call costs almost nothing.' },
  { icon: RefreshCw, title: 'Reproducible', text: 'Pinned weights and seeded sampling give byte-identical outputs.' },
];

const SETUPS = [
  {
    code: 'A',
    name: 'Single agent',
    phase: 'Phase 1 · local',
    text: 'The whole task in one prompt. On failure it retries with the same execution feedback every setup gets.',
  },
  {
    code: 'A-rich',
    name: 'Knowledge-matched control',
    phase: 'Phase 1 · local',
    text: 'Prompt A plus the background facts the multi-agent setup builds up, in a single call. Word-for-word identical to A apart from that block, so knowledge is never mistaken for structure.',
  },
  {
    code: 'B',
    name: 'Multi-agent',
    phase: 'Phase 1 · local · headline',
    text: 'Four stages: a spec check that asks whether the task is even complete, a planner, a coder, and a checker that reads the execution evidence and says what to fix.',
    headline: true,
  },
  {
    code: 'C',
    name: 'Hybrid escalation',
    phase: 'Phase 2 · optional',
    text: 'Starts as A. After two failures, a cloud model attempts the repair, which tests when a task should escalate to a bigger model.',
  },
  {
    code: 'D',
    name: 'Cloud only',
    phase: 'Phase 2 · optional',
    text: 'A cloud model writes the code in one go. A reference point, not the comparison.',
  },
];

const PIPELINE = [
  'Config and task files are loaded and hashed, locking their identity for the run.',
  'The schedule is generated in a seeded order, hashed and written to disk before anything executes, so it can’t be reordered later for a nicer answer.',
  'A run state machine takes over. Its orchestration policy is the only place the setups differ.',
  'Prompts are built from prompt files that are themselves hashed, since the prompt is part of what is being tested.',
  'Every request and response is stored exactly as sent and received.',
  'Compiling, linting, simulating and scoring run through the same code for every setup. Two pipelines would drift apart, and drift looks exactly like a real effect.',
];

type TaskKind = 'spec' | 'ask' | 'refuse' | 'dev';

const TASK_KINDS: { kind: TaskKind; count: number; label: string; text: string; color: string }[] = [
  { kind: 'spec', count: 25, label: 'Fully specified', text: 'Everything needed is in the prompt.', color: '#5d9c37' },
  { kind: 'ask', count: 8, label: 'Underspecified', text: 'One hardware fact is withheld. The right move is to ask; a scripted answer bank replies.', color: '#fcdb3f' },
  { kind: 'refuse', count: 4, label: 'Impossible', text: 'The right move is to refuse, and give the right reason.', color: '#c8352b' },
  { kind: 'dev', count: 9, label: 'Held out', text: 'Used only for prompt tuning and model qualification. Never in results.', color: '#5fd3dd' },
];

const TASK_FILES = [
  { file: 'task.yaml', text: 'The spec the model sees.' },
  { file: 'diagram.json', text: 'The circuit.' },
  { file: 'scenario.yaml', text: 'The script that presses buttons and turns analog inputs.' },
  { file: 'expect.yaml', text: 'Serial assertions (diagnostic tier).' },
  { file: 'expect_plus.yaml', text: 'Waveform assertions. These decide success and are never shown to the model.' },
  { file: 'gold/gold.ino', text: 'A reference solution that proves the task is solvable and sets its timeout.' },
];

const JUDGE_STEPS = [
  { step: 'Extract', text: 'Pull the code out of the reply into its own workspace.' },
  { step: 'Compile', text: 'Fixed Arduino CLI and AVR core, checksum-verified.' },
  { step: 'Simulate', text: 'Run in Wokwi under a script that presses buttons and turns knobs.' },
  { step: 'Trace', text: 'Record the voltage on every digital pin over time.' },
  { step: 'Score', text: 'Check pulse widths, edge counts and timing windows written in advance.' },
  { step: 'Feedback', text: 'Compiler errors and what the hardware actually did. Never the expected answer.' },
];

const TESTING = [
  {
    title: 'Harness test suite',
    text: '813 test functions (about 940 test cases), plus ruff, mypy and a task-suite validator. The suite more than doubled during September alone.',
  },
  {
    title: 'Offline CI gates',
    text: 'GitHub Actions with pinned actions, checksum-verified toolchains, read-only permissions and no research credentials. Every check runs without touching a model.',
  },
  {
    title: 'End-to-end rehearsal',
    text: 'A loopback server stands in for the model and replies with each task’s own gold firmware, through the real compiler, simulator and scorer. Every run must succeed, so any failure is a harness bug, never a model one.',
  },
  {
    title: 'Rehearsals can’t pass as data',
    text: 'Rehearsal evidence carries a REHEARSAL marker, has no model provenance and cannot pass strict preflight.',
  },
  {
    title: 'Clarification recall',
    text: 'Only some setups ask questions by design, so the scripted answer bank is tested on correctly phrased questions. If it rejected reasonable ones, it would quietly penalise one side.',
  },
  {
    title: 'Bias regression tests',
    text: 'A tie-break bug once favoured the model where the multi-agent setup looked better. It is fixed, and a test now fails if it ever comes back.',
  },
];

const FAIRNESS = [
  'Every setup gets the same evidence, the same attempt limit and the same timeout, calculated from the measured generation speed.',
  'Planning calls cost tokens but don’t use up an attempt. A wall-clock limit would cut the multi-agent setup off earlier, landing right on the thing being measured.',
  'The single-agent prompt and its control are word-for-word identical apart from the knowledge block.',
  'Every setup gets the same logged prompt-writing effort: five tuning passes each, in a fixed rotating order, on held-out tasks only, with the log checked against file hashes.',
  'Model selection looks only at the single-agent setup, never at multi-agent results, so the model can’t be picked to flatter the hypothesis.',
  'The model is never told whether it passed. Otherwise only the staged setup could decide to stop on its own, and the study would measure when it chose to quit.',
  'If the multi-agent setup’s own notes overflow the context, that run is excluded rather than re-run, so it never gets a second roll.',
  'Every time evidence is truncated to fit, it’s counted per setup, so a hidden disadvantage shows up in the report.',
];

const DETERMINISM = [
  'No LLM-as-a-judge anywhere. Grading is a deterministic oracle, so the same program always gets the same verdict.',
  'Model weights are pinned by SHA-256 and the llama.cpp build is pinned to a commit.',
  'Sampling settings are frozen and read back from the running server, not assumed.',
  'Before a model can be used, the server must return byte-identical output when the same seeded request is sent twice.',
  'A job won’t start if the GPU driver, model file or llama.cpp build has changed.',
  'Every dependency is hash-locked; Arduino CLI, the Wokwi CLI and the AVR core are pinned and checksum-verified in CI.',
  'Model identity is probed from the published repository index (exact size, LFS SHA-256, commit, chat template) without downloading or running anything.',
];

const GUARANTEES = [
  'Every intended action is written down before it happens, so a crash can never hide an external call that already went out.',
  'Raw requests, responses, token counts, serial output and traces are stored unchanged and addressed by content.',
  'The model’s files, the grader’s files and the reference solutions live in separate directories, so answers can’t leak through the filesystem.',
  'Visible and hidden check results are never merged, and only hidden checks can end an attempt successfully.',
  'An ambiguous failure is never silently retried. Only pre-declared infrastructure failures can be re-run, and every superseded attempt is still reported.',
  'The worst-case cloud cost is set aside before an item starts.',
];

const STACK = [
  { name: 'Python 3.11', role: 'The whole harness, about 59K lines, with no agent framework on purpose.' },
  { name: 'llama.cpp', role: 'Local inference server, pinned to a commit.' },
  { name: 'GGUF 4-bit', role: 'Official quantized weights, SHA-256 pinned.' },
  { name: 'NVIDIA L40S', role: 'GPU node the open-weight models run on.' },
  { name: 'Arduino CLI', role: 'v1.5.1 with the arduino:avr 1.8.8 core. A fixed toolchain.' },
  { name: 'Wokwi CLI', role: 'v0.26.1. Pin-level simulation of an Arduino Uno.' },
  { name: 'Evidence store', role: 'Immutable JSON plus a content-addressed blob store: the real record.' },
  { name: 'SQLite', role: 'A query projection, rebuilt from the evidence files on demand.' },
  { name: 'pytest · mypy · ruff', role: 'Tests, type checks and linting on every change.' },
  { name: 'GitHub Actions', role: 'Offline gates with pinned actions and verified tool checksums.' },
  { name: 'Hugging Face', role: 'Model provenance probe and router provider for hosted models.' },
  { name: 'Hash-locked deps', role: 'requirements.lock pins every dependency, direct and transitive.' },
];

const DONE = [
  { title: 'Pipeline runs end to end', text: 'Every stage from schedule to analysis, on real tools.' },
  { title: 'Judge validated', text: '16 canary programs, every cheat caught.' },
  { title: 'Task suite finished', text: '46 tasks lint and compile; 33 reference solutions pass both tiers live.' },
  { title: 'Self-audit complete', text: '13 issues found, all 7 bias risks fixed with tests.' },
  { title: 'Reproducible by construction', text: '149 evaluations re-scored offline, 0 verdicts changed.' },
];

const NEXT = [
  { title: 'Measure token throughput', text: 'Real generation speed on the GPU node; every timeout scales from it.' },
  { title: 'Qualify the models', text: 'Ministral 3 14B vs Gemma 4 12B on held-out tasks, with limits written before results.' },
  { title: 'Tune, then freeze', text: 'Five logged prompt passes per setup, then tasks, prompts, tools and models are frozen.' },
  { title: 'Phase 1 collection', text: 'A, A-rich and B on the local model.' },
  { title: 'Phase 2 (optional)', text: 'The cloud conditions, C and D.' },
];

const OPEN_QUESTIONS = [
  'Is 37 tasks enough? The suite reliably detects a gap of about 25 points but not 15, so either add tasks or state that bound up front.',
  'The multi-agent setup can ask or refuse before writing code, which spends its budget on solvable tasks and helps on impossible ones. Is that part of the structure, or something to correct for?',
  'A scripted answer bank replies to questions today. Should a later phase put a real human at that checkpoint?',
];

/* ---------------------------------------------------------------------------
   Building blocks
--------------------------------------------------------------------------- */

type Tile = 'dirt' | 'stone' | 'deepslate' | 'bedrock';

interface LayerProps {
  id: string;
  index: number;
  y: number;
  tile: Tile;
  shade?: number;
  grass?: boolean;
  title: string;
  lead: string;
  children: ReactNode;
}

// One terrain layer of the dig: a full-width band with its own tile and depth
// readout, the way the F3 screen shows your Y level.
const Layer: React.FC<LayerProps> = ({ id, index, y, tile, shade = 0, grass, title, lead, children }) => (
  <section
    id={id}
    className={cn('mc-layer scroll-mt-16', `mc-layer--${tile}`, grass && 'mc-layer--grass')}
    style={{ '--shade': shade } as React.CSSProperties}
  >
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-10 space-y-3"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="mc-chip px-2 py-0.5 font-mono text-xs">
            {String(index).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
          </span>
          <span className="mc-chip px-2 py-0.5 font-mono text-xs">Y: {y}</span>
        </div>
        <h2 className="mc-heading font-title text-4xl md:text-5xl">{title}</h2>
        <p className="mc-subtext max-w-3xl text-base leading-relaxed md:text-lg">{lead}</p>
      </motion.header>
      {children}
    </div>
  </section>
);

interface PanelProps {
  title?: string;
  meta?: string;
  className?: string;
  bodyClassName?: string;
  dark?: boolean;
  children: ReactNode;
}

// The Featured Projects GUI panel: light bevelled frame, raised title bar and
// either a dark "screen" well or a light body.
const Panel: React.FC<PanelProps> = ({ title, meta, className, bodyClassName, dark = true, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    className={cn('mc-panel flex flex-col gap-2 p-2', className)}
  >
    {title && (
      <div className="mc-titlebar flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-3 py-2">
        <h3 className="font-title text-xl font-normal leading-tight text-[#1f1f1f] md:text-2xl">{title}</h3>
        {meta && <span className="text-xs text-[#3a3a3a]">{meta}</span>}
      </div>
    )}
    <div
      className={cn(
        'flex-grow p-4',
        dark ? 'mc-well text-[#d9d9d9]' : 'text-[#2a2a2a]',
        bodyClassName,
      )}
    >
      {children}
    </div>
  </motion.div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[#cfcfcf]">
        <span className="mt-0.5 text-accent">▸</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Stat: React.FC<{ value: string; label: string; tone?: string }> = ({ value, label, tone = '#ffffff' }) => (
  <div className="mc-slot flex flex-col items-center justify-center gap-1 px-2 py-3 text-center">
    <span className="mc-heading font-title text-3xl leading-none" style={{ color: tone }}>
      {value}
    </span>
    <span className="text-[0.7rem] font-medium uppercase tracking-wide text-[#1f1f1f]">{label}</span>
  </div>
);

/* ---------------------------------------------------------------------------
   Page
--------------------------------------------------------------------------- */

const Research: React.FC = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Research · Aaryan Kapoor';
    return () => {
      document.title = previous;
    };
  }, []);

  const taskBlocks = TASK_KINDS.flatMap((k) => Array.from({ length: k.count }, () => k));

  return (
    <Layout>
      <ScrollProgress />
      <Navbar />

      {/* ── Sky / title ───────────────────────────────────────────────── */}
      <header className="relative overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-20 md:pt-40">
        <MinecraftSky className="z-0" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/60 sm:text-sm sm:tracking-[0.3em]">
              Undergraduate research · University of New Brunswick
            </p>
            <h1 className="font-title text-[2.6rem] font-bold leading-[1.05] text-foreground sm:text-5xl md:text-7xl">
              Embedded LLM Research Harness
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              If you split a small, local language model into planner, coder and checker agents, does it write
              better Arduino firmware than the same model given a single prompt? I’m building the study that
              answers that cleanly, so the only thing being compared is the structure.
            </p>
            <dl className="grid max-w-3xl gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {[
                ['Role', 'First Author & Lead Researcher'],
                ['Supervisor', 'Dr. Andrew Fisher'],
                ['Where', 'UNB, Fredericton, NB'],
                ['When', 'July 2026 – Present'],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="w-24 shrink-0 text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#overview" className="mc-btn inline-flex items-center px-4 py-2 text-sm font-medium">
                Start digging ↓
              </a>
              <a
                href={profileLinks.resume}
                download="Aaryan_Kapoor_Resume.pdf"
                className="mc-btn inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </motion.div>

          {/* Hotbar of headline numbers */}
          <div className="mc-panel mt-12 grid grid-cols-3 gap-1.5 p-2 sm:grid-cols-6">
            {HOTBAR.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>

          {/* Contents */}
          <nav aria-label="Research sections" className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="mc-btn px-3 py-2 text-xs font-medium">
                <span className="mr-1 font-mono opacity-60">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mc-strata">
        {/* ── 01 Overview ─────────────────────────────────────────────── */}
        <Layer
          id="overview"
          index={1}
          y={64}
          tile="dirt"
          grass
          title="Overview"
          lead="Most comparisons of agent pipelines change two things at once. This one changes only how the work is organised."
        >
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Panel title="The question" meta="B vs A, same model">
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  In the usual comparison, the multi-agent side gets to see compiler errors and test output while
                  the single-prompt side doesn’t. The result then measures the extra feedback, not the split.
                </p>
                <p>
                  Here both sides run the <span className="text-white">same local model with the same settings</span>,
                  get the same evidence, the same four attempts and the same timeout. Whatever difference remains
                  comes from structure alone.
                </p>
                <p>Beyond the headline number, the study looks at where small models break:</p>
                <Bullets
                  items={[
                    'which kinds of hardware mistakes they keep making;',
                    'when they should ask for a missing fact instead of guessing;',
                    'when a task genuinely needs to escalate to a larger model.',
                  ]}
                />
              </div>
            </Panel>

            <Panel title="Why small local models" dark={false}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {WHY_LOCAL.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center">
                      <Icon className="h-5 w-5 text-[#1f1f1f]" />
                    </span>
                    <div>
                      <p className="font-title text-lg leading-tight text-[#1f1f1f]">{title}</p>
                      <p className="text-sm leading-snug text-[#3a3a3a]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </Layer>

        {/* ── 02 Setups ───────────────────────────────────────────────── */}
        <Layer
          id="setups"
          index={2}
          y={56}
          tile="dirt"
          shade={0.15}
          title="Five setups, one pipeline"
          lead="Phase 1 compares three setups on the local model. The cloud conditions are an optional Phase 2. The comparison that matters is B against A."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SETUPS.map((s) => (
              <Panel
                key={s.code}
                title={`${s.code} · ${s.name}`}
                meta={s.phase}
                className={cn(s.headline && 'outline outline-4 outline-[#fcdb3f]')}
              >
                <p className="text-sm leading-relaxed">{s.text}</p>
              </Panel>
            ))}
            <Panel title="Headline" meta="pre-registered" dark={false} className="sm:col-span-2 lg:col-span-1">
              <p className="font-title text-3xl leading-tight text-[#1f1f1f]">B − A</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a]">
                Same local model, same settings, a fixed four-attempt limit. Every other setup is a reference point.
              </p>
            </Panel>
          </div>

          <Panel title="One pipeline, two policies" meta="how a run executes" className="mt-6">
            <ol className="grid gap-3 md:grid-cols-2">
              {PIPELINE.map((text, i) => (
                <li key={text} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mc-chip flex h-6 w-6 shrink-0 items-center justify-center font-mono text-xs">
                    {i + 1}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </Layer>

        {/* ── 03 Task Suite ───────────────────────────────────────────── */}
        <Layer
          id="tasks"
          index={3}
          y={40}
          tile="stone"
          title="Task suite"
          lead="46 Arduino Uno tasks, written by hand. 37 are in the main study and 9 are held out, so results are never measured on tasks the prompts were tuned on."
        >
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Panel title="46 tasks, one block each" meta="25 · 8 · 4 · 9">
              <motion.div
                className="grid grid-cols-[repeat(auto-fill,minmax(1.5rem,1fr))] gap-1"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.015 } } }}
              >
                {taskBlocks.map((k, i) => (
                  <motion.span
                    key={i}
                    title={k.label}
                    variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } }}
                    className="aspect-square"
                    style={{
                      backgroundColor: k.color,
                      boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.35), inset -2px -2px 0 rgba(0,0,0,0.35)',
                    }}
                  />
                ))}
              </motion.div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {TASK_KINDS.map((k) => (
                  <li key={k.kind} className="flex items-start gap-3">
                    <span
                      className="mt-1 h-4 w-4 shrink-0"
                      style={{ backgroundColor: k.color, boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.35)' }}
                    />
                    <div className="text-sm leading-snug">
                      <p className="text-white">
                        <span className="font-title text-lg">{k.count}</span> {k.label}
                      </p>
                      <p className="text-[#bdbdbd]">{k.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Six files per task" meta="all feed its identity hash">
              <ul className="space-y-3">
                {TASK_FILES.map((f) => (
                  <li key={f.file} className="text-sm leading-snug">
                    <code className="mc-chip px-1.5 py-0.5 font-mono text-xs">{f.file}</code>
                    <p className="mt-1 text-[#cfcfcf]">{f.text}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Layer>

        {/* ── 04 Judging ──────────────────────────────────────────────── */}
        <Layer
          id="judging"
          index={4}
          y={24}
          tile="stone"
          shade={0.12}
          title="How a program is judged"
          lead="Generated firmware can print exactly the right thing to the serial monitor while doing nothing to the hardware. So the grade comes from the pins, not the printout."
        >
          <Panel title="From reply to verdict" meta="no LLM-as-a-judge">
            <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
              {JUDGE_STEPS.map((s, i) => (
                <li key={s.step} className="relative flex flex-col gap-1 bg-[#2b2b2b] p-3">
                  <span className="font-mono text-xs text-[#8a8a8a]">STEP {i + 1}</span>
                  <span className="font-title text-lg leading-tight text-white">{s.step}</span>
                  <span className="text-xs leading-snug text-[#bdbdbd]">{s.text}</span>
                  {i < JUDGE_STEPS.length - 1 && (
                    <span aria-hidden className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-[#fcdb3f] lg:block">
                      ▶
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Panel>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Panel title="Tier 1 · Serial" meta="diagnostic only" dark={false}>
              <p className="text-sm leading-relaxed text-[#2a2a2a]">
                Checks printed output. Kept for diagnosis and to decide whether feedback is returned, but it can
                never end an attempt successfully.
              </p>
            </Panel>
            <Panel title="Tier 2 · Waveform" meta="decides success" dark={false} className="outline outline-4 outline-[#5d9c37]">
              <p className="text-sm leading-relaxed text-[#2a2a2a]">
                Checks the pin trace against hidden conditions. The only thing that counts as a pass, and its file
                is never shown to the model. Printing <code className="font-mono">LED ON</code> without ever driving
                the pin fails: specification gaming is caught by construction.
              </p>
            </Panel>
          </div>
        </Layer>

        {/* ── 05 Testing ──────────────────────────────────────────────── */}
        <Layer
          id="testing"
          index={5}
          y={12}
          tile="stone"
          shade={0.25}
          title="Testing"
          lead="Before trusting the judge, I tried to fool it. Before trusting the harness, I ran it against answers I already knew were right."
        >
          <Panel title="Canary gate: testing the judge" meta="16 hand-written programs">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 font-title text-lg text-white">8 correct programs</p>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} className="mc-slot flex aspect-square items-center justify-center">
                      <Check className="h-4 w-4 text-[#2f7a1f]" strokeWidth={3} />
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-[#bdbdbd]">Passed both tiers, as they should.</p>
              </div>
              <div>
                <p className="mb-2 font-title text-lg text-white">8 cheating programs</p>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i} className="mc-slot flex aspect-square items-center justify-center">
                      <X className="h-4 w-4 text-[#a1261d]" strokeWidth={3} />
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-sm text-[#bdbdbd]">
                  Output only, wrong pin, wrong timing. All passed the serial tier and all failed the waveform tier.
                  Every cheat was caught.
                </p>
              </div>
            </div>
          </Panel>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TESTING.map((t) => (
              <Panel key={t.title} title={t.title}>
                <p className="text-sm leading-relaxed">{t.text}</p>
              </Panel>
            ))}
          </div>
        </Layer>

        {/* ── 06 Fairness ─────────────────────────────────────────────── */}
        <Layer
          id="fairness"
          index={6}
          y={0}
          tile="deepslate"
          title="Fairness"
          lead="The only difference between the setups should be how the work is organised. Every rule below closes a way one side could quietly get an edge."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {FAIRNESS.map((text, i) => (
              <Panel key={text} title={`Rule ${i + 1}`}>
                <p className="text-sm leading-relaxed">{text}</p>
              </Panel>
            ))}
          </div>
        </Layer>

        {/* ── 07 Determinism ──────────────────────────────────────────── */}
        <Layer
          id="determinism"
          index={7}
          y={-16}
          tile="deepslate"
          shade={0.15}
          title="Determinism"
          lead="The same run should always give the same answer, and anyone should be able to check that without calling a model."
        >
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Panel title="Pinned, frozen, verified" meta="byte for byte">
              <Bullets items={DETERMINISM} />
            </Panel>
            <div className="grid gap-6">
              <Panel title="Offline re-score" dark={false}>
                <p className="text-sm leading-relaxed text-[#2a2a2a]">
                  Every request and response is stored exactly, so the whole study can be re-scored from saved
                  evidence alone, with no model, compiler or simulator. A scoring bug found later costs nothing to fix.
                </p>
              </Panel>
              <div className="mc-panel grid grid-cols-2 gap-1.5 p-2">
                <Stat value="149" label="evaluations re-scored" />
                <Stat value="0" label="verdicts changed" tone="#7fd35a" />
              </div>
            </div>
          </div>
        </Layer>

        {/* ── 08 Audit ────────────────────────────────────────────────── */}
        <Layer
          id="audit"
          index={8}
          y={-32}
          tile="deepslate"
          shade={0.3}
          title="Audit"
          lead="I reviewed every module looking for ways the measurement could be wrong without anything crashing."
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="grid gap-6">
              <div className="mc-panel grid grid-cols-3 gap-1.5 p-2">
                <Stat value="13" label="issues found" />
                <Stat value="7" label="could bias results" tone="#fcdb3f" />
                <Stat value="7/7" label="fixed with tests" tone="#7fd35a" />
              </div>
              <Panel title="The worst one">
                <p className="text-sm leading-relaxed">
                  Serial output the model controls could make a run look like an infrastructure failure, which
                  would have dropped the task from the analysis. Fixed, with a test.
                </p>
              </Panel>
              <Panel title="Task repairs">
                <p className="text-sm leading-relaxed">
                  Probes showed the missing fact in three underspecified tasks could be guessed, so they no longer
                  tested asking. All three were repaired, and stay marked unverified until a simulator confirms them.
                </p>
              </Panel>
            </div>
            <Panel title="Enforced in code" meta="not left to whoever runs it">
              <Bullets items={GUARANTEES} />
            </Panel>
          </div>
        </Layer>

        {/* ── 09 Analysis ─────────────────────────────────────────────── */}
        <Layer
          id="analysis"
          index={9}
          y={-44}
          tile="deepslate"
          shade={0.45}
          title="Analysis"
          lead="The analysis is fixed before any data is collected, and its limits are stated before anyone quotes a number."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Statistical power" meta="Monte Carlo, 37 tasks">
              <p className="mb-4 text-sm leading-relaxed">
                How often would a real difference between the setups show up as significant?
              </p>
              {[
                { gap: '25-point gap', pct: 84, note: 'e.g. 50% vs 75%' },
                { gap: '15-point gap', pct: 47, note: 'roughly a coin flip' },
              ].map((p) => (
                <div key={p.gap} className="mb-4">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-white">
                      {p.gap} <span className="text-[#8a8a8a]">({p.note})</span>
                    </span>
                    <span className="font-mono text-white">{p.pct}%</span>
                  </div>
                  <div className="mc-slot h-5 p-[3px]">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: p.pct > 80 ? '#5d9c37' : '#fcdb3f' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-sm leading-relaxed text-[#bdbdbd]">
                So the study is designed to detect differences of about 25 points or more, and says so up front.
              </p>
            </Panel>

            <Panel title="Methods" meta="pre-registered">
              <Bullets
                items={[
                  'Confidence intervals from a stratified task-cluster bootstrap. Tasks are what results generalise over; re-running a task is not a second task.',
                  'Pass rate plotted against output and input tokens separately.',
                  'Local tokens, cloud tokens, dollars, energy and wall-clock time are reported side by side, never added into one made-up score.',
                  'A reasoning-leak detector scans every response for a hidden “thinking” mode or wrong sampling settings. Flagged runs get a with/without sensitivity analysis, and collection halts if more than 2% of any setup’s runs are flagged.',
                  'Abstention only counts if it gives the right reason. The matcher is validated on held-out paraphrased refusals, so refusing everything can’t pass.',
                  'The 25 fully specified tasks were written by hand, so error bars describe sensitivity within that set, not Arduino programming in general.',
                ]}
              />
            </Panel>
          </div>
        </Layer>

        {/* ── 10 Tech Stack ───────────────────────────────────────────── */}
        <Layer
          id="stack"
          index={10}
          y={-56}
          tile="bedrock"
          title="Tech stack"
          lead="No agent framework, on purpose. Patterns were borrowed from Inspect AI, SWE-bench, EvalPlus, lm-evaluation-harness, METR Task Standard, SWE-agent and VerilogEval after reading their source."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 3) * 0.06 }}
                className="mc-panel flex items-start gap-3 p-3"
              >
                <span className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center">
                  <Cpu className="h-5 w-5 text-[#1f1f1f]" />
                </span>
                <div>
                  <p className="font-title text-lg leading-tight text-[#1f1f1f]">{s.name}</p>
                  <p className="text-sm leading-snug text-[#3a3a3a]">{s.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Layer>

        {/* ── 11 Progress ─────────────────────────────────────────────── */}
        <Layer
          id="progress"
          index={11}
          y={-60}
          tile="bedrock"
          shade={0.25}
          title="Progress"
          lead="The harness is built and validated. What’s left is measurement, qualification and then data collection."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              {DONE.map((d) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mc-toast flex items-start gap-3 p-3"
                >
                  <span className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center">
                    <Check className="h-5 w-5 text-[#2f7a1f]" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[#fcdb3f]">Advancement Made!</p>
                    <p className="font-title text-lg leading-tight text-white">{d.title}</p>
                    <p className="text-sm text-[#bdbdbd]">{d.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {NEXT.map((n, i) => (
                <motion.div
                  key={n.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="mc-toast flex items-start gap-3 p-3 opacity-90"
                >
                  <span className="mc-slot flex h-10 w-10 shrink-0 items-center justify-center font-mono text-sm text-[#1f1f1f]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[#8a8a8a]">{i === 0 ? 'Up next' : 'Then'}</p>
                    <p className="font-title text-lg leading-tight text-white">{n.title}</p>
                    <p className="text-sm text-[#bdbdbd]">{n.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Panel title="Open design questions" meta="under discussion with my supervisor" className="mt-6">
            <Bullets items={OPEN_QUESTIONS} />
          </Panel>

          <Panel title="Want to talk about the study?" dark={false} className="mt-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <p className="text-sm leading-relaxed text-[#2a2a2a]">
                The repository is private while the study is in progress. I’m happy to walk through it.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`mailto:${profileLinks.email}`}
                  className="mc-btn inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
                >
                  <Mail className="h-4 w-4" /> Email me
                </a>
                <a
                  href={profileLinks.resume}
                  download="Aaryan_Kapoor_Resume.pdf"
                  className="mc-btn inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </a>
              </div>
            </div>
          </Panel>
        </Layer>
      </div>

      <Footer />
      <ScrollToTop />
    </Layout>
  );
};

export default Research;
