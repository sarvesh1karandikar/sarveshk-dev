export interface TerminalHandle {
  root: HTMLElement;
  log: HTMLElement;
  /** Append a command-echo line then a result element, typing the command out. */
  run: (command: string, result: HTMLElement) => Promise<void>;
  addHistoryChip: (label: string, onClick: () => void) => void;
}

const cadence = () =>
  parseInt(getComputedStyle(document.documentElement).getPropertyValue("--type-cadence")) || 0;

function typeInto(target: HTMLElement, text: string): Promise<void> {
  return new Promise((resolve) => {
    const speed = cadence();
    if (speed === 0) { target.textContent = text; resolve(); return; }
    let i = 0;
    const tick = () => {
      target.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, speed);
      else resolve();
    };
    tick();
  });
}

export function createTerminal(): TerminalHandle {
  const root = document.createElement("section");
  root.className = "terminal";
  root.innerHTML = `
    <div class="terminal-top">
      <span class="tc tc-r"></span><span class="tc tc-y"></span><span class="tc tc-g"></span>
      <span class="terminal-title">sarvesh@sarveshk.dev: ~/resume</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-welcome">✻ Build a query to explore my background — or pick a preset.</div>
      <div class="terminal-builder" id="builder-slot"></div>
      <div class="terminal-history" id="history-slot"></div>
      <div class="terminal-log" id="log-slot" aria-live="polite"></div>
    </div>`;
  const log = root.querySelector<HTMLElement>("#log-slot")!;
  const historySlot = root.querySelector<HTMLElement>("#history-slot")!;

  const run = async (command: string, result: HTMLElement) => {
    const line = document.createElement("div");
    line.className = "terminal-cmd";
    const prompt = document.createElement("span");
    prompt.className = "terminal-prompt";
    prompt.textContent = "> ";
    const cmd = document.createElement("span");
    cmd.className = "terminal-cmdtext";
    line.append(prompt, cmd);
    log.appendChild(line);
    await typeInto(cmd, command);
    result.classList.add("terminal-result", "is-entering");
    log.appendChild(result);
    requestAnimationFrame(() => result.classList.remove("is-entering"));
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const addHistoryChip = (label: string, onClick: () => void) => {
    const chip = document.createElement("button");
    chip.className = "history-chip";
    chip.textContent = label;
    chip.addEventListener("click", onClick);
    historySlot.appendChild(chip);
  };

  return { root, log, run, addHistoryChip };
}
