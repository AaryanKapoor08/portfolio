import ScrollReveal from "./ScrollReveal";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Lead Developer",
    org: "Fredericton Ideation Boost Camp 2026",
    date: "January 2026",
    location: "Fredericton, NB",
    points: [
      "Led a team of 3 CS students to design and pitch Auctus AI, an AI-powered community platform for small businesses.",
      "Deployed production-ready MVP on Vercel within a 48-hour ideation period, now under review for municipal partnership.",
    ],
  },
  {
    title: "Open Source Contributor",
    org: "Code Social — Winter of Code 2025",
    date: "Nov 2025 – Present",
    location: "Remote",
    points: [
      "Contributing to open-source projects in a 3-month seasonal program with global developers and mentors.",
      "Collaborative workflows: code reviews, pull requests, and issue resolution across multiple repositories.",
    ],
  },
];

const certifications = [
  { name: "Oracle GenAI Certified", issuer: "Oracle", date: "Nov 2025" },
  { name: "Oracle APEX Cloud Developer", issuer: "Oracle", date: "Nov 2025" },
  { name: "HackFest Hackathon", issuer: "GDG Cloud New Delhi", date: "Nov 2025" },
];

const Experience = () => (
  <section id="experience" className="py-28 px-6">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Background
        </p>
        <h2 className="text-4xl sm:text-5xl font-semibold text-foreground mb-16 tracking-tight">
          Experience & Certifications
        </h2>
      </ScrollReveal>

      {/* Timeline */}
      <div className="space-y-10 mb-20">
        {experiences.map((e, i) => (
          <ScrollReveal key={e.org} delay={i * 0.08}>
            <div className="relative pl-8 border-l-2 border-border">
              <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
              <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {e.date} · {e.location}
              </p>
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-1">{e.title}</h3>
              <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>{e.org}</p>
              <ul className="space-y-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                {e.points.map((p, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Certifications */}
      <ScrollReveal>
        <h3 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Certifications</h3>
      </ScrollReveal>
      <div className="grid sm:grid-cols-3 gap-4">
        {certifications.map((c, i) => (
          <ScrollReveal key={c.name} delay={i * 0.06}>
            <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow duration-300">
              <p className="font-medium text-foreground text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{c.name}</p>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                {c.issuer} · {c.date}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Education */}
      <ScrollReveal delay={0.1}>
        <div className="mt-20 pl-8 border-l-2 border-border relative">
          <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
          <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Sept 2024 – Apr 2028 · Fredericton, NB
          </p>
          <h3 className="text-xl font-semibold text-foreground tracking-tight mb-1">
            University of New Brunswick
          </h3>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            Bachelor of Science in Computer Science · GPA 3.9 / 4.2
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Experience;
