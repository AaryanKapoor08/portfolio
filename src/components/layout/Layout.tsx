import React, { ReactNode } from 'react';
import AuroraBackground from '@/components/ui/AuroraBackground';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      <AuroraBackground />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
