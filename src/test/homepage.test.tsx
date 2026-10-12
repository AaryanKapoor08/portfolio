import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Index from "@/pages/Index";
import Research from "@/pages/Research";
import { projects } from "@/data/projects";
import { profileLinks } from "@/data/profile";

const renderAt = (path: string, ui: ReactElement) =>
  render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

describe("portfolio homepage", () => {
  it("renders the key homepage sections and contact email", () => {
    renderAt("/", <Index />);

    expect(screen.getByRole("heading", { name: /aaryan kapoor/i })).toBeInTheDocument();
    expect(screen.getByText(/cs student at unb/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /featured projects/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /about me/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /technical skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /aaryan\.kapoor@unb\.ca/i })).toHaveAttribute(
      "href",
      `mailto:${profileLinks.email}`,
    );
  });

  it("renders project content and real portfolio links", () => {
    renderAt("/", <Index />);

    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
      expect(screen.getAllByText(project.date).length).toBeGreaterThan(0);
      if (project.githubUrl) {
        expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/(AaryanKapoor08|PriyanArora)\//);
        expect(project.githubUrl).not.toBe("#");
      }
      expect(project.demoUrl).not.toBe("#");
    }

    expect(screen.getByRole("link", { name: /promptgod live demo/i })).toHaveAttribute(
      "href",
      "https://chromewebstore.google.com/detail/promptgod/cohbligncfolnlncmobbelfjiehlpijo",
    );
    expect(screen.getByRole("link", { name: /auctus live demo/i })).toHaveAttribute(
      "href",
      "https://auctus-five.vercel.app/",
    );
    expect(screen.getAllByRole("link", { name: /github/i })[0]).toHaveAttribute(
      "href",
      profileLinks.github,
    );
    expect(screen.getAllByRole("link", { name: /linkedin/i })[0]).toHaveAttribute(
      "href",
      profileLinks.linkedin,
    );
  });

  it("offers the resume download and links to the research page", () => {
    renderAt("/", <Index />);

    for (const link of screen.getAllByRole("link", { name: /download resume/i })) {
      expect(link).toHaveAttribute("href", profileLinks.resume);
      expect(link).toHaveAttribute("download");
    }
    expect(screen.getAllByRole("link", { name: /^research$/i })[0]).toHaveAttribute("href", "/research");
  });
});

describe("research page", () => {
  it("renders every research section in order", () => {
    renderAt("/research", <Research />);

    expect(screen.getByRole("heading", { level: 1, name: /embedded llm research harness/i })).toBeInTheDocument();
    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Overview",
      "Five setups, one pipeline",
      "Task suite",
      "How a program is judged",
      "Testing",
      "Fairness",
      "Determinism",
      "Audit",
      "Analysis",
      "Tech stack",
      "Progress",
    ]);
  });
});
