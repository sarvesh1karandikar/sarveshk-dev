import type { ResumeData } from "../types";

export function renderResume(data: ResumeData, mode: "embedded" | "classic"): HTMLElement {
  const root = document.createElement("main");
  root.className = `resume resume-${mode}`;

  const section = (title: string, body: string) =>
    `<section class="resume-sec"><h2>${title}</h2>${body}</section>`;

  const exp = data.experience
    .map(
      (e) => `<div class="resume-job">
        <div class="resume-job-head"><span class="resume-role">${e.role}</span><span class="resume-when">${e.start} – ${e.end ?? "present"}</span></div>
        <div class="resume-co">${e.company}</div>
        <ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      </div>`,
    )
    .join("");

  const projects = data.projects
    .map(
      (p) => `<div class="resume-proj"><span class="resume-proj-title">${p.title}</span> — ${p.blurb}
        ${p.repo ? `<a class="resume-link" href="${p.repo}">repo ↗</a>` : ""}</div>`,
    )
    .join("");

  const skills = data.skills
    .map((g) => `<div class="resume-skill"><span class="resume-skill-label">${g.label}:</span> ${g.items.join(" · ")}</div>`)
    .join("");

  const edu = data.education
    .map((e) => `<div class="resume-edu"><strong>${e.school}</strong> — ${e.degree} (${e.end})</div>`)
    .join("");

  const contact = `
    <a href="mailto:${data.contact.email}">${data.contact.email}</a> ·
    <a href="${data.contact.github}">GitHub</a>
    ${data.contact.linkedin ? `· <a href="${data.contact.linkedin}">LinkedIn</a>` : ""}`;

  root.innerHTML = `
    ${mode === "classic" ? `<div class="resume-header"><h1>${data.name}</h1><div class="resume-title">${data.title}</div><div class="resume-contact">${contact}</div></div>` : `<div class="resume-scrollhint">↓ full resume</div>`}
    ${section("Experience", exp)}
    ${section("Projects", projects)}
    ${section("Skills", skills)}
    ${section("Education", edu)}
    ${mode === "embedded" ? section("Contact", `<div class="resume-contact">${contact}</div>`) : ""}`;
  return root;
}
