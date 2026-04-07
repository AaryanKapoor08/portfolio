export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  demoUrl: string;
  githubUrl: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'auctus-ai',
    name: 'Auctus AI',
    description: 'An advanced AI-driven optimization platform for business workflows.',
    techStack: ['React', 'TypeScript', 'Node.js', 'OpenAI', 'PostgreSQL'],
    highlights: [
      'Implemented real-time AI agents for automated task execution',
      'Reduced workflow latency by 40% through optimized RAG pipelines',
      'Developed a dynamic dashboard for monitoring AI performance'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'prompt-amplifier',
    name: 'Prompt Amplifier',
    description: 'A sophisticated tool for enhancing and refining LLM prompts for better output quality.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'LangChain'],
    highlights: [
      'Built a prompt versioning system for iterative refinement',
      'Integrated multiple LLM providers for side-by-side comparison',
      'Developed a library of optimized prompt templates'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'rag-pipeline',
    name: 'RAG Pipeline',
    description: 'A high-performance Retrieval Augmented Generation pipeline for custom knowledge bases.',
    techStack: ['Python', 'PyTorch', 'Pinecone', 'FastAPI', 'React'],
    highlights: [
      'Optimized vector retrieval with hybrid search (keyword + semantic)',
      'Implemented a custom chunking strategy for complex PDF documents',
      'Reduced hallucination rate by 25% using cross-encoder re-ranking'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'hangry',
    name: 'Hangry',
    description: 'A smart food discovery app that suggests meals based on mood and dietary constraints.',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'Google Maps API'],
    highlights: [
      'Implemented a mood-based recommendation algorithm',
      'Integrated real-time location tracking for nearby restaurant discovery',
      'Built a community-driven review system with photo uploads'
    ],
    demoUrl: '#',
    githubUrl: '#'
  }
];
