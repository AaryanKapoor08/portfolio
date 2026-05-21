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
    githubUrl: 'https://github.com/AaryanKapoor08/Prompt-Amplifier'
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
    githubUrl: 'https://github.com/AaryanKapoor08/Rag-Pipeline'
  },
  {
    id: 'hangry',
    name: 'Hangry',
    description: 'TikTok-style food discovery app for browsing videos, choosing meals, and ordering faster.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    highlights: [
      'Vertical scrolling interface for mobile-first food discovery',
      'Full MERN stack with REST APIs and order processing',
      'Transforms static menus into a more visual browsing experience'
    ],
    githubUrl: 'https://github.com/AaryanKapoor08/Scroll-For-Food'
  }
];
