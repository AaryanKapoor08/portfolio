# Portfolio — Progress Log

> Handoff notes so the next session can pick up right where we left off.

## Project
Aaryan Kapoor's portfolio. **Vite + React 18 + TypeScript + Tailwind + shadcn/ui + Framer Motion + Three.js (React Three Fiber v8 + drei v9)**. Single page composed in `src/pages/Index.tsx`. Sections live in `src/components/home/`, 3D in `src/components/three/`, shared effects in `src/components/ui/`.

Run: `npm run dev` (port 8080). Validate: `npm run lint && npm test && npm run build`.

---

## Last worked: 2026-06-14

### What got done today (big 3D + UI overhaul)
- **Hero**: floating Minecraft voxel blocks (procedural pixel textures, no asset files) with mouse parallax. Gated to **desktop only** (`>=768px`). KEEP THESE — user likes them on the landing page.
- **Play section (`#play`) "Battle Bus Drop"**: now renders the **real downloaded Battle Bus GLB** (`public/models/battle-bus.glb`, 30MB/4k), drag-to-orbit, on a glowing teal storm-circle ring. Replaced the earlier hand-built bus/llama/pickaxe/V-Bucks (all deleted).
- **About panel**: tilted (~28° right), self-spinning **Star Wand pickaxe** (`public/models/star-wand.glb`, 544KB) in a fixed dark "display case" (same in light + dark). User's favourite pickaxe.
- **Other UI** (earlier in the session): typewriter headline, magnetic buttons, 3D-tilt + spotlight project cards, animated project filters, skills marquee, scroll progress bar, count-up stats, aurora backdrop, footer, intro splash, Konami block-rain easter egg, SEO/OG/JSON-LD, vendor chunk splitting.
- **Removed** the custom cursor (user didn't want it).

### Reusable 3D building blocks (use these for any new model)
- `src/components/three/GltfModel.tsx` — loads any GLB, auto-centers + normalizes scale to `targetSize`. Props: `rotationY`, `tilt` (constant lean, radians), `spinSpeed` (self-spin rad/s), `bob`, `grounded`.
- `src/components/three/ModelShowcase.tsx` — generic single-model stage (lights + procedural Lightformer environment + contact shadow + OrbitControls drag). Props incl. `targetSize`, `tiltDeg`, `tint`, `camera`, `autoRotate`. **Use this to drop in new models fast.**

### Models on disk (`public/models/`)
- `battle-bus.glb` — used in `#play`. Consider swapping for the 1k version (9MB) to cut load.
- `star-wand.glb` — used in About panel.
- `midas.glb` (11MB) — **PARKED, not placed yet.** User wants it somewhere but we're still deciding. They vetoed putting it in the hero (Minecraft blocks stay) and vetoed the About panel (wand went there). **Next session: ask where Midas should go** (its own small section? a "favourite skin" card near Experience?).

### Gotchas / non-obvious (don't re-break these)
- **Reduced motion**: user's OS has reduce-motion ON but wants the 3D shown. Do NOT gate visible 3D (hero, play, about) behind `prefers-reduced-motion` — only disable auto-spin. (This caused the "I don't see the bus" bug.)
- **No CDN HDRI**: never use `<Environment preset="city">` — it fetches from a CDN that hangs and leaves a blank canvas. Use `<Environment>` with `<Lightformer>` children (procedural) instead.
- **R3F pinned to v8** (drei v9) for React 18 — don't bump to fiber v9 (needs React 19). Installs need `--legacy-peer-deps`.
- 3D scenes are **code-split + lazy-mounted**; three.js is in its own `three-vendor` chunk.

### Verify visually
`scripts/shot.mjs` (hero + play), `scripts/dark.mjs`, `scripts/mobile.mjs` — Playwright screenshot helpers. Start dev on port 8123 first: `npx vite --port 8123 &`, then `node scripts/shot.mjs`. PNGs are gitignored.

### Open TODOs
- [ ] Decide + implement **Midas** placement.
- [ ] Get proper **CC-BY author credits** for Star Wand and Midas (Battle Bus = RamonaFlowers, already credited under the play scene). Add to footer or each scene.
- [ ] Optional: swap Battle Bus to the 1k GLB (9MB) for faster load.
- [ ] Pre-existing untracked files in repo root (`.opencode/`, `.specify/`, `PRESENTATION_PREP.md`, modified `resume.md`) — NOT ours, leave alone.
