import type { Query, Subject, Param } from "../types";
import type { Schema } from "./querySchema";
import { serializeToCommand } from "./query";

const SUBJECTS: Subject[] = ["experience", "projects", "skills", "education"];

export interface BuilderHandle {
  root: HTMLElement;
  getQuery: () => Query;
  setQuery: (q: Query) => void;
  onRun: (cb: (q: Query) => void) => void;
}

export function createQueryBuilder(schema: Schema): BuilderHandle {
  let state: Query = { subject: "experience", clauses: {} };
  let runCb: (q: Query) => void = () => {};

  const root = document.createElement("div");
  root.className = "qb";

  const render = () => {
    const paramOpts = schema[state.subject] as Record<string, string[]>;
    root.innerHTML = `
      <div class="qb-label">1 · Subject</div>
      <div class="qb-row qb-subjects">
        ${SUBJECTS.map(
          (s) => `<button class="qb-pill ${s === state.subject ? "on" : ""}" data-subject="${s}">${s}</button>`,
        ).join("")}
      </div>
      <div class="qb-label">2 · Filters</div>
      <div class="qb-clauses">
        ${Object.keys(paramOpts)
          .map((param, idx) => {
            const selected = (state.clauses as Record<string, string[]>)[param] || [];
            return `<div class="qb-clause">
              <span class="qb-conj">${idx === 0 ? "where" : "and"}</span>
              <span class="qb-key">${param}</span>
              <span class="qb-vals">
                ${paramOpts[param]
                  .map(
                    (v) =>
                      `<button class="qb-val ${selected.includes(v) ? "on" : ""}" data-param="${param}" data-val="${v}">${v}</button>`,
                  )
                  .join("")}
              </span>
            </div>`;
          })
          .join("")}
      </div>
      <div class="qb-preview">
        <span class="qb-cmd">${serializeToCommand(state)}</span>
        <button class="qb-run">Run query ↵</button>
      </div>`;

    root.querySelectorAll<HTMLButtonElement>("[data-subject]").forEach((b) =>
      b.addEventListener("click", () => {
        state = { subject: b.dataset.subject as Subject, clauses: {} };
        render();
      }),
    );
    root.querySelectorAll<HTMLButtonElement>("[data-val]").forEach((b) =>
      b.addEventListener("click", () => {
        const param = b.dataset.param as Param;
        const val = b.dataset.val!;
        const cur = new Set((state.clauses as Record<string, string[]>)[param] || []);
        cur.has(val) ? cur.delete(val) : cur.add(val);
        (state.clauses as Record<string, string[]>)[param] = [...cur];
        if (cur.size === 0) delete (state.clauses as Record<string, string[]>)[param];
        render();
      }),
    );
    root.querySelector<HTMLButtonElement>(".qb-run")!.addEventListener("click", () => runCb(state));
  };

  render();

  return {
    root,
    getQuery: () => state,
    setQuery: (q) => { state = q; render(); },
    onRun: (cb) => { runCb = cb; },
  };
}
