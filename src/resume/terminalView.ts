import type { ResultModel } from "../terminal/executor";
import type { Experience, Project, SkillGroup, Education } from "../types";
import { getDemo } from "../demos/registry";

function card(inner: string, cls = ""): HTMLElement {
  const c = document.createElement("div");
  c.className = `res-card ${cls}`;
  c.innerHTML = inner;
  return c;
}

function fmtRange(start: string, end: string | null): string {
  return `${start} – ${end ?? "present"}`;
}

export function renderResult(model: ResultModel): HTMLElement {
  const wrap = document.createElement("div");
  if (model.empty) {
    wrap.className = "res-empty";
    wrap.textContent = "No matches — try removing a filter.";
    return wrap;
  }
  switch (model.kind) {
    case "experience":
      (model.items as Experience[]).forEach((e) =>
        wrap.appendChild(
          card(
            `<h4>${e.role}</h4>
             <div class="res-meta">${e.company} · ${fmtRange(e.start, e.end)} · ${e.domains.join(", ")}</div>
             <ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
             <div class="res-tags">${e.tech.map((t) => `<span class="res-tag">${t}</span>`).join("")}</div>`,
          ),
        ),
      );
      break;
    case "projects":
      (model.items as Project[]).forEach((p) => {
        const c = card(
          `<h4>${p.title}</h4>
           <p>${p.blurb}</p>
           <div class="res-tags">${p.tech.map((t) => `<span class="res-tag">${t}</span>`).join("")}</div>`,
        );
        if (p.demo && getDemo(p.id)) {
          const btn = document.createElement("button");
          btn.className = "res-run";
          btn.textContent = "▶ run demo";
          btn.dataset.demo = p.id;
          c.appendChild(btn);
        }
        wrap.appendChild(c);
      });
      break;
    case "skills":
      (model.items as SkillGroup[]).forEach((g) =>
        wrap.appendChild(
          card(`<h4>${g.label}</h4><div class="res-tags">${g.items.map((i) => `<span class="res-tag">${i}</span>`).join("")}</div>`),
        ),
      );
      break;
    case "education":
      (model.items as Education[]).forEach((e) =>
        wrap.appendChild(
          card(`<h4>${e.school}</h4><div class="res-meta">${e.degree} · ${e.end}</div>`),
        ),
      );
      break;
  }
  return wrap;
}
