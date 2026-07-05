export type ProjectCategory = 'AI Agents' | 'RAG' | 'Full-Stack' | 'Dev Tools';

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
  image?: string;
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
    id: 'auctus',
    name: 'Auctus',
    date: 'January 2026 - Present',
    category: 'Full-Stack',
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
    date: 'June 2026 - Present',
    category: 'Full-Stack',
    description: 'Real-time financial-crime detection platform — a student-scale Verafin — that scores bank transactions and opens investigation cases.',
    techStack: ['Java', 'Spring', 'Kafka', 'Neo4j', 'Spring AI'],
    highlights: [
      'Scores bank transactions for fraud and money laundering, flags mule rings in a graph database, and opens investigation cases for analysts',
      'Architected as event-sourced Java/Spring microservices with Kafka streaming and Drools rules',
      'Pairs Neo4j ring detection with a Spring AI + MCP copilot and a React investigator console'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/dolos'
  },
  {
    id: 'loopd',
    name: 'loopd',
    date: 'June 2026 - Present',
    category: 'Dev Tools',
    description: 'Vendor-neutral control plane for AI agent loops: one cockpit that ingests, observes, and governs agent runs.',
    techStack: ['Rust', 'tokio', 'axum', 'rusqlite', 'ts-rs'],
    highlights: [
      'Ingests runs from Claude Code, Codex, and SDK/LangGraph agents and governs them with budget, runaway, and no-progress policies',
      'Single Rust daemon (tokio, axum, rusqlite, portable-pty, ratatui) that owns or observes agents under one event model',
      'Ships a TypeScript SDK whose types are generated from Rust via ts-rs'
    ]
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
