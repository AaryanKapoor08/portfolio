import React from 'react';
import Section from '@/components/ui/Section';

const About: React.FC = () => {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am a Full Stack AI Developer with a passion for building intelligent, scalable, and 
            user-centric applications. My expertise lies at the intersection of Large Language 
            Models (LLMs) and modern web technologies.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I strive to bridge the gap between complex AI capabilities and seamless user experiences, 
            ensuring that technology serves as a tool for empowerment and efficiency.
          </p>
        </div>
        <div className="relative aspect-square rounded-2xl bg-muted overflow-hidden border border-border">
           {/* Placeholder for profile image */}
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
             <span>Profile Image</span>
           </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
