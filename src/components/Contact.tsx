import ScrollReveal from "./ScrollReveal";
import { Mail, Linkedin, Github } from "lucide-react";

const Contact = () => (
  <section id="contact" className="py-28 px-6 bg-secondary/30">
    <div className="max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Get in Touch
        </p>
        <h2 className="text-4xl sm:text-5xl font-semibold text-foreground mb-6 tracking-tight">
          Let's Connect
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          I'm always open to interesting conversations, collaborations, and
          opportunities. Feel free to reach out.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <a
          href="mailto:aaryan.kapoor@unb.ca"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <Mail className="w-4 h-4" />
          aaryan.kapoor@unb.ca
        </a>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/AaryanKapoor08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/aaryan-kapoor-88a007332"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </ScrollReveal>
    </div>

    {/* Footer */}
    <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-border">
      <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
        © {new Date().getFullYear()} Aaryan Kapoor. Built with React & Tailwind CSS.
      </p>
    </div>
  </section>
);

export default Contact;
