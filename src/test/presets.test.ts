import { describe, it, expect } from "vitest";
import { presets } from "../terminal/presets";
import { execute } from "../terminal/executor";
import { resume } from "../resume/data";

describe("presets", () => {
  it("every preset has a label and a runnable query or demo id", () => {
    expect(presets.length).toBeGreaterThanOrEqual(4);
    for (const p of presets) {
      expect(p.label.length).toBeGreaterThan(0);
      expect(p.query || p.runDemo).toBeTruthy();
    }
  });

  it("non-demo presets return at least one item (no dead presets)", () => {
    for (const p of presets) {
      if (p.query) {
        const r = execute(p.query, resume);
        expect(r.items.length).toBeGreaterThan(0);
      }
    }
  });
});
