export type ProjectCategory = 'Hackathons' | 'AI Agents' | 'RAG' | 'Platforms' | 'Dev Tools';

export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'promptgod',
    name: 'PromptGod',
    date: 'November 2025 - Present',
    category: 'Dev Tools',
    description: 'Manifest V3 Chrome extension that rewrites prompts directly inside major AI chat tools.',
    techStack: ['Manifest V3', 'TypeScript', 'Vite'],
    highlights: [
      'Rewrites prompts in ChatGPT, Claude, Gemini, and Perplexity, then inserts the improved prompt automatically',
      'Catches weak rewrites, near-echoes, dropped instructions, and wrapper-style outputs before page insertion',
      'Supports Gemini/Gemma, Groq, and OpenRouter fallback with model selection and per-site adapters'
    ],
    demoUrl: 'https://chromewebstore.google.com/detail/promptgod/cohbligncfolnlncmobbelfjiehlpijo',
    githubUrl: 'https://github.com/AaryanKapoor08/promptgod'
  },
  {
    id: 'software-maintenance-agent',
    name: 'Software Maintenance Agent',
    date: 'April 2026 - Present',
    category: 'AI Agents',
    description: 'Local coding agent for small, testable software maintenance fixes.',
    techStack: ['Python', 'DSPy', 'pytest', 'SQLite', 'JEPA-style scoring'],
    highlights: [
      'Reproduces failures in a sandboxed copy, finds likely files, applies focused patches, reruns tests, and writes reports',
      'Uses BM25, hybrid retrieval, and a JEPA-inspired patch-risk scorer to rank likely fix locations',
      'Records agent steps in SQLite while enforcing secret redaction, command allow-listing, and path-scoped edits'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/software_maintenance_agent'
  },
  {
    id: 'shorecheck',
    name: 'ShoreCheck',
    date: 'September 2026',
    category: 'Hackathons',
    description: 'Halifax beach water-quality dashboard that won Best Student Team at the Anthropic Halifax Hackathon.',
    techStack: ['Next.js', 'React', 'Tailwind', 'Sentinel-2', 'Gemini API'],
    highlights: [
      'Pulls official lab samples, ECCC weather data, and Sentinel-2 satellite imagery of 43 lakes into one live view',
      'Backtested the rain-based bloom prediction model against 647 satellite readings and reported it as statistically insignificant (p = 0.49) instead of overselling accuracy',
      'Awarded Best Student Team at the Anthropic Halifax Hackathon'
    ],
    demoUrl: 'https://shorecheck-five.vercel.app',
    githubUrl: 'https://github.com/PriyanArora/shorecheck'
  },
  {
    id: 'keepline',
    name: 'Keepline',
    date: '2026',
    category: 'Hackathons',
    description: 'Company-memory tool that turns Slack, email, and ticket history into versioned, cited facts.',
    techStack: ['Python', 'FastAPI', 'Next.js', 'SQLite', 'Snowflake Cortex'],
    highlights: [
      'Turns Slack, email, and ticket history into versioned, cited company memory that flags knowledge only one person holds',
      'Cut confidently wrong answers from 71.8% to 22.2% vs. plain search on a synthetic 216-question held-out benchmark',
      'Writes handoff packs for departing employees; built at HackAtlantic 2026'
    ],
    demoUrl: 'https://keepline.vercel.app',
    githubUrl: 'https://github.com/AaryanKapoor08/keepline'
  },
  {
    id: 'medbuddy',
    name: 'MedBuddy',
    date: 'November 2025',
    category: 'Hackathons',
    description: 'Voice-enabled medication assistant that reached the finals of the GDG New Delhi hackathon.',
    techStack: ['Next.js', 'Express', 'Groq API'],
    highlights: [
      'Takes speech input and answers with spoken responses',
      'Keeps a live medication checklist alongside the conversation',
      'Finalist at the Google Developer Groups (GDG Cloud New Delhi) hackathon'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/medbuddy'
  },
  {
    id: 'whis',
    name: 'whis',
    date: '2026',
    category: 'AI Agents',
    description: 'Voice agent that runs a Windows 11 PC from plain speech and can be called from a real phone number.',
    techStack: ['Python', 'faster-whisper', 'Playwright', 'Windows UI Automation', 'Retell'],
    highlights: [
      'Built solo in 36 hours: drives a Windows 11 PC from plain speech, reachable from a real phone number',
      'Acts while you are still talking (p50 ~170 ms over 1,350 calls)',
      'Asks for a spoken yes before saving, closing, or submitting'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/whis'
  },
  {
    id: 'auctus',
    name: 'Auctus',
    date: 'January 2026 - May 2026',
    category: 'Platforms',
    description: 'Canadian funding-discovery platform for businesses, students, and professors.',
    techStack: ['Next.js 16', 'React 19', 'Supabase'],
    highlights: [
      'Serves businesses pursuing grants, students seeking scholarships and bursaries, and professors sourcing research funding',
      'Implements role-based onboarding, profile-based match scoring, and Postgres row-level security',
      'Uses a TypeScript scraper to ingest official funding sources into a structured funding database'
    ],
    demoUrl: 'https://auctus-five.vercel.app/',
    githubUrl: 'https://github.com/AaryanKapoor08/auctus'
  },
  {
    id: 'dolos',
    name: 'Dolos',
    date: 'June 2026',
    category: 'Platforms',
    description: 'Real-time financial-crime detection platform — a student-scale Verafin — that scores bank transactions and opens investigation cases.',
    techStack: ['Java 21', 'Spring Boot', 'Kafka Streams', 'Neo4j', 'Spring AI'],
    highlights: [
      'Scores bank transactions for fraud and money laundering, flags mule rings in a graph database, and opens investigation cases for analysts',
      'Architected as 13 event-sourced Spring Boot microservices with Kafka Streams and Drools scoring',
      'Pairs Neo4j ring detection with a Spring AI copilot exposed as an MCP server and a React investigator console',
      'CI deploys the full Helm chart to a k3d Kubernetes cluster and smoke-tests it on every push'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/dolos'
  },
  {
    id: 'loopd',
    name: 'loopd',
    date: 'June 2026',
    category: 'Dev Tools',
    description: 'Vendor-neutral control plane for AI agent loops: one cockpit that ingests, observes, and governs agent runs.',
    techStack: ['Rust', 'tokio', 'axum', 'rusqlite', 'TypeScript'],
    highlights: [
      'Ingests runs from Claude Code, Codex, and SDK agents and governs them with budget, repeated-action, error-streak, and no-progress policies',
      'Single Rust daemon (tokio, axum, rusqlite, portable-pty, ratatui) that owns or observes agents under one event model',
      'Publishes a TypeScript SDK to npm with wire types generated from Rust via ts-rs; covered by 101 unit and 2 integration tests in CI'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/loopd'
  },
  {
    id: 'mercor',
    name: 'Mercor',
    date: 'June 2026',
    category: 'AI Agents',
    description: 'Voice AI interviewer that studies a candidate’s GitHub profile and conducts a live spoken technical interview in the browser.',
    techStack: ['TypeScript', 'React 19', 'Express', 'OpenAI Realtime API', 'PostgreSQL'],
    highlights: [
      'Reads the candidate’s public repositories to build interview context, then interviews them by voice over WebRTC using OpenAI’s realtime model',
      'Transcribes the candidate live with Deepgram and stores the full two-sided transcript in Postgres via Prisma',
      'Scores the finished transcript with Gemini, returning a score out of ten with written feedback'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/mercor'
  },
  {
    id: 'agentic-rag-pipeline',
    name: 'Agentic RAG Pipeline',
    date: 'April 2026 - Present',
    category: 'RAG',
    description: 'LangGraph retrieval workflow with planning, quality checks, and tracing.',
    techStack: ['Python', 'LangGraph', 'LangChain', 'LangSmith'],
    highlights: [
      'Plans, retrieves, critiques context quality, re-retrieves when relevance is weak, and traces runs end to end in LangSmith'
    ]
  },
  {
    id: 'multimodal-rag-pipeline',
    name: 'Multimodal RAG Pipeline',
    date: 'December 2025',
    category: 'RAG',
    description: 'Prototype RAG system for text and image retrieval with grounded citations.',
    techStack: ['Python', 'LangChain', 'Embeddings'],
    highlights: [
      'Indexes text and images with local embeddings, returning grounded answers with citations to the exact source page or figure'
    ]
  }
];
