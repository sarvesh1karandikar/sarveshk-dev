import { resume } from "./resume/data";

export function renderStatusBar(): HTMLElement {
  const bar = document.createElement("header");
  bar.className = "statusbar";
  bar.innerHTML = `
    <span class="statusbar-seg statusbar-name">${resume.name.toUpperCase()}</span>
    <span class="statusbar-seg statusbar-avail">● open to work</span>
    <span class="statusbar-seg statusbar-path">~/resume — ${resume.title.toLowerCase()} @ Cisco</span>
    <span class="statusbar-actions">
      <a class="statusbar-btn" href="?view=classic">📄 Classic view</a>
      <a class="statusbar-btn" href="/resume/sarvesh-karandikar.pdf" download>⬇ PDF</a>
    </span>`;
  return bar;
}
