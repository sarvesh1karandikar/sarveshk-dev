function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}

/** Image gallery (prebaked). srcs are paths under /demos/<id>/. */
export function gallery(title: string, srcs: string[]): HTMLElement {
  const wrap = el("div", "demo-gallery");
  wrap.appendChild(el("div", "demo-title", title));
  const grid = el("div", "demo-grid");
  for (const s of srcs) {
    const img = el("img", "demo-thumb");
    img.src = s;
    img.loading = "lazy";
    img.alt = title;
    grid.appendChild(img);
  }
  wrap.appendChild(grid);
  return wrap;
}

/** Before/after slider (used by road detection in Phase F). */
export function beforeAfter(beforeSrc: string, afterSrc: string, caption: string): HTMLElement {
  const wrap = el("div", "demo-ba");
  const frame = el("div", "demo-ba-frame");
  const before = el("img", "demo-ba-img demo-ba-before");
  before.src = beforeSrc;
  before.alt = "before";
  const after = el("img", "demo-ba-img demo-ba-after");
  after.src = afterSrc;
  after.alt = "after";
  const range = el("input", "demo-ba-range") as HTMLInputElement;
  range.type = "range";
  range.min = "0";
  range.max = "100";
  range.value = "50";
  const apply = () => {
    after.style.clipPath = `inset(0 0 0 ${range.value}%)`;
  };
  range.addEventListener("input", apply);
  frame.append(before, after);
  wrap.append(frame, range, el("div", "demo-caption", caption));
  queueMicrotask(apply);
  return wrap;
}

/** Animated mock chat (WhatsApp-style) for backend-only projects. */
export function mockChat(title: string, turns: { from: "user" | "bot"; text: string }[]): HTMLElement {
  const wrap = el("div", "demo-chat");
  wrap.appendChild(el("div", "demo-title", title));
  const log = el("div", "demo-chat-log");
  wrap.appendChild(log);
  turns.forEach((t, i) => {
    const bubble = el("div", `demo-bubble demo-${t.from}`, t.text);
    bubble.style.animationDelay = `${i * 600}ms`;
    log.appendChild(bubble);
  });
  return wrap;
}

/** Simple labelled note block for architecture summaries. */
export function note(text: string): HTMLElement {
  return el("div", "demo-note", text);
}
