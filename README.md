# Aaryan Kapoor Portfolio

Aaryan Kapoor's personal portfolio website, built to showcase AI-focused full-stack projects, technical skills, experience, certifications, education, and contact links.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui and Radix UI primitives
- Framer Motion
- Three.js via React Three Fiber + drei (3D scenes)
- Vitest and Testing Library

## Interactive Highlights

- **3D hero** — floating Minecraft-style voxel blocks with procedural (asset-free) pixel textures and cursor parallax.
- **Drag-the-llama stage** — a hand-built, low-poly Fortnite loot llama you can spin (`#play`).
- **Interactive About block** — a hovering 3D diamond block.
- **Typewriter headline**, magnetic buttons, 3D-tilt + spotlight project cards, and an infinite skills marquee.
- **Animated project filters**, scroll progress bar, count-up stats, and a drifting aurora backdrop.
- **Custom desktop cursor** and a Minecraft block-build intro splash.
- **Easter egg** — type the Konami code (↑↑↓↓←→←→ B A) for a block rain.

All 3D scenes are code-split and lazy-mounted, and every motion effect respects `prefers-reduced-motion`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build a production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Quality Checks

Run lint:

```bash
npm run lint
```

Run tests:

```bash
npm test
```

Run a full local validation:

```bash
npm run lint
npm test
npm run build
```

## Project Structure

- `src/pages/Index.tsx` composes the homepage.
- `src/components/home/` contains portfolio sections.
- `src/components/layout/` contains page-level layout and navigation.
- `src/components/ui/` contains shared shadcn/Radix UI primitives and custom effects (cursor, marquee, typewriter, etc.).
- `src/components/three/` contains all React Three Fiber scenes and the procedural voxel textures.
- `src/data/projects.ts` contains the project card data, categories, and links.
- `src/test/` contains Vitest setup and render coverage.
