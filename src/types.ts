export type Domain = "security" | "cloud" | "ml" | "infra" | "web" | "data";

export interface Experience {
  role: string;
  company: string;
  start: string;        // ISO "YYYY-MM"
  end: string | null;   // null = present
  location?: string;
  domains: Domain[];
  tech: string[];
  bullets: string[];
}

export interface Project {
  id: string;           // matches DemoEntry.id when demoable
  title: string;
  blurb: string;
  tech: string[];
  domains: Domain[];
  repo?: string;        // GitHub URL
  demo?: boolean;       // has an entry in the demo registry
}

export interface SkillGroup {
  label: string;        // "Languages", "Cloud", ...
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  end: string;          // "YYYY-MM"
  coursework?: string[];
}

export interface Contact {
  email: string;
  github: string;
  linkedin?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
  contact: Contact;
}

export type Subject = "experience" | "projects" | "skills" | "education";
export type Param = "domain" | "tech" | "company" | "since";

export interface Query {
  subject: Subject;
  clauses: Partial<Record<Param, string[]>>;
}
