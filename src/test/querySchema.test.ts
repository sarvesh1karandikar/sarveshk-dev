import { describe, it, expect } from "vitest";
import { buildSchema, type Schema } from "../terminal/querySchema";
import { resume } from "../resume/data";

describe("query schema", () => {
  const schema: Schema = buildSchema(resume);

  it("offers the four subjects", () => {
    expect(Object.keys(schema)).toEqual(
      expect.arrayContaining(["experience", "projects", "skills", "education"]),
    );
  });

  it("experience supports domain, tech, company, since params", () => {
    expect(Object.keys(schema.experience)).toEqual(
      expect.arrayContaining(["domain", "tech", "company", "since"]),
    );
  });

  it("derives company options from the data (deduped)", () => {
    expect(schema.experience.company).toContain("Cisco Systems");
    const ciscoCount = schema.experience.company.filter((c) => c === "Cisco Systems").length;
    expect(ciscoCount).toBe(1);
  });

  it("derives tech options as the sorted union across entries", () => {
    expect(schema.experience.tech).toContain("Java");
    expect(schema.experience.tech).toContain("Terraform");
    const sorted = [...schema.experience.tech].sort((a, b) => a.localeCompare(b));
    expect(schema.experience.tech).toEqual(sorted);
  });

  it("never offers an empty option list for a declared param", () => {
    for (const subject of Object.keys(schema) as (keyof Schema)[]) {
      for (const param of Object.keys(schema[subject])) {
        expect((schema[subject] as Record<string, string[]>)[param].length).toBeGreaterThan(0);
      }
    }
  });
});
