import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import ThemeToggle from '@/components/theme/ThemeToggle';

// `route` links go to their own page; the rest are sections of the homepage.
const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'Projects', id: 'projects' },
  { name: 'Research', id: 'research', route: '/research' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Play', id: 'play' },
  { name: 'Contact', id: 'contact' },
];

type NavLink = (typeof navLinks)[number];

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  link: NavLink;
  onHome: boolean;
  active: boolean;
}

// On the homepage, section links stay plain anchors so the browser scrolls
// natively; from any other page they route back to "/#section". Forwards
// ref/props so SheetClose's asChild can attach its close handler.
const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ link, onHome, active, ...rest }, ref) => {
    const ariaCurrent = active ? 'page' : undefined;
    if (!link.route && onHome) {
      return (
        <a ref={ref} href={`#${link.id}`} aria-current={ariaCurrent} {...rest}>
          {link.name}
        </a>
      );
    }
    return (
      <Link ref={ref} to={link.route ?? `/#${link.id}`} aria-current={ariaCurrent} {...rest}>
        {link.name}
      </Link>
    );
  },
);
NavItem.displayName = 'NavItem';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  const isActive = (link: NavLink) =>
    link.route ? pathname === link.route : onHome && activeSection === link.id;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    navLinks.forEach((link) => {
      const el = link.route ? null : document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onHome]);

  const logoClass = 'font-title font-bold tracking-tight text-foreground text-lg transition-colors hover:text-accent';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/80 py-3 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {onHome ? (
          <a href="#home" className={logoClass} aria-label="Back to top">
            Aaryan&nbsp;Kapoor
          </a>
        ) : (
          <Link to="/" className={logoClass} aria-label="Back to homepage">
            Aaryan&nbsp;Kapoor
          </Link>
        )}

        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              onHome={onHome}
              active={isActive(link)}
              className={cn(
                'relative text-sm font-medium transition-colors hover:text-foreground',
                'after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100',
                isActive(link)
                  ? 'text-foreground after:scale-x-100'
                  : 'text-muted-foreground',
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64">
              <div className="mt-10 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <NavItem
                      link={link}
                      onHome={onHome}
                      active={isActive(link)}
                      className={cn(
                        'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-muted',
                        isActive(link)
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground',
                      )}
                    />
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
