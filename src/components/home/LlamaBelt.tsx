// Thin "belt" between Projects and About: pixelated brown borders (top/bottom,
// no sides) framing a white strip, with Fortnite supply llamas (1, 2, 1, 2…)
// running left-to-right in a seamless loop.

// Crafting-table-style brown pixel border tile (8x4), repeated horizontally.
const BROWN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='4' shape-rendering='crispEdges'%3E%3Crect width='8' height='4' fill='%23b08f52'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%238a6d3c'/%3E%3Crect x='3' y='0' width='1' height='1' fill='%23cdb079'/%3E%3Crect x='5' y='0' width='1' height='1' fill='%236f5530'/%3E%3Crect x='7' y='0' width='1' height='1' fill='%238a6d3c'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23cdb079'/%3E%3Crect x='4' y='1' width='1' height='1' fill='%238a6d3c'/%3E%3Crect x='6' y='1' width='1' height='1' fill='%23cdb079'/%3E%3Crect x='0' y='2' width='1' height='1' fill='%23cdb079'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%236f5530'/%3E%3Crect x='5' y='2' width='1' height='1' fill='%23cdb079'/%3E%3Crect x='7' y='2' width='1' height='1' fill='%236f5530'/%3E%3Crect x='1' y='3' width='1' height='1' fill='%238a6d3c'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%236f5530'/%3E%3Crect x='4' y='3' width='1' height='1' fill='%23cdb079'/%3E%3Crect x='6' y='3' width='1' height='1' fill='%238a6d3c'/%3E%3C/svg%3E\")";

// One group is wide enough to overflow most screens; we render it twice and
// slide the track by -50% so the loop is seamless. 1,2 alternating per pair.
const PAIRS = 10;
const group = Array.from({ length: PAIRS }, (_, i) => i);

const Row = () => (
  <>
    {group.map((i) => (
      <span key={i} className="flex shrink-0 items-center gap-12">
        <img src="/fortnite-llama-1.svg" alt="" className="h-10 w-auto" />
        <img src="/fortnite-llama-2.svg" alt="" className="h-10 w-auto" />
      </span>
    ))}
  </>
);

const LlamaBelt = () => {
  const strip = { backgroundImage: BROWN_TILE, backgroundRepeat: 'repeat', backgroundSize: '40px 20px', imageRendering: 'pixelated' as const };
  return (
    <div aria-hidden className="overflow-hidden bg-white dark:bg-black">
      <div className="h-2.5 w-full" style={strip} />
      <div className="flex h-14 items-center overflow-hidden">
        <div className="llama-track flex shrink-0 items-center gap-12">
          <Row />
          <Row />
        </div>
      </div>
      <div className="h-2.5 w-full" style={strip} />
    </div>
  );
};

export default LlamaBelt;
