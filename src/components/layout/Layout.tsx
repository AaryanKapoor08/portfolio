import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {/* Navbar will be placed here in US3 */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer will be placed here in US7 */}
    </div>
  );
};

export default Layout;
