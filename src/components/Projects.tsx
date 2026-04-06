import ScrollReveal from "./ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  tagline: string;
  tech: string[];
  highlights: string[];
  live?: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "Auctus AI",
    tagline:
      "AI-powered platform helping Fredericton small businesses find grants, connect with partners, and hire local talent.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "AI"],
    highlights: [
      "Grant discovery system indexing 30+ government funding opportunities with eligibility scoring and deadline tracking",
      "AI-enhanced community forum with 6 categories, 18 active threads, smart recommendations & sentiment analysis",
      "Business matchmaking algorithm with 0-100% compatibility scores based on complementary needs analysis",
    ],
    live: "https://auctus-kohv.vercel.app",
    github: "https://github.com/AaryanKapoor08/auctus",
  },
  {
    title: "Prompt Amplifier",
    tagline:
      "Chrome extension that automatically improves your prompts before sending them to any AI chatbot.",
    tech: ["React", "Vite", "Next.js", "TypeScript", "OpenAI API"],
    highlights: [
      "Real-time prompt enhancement using advanced prompt engineering techniques for optimized LLM responses",
      "Integrated OpenAI API with free token allocation and intelligent transformation system",
    ],
    github: "https://github.com/AaryanKapoor08/Prompt-Amplifier",
  },
  {
    title: "RAG Pipeline",
    tagline:
      "Upload any PDF and ask questions—the AI reads the document and gives accurate answers instantly.",
    tech: ["Python", "LanceDB", "OpenAI API"],
    highlights: [
      "Intelligent document Q&A processing PDFs into vector embeddings stored in LanceDB for semantic search",
      "Retrieval mechanism converting questions into embeddings, finding relevant chunks, and generating context-aware answers",
    ],
    github: "https://github.com/AaryanKapoor08/Rag-Pipeline",
  },
  {
    title: "Hangry",
    tagline:
      "Swipe through food videos like TikTok—scroll, see what looks good, tap to order. No more boring menus.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    highlights: [
      "TikTok-style vertical scrolling interface for engaging food discovery that transforms traditional menus",
      "Full MERN stack with REST APIs, real-time order processing, and mobile-first design",
    ],
    github: "https://github.com/AaryanKapoor08/Scroll-For-Food",
  },
];

const Projects = () => (
  <section id="projects" className="py-28 px-6">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Selected Work
        </p>
        <h2 className="text-4xl sm:text-5xl font-semibold text-foreground mb-16 tracking-tight">
          Projects
        </h2>
      </ScrollReveal>

      <div className="space-y-12">
        {projects.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.08}>
            <div className="group relative bg-card border border-border rounded-2xl p-8 sm:p-10 hover:shadow-lg hover:border-border/60 transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div>
                  <h3
                    className="text-2xl font-semibold text-foreground mb-2 tracking-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="text-xs font-normal tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <ul className="space-y-2.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                {p.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
