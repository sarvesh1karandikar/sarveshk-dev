// ============================================================
// App entry point — wires renderers, animations, and effects.
// ============================================================

import "./styles.css";
// Content is rendered into HTML by the build; JavaScript only enhances navigation.

// ---- Active nav highlighting ----

const sections = [
  { id: "exp", link: 'a[href="#exp"]' },
  { id: "proj", link: 'a[href="#proj"]' },
  { id: "edu", link: 'a[href="#edu"]' },
  { id: "acad", link: 'a[href="#acad"]' },
  { id: "skills", link: 'a[href="#skills"]' },
];

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
