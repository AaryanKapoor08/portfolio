import React from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';

interface SkillGroup {
  category: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'SQL'],
  },
  {
    category: 'AI/ML',
    skills: ['OpenAI API', 'LangChain', 'PyTorch', 'Pinecone', 'RAG', 'HuggingFace'],
  },
  {
    category: 'Web',
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vite', 'Redux'],
  },
  {
    category: 'DevOps',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux'],
  },
  {
    category: 'Tools',
    skills: ['VS Code', 'Postman', 'Figma', 'Jira'],
  },
];

const Skills: React.FC = () => {
  return (
    <Section id="skills" crossSection>
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Technical Skills
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My toolkit for building the next generation of AI-powered applications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group) => (
          <div key={group.category} className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
