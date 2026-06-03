export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
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
    id: 'hermes-graph-context-router',
    name: 'Hermes Graph Context Router',
    date: 'May 2026 - Present',
    description: 'Graph-guided context router that prepares focused briefings before coding agents edit a repo.',
    techStack: ['Python', 'CodeGraph', 'SQLite', 'MCP'],
    highlights: [
      'Converts coding tasks into briefings with relevant files, symbols, callers, callees, impact areas, and test commands',
      'Combines CodeGraph-style dependency lookup with SQLite task history',
      'Generates Hermes/Codex-ready context packs to reduce repeated repository discovery before code changes'
    ]
  },
  {
    id: 'agentic-rag-pipeline',
    name: 'Agentic RAG Pipeline',
    date: 'April 2026 - Present',
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
    description: 'Prototype RAG system for text and image retrieval with grounded citations.',
    techStack: ['Python', 'LangChain', 'Embeddings'],
    highlights: [
      'Indexes text and images with local embeddings, returning grounded answers with citations to the exact source page or figure'
    ]
  }
];
