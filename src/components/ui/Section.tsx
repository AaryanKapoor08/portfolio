import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className = '' }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
