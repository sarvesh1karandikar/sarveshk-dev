// ============================================================
// Generates public/og.png — the social-share preview image.
// Renders an HTML template matching the site's dark-theme
// aesthetic via puppeteer + system Chrome.
//
// Usage: npx tsx scripts/generate-og.ts
// ============================================================

import puppeteer from "puppeteer-core";

const OG_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    background: #070710;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #f2f2fb;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Glow blobs — echo the site's hero */
  .glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(55% 50% at 18% 12%, rgba(124,92,255,0.28), transparent 70%),
      radial-gradient(48% 45% at 88% 28%, rgba(46,230,210,0.18), transparent 70%),
      radial-gradient(60% 55% at 65% 102%, rgba(255,92,170,0.14), transparent 70%);
  }

  /* Subtle dot-grid pattern */
  .grid {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: radial-gradient(circle, #7cc4ff 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .card {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 40px 80px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    padding: 10px 22px;
    border-radius: 30px;
    border: 1px solid rgba(140,120,255,0.40);
    background: rgba(124,92,255,0.14);
    color: #d3ccff;
    margin-bottom: 36px;
    font-weight: 600;
  }

  .badge .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #37f5c5;
    box-shadow: 0 0 14px #37f5c5;
  }

  h1 {
    font-size: 68px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 16px;
  }

  h1 .g {
    background: linear-gradient(110deg, #a78bfa, #37f5c5, #7cc4ff, #a78bfa);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .sub {
    font-size: 26px;
    color: #b2b2c8;
    margin-bottom: 28px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  .tags {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    padding: 7px 16px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    color: #b2b2c8;
  }

  .url {
    position: absolute;
    bottom: 36px;
    right: 56px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    color: #7c7c96;
    letter-spacing: -0.01em;
  }

  .url span {
    color: #a78bfa;
  }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body>
  <div class="glow"></div>
  <div class="grid"></div>

  <div class="card">
    <div class="badge"><span class="dot"></span> Senior Software Engineer · Cisco</div>
    <h1>Sarvesh <span class="g">Karandikar</span></h1>
    <p class="sub">Infrastructure built the foundation. AI made the full-stack agentic leap.</p>
    <div class="tags">
      <span class="tag">Agentic Systems</span>
      <span class="tag">Claude Agent SDK</span>
      <span class="tag">MCP</span>
      <span class="tag">Python</span>
      <span class="tag">gRPC</span>
      <span class="tag">AWS</span>
    </div>
  </div>

  <div class="url">sarvesh<span>k</span>.dev</div>
</body>
</html>`;

async function main(): Promise<void> {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(OG_HTML, { waitUntil: "networkidle0" });

  console.log("Capturing screenshot...");
  await page.screenshot({
    path: "public/og.png",
    type: "png",
  });

  await browser.close();
  console.log("✅ OG image saved to public/og.png");
}

main().catch((err) => {
  console.error("❌ Failed to generate OG image:", err);
  process.exit(1);
});
