import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  crossSection?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, id, className = '', crossSection = false }) => {
  return (
    <section 
      id={id} 
      className={`px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-32 ${className} ${crossSection ? 'bg-muted/30' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;
