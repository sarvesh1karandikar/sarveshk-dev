# sarveshk.dev — Cleanup & Enhancement Plan

**Status:** Phase 1 complete. Site is a modular vanilla-TS + Vite app deployed to GitHub Pages.

---

## ✅ Done (June 2026)

- **Content/presentation separated** — `src/content.ts` is the single source of truth; `render.ts` builds the DOM; CSS extracted to `styles.css`; JS split into modules (`hero-network.ts`, `modal.ts`, `main.ts`). Cards and case studies read from the **same** project objects — drift is impossible.
- **OG image fixed** — `public/og.png` generated (1200×630@2x, dark-theme branded). No more 404 on social shares. Regeneratable via `npm run generate:og`.
- **Résumé PDF regenerated** — clean document layout matching site brand, print-friendly. Regeneratable via `npm run generate:pdf`.
- **Stale assets removed** — `public/demos/` deleted (8 unreferenced images, ~2.7MB).

---

## 🔴 Next priorities

### 1. Accurate data & real metrics (biggest impact)

The site is structurally solid but the content is still placeholder-quality in places. A senior engineering portfolio lives or dies on specifics.

**Experience evidence chips — replace qualitative with quantitative:**
| Current | Problem | What to ask Sarvesh |
|---------|---------|-------------------|
| `SHIPPED` Multimodal deep agents | Vague — what does "shipped" mean? | How many partners onboarded? Latency numbers? Uptime? |
| `SDK` Claude Agent SDK + MCP | Lists tech, not impact | How many skills/servers registered? Partner adoption? |
| `SCALE` Self-serve partner platform | No scale numbers | How many partners? Time saved vs manual onboarding? |
| `BUILT` K8s PKI cert-management | No scope | How many clusters? Cert rotation interval? |
| `LANG` Java leader-election framework | No context | Uptime improvement? Failover time? |
| `MULTI-CLOUD` GCP + AWS + Azure ACI | No scale | How many cloud resources managed? Regions? |
| `IaC` Terraform graph-DB | No scope | Number of resources tracked? |
| `ML` NER + OCR/MICR fine-tuning | No metrics | Accuracy? Throughput? |

**Experience bullets — add impact where possible:**
- "Built multimodal Canvas Deep Agent" → add: served X partners, handles Y requests/day
- "Designed a secure file pipeline" → add: latency, file types supported, SSRF prevention stats
- "Own the Knowledge-Base SDK" → add: number of skills, partner onboarding time reduction
- "Integrated GCP into ACI" → add: number of cloud resources, regions, customers

### 2. Add actual Cisco product links

The cleanup plan flagged this but it's still open. For each Cisco role, we need:
- **AI Canvas** — public product page, docs, or blog post (if any exist)
- **Nexus Dashboard** — product page (likely public: cisco.com nexus dashboard)
- **Cloud Network Controller** — ACI/cloud networking product page

These add credibility — "I worked on this → here's the product." Even a generic Cisco product page is better than nothing.

### 3. WordPress role — needs proper representation

Sarvesh mentioned WordPress developer work should have more emphasis than Circle Link fintech. Currently the "Earlier" entry bundles everything into one card. This should be split out and detailed:
- Role, company, dates
- What was built (sites, plugins, themes)
- Tech stack (WordPress, PHP, JS, MySQL, etc.)
- Any metrics (traffic, sites delivered, clients)

### 4. Add Education section to the site

The site has an "Academic & ML" section with projects but **no actual education section** (degrees, universities, years). The résumé PDF includes:
- USC — MS, Computer Science (2020)
- SRM — BTech, Computer Science & Engineering (2019)

This should be on the site too. It's a basic credibility signal that recruiters look for immediately.

### 5. Resume ↔ Site coherence

Now that content.ts is the single source of truth for the site, the PDF should ideally be generated from it too. Currently `scripts/generate-pdf.ts` has its own hardcoded HTML with duplicated content. When Sarvesh updates content.ts, the PDF won't automatically update.

**Fix:** Have the PDF script import from `src/content.ts` and render from the same data.

---

## 🟡 Nice to have

- **Verification in CI** — a build-time check: all external links resolve, no empty required fields, og.png + PDF exist. The stale OG image bug would've been caught by this.
- **Custom OG image per page** — currently one generic OG image. Could generate role-specific ones.
- **Dark/light mode toggle** — site is dark-only. Some recruiters prefer light mode for readability.

---

## What NOT to do
- Don't reintroduce a framework or build complexity the content doesn't justify.
- Don't re-add the CLI/query-builder concept — it was explicitly rejected.
- Don't fabricate metrics or links — leave them qualitative until Sarvesh provides real data.
- Don't add the WordPress role content until Sarvesh provides the specifics.
