import { describe, it, expect } from "vitest";
import { execute } from "../terminal/executor";
import { resume } from "../resume/data";
import type { Query } from "../types";

describe("executor", () => {
  it("filters experience by domain", () => {
    const q: Query = { subject: "experience", clauses: { domain: ["security"] } };
    const r = execute(q, resume);
    expect(r.kind).toBe("experience");
    expect(r.items.length).toBeGreaterThan(0);
    for (const e of r.items as any[]) expect(e.domains).toContain("security");
  });

  it("AND-combines clauses (domain AND tech)", () => {
    const q: Query = { subject: "experience", clauses: { domain: ["security"], tech: ["Java"] } };
    const r = execute(q, resume);
    for (const e of r.items as any[]) {
      expect(e.domains).toContain("security");
      expect(e.tech).toContain("Java");
    }
  });

  it("OR-combines multiple values within one clause", () => {
    const q: Query = { subject: "experience", clauses: { company: ["Cisco Systems", "Circle Link"] } };
    const r = execute(q, resume);
    const companies = new Set((r.items as any[]).map((e) => e.company));
    expect(companies.has("Cisco Systems")).toBe(true);
    expect(companies.has("Circle Link")).toBe(true);
  });

  it("filters experience by since (start year >= value)", () => {
    const q: Query = { subject: "experience", clauses: { since: ["2023"] } };
    const r = execute(q, resume);
    for (const e of r.items as any[]) expect(e.start >= "2023").toBe(true);
  });

  it("returns empty result with a helpful flag when nothing matches", () => {
    const q: Query = { subject: "experience", clauses: { tech: ["COBOL"] } };
    const r = execute(q, resume);
    expect(r.items.length).toBe(0);
    expect(r.empty).toBe(true);
  });

  it("bare subject returns all items", () => {
    const r = execute({ subject: "projects", clauses: {} }, resume);
    expect(r.items.length).toBe(resume.projects.length);
  });
});
