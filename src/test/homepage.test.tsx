import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Index from "@/pages/Index";
import { projects } from "@/data/projects";

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
      "mailto:aaryan.kapoor@unb.ca",
    );
  });

  it("renders project content and real portfolio links", () => {
    render(<Index />);

    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
      expect(project.githubUrl).toMatch(/^https:\/\/github\.com\/AaryanKapoor08\//);
      expect(project.githubUrl).not.toBe("#");
      expect(project.demoUrl).not.toBe("#");
    }

    for (const liveDemoLink of screen.getAllByRole("link", { name: /live demo/i })) {
      expect(liveDemoLink).toHaveAttribute("href", "https://auctus-kohv.vercel.app");
    }
    expect(screen.getAllByRole("link", { name: /github/i })[0]).toHaveAttribute(
      "href",
      "https://github.com/AaryanKapoor08",
    );
    expect(screen.getAllByRole("link", { name: /linkedin/i })[0]).toHaveAttribute(
      "href",
      "https://linkedin.com/in/aaryan-kapoor-88a007332",
    );
  });
});
