// ============================================================
// Hero canvas — interactive node-network background.
// Extracted from the inline <script>; zero dependencies.
// ============================================================

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

let W = 0;
let H = 0;
let pts: Point[] = [];
const mouse = { x: -999, y: -999 };
let animId = 0;

function init(cv: HTMLCanvasElement): void {
  pts = [];
  const n = Math.min(70, Math.floor((W * H) / 16000));
  for (let i = 0; i < n; i++) {
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });
  }
}

function tick(cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, W, H);

  // Move points, bounce off edges, nudge away from mouse
  for (const p of pts) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const md = Math.hypot(dx, dy);
    if (md < 140 && md > 0) {
      p.x += (dx / md) * 0.6;
      p.y += (dy / md) * 0.6;
    }
  }

  // Draw connecting lines between nearby points
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i];
      const b = pts[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        const alpha = (1 - d / 130) * 0.5;
        ctx.strokeStyle = `rgba(140,150,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // Draw points (glow near mouse)
  for (const p of pts) {
    const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 140;
    ctx.fillStyle = near
      ? "rgba(55,245,197,0.9)"
      : "rgba(167,139,250,0.7)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, near ? 3 : 2, 0, 7);
    ctx.fill();
  }

  animId = requestAnimationFrame(() => tick(cv, ctx));
}

export function initHeroNetwork(): void {
  const cv = document.getElementById("net") as HTMLCanvasElement | null;
  if (!cv) return;
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function size(): void {
    W = cv.width = cv.offsetWidth;
    H = cv.height = cv.offsetHeight;
    init(cv);
  }

  addEventListener("resize", size);

  const hero = document.querySelector(".hero");
  hero?.addEventListener("mousemove", (e) => {
    const r = cv.getBoundingClientRect();
    mouse.x = (e as MouseEvent).clientX - r.left;
    mouse.y = (e as MouseEvent).clientY - r.top;
  });
  hero?.addEventListener("mouseleave", () => {
    mouse.x = -999;
    mouse.y = -999;
  });

  size();

  if (!reduce) {
    tick(cv, ctx);
  } else {
    ctx.clearRect(0, 0, W, H);
  }
}

export function destroyHeroNetwork(): void {
  if (animId) cancelAnimationFrame(animId);
}
