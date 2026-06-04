// ============================================================
// DOM renderers — each function returns an HTML string for its
// section, built from the typed content object. No framework,
// just template literals.
// ============================================================

import type { Experience, Project, AcademicProject, Education, SkillCategory, SiteLinks } from "./content";

// ---- Helpers ----

function esc(s: string): string {
  // Minimal escaping for text content — not attributes.
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function chipsHtml(items: string[]): string {
  return items.map((c) => `<span class="chip">${esc(c)}</span>`).join("");
}

// ---- Navigation ----

export function renderNav(links: SiteLinks): string {
  return `
  <div class="nav">
    <span class="logo">sarvesh<span class="d">k</span>.dev</span>
    <div class="links">
      <a href="#edu">Education</a>
      <a href="#exp">Experience</a>
      <a href="#proj">Projects</a>
      <a href="#acad">Academic</a>
      <a href="#skills">Skills</a>
    </div>
    <a href="${esc(links.resume)}" class="cta" download>Résumé ↓</a>
  </div>`;
}

// ---- Hero ----

export function renderHero(links: SiteLinks): string {
  return `
  <header class="hero">
    <canvas id="net"></canvas>
    <div class="glow"></div>
    <div class="in">
      <span class="badge"><span class="dot"></span>Senior Software Engineer · Cisco</span>
      <h1 class="big">Sarvesh Karandikar.<br>Backend &amp; infra engineer,<br>now building <span class="g">AI — full-stack</span>.</h1>
      <p class="lead">I spent five years engineering backend, cloud, and security infrastructure at Cisco — then carried that rigor into AI. Today I ship agentic systems end to end: the models, the platform, and the tooling.</p>
      <div class="arc">
        <div class="step s1"><div class="yr">2019 — 2023</div><div class="nm">Backend + Infra</div></div>
        <div class="step s2"><div class="yr">2023 — 2025</div><div class="nm">Platform + Security</div></div>
        <div class="step s3"><div class="yr">2025 — now</div><div class="nm">Full-stack AI</div></div>
      </div>
      <div class="row">
        <a href="#exp" class="b1">See the proof →</a>
        <a href="${esc(links.resume)}" class="b2" download>Résumé</a>
      </div>
    </div>
  </header>`;
}

// ---- Experience ----

export function renderExperience(experiences: Experience[]): string {
  const jobs = experiences
    .map(
      (exp) => `
    <div class="job ${exp.className}">
      <div class="jobcard">
        <div class="head">
          <span class="role">${esc(exp.role)}</span>
          <span class="when">${esc(exp.period)}</span>
        </div>
        <div class="co">
          ${esc(exp.company)}
          ${exp.productLink ? `<a href="${esc(exp.productLink.href)}" class="plink" target="_blank" rel="noopener">${esc(exp.productLink.text)} ↗</a>` : ""}
        </div>
        <div class="evidence">
          ${exp.evidence
            .map((ev) => `<span class="ev"><span class="k">${esc(ev.key)}</span> ${esc(ev.text)}</span>`)
            .join("")}
        </div>
        <ul>
          ${exp.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
        </ul>
        <div class="chips">${chipsHtml(exp.chips)}</div>
      </div>
    </div>`
    )
    .join("");

  return `
  <section class="exp" id="exp">
    <div class="wrap reveal">
      <div class="label">02 — Experience</div>
      <h2>The throughline</h2>
      <p class="section-lead">Each role built on the last — infrastructure rigor, then platform scale, then AI. The spine runs blue → violet → teal.</p>
      <div class="timeline">${jobs}</div>
    </div>
  </section>`;
}

// ---- Projects ----

export function renderProjects(projects: Project[]): string {
  const cards = projects
    .map(
      (p) => `
    <div class="card" data-project="${esc(p.id)}">
      <div class="top">
        <div class="ico">${esc(p.icon)}</div>
        <span class="src">GitHub ↗</span>
      </div>
      <h3>
        ${esc(p.title)}
        ${p.demoLabel ? `<span class="demo">${esc(p.demoLabel)}</span>` : ""}
      </h3>
      <p>${esc(p.description)}</p>
      <div class="open">View case study →</div>
    </div>`
    )
    .join("");

  return `
  <section class="proj" id="proj">
    <div class="wrap reveal">
      <div class="label">03 — Projects</div>
      <h2>Full-stack proof — built &amp; shipped solo</h2>
      <p class="section-lead">Things I designed and shipped myself, AI work first. Click any card for the case study.</p>
      <div class="cards">${cards}</div>
    </div>
  </section>`;
}

// ---- Academic ----

export function renderAcademic(academic: AcademicProject[], githubUrl: string): string {
  const cards = academic
    .map(
      (a) => `
    <div class="minicard">
      <div class="n">${esc(a.name)}</div>
      <div class="d">${esc(a.description)}</div>
      <div class="t">${esc(a.tech)}</div>
    </div>`
    )
    .join("");

  return `
  <section class="acad" id="acad">
    <div class="wrap reveal">
      <div class="label">04 — Academic &amp; ML</div>
      <h2>Where the AI foundation started</h2>
      <p class="section-lead">USC &amp; SRM coursework and research — the ML groundwork that made the pivot natural.</p>
      <div class="mini">${cards}</div>
      <a class="ghlink" href="${esc(githubUrl)}" target="_blank" rel="noopener">All repos on GitHub ↗</a>
    </div>
  </section>`;
}

// ---- Education ----

export function renderEducation(education: Education[]): string {
  const rows = education
    .map(
      (edu) => `
    <div class="edurow">
      <div class="edusch">${esc(edu.school)}</div>
      <div class="edudeg">${esc(edu.degree)}</div>
      <div class="eduyr">${esc(edu.year)}</div>
    </div>`
    )
    .join("");

  return `
  <section class="edu" id="edu">
    <div class="wrap reveal">
      <div class="label">01 — Education</div>
      <h2>The academic foundation</h2>
      <p class="section-lead">Degrees that grounded the engineering and ML work above.</p>
      <div class="edulist">${rows}</div>
    </div>
  </section>`;
}

// ---- Skills ----

export function renderSkills(skills: SkillCategory[]): string {
  const cols = skills
    .map(
      (cat) => `
    <div class="skillcol ${cat.className}">
      <div class="world">${esc(cat.world)}</div>
      <div class="wsub">${esc(cat.sub)}</div>
      ${cat.groups
        .map(
          (g) => `
      <div class="grp">
        <div class="gh">${esc(g.heading)}</div>
        <div class="items">${chipsHtml(g.items)}</div>
      </div>`
        )
        .join("")}
    </div>`
    )
    .join("");

  return `
  <section class="skills" id="skills">
    <div class="wrap reveal">
      <div class="label">05 — Toolkit</div>
      <h2>Fluent in both worlds</h2>
      <p class="section-lead">The whole point: a stack that spans infrastructure AND AI — that's what full-stack-AI means here.</p>
      <div class="skillmap">${cols}</div>
      <p class="bridge">Python · gRPC · AWS — the bridge that ties both worlds together.</p>
    </div>
  </section>`;
}

// ---- Contact ----

export function renderContact(links: SiteLinks): string {
  return `
  <section class="contact" id="contact">
    <div class="wrap reveal">
      <div class="label">Get in touch</div>
      <h2>Let's build something <span class="g">solid</span>.</h2>
      <div class="row">
        <a href="mailto:${esc(links.email)}" class="b1">${esc(links.email)}</a>
        <a href="${esc(links.linkedin)}" class="b2" target="_blank" rel="noopener">LinkedIn</a>
        <a href="${esc(links.github)}" class="b2" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </section>`;
}

// ---- Footer ----

export function renderFooter(): string {
  return `<footer>© 2026 Sarvesh Karandikar · sarveshk.dev</footer>`;
}

// ---- Case-study modal shell ----

export function renderModalShell(): string {
  return `
  <div class="overlay" id="ov">
    <div class="modal">
      <div class="banner">
        <span class="x" id="cs-close">✕</span>
        <h3 id="cs-title">Project</h3>
      </div>
      <div class="body">
        <div class="meta chips" id="cs-chips"></div>
        <div class="cs">
          <div class="h">The problem</div>
          <p id="cs-prob"></p>
        </div>
        <div class="cs">
          <div class="h">My approach</div>
          <p id="cs-appr"></p>
        </div>
        <div class="cs">
          <div class="h">Outcome</div>
          <p id="cs-out"></p>
        </div>
        <div class="actions">
          <a class="gh" id="cs-gh" target="_blank" rel="noopener">View on GitHub ↗</a>
        </div>
      </div>
    </div>
  </div>`;
}
