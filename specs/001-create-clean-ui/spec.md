# Feature Specification: Clean Portfolio UI

**Feature Branch**: `001-create-clean-ui`
**Created**: 2026-05-21
**Status**: Implemented, pending final test coverage expansion
**Input**: Build a clean Vite + React + TypeScript portfolio for Aaryan Kapoor with accurate content, project links, and maintainable component structure.

## User Scenarios & Testing

### User Story 1 - Understand Who Aaryan Is (Priority: P1)

Visitors can immediately see Aaryan Kapoor's name, role, value proposition, and primary contact/social links.

**Why this priority**: The hero section is the first impression and must communicate identity and credibility quickly.

**Independent Test**: Render the homepage and verify the hero displays "Aaryan Kapoor", "Full Stack AI Developer", project/contact CTAs, email, GitHub, and LinkedIn links.

**Acceptance Scenarios**:

1. **Given** a visitor opens the homepage, **When** the hero loads, **Then** Aaryan's name, title, tagline, and CTAs are visible.
2. **Given** a visitor selects a social/contact link, **When** the link is activated, **Then** it points to the real email, GitHub, or LinkedIn URL.

### User Story 2 - Review Project Work (Priority: P1)

Visitors can browse featured projects with descriptions, tech stacks, highlights, source links, and live links where available.

**Why this priority**: Projects are the primary proof of skill for a portfolio site.

**Independent Test**: Render the projects section and verify the GitHub-backed project cards are present with non-placeholder links.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to Projects, **When** the section renders, **Then** four project cards are shown.
2. **Given** a project has a live deployment, **When** the card renders, **Then** it displays a live demo link.
3. **Given** a project does not have a live deployment, **When** the card renders, **Then** it does not show a fake `#` live link.

### User Story 3 - Navigate the Portfolio (Priority: P1)

Visitors can move between homepage sections using sticky navigation and smooth section links.

**Why this priority**: The portfolio is a single-page experience; navigation must make scanning easy.

**Independent Test**: Verify navigation links target the expected section anchors: home, projects, about, experience, and contact.

**Acceptance Scenarios**:

1. **Given** the homepage is open, **When** the user chooses a nav link, **Then** the browser targets the corresponding section.
2. **Given** the user scrolls down, **When** the navbar state updates, **Then** the navbar remains available.

### User Story 4 - Assess Background and Skills (Priority: P2)

Visitors can read a concise bio, see grouped skills, and review experience, certifications, and education.

**Why this priority**: Skills and experience add context after the visitor has seen identity and projects.

**Independent Test**: Render the homepage and verify About, Skills, Experience, certifications, and UNB education content appear.

**Acceptance Scenarios**:

1. **Given** a visitor reaches About, **When** the section renders, **Then** it describes Aaryan's UNB and AI/full-stack background.
2. **Given** a visitor reaches Skills, **When** the section renders, **Then** skills are grouped into readable categories.
3. **Given** a visitor reaches Experience, **When** the section renders, **Then** timeline, certification, and education details are visible.

### User Story 5 - Contact Aaryan (Priority: P2)

Visitors can contact Aaryan through a clear email CTA and social links.

**Why this priority**: The portfolio should convert interest into a direct conversation.

**Independent Test**: Render Contact and verify `aaryan.kapoor@unb.ca`, GitHub, and LinkedIn links are present.

**Acceptance Scenarios**:

1. **Given** a visitor reaches Contact, **When** the section renders, **Then** the email CTA is visible.
2. **Given** a visitor chooses a social link, **When** it opens, **Then** it targets the real GitHub or LinkedIn URL.

## Edge Cases

- Projects without live demos must not render placeholder or broken demo links.
- The About visual must not show fake placeholder text if no real profile image exists.
- Homepage sections must remain readable on small screens.
- Removed duplicate components must not leave stale imports.

## Requirements

### Functional Requirements

- **FR-001**: The homepage MUST render hero, projects, about, skills, experience, and contact sections.
- **FR-002**: The hero and contact areas MUST use shared profile links for `aaryan.kapoor@unb.ca`, `https://github.com/AaryanKapoor08`, and `https://www.linkedin.com/in/aaryan-kapoor-88a007332/`.
- **FR-003**: Project data MUST avoid placeholder `#` URLs.
- **FR-004**: Project cards MUST render live demo controls only when a real demo URL exists.
- **FR-005**: Portfolio section components MUST live consistently under `src/components/home/`.
- **FR-006**: The app MUST pass lint, tests, and production build.

### Key Entities

- **Project**: A portfolio project with id, name, description, tech stack, highlights, source URL, and optional demo URL.
- **Skill Group**: A category label with a list of related skills.
- **Experience Item**: A timeline entry with role, organization, date, location, and supporting points.
- **Certification**: A credential with name, issuer, and date.

## Success Criteria

- **SC-001**: A visitor can identify the portfolio owner and role from the first viewport.
- **SC-002**: All featured project cards display real content and no placeholder links.
- **SC-003**: Contact links are accurate and visible in the hero/contact areas.
- **SC-004**: The project has automated render coverage for key homepage content.
- **SC-005**: `npm run lint`, `npm test`, and `npm run build` complete successfully.

## Assumptions

- The portfolio is a single-page marketing/profile site.
- No real profile image is available, so a polished initials visual is acceptable.
- Projects without live deployments should link only to source code.
- The existing Vite, React, Tailwind, shadcn/ui, and Framer Motion stack should be preserved.
