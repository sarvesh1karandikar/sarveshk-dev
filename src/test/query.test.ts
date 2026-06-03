import { describe, it, expect } from "vitest";
import { serializeToCommand, toURLParam, fromURLParam } from "../terminal/query";
import type { Query } from "../types";

const q: Query = {
  subject: "experience",
  clauses: { domain: ["security"], tech: ["Java", "Go"] },
};

describe("query serialization", () => {
  it("serializes to a readable command line", () => {
    expect(serializeToCommand(q)).toBe(
      "query experience --domain=security --tech=Java,Go",
    );
  });

  it("renders bare subject with no clauses", () => {
    expect(serializeToCommand({ subject: "skills", clauses: {} })).toBe("query skills");
  });

  it("round-trips through URL param", () => {
    const encoded = toURLParam(q);
    const decoded = fromURLParam(encoded);
    expect(decoded).toEqual(q);
  });

  it("fromURLParam returns null on garbage", () => {
    expect(fromURLParam("%%%not-json%%%")).toBeNull();
  });
});
