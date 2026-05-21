---
description: "Task list for creating a clean UI for the portfolio website"
---

# Tasks: Create Clean UI for Portfolio Website

**Input**: `specs/001-create-clean-ui/spec.md` and the existing Vite React project
**Prerequisites**: `package.json`, `src/App.tsx`, `src/pages/Index.tsx`

## Phase 1: Setup and Foundation

- [x] T001 Configure theme, typography, and global styles in `tailwind.config.ts` and `src/index.css`
- [x] T002 Implement base layout wrapper in `src/components/layout/Layout.tsx`
- [x] T003 Create reusable section wrapper in `src/components/ui/Section.tsx`
- [x] T004 Use shared shadcn `Badge` and `Button` primitives for portfolio UI
- [x] T005 Resolve current lint errors in shadcn/Tailwind files

## Phase 2: Core Portfolio Sections

- [x] T006 Implement hero content in `src/components/home/Hero.tsx`
- [x] T007 Add real hero social links and CTA buttons
- [x] T008 Implement visual hero background treatment
- [x] T009 Define real project data and links in `src/data/projects.ts`
- [x] T010 Create project cards in `src/components/home/ProjectCard.tsx`
- [x] T011 Implement featured projects grid in `src/components/home/Projects.tsx`
- [x] T012 Implement sticky navbar in `src/components/layout/Navbar.tsx`
- [x] T013 Implement scroll reveal wrapper in `src/components/ui/Reveal.tsx`
- [x] T014 Compose homepage sections in `src/pages/Index.tsx`

## Phase 3: Supporting Content

- [x] T015 Implement About section with real bio content in `src/components/home/About.tsx`
- [x] T016 Replace fake profile image placeholder with polished initials visual
- [x] T017 Implement grouped Skills section in `src/components/home/Skills.tsx`
- [x] T018 Implement Experience, certifications, and education in `src/components/home/Experience.tsx`
- [x] T019 Implement Contact section and footer content in `src/components/home/Contact.tsx`
- [x] T020 Consolidate duplicate portfolio components under `src/components/home/`

## Phase 4: Documentation and Validation

- [x] T021 Replace TODO README with project documentation
- [x] T022 Replace template feature specification with portfolio-specific requirements
- [x] T023 Update task list to reflect completed and remaining work
- [x] T024 Replace placeholder Vitest test with homepage render coverage
- [x] T025 Run final validation: `npm run lint`, `npm test`, `npm run build`, and `git status --short --branch`

## Current Notes

- `.opencode/` and `.specify/` are untracked local tool folders and are not part of the portfolio source.
- Lint currently reports shadcn fast-refresh warnings but no lint errors.
