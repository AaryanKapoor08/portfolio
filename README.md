# Aaryan Kapoor Portfolio

Aaryan Kapoor's personal portfolio website, built to showcase AI-focused full-stack projects, technical skills, experience, certifications, education, and contact links.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui and Radix UI primitives
- Framer Motion
- Vitest and Testing Library

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
- `src/components/ui/` contains shared shadcn/Radix UI primitives.
- `src/data/projects.ts` contains the project card data and links.
- `src/test/` contains Vitest setup and render coverage.
