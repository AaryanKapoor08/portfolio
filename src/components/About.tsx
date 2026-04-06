import ScrollReveal from "./ScrollReveal";
import { Badge } from "@/components/ui/badge";

const skillGroups = [
  {
    label: "Languages & Frameworks",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "React", "Next.js", "Node.js", "Express.js"],
  },
  {
    label: "AI & Machine Learning",
    skills: ["RAG", "LLMs", "NLP", "LangChain", "LangGraph", "Transformer Architecture", "Semantic Search"],
  },
  {
    label: "Web & Data",
    skills: ["HTML/CSS", "Tailwind CSS", "MongoDB", "SQL", "REST APIs", "WebRTC"],
  },
  {
    label: "DevOps & Tools",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Git", "GitHub Actions", "Vercel", "OCI"],
  },
];

const About = () => (
  <section id="about" className="py-28 px-6 bg-secondary/30">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          About Me
        </p>
        <h2 className="text-4xl sm:text-5xl font-semibold text-foreground mb-8 tracking-tight">
          Skills & Expertise
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p
          className="text-muted-foreground leading-relaxed max-w-2xl mb-14 text-lg"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Second-year Computer Science student at the University of New Brunswick
          and Oracle GenAI Certified developer. I build intelligent web applications
          that bridge full-stack development with generative AI — from RAG pipelines
          to production-ready platforms. Currently preparing for GSoC 2026 and contributing to open source.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 gap-8">
        {skillGroups.map((g, i) => (
          <ScrollReveal key={g.label} delay={0.1 + i * 0.06}>
            <div>
              <h3
                className="text-sm font-medium text-foreground mb-3 tracking-wide"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="text-xs font-normal text-muted-foreground border-border/80"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
