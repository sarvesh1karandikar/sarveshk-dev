import type { ResumeData, Subject } from "../types";

export type ParamOptions = Record<string, string[]>;
export type Schema = Record<Subject, ParamOptions>;

const uniqSorted = (xs: string[]): string[] =>
  [...new Set(xs)].sort((a, b) => a.localeCompare(b));

export function buildSchema(data: ResumeData): Schema {
  const expDomains = uniqSorted(data.experience.flatMap((e) => e.domains));
  const expTech = uniqSorted(data.experience.flatMap((e) => e.tech));
  const companies = uniqSorted(data.experience.map((e) => e.company));
  const years = uniqSorted(data.experience.map((e) => e.start.slice(0, 4)));

  const projDomains = uniqSorted(data.projects.flatMap((p) => p.domains));
  const projTech = uniqSorted(data.projects.flatMap((p) => p.tech));

  const skillGroups = uniqSorted(data.skills.map((s) => s.label));
  const schools = uniqSorted(data.education.map((e) => e.school));

  return {
    experience: { domain: expDomains, tech: expTech, company: companies, since: years },
    projects: { domain: projDomains, tech: projTech },
    skills: { group: skillGroups },
    education: { school: schools },
  };
}
