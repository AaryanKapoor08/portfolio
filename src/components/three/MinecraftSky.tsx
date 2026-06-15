import { cn } from '@/lib/utils';

/**
 * Light-mode-only "Minecraft sky" backdrop for the hero: a vertical blue
 * gradient that fades into the page background at the bottom so it dissolves
 * cleanly into the Featured Projects section. Dark mode keeps its own grid.
 */
interface MinecraftSkyProps {
  className?: string;
}

export default function MinecraftSky({ className }: MinecraftSkyProps) {
  return <div aria-hidden className={cn('mc-sky', className)} />;
}
