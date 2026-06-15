import { cn } from '@/lib/utils';

export type MarqueeItem = string | { label: string; logo?: string };

interface MarqueeProps {
  items: MarqueeItem[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}

/**
 * A seamless, infinitely-scrolling row. Items with a `logo` render as a small
 * transparent-SVG logo tile; the rest fall back to a slightly-rounded text
 * chip. The list is rendered twice and translated -50% so the loop is
 * invisible. Pauses on hover.
 */
export default function Marquee({ items, reverse = false, duration = 32, className }: MarqueeProps) {
  const normalized = items.map((it) => (typeof it === 'string' ? { label: it } : it));

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {[...normalized, ...normalized].map((item, i) =>
          item.logo ? (
            <div
              key={`${item.label}-${i}`}
              title={item.label}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/50 bg-white/90 p-1.5 shadow-sm"
            >
              <img src={item.logo} alt={item.label} loading="lazy" className="h-full w-full object-contain" />
            </div>
          ) : (
            <span
              key={`${item.label}-${i}`}
              className="whitespace-nowrap rounded-md border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-accent/60 hover:text-foreground"
            >
              {item.label}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
