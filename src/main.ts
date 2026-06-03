import "./styles/tokens.css";
import "./styles/resume.css";
import "./styles/terminal.css";
import "./styles/demo-green.css";
import { renderStatusBar } from "./statusbar";
import { createTerminal } from "./terminal/engine";
import { createQueryBuilder } from "./terminal/queryBuilder";
import { buildSchema } from "./terminal/querySchema";
import { execute } from "./terminal/executor";
import { serializeToCommand, toURLParam, fromURLParam } from "./terminal/query";
import { presets } from "./terminal/presets";
import { renderResult } from "./resume/terminalView";
import { getDemo } from "./demos/registry";
import { resume } from "./resume/data";
import { renderResume } from "./resume/classicView";
import type { Query } from "./types";

const app = document.querySelector<HTMLDivElement>("#app")!;
const params = new URLSearchParams(location.search);

// Classic view route
if (params.get("view") === "classic") {
  app.appendChild(renderResume(resume, "classic"));
} else {
  app.appendChild(renderStatusBar());

  const terminal = createTerminal();
  app.appendChild(terminal.root);

  const schema = buildSchema(resume);
  const builder = createQueryBuilder(schema);
  terminal.root.querySelector("#builder-slot")!.appendChild(builder.root);

  const mountDemo = (id: string) => {
    const d = getDemo(id);
    if (!d) return;
    terminal.run(`run ${id}`, d.mount());
  };

  const runQuery = (q: Query) => {
    const cmd = serializeToCommand(q);
    terminal.run(cmd, renderResult(execute(q, resume)));
    history.replaceState(null, "", `?q=${toURLParam(q)}`);
    terminal.addHistoryChip(cmd, () => runQuery(q));
  };

  builder.onRun(runQuery);

  // Presets row
  const presetRow = document.createElement("div");
  presetRow.className = "preset-row";
  presets.forEach((p) => {
    const b = document.createElement("button");
    b.className = "preset";
    b.textContent = `${p.icon} ${p.label}`;
    b.addEventListener("click", () => {
      if (p.runDemo) mountDemo(p.runDemo);
      else if (p.query) { builder.setQuery(p.query); runQuery(p.query); }
    });
    presetRow.appendChild(b);
  });
  terminal.root.querySelector(".terminal-welcome")!.after(presetRow);

  // Delegate demo run buttons inside results
  terminal.log.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t.dataset.demo) mountDemo(t.dataset.demo);
  });

  // Restore shared query from URL
  const shared = params.get("q");
  if (shared) {
    const q = fromURLParam(shared);
    if (q) { builder.setQuery(q); runQuery(q); }
  }

  // Full resume scrolls below the terminal
  app.appendChild(renderResume(resume, "embedded"));
}
