# sarveshk.dev — Cleaner & Better: the right approach

**Status:** the site is shipped and live (https://sarveshk.dev) as a **single static `index.html`** — a deliberate "ship the mockup now" decision. That was the right call for speed, but the current shape has known debt. This folder is the honest plan for making it clean, maintainable, and better.

---

## Where things stand (June 2026)

- `index.html` — the entire site: markup + ~400 lines of inline CSS + ~80 lines of inline JS (node-network canvas, scroll-reveal, case-study modals). One file does everything.
- Build: plain `vite build` → `dist/`, deployed to GitHub Pages on push.
- Content (experience, projects, skills, case studies) is **hardcoded in HTML/JS**, duplicated between the page and the case-study `CS` object.
- The old CLI/query-builder app (`src/`, Vitest suite, TS types) was **deleted** in the redesign commit — recoverable from git history if ever wanted.
- The committed `public/resume/sarvesh-karandikar.pdf` was generated from the *old* CLI "classic view" — its styling no longer matches the new site (content is still correct).
- `public/demos/` still holds prebaked images from the old design that the new page does **not** reference.

---

## The debt, ranked by what actually matters

### 1. Single-file monolith (biggest)
`index.html` mixes structure, style, behavior, and **data**. It's fine to read once, but every content edit means hand-editing HTML, and the project list is duplicated (cards in HTML, case studies in the `CS` JS object). Risk: they drift out of sync.

### 2. Content is not data
Adding a job or project = editing markup in two places. There's no single source of truth like the old `resume.ts` had. This is the thing most likely to cause a future "the site says X but my résumé says Y" bug — the exact incoherence we just spent effort fixing.

### 3. Stale assets
`public/demos/*` (road masks, DCGAN grids, dashboard screenshot) are dead weight now — nothing links to them. They inflate the repo and the deploy artifact.

### 4. PDF mismatch
The downloadable résumé PDF looks like the old site. It should either be regenerated to match, or be a purpose-built clean résumé doc.

### 5. No verification
The old app had 25 tests; the static page has none. For a page this simple that's *acceptable*, but there's zero guard against a broken link or a malformed content edit.

---

## Recommended approach (in priority order)

### Phase 1 — Separate data from presentation *(highest value, low effort)*
Pull all content into one typed module and render from it:
```
src/
  content.ts        # SINGLE SOURCE OF TRUTH: experience[], projects[], skills, academic[], links
  render.ts         # builds the DOM sections from content.ts
  hero-network.ts   # the canvas node-network (isolated)
  modal.ts          # case-study modal open/close
  main.ts           # wires it together
  styles.css        # extracted from the <style> block
index.html          # thin shell: <div id="app"> + module script
```
- One edit point for every fact. Cards and case studies read from the **same** project objects — drift becomes impossible.
- Keep it framework-free (vanilla TS + Vite) — it's small; React would be overkill.
- This directly prevents the resume/site incoherence problem from ever recurring.

### Phase 2 — Asset hygiene
- Delete unreferenced `public/demos/*`.
- Regenerate `sarvesh-karandikar.pdf` to match the new design (or author a dedicated clean résumé). Wire a small script so the PDF can't go stale silently.
- Generate the real `og.png` social-preview image (the meta tag references `/og.png`, which doesn't exist yet — currently a 404 on social shares).

### Phase 3 — Lightweight verification
- A tiny build-time check (or a single Playwright smoke test): page renders, all external links resolve, `content.ts` has no empty required fields, the PDF + og.png exist.
- Add back to CI before the Pages deploy.

### Phase 4 — Finish the deferred enhancements
From the brainstorm, two of four enhancements shipped (node-network hero, case-study modals). Still open:
- **Real metrics** in the experience evidence chips (needs Sarvesh's numbers — e.g. latency cuts, partner-team counts, file-type coverage).
- **Custom OG image** (Phase 2 above).
- **Public product links** for the Cisco AI Canvas row (waiting on Sarvesh; placeholders removed for now).

---

## What NOT to do
- Don't reintroduce a framework or build complexity the content doesn't justify.
- Don't re-add the CLI/query-builder concept — it was explicitly rejected.
- Don't fabricate metrics or links to fill the gaps; leave them qualitative until real data exists.

---

## Suggested next session
Run Phase 1 as its own brainstorm → spec → plan cycle (it's a clean refactor with a clear interface). Phases 2–3 can ride along. Phase 4 unblocks as Sarvesh provides metrics/links.
