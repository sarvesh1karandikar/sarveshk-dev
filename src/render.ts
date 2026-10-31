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
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header nav wrap">
    <a class="wordmark" href="/">Sarvesh Karandikar<span aria-hidden="true">.</span></a>
    <nav class="links" aria-label="Résumé navigation">
      <a href="#exp">Experience</a>
      <a href="#proj">Projects</a>
      <a href="#edu">Education</a>
      <a href="#acad">Academic</a>
      <a href="#skills">Skills</a>
      <a href="${esc(links.resume)}" class="resume-link" download>PDF résumé <span aria-hidden="true">↓</span></a>
    </nav>
  </header>`;
}

// ---- Hero ----

export function renderHero(links: SiteLinks): string {
  return `
  <header class="hero wrap" id="top">
    <div class="hero-copy">
      <p class="eyebrow">Curriculum vitae / Cisco Systems</p>
      <h1 class="big">Infrastructure roots.<br><em>Agentic AI</em> in practice.</h1>
      <p class="lead">Senior Software Engineer at Cisco. My work spans infrastructure, multimodal agents, developer platforms, and the tooling behind AI applications.</p>
      <div class="row">
        <a href="#exp" class="b1">Explore my experience <span aria-hidden="true">↓</span></a>
        <a href="${esc(links.resume)}" class="b2" download>Download résumé <span aria-hidden="true">↓</span></a>
      </div>
    </div>
    <aside class="career-note" aria-label="Career progression">
      <p class="eyebrow">The throughline</p>
      <div class="step"><p class="yr">2020 — 2023</p><p class="nm">Backend &amp; infrastructure</p></div>
      <div class="step"><p class="yr">2023 — 2025</p><p class="nm">Platform &amp; security</p></div>
      <div class="step"><p class="yr">2025 — now</p><p class="nm">Agentic AI</p></div>
      <a href="/" class="portfolio-link">Selected engineering work <span aria-hidden="true">↗</span></a>
    </aside>
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
          <h3 class="role">${esc(exp.role)}</h3>
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
      <div class="label">01 — Experience</div>
      <h2>The throughline</h2>
      <p class="section-lead">Each role built on the last: infrastructure, platform engineering, then AI. Selected contributions within the teams I worked with.</p>
      <div class="timeline">${jobs}</div>
    </div>
  </section>`;
}

// ---- Projects ----

export function renderProjects(projects: Project[]): string {
  const cards = projects
    .map(
      (p) => `
    <div class="projcard">
      <div class="projcard-header">
        <div class="projcard-title">
          <span class="projcard-icon">${esc(p.icon)}</span>
          <h3>${esc(p.title)}</h3>
          ${p.status ? `<span class="projcard-live">${esc(p.status)}</span>` : ""}
        </div>
        <a href="${esc(p.githubUrl)}" class="projcard-gh" target="_blank" rel="noopener">View on GitHub ↗</a>
      </div>

      <p class="projcard-desc">${esc(p.description)}</p>

      <div class="projcard-body">
        <div class="projcard-section">
          <div class="projcard-section-label">Problem</div>
          <p>${esc(p.caseStudy.problem)}</p>
        </div>
        <div class="projcard-section">
          <div class="projcard-section-label">Approach</div>
          <p>${esc(p.caseStudy.approach)}</p>
        </div>
        <div class="projcard-section">
          <div class="projcard-section-label">Outcome</div>
          <p>${esc(p.caseStudy.outcome)}</p>
        </div>
      </div>

      <div class="projcard-tags">
        ${chipsHtml(p.chips)}
      </div>
    </div>`
    )
    .join("");

  return `
  <section class="proj" id="proj">
    <div class="wrap reveal">
      <div class="label">02 — Projects</div>
      <h2>Independent engineering projects</h2>
      <p class="section-lead">Implemented tools and evolving prototypes, with their current scope made explicit. <a href="/projects/">Explore all project stories</a>.</p>
      <div class="projlist">${cards}</div>
    </div>
  </section>`;
}

// ---- Academic ----

export function renderAcademic(academic: AcademicProject[], githubUrl: string): string {
  const cards = academic
    .map(
      (a) => `
    <div class="minicard">
      <h3 class="n">${esc(a.name)}</h3>
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
      <h3 class="edusch">${esc(edu.school)}</h3>
      <div class="edudeg">${esc(edu.degree)}</div>
      <div class="eduyr">${esc(edu.year)}</div>
    </div>`
    )
    .join("");

  return `
  <section class="edu" id="edu">
    <div class="wrap reveal">
      <div class="label">03 — Education</div>
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
      <h3 class="world">${esc(cat.world)}</h3>
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
      <p class="section-lead">The languages and tools I use across infrastructure, agent systems, and applied machine learning.</p>
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
      <h2>Let’s talk systems.</h2>
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
  return `<footer class="site-footer wrap"><p>© 2026 Sarvesh Karandikar</p><p>Built with care. Kept simple.</p><a href="/">Portfolio ↗</a><a href="#top">Back to top ↑</a></footer>`;
}
