import React from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <Card key={group.category} className="bg-card/80">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
              {group.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
