import { describe, it, expect } from "vitest";
import { resume } from "../resume/data";

describe("resume data", () => {
  it("has core identity", () => {
    expect(resume.name).toBe("Sarvesh Karandikar");
    expect(resume.contact.email).toMatch(/@/);
    expect(resume.contact.github).toContain("github.com/sarvesh1karandikar");
  });

  it("has both Cisco roles, most recent first", () => {
    const cisco = resume.experience.filter((e) => e.company === "Cisco Systems");
    expect(cisco.length).toBe(2);
    expect(resume.experience[0].end).toBeNull(); // current role first
  });

  it("every experience entry has at least one domain, tech, and bullet", () => {
    for (const e of resume.experience) {
      expect(e.domains.length).toBeGreaterThan(0);
      expect(e.tech.length).toBeGreaterThan(0);
      expect(e.bullets.length).toBeGreaterThan(0);
    }
  });

  it("includes the DCGAN project tied to the cifar-dcgan repo", () => {
    const dcgan = resume.projects.find((p) => p.id === "cifar-dcgan");
    expect(dcgan).toBeDefined();
    expect(dcgan?.repo).toContain("cifar-dcgan");
  });
});
