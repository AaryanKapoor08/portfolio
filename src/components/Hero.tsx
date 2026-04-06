import { motion } from "framer-motion";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";

const Hero = () => (
  <section className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden">
    {/* Subtle gradient orb */}
    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary blur-3xl pointer-events-none" />

    <div className="max-w-3xl mx-auto text-center relative z-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-4"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Full Stack AI Developer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl sm:text-7xl font-semibold text-foreground leading-tight tracking-tight mb-6"
      >
        Aaryan Kapoor
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Building intelligent web applications at the intersection of full-stack
        development and generative AI. CS student at UNB, Oracle GenAI Certified.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center justify-center gap-4 mb-12"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          View Projects
          <ArrowDown className="w-4 h-4" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        >
          Get in Touch
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex items-center justify-center gap-5"
      >
        <a href="mailto:aaryan.kapoor@unb.ca" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
          <Mail className="w-5 h-5" />
        </a>
        <a href="https://github.com/AaryanKapoor08" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/aaryan-kapoor-88a007332" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  </section>
);

export default Hero;
