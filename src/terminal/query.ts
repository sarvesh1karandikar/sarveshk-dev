import type { Query, Param } from "../types";

const PARAM_ORDER: Param[] = ["domain", "tech", "company", "since"];

export function serializeToCommand(q: Query): string {
  const parts = [`query ${q.subject}`];
  for (const p of PARAM_ORDER) {
    const vals = q.clauses[p];
    if (vals && vals.length) parts.push(`--${p}=${vals.join(",")}`);
  }
  // include any non-standard params (e.g. group, school) after ordered ones
  for (const key of Object.keys(q.clauses)) {
    if (!PARAM_ORDER.includes(key as Param)) {
      const vals = (q.clauses as Record<string, string[]>)[key];
      if (vals && vals.length) parts.push(`--${key}=${vals.join(",")}`);
    }
  }
  return parts.join(" ");
}

export function toURLParam(q: Query): string {
  return encodeURIComponent(JSON.stringify(q));
}

export function fromURLParam(raw: string): Query | null {
  try {
    const obj = JSON.parse(decodeURIComponent(raw));
    if (obj && typeof obj.subject === "string" && obj.clauses && typeof obj.clauses === "object") {
      return obj as Query;
    }
    return null;
  } catch {
    return null;
  }
}
