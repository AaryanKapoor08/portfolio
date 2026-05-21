export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'promptgod',
    name: 'PromptGod',
    description: 'Chrome extension that rewrites rough AI prompts into sharper, model-ready instructions.',
    techStack: ['TypeScript', 'Chrome Extension', 'AI', 'Prompt Engineering'],
    highlights: [
      'Uses a compact-contract pipeline to turn rough prompts into structured instructions',
      'Extracts constraints and repairs prompt issues before submission',
      'Designed for faster, higher-quality LLM interactions'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/promptgod'
  },
  {
    id: 'software-maintenance-agent',
    name: 'Software Maintenance Agent',
    description: 'Python project exploring AI-assisted software maintenance workflows.',
    techStack: ['Python', 'AI Agents', 'Automation'],
    highlights: [
      'Experiments with agentic workflows for codebase maintenance',
      'Targets repetitive engineering tasks and repository hygiene',
      'Built as a foundation for AI-assisted developer tooling'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/software_maintenance_agent'
  },
  {
    id: 'auctus-ai',
    name: 'Auctus AI',
    description: 'AI-powered platform helping Fredericton small businesses find grants, partners, and local talent.',
    techStack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'AI'],
    highlights: [
      'Grant discovery system indexing 30+ government funding opportunities with eligibility scoring',
      'AI-enhanced community forum with smart recommendations and sentiment analysis',
      'Business matchmaking algorithm with compatibility scoring based on complementary needs'
    ],
    demoUrl: 'https://auctus-kohv.vercel.app',
    githubUrl: 'https://github.com/AaryanKapoor08/auctus'
  },
  {
    id: 'prompt-amplifier',
    name: 'Prompt Amplifier',
    description: 'Chrome extension that improves prompts before sending them to AI chatbots.',
    techStack: ['React', 'Vite', 'Next.js', 'TypeScript', 'OpenAI API'],
    highlights: [
      'Real-time prompt enhancement using advanced prompt engineering techniques',
      'Integrated OpenAI API with free token allocation',
      'Built an intelligent transformation system for optimized LLM responses'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/Prompt_Amplifier'
  },
  {
    id: 'interview-ai',
    name: 'Interview AI',
    description: 'AI-assisted interview preparation project.',
    techStack: ['JavaScript', 'AI', 'Interview Prep'],
    highlights: [
      'Supports interview practice with AI-oriented workflows',
      'Targets preparation for technical and behavioral questions',
      'Built as an experiment in AI-powered career tooling'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/interview-ai'
  },
  {
    id: 'patient-management-system',
    name: 'Patient Management System',
    description: 'Java application for managing patient records and healthcare workflows.',
    techStack: ['Java', 'Healthcare', 'Records Management'],
    highlights: [
      'Models patient-management workflows in Java',
      'Organizes healthcare information for easier access',
      'Demonstrates object-oriented application design'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/Patient-Management-System'
  },
  {
    id: 'rag-pipeline',
    name: 'RAG Pipeline',
    description: 'PDF question-answering pipeline that retrieves document context and generates accurate answers.',
    techStack: ['Python', 'LanceDB', 'OpenAI API'],
    highlights: [
      'Processes PDFs into vector embeddings for semantic search',
      'Retrieves relevant chunks before generating context-aware answers',
      'Designed a focused document Q&A workflow for custom knowledge bases'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/Rag_Pipeline'
  }
];
