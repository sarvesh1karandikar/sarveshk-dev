// ============================================================
// App entry point — wires renderers, animations, and effects.
// ============================================================

import "./styles.css";
import { content } from "./content";
import {
  renderNav,
  renderHero,
  renderExperience,
  renderProjects,
  renderAcademic,
  renderEducation,
  renderSkills,
  renderContact,
  renderFooter,
  renderModalShell,
} from "./render";
import { initHeroNetwork } from "./hero-network";
import { initModal } from "./modal";

// ---- Bootstrap the page ----

const app = document.getElementById("app")!;
app.innerHTML =
  renderNav(content.links) +
  renderHero(content.links) +
  renderEducation(content.education) +
  renderExperience(content.experience) +
  renderProjects(content.projects) +
  renderAcademic(content.academic, content.links.github) +
  renderSkills(content.skills) +
  renderContact(content.links) +
  renderFooter() +
  renderModalShell();

// ---- Scroll reveal ----

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---- Card cursor glow ----

document.querySelectorAll<HTMLElement>(".card").forEach((c) => {
  c.addEventListener("mousemove", (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// ---- Init animations & interactions ----

initHeroNetwork();
initModal();

// ---- Active nav highlighting ----

const sections = [
  { id: "edu", link: 'a[href="#edu"]' },
  { id: "exp", link: 'a[href="#exp"]' },
  { id: "proj", link: 'a[href="#proj"]' },
  { id: "acad", link: 'a[href="#acad"]' },
  { id: "skills", link: 'a[href="#skills"]' },
];

const navLinks = document.querySelectorAll(".nav .links a");

const navIo = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const el = entry.target;
      const section = sections.find((s) => el.id === s.id);
      if (!section) continue;
      const link = document.querySelector<HTMLElement>(
        `.nav .links ${section.link}`
      );
      if (link) link.classList.toggle("active", entry.isIntersecting);
    }
  },
  { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
);

sections.forEach((s) => {
  const el = document.getElementById(s.id);
  if (el) navIo.observe(el);
});
