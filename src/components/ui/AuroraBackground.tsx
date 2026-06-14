/**
 * A fixed, very low-opacity aurora that drifts behind all content. Pure CSS
 * (blurred gradient blobs + a slow keyframe) so it costs almost nothing and
 * never competes with the foreground text for attention.
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute -left-1/4 top-0 h-[55vh] w-[55vh] rounded-full bg-accent/15 blur-[120px] animate-float-slow" />
      <div
        className="absolute right-0 top-1/3 h-[50vh] w-[50vh] rounded-full bg-[hsl(280_60%_60%/0.12)] blur-[130px] animate-float-slow"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[45vh] w-[45vh] rounded-full bg-[hsl(190_70%_55%/0.12)] blur-[120px] animate-float-slow"
        style={{ animationDelay: '3s' }}
      />
    </div>
  );
}
