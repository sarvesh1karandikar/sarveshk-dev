import type { ResumeData, Query, Experience, Project, SkillGroup, Education } from "../types";

export interface ResultModel {
  kind: Query["subject"];
  items: (Experience | Project | SkillGroup | Education)[];
  empty: boolean;
  command: string; // filled by caller if desired; kept simple here
}

const hasAny = (have: string[], want?: string[]): boolean =>
  !want || want.length === 0 || want.some((w) => have.includes(w));

function filterExperience(items: Experience[], c: Query["clauses"]): Experience[] {
  return items.filter(
    (e) =>
      hasAny(e.domains, c.domain) &&
      hasAny(e.tech, c.tech) &&
      hasAny([e.company], c.company) &&
      (!c.since || c.since.length === 0 || c.since.some((y) => e.start.slice(0, 4) >= y)),
  );
}

function filterProjects(items: Project[], c: Query["clauses"]): Project[] {
  return items.filter((p) => hasAny(p.domains, c.domain) && hasAny(p.tech, c.tech));
}

export function execute(q: Query, data: ResumeData): ResultModel {
  let items: ResultModel["items"];
  switch (q.subject) {
    case "experience":
      items = filterExperience(data.experience, q.clauses);
      break;
    case "projects":
      items = filterProjects(data.projects, q.clauses);
      break;
    case "skills": {
      const g = (q.clauses as Record<string, string[]>).group;
      items = g && g.length ? data.skills.filter((s) => g.includes(s.label)) : data.skills;
      break;
    }
    case "education": {
      const s = (q.clauses as Record<string, string[]>).school;
      items = s && s.length ? data.education.filter((e) => s.includes(e.school)) : data.education;
      break;
    }
  }
  return { kind: q.subject, items, empty: items.length === 0, command: "" };
}
