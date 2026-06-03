import React from 'react';
import Section from '@/components/ui/Section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const experiences = [
  {
    title: 'Freelance Web Developer',
    org: 'Hastinapur Metals Pvt. Ltd.',
    date: '2026',
    location: 'Remote',
    points: [
      "Built a robust website to run the firm's day-to-day operations, replacing manual tracking with a structured catalog, enquiry handling, and a direct admin view.",
    ],
  },
  {
    title: 'Participant',
    org: 'Dual-Use Technology Hackathon, UNB',
    date: 'May 2026',
    location: 'Fredericton, NB',
    points: [
      'Built Fluo in a 48-hour team sprint: a defence procurement workflow using n8n-style automation, vendor risk checks, and a blockchain audit ledger for tamper-evident procurement events.',
    ],
  },
  {
    title: 'Open Source Contributor',
    org: 'GirlScript Summer of Code',
    date: '2026',
    location: 'Remote',
    points: [
      'Active contributor in a large open-source mentorship program, resolving issues and landing merged pull requests across community-maintained repositories.',
    ],
  },
  {
    title: 'Open Source Contributor',
    org: 'Code Social, Winter of Code',
    date: 'Nov 2025 - Present',
    location: 'Remote',
    points: [
      'Contributing across multiple repositories in a 3-month seasonal program through code reviews, pull requests, and issue triage.',
    ],
  },
  {
    title: 'Participant',
    org: 'Fredericton Ideation Boost Camp 2026',
    date: 'January 2026',
    location: 'Fredericton, NB',
    points: [
      'Participated in the 48-hour camp to design and pitch Auctus, an AI funding-discovery platform, and ship a working MVP.',
    ],
  },
];

const certifications = [
  { name: 'RAG Bootcamp', issuer: 'Udemy', date: 'May 2026' },
  { name: 'Oracle GenAI Certified', issuer: 'Oracle', date: 'Nov 2025' },
  { name: 'Oracle APEX Cloud Developer Certified Professional', issuer: 'Oracle', date: 'Nov 2025' },
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
          Practical work, certifications, volunteering, and education behind the projects.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card key={experience.org} className="border-l-4 border-l-accent bg-card/80">
              <CardHeader>
                <p className="text-sm text-muted-foreground">
                  {experience.date} - {experience.location}
                </p>
                <CardTitle className="text-2xl font-bold">
                  {experience.title}
                </CardTitle>
                <p className="text-sm font-medium text-muted-foreground">
                  {experience.org}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {experience.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card className="border-l-4 border-l-primary bg-card/80">
            <CardHeader>
              <p className="text-sm text-muted-foreground">
                Sept 2024 - Apr 2028 - Fredericton, NB
              </p>
              <CardTitle className="text-2xl font-bold">
                University of New Brunswick
              </CardTitle>
              <p className="text-sm font-medium text-muted-foreground">
                Bachelor of Science in Computer Science (Rising 3rd Year)
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Relevant coursework: Java, C, SQL, Calculus I & II, Statistics, Data Analysis, Machine Language.
              </p>
            </CardHeader>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((certification) => (
              <Card key={certification.name} className="bg-card/80">
                <CardContent className="p-5">
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
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="mt-10 text-2xl font-bold text-foreground mb-6">
            Volunteer
          </h3>
          <Card className="bg-card/80">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">
                    Atlantic AI Summit 2026
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Supported on-site logistics across keynotes, panels, and workshops for UNB's RIDSAI applied-AI gathering.
                  </p>
                </div>
                <Badge variant="secondary">Jun 2026</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
