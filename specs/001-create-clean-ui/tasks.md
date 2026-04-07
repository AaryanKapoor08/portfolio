---

description: "Task list for creating a clean UI for the portfolio website"
---

# Tasks: Create Clean UI for Portfolio Website

**Input**: Design documents from `.lovable/plan.md` and project `package.json`
**Prerequisites**: `.lovable/plan.md` (required), `package.json` (required)

**Tests**: TDD approach not explicitly requested; tasks focus on implementation and manual validation of UI/UX.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Configure global theme (colors: white/cream, accent: soft blue/muted charcoal) and typography (Inter) in `tailwind.config.ts` and `src/index.css`
- [ ] T002 Implement base `Layout` component wrapper in `src/components/layout/Layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 [P] Create `Section` wrapper for consistent spacing and padding in `src/components/ui/Section.tsx`
- [ ] T004 [P] Create generic `Badge` component for tech stacks in `src/components/ui/Badge.tsx`
- [ ] T005 [P] Create custom `Button` variants (Primary, Secondary) in `src/components/ui/Button.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Hero Section (Priority: P1) 🎯 MVP

**Goal**: Implement the landing area with a clear value proposition and CTAs.

**Independent Test**: Verify the Hero section displays name, title, tagline, social links, and buttons with correct styling and background.

### Implementation for User Story 1

- [ ] T006 [US1] Implement Hero content (Name, Title, Tagline) in `src/components/home/Hero.tsx`
- [ ] T007 [P] [US1] Add social links and CTA buttons ("View Projects", "Get in Touch") to Hero in `src/components/home/Hero.tsx`
- [ ] T008 [US1] Implement animated gradient or soft background texture for Hero in `src/components/home/Hero.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Projects Gallery (Priority: P1)

**Goal**: Showcase key projects (Auctus AI, Prompt Amplifier, RAG Pipeline, Hangry) with detailed cards.

**Independent Test**: Verify that 4 project cards are rendered in a grid, each showing the tech stack, highlights, and links.

### Implementation for User Story 2

- [ ] T009 [US2] Define projects data structure (name, description, badges, highlights, links) in `src/data/projects.ts`
- [ ] T010 [P] [US2] Create `ProjectCard` component with tech badges and key highlights in `src/components/home/ProjectCard.tsx`
- [ ] T011 [US2] Implement Projects grid layout mapping over projects data in `src/components/home/Projects.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Global Interactions (Priority: P1)

**Goal**: Implement navigation and smooth entrance animations for the whole page.

**Independent Test**: Verify that the Navbar is sticky, links scroll to correct sections, and sections animate in on scroll.

### Implementation for User Story 3

- [ ] T012 [US3] Implement sticky `Navbar` with smooth scroll links in `src/components/layout/Navbar.tsx`
- [ ] T013 [US3] Implement scroll-reveal animations using Framer Motion in `src/components/ui/Reveal.tsx`
- [ ] T014 [US3] Apply `Reveal` component to all main sections in `src/pages/Home.tsx`

**Checkpoint**: All P1 user stories should now be independently functional

---

## Phase 6: User Story 4 - About & Skills (Priority: P2)

**Goal**: Provide a brief bio and visually grouped technical skills.

**Independent Test**: Verify the bio paragraph is rendered and skills are displayed in a clean pill/badge layout grouped by category.

### Implementation for User Story 4

- [ ] T015 [US4] Implement About bio section in `src/components/home/About.tsx`
- [ ] T016 [P] [US4] Implement Skills grouped pill layout (Languages, AI/ML, Web, DevOps, Tools) in `src/components/home/Skills.tsx`

**Checkpoint**: User Story 4 should be fully functional and testable independently

---

## Phase 7: User Story 5 - Experience & Certifications (Priority: P2)

**Goal**: Display professional timeline and certifications as cards.

**Independent Test**: Verify the experience timeline (Ideation Boost Camp, Code Social) and certification cards (Oracle, APEX, etc.) are correctly rendered.

### Implementation for User Story 5

- [ ] T017 [US5] Implement timeline-style Experience section in `src/components/home/Experience.tsx`
- [ ] T018 [P] [US5] Implement Certification cards in `src/components/home/Certifications.tsx`

**Checkpoint**: User Story 5 should be fully functional and testable independently

---

## Phase 8: User Story 6 - Education (Priority: P3)

**Goal**: Display educational background.

**Independent Test**: Verify the University of New Brunswick (CS, GPA 3.9/4.2) details are displayed.

### Implementation for User Story 6

- [ ] T019 [US6] Implement Education section in `src/components/home/Education.tsx`

**Checkpoint**: User Story 6 should be fully functional and testable independently

---

## Phase 9: User Story 7 - Contact & Footer (Priority: P3)

**Goal**: Provide ways to get in touch and a minimal footer.

**Independent Test**: Verify that the contact form/CTA, email, and LinkedIn links are functional and the footer is minimal.

### Implementation for User Story 7

- [ ] T020 [US7] Implement contact form or mailto CTA in `src/components/home/Contact.tsx`
- [ ] T021 [P] [US7] Create minimal Footer component with social links in `src/components/layout/Footer.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T022 [P] Verify mobile responsiveness for all sections in `src/pages/Home.tsx`
- [ ] T023 [P] Fine-tune typography (Inter vs display font) and spacing in `src/index.css`
- [ ] T024 [P] Optimize animations (fade + slide up) for smoothness in `src/components/ui/Reveal.tsx`
- [ ] T025 Run `npm run lint` and fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1, US2, US3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **US4, US5 (P2)**: Can start after Foundational (Phase 2)
- **US6, US7 (P3)**: Can start after Foundational (Phase 2)

### Within Each User Story

- Models/Data before UI components
- Core implementation before interaction/animation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational phase completes, US1, US2, and US3 can start in parallel
- UI components within stories (T007, T010, T016, T018, T021) can run in parallel

---

## Parallel Example: User Story 2

```bash
# Launch all project-related UI components together:
Task: "Define projects data structure in src/data/projects.ts"
Task: "Create ProjectCard component with badges and highlights in src/components/home/ProjectCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1, 2, 3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Hero)
4. Complete Phase 4: User Story 2 (Projects)
5. Complete Phase 5: User Story 3 (Global Interactions)
6. **STOP and VALIDATE**: Test the core landing page experience independently
7. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Implement P1 Stories (US1, US2, US3) → Test independently → Deploy/Demo (MVP!)
3. Implement P2 Stories (US4, US5) → Test independently → Deploy/Demo
4. Implement P3 Stories (US6, US7) → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify components are mobile responsive
- Commit after each task or logical group
