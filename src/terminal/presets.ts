import type { Query } from "../types";

export interface Preset {
  label: string;
  icon: string;
  query?: Query;
  runDemo?: string; // demo registry id
}

export const presets: Preset[] = [
  { label: "Security work", icon: "🔐", query: { subject: "experience", clauses: { domain: ["security"] } } },
  { label: "Cloud / K8s experience", icon: "☁️", query: { subject: "experience", clauses: { domain: ["cloud", "infra"] } } },
  { label: "ML projects", icon: "🧠", query: { subject: "projects", clauses: { domain: ["ml"] } } },
  { label: "run road-detection demo", icon: "▶", runDemo: "satellite-road-detection" },
];
