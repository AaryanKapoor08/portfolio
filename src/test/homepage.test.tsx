import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Index from "@/pages/Index";
import { projects } from "@/data/projects";
import { profileLinks } from "@/data/profile";

describe("portfolio homepage", () => {
  it("renders the key homepage sections and contact email", () => {
    render(<Index />);

    expect(screen.getByRole("heading", { name: /aaryan kapoor/i })).toBeInTheDocument();
    expect(screen.getByText(/full stack ai developer/i)).toBeInTheDocument();
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
    render(<Index />);

    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
      expect(screen.getAllByText(project.date).length).toBeGreaterThan(0);
      if (project.githubUrl) {
        expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/AaryanKapoor08\//);
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
});
