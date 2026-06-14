# Portfolio — Progress Log

> Handoff notes so the next session can pick up right where we left off.

---

## ⛳ RESUME HERE (2026-06-14, end of session 3)

**Midas-in-About is DONE.** The About panel (`src/components/home/About.tsx` → `MidasScene`)
shows Midas standing in his idle, **holding his default gold pistol**, **facing the camera**,
full body, well lit, in the dark gold display case.

**Decision log this session (Star Wand abandoned):**
- Tried "Midas holding the Star Wand". Got it standing upright in his right hand via a
  deterministic per-frame orientation lock (parented the wand to the clean `spinner` group
  — NOT the right-hand bone, whose mirrored/non-uniform scale skewed the quaternion math —
  and re-imposed "long axis up" in the yaw-only rig frame). Imported wand long axis is local
  **X** (FBX→glTF import rotated it), stood up via a ~0.95 rad rotation about Z.
- **User wanted it two-handed.** Not realistically achievable: only one anim
  (`CatBurglar_Male_Idle`), no IK, hand-tuning a 3-bone reach + finger wrap via screenshots
  comes out stiff/clipping. Told the user; **they chose to remove the Star Wand entirely.**
- So `MidasLoadout.tsx` was reverted to just-Midas: **un-hid the pistol** (idle pose holds it
  naturally; an empty gripping hand looked broken), removed all wand/grip code.

**Sharpness fix (user flagged pixelation):** GLB textures import with `anisotropy = 1`.
`MidasLoadout.tsx` now cranks every map (`map/normalMap/roughnessMap/metalnessMap/emissiveMap/
aoMap`) to `gl.capabilities.getMaxAnisotropy()`, and `MidasScene.tsx` DPR bumped to `[1.75, 3]`.

**Facing fix:** model ships facing **+Z (toward camera)**, so `facingY` default is now **0**
(was `Math.PI`, which showed his back when auto-spin is off — and this user has reduce-motion
ON, so they see the static pose).

**Files touched:** `src/components/three/MidasLoadout.tsx`, `src/components/three/MidasScene.tsx`,
`src/components/home/About.tsx` (caption now "Midas · drag to spin"). `scripts/midas.mjs` is a
throwaway screenshot helper (now: `PORT` env, `reducedMotion:'reduce'`, 2x scale, writes
`midas-about.png` full-page + `midas-case.png` cropped). Validated: tsc + eslint + `npm run build`
all clean (only the pre-existing three-vendor >900kB chunk warning).

**Not yet done:** not committed (commit only as Aaryan Kapoor, no Claude trailer). Still owe a
**Midas model CC-BY credit** (Sketchfab author) — ask user for the link. `star-wand.glb` is now
**unused** (wand removed) — can delete from `public/models/` if not wanted elsewhere.

**Gotcha seen this session:** after many HMR patches the About panel rendered **empty** (case
glow, no Midas) — R3F left the canvas in a torn-down state. **Not a code bug:** a fresh page
load (`Ctrl+Shift+R`, or restart dev) renders Midas correctly every time. Verified repeatedly
via `node scripts/midas.mjs` (fresh Playwright load).

Note: `src/components/three/ModelShowcase.tsx` is unused by About (kept as a reusable generic
stage — fine to keep).

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
