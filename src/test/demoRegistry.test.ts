import { describe, it, expect } from "vitest";
import { demoRegistry, getDemo } from "../demos/registry";
import { resume } from "../resume/data";

describe("demo registry", () => {
  it("has an entry for every project flagged demo:true", () => {
    const demoProjects = resume.projects.filter((p) => p.demo).map((p) => p.id);
    for (const id of demoProjects) {
      expect(getDemo(id), `missing demo entry for ${id}`).toBeDefined();
    }
  });

  it("every entry has a valid status and a mount function", () => {
    for (const d of demoRegistry) {
      expect(["live", "prebaked", "mock"]).toContain(d.status);
      expect(typeof d.mount).toBe("function");
    }
  });

  it("mount returns an HTMLElement", () => {
    const el = getDemo("satellite-road-detection")!.mount();
    expect(el).toBeInstanceOf(HTMLElement);
  });

  it("getDemo returns undefined for unknown id", () => {
    expect(getDemo("nope")).toBeUndefined();
  });
});
