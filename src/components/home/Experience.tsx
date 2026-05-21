import React from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    title: 'Lead Developer',
    org: 'Fredericton Ideation Boost Camp 2026',
    date: 'January 2026',
    location: 'Fredericton, NB',
    points: [
      'Led a team of 3 CS students to design and pitch Auctus AI, an AI-powered community platform for small businesses.',
      'Deployed a production-ready MVP on Vercel within a 48-hour ideation period, now under review for municipal partnership.',
    ],
  },
  {
    title: 'Open Source Contributor',
    org: 'Code Social - Winter of Code 2025',
    date: 'Nov 2025 - Present',
    location: 'Remote',
    points: [
      'Contributing to open-source projects in a 3-month seasonal program with global developers and mentors.',
      'Collaborative workflows: code reviews, pull requests, and issue resolution across multiple repositories.',
    ],
  },
];

const certifications = [
  { name: 'Oracle GenAI Certified', issuer: 'Oracle', date: 'Nov 2025' },
  { name: 'Oracle APEX Cloud Developer', issuer: 'Oracle', date: 'Nov 2025' },
  { name: 'HackFest Hackathon', issuer: 'GDG Cloud New Delhi', date: 'Nov 2025' },
];

const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Experience
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practical work, certifications, and education behind the projects.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {experiences.map((experience) => (
            <article key={experience.org} className="relative pl-8 border-l-2 border-border">
              <span className="absolute left-[-5px] top-2 h-2 w-2 rounded-full bg-accent" />
              <p className="text-sm text-muted-foreground">
                {experience.date} - {experience.location}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-foreground">
                {experience.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {experience.org}
              </p>
              <ul className="mt-4 space-y-3">
                {experience.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <article className="relative pl-8 border-l-2 border-border">
            <span className="absolute left-[-5px] top-2 h-2 w-2 rounded-full bg-accent" />
            <p className="text-sm text-muted-foreground">
              Sept 2024 - Apr 2028 - Fredericton, NB
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">
              University of New Brunswick
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Bachelor of Science in Computer Science - GPA 3.9 / 4.2
            </p>
          </article>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((certification) => (
              <div key={certification.name} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {certification.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {certification.issuer}
                    </p>
                  </div>
                  <Badge variant="secondary">{certification.date}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
