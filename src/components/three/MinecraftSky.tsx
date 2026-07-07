import { cn } from '@/lib/utils';

/**
 * "Minecraft sky" backdrop for the hero.
 * Light mode: the daytime vertical blue gradient.
 * Dark mode: the in-game night sky — deep navy, chunky pixel stars (two
 * layers, one twinkling) and the iconic square pixel moon.
 * Both fade into the page background at the bottom so the hero dissolves
 * cleanly into the Featured Projects section.
 */
interface MinecraftSkyProps {
  className?: string;
}

export default function MinecraftSky({ className }: MinecraftSkyProps) {
  return (
    <div aria-hidden className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className="mc-sky dark:hidden" />
      <div className="mc-night hidden dark:block">
        <div className="mc-stars" />
        <div className="mc-stars mc-stars--twinkle" />
        <div className="mc-moon" />
      </div>
    </div>
  );
}
