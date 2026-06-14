import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
}

/**
 * A seamless, infinitely-scrolling row of pills. The item list is rendered
 * twice and translated -50% so the loop is invisible. Pauses on hover.
 */
export default function Marquee({ items, reverse = false, duration = 32, className }: MarqueeProps) {
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
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-accent/60 hover:text-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
