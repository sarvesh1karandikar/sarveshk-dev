// ============================================================
// Case-study modal — reads from the same Project objects that
// power the cards. No duplicated data.
// ============================================================

import { content } from "./content";
import type { Project } from "./content";

const projectMap = new Map<string, Project>(
  content.projects.map((p) => [p.id, p])
);

function getEl(id: string): HTMLElement {
  return document.getElementById(id)!;
}

export function openCaseStudy(projectId: string): void {
  const p = projectMap.get(projectId);
  if (!p) return;

  getEl("cs-title").textContent = p.title;
  getEl("cs-chips").innerHTML = p.chips
    .map((c) => `<span class="chip">${c}</span>`)
    .join("");
  getEl("cs-prob").textContent = p.caseStudy.problem;
  getEl("cs-appr").textContent = p.caseStudy.approach;
  getEl("cs-out").textContent = p.caseStudy.outcome;
  (getEl("cs-gh") as HTMLAnchorElement).href = p.githubUrl;
  getEl("ov").classList.add("on");
}

export function closeCaseStudy(): void {
  getEl("ov").classList.remove("on");
}

export function initModal(): void {
  // Close button
  getEl("cs-close").addEventListener("click", closeCaseStudy);

  // Click outside modal to close
  getEl("ov").addEventListener("click", (e) => {
    if ((e.target as HTMLElement).id === "ov") closeCaseStudy();
  });

  // Escape key
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCaseStudy();
  });

  // Wire up card clicks
  document.querySelectorAll<HTMLElement>(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.project;
      if (id) openCaseStudy(id);
    });
  });
}
