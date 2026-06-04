// ============================================================
// Generates public/resume/sarvesh-karandikar.pdf
// Renders a clean resume HTML → PDF via puppeteer + system Chrome.
// Content mirrors the live site but in a document-appropriate layout
// with print-friendly styling.
//
// Usage: npx tsx scripts/generate-pdf.ts
// ============================================================

import puppeteer from "puppeteer-core";

const RESUME_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --violet: #7c3aed;
    --teal: #0d9488;
    --blue: #2563eb;
    --text: #1e1b2e;
    --dim: #4b465c;
    --dim2: #787380;
    --line: #e5e2ed;
    --bg: #faf9fc;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #fff;
    color: var(--text);
    line-height: 1.55;
    font-size: 13px;
    -webkit-font-smoothing: antialiased;
    width: 816px;   /* US-letter width at 96dpi */
    margin: 0 auto;
  }

  .page {
    padding: 56px 62px;
    max-width: 816px;
  }

  /* ---- Header ---- */
  .header {
    margin-bottom: 28px;
  }

  .header h1 {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: #0c0a14;
    margin-bottom: 6px;
  }

  .header .title {
    font-size: 16px;
    font-weight: 600;
    color: var(--violet);
    margin-bottom: 12px;
  }

  .header .contact {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    font-size: 12.5px;
    color: var(--dim2);
    font-family: 'JetBrains Mono', monospace;
  }

  .header .contact a {
    color: var(--dim);
    text-decoration: none;
  }

  /* ---- Section ---- */
  .section {
    margin-bottom: 24px;
  }

  .section h2 {
    font-size: 13px;
    font-family: 'JetBrains Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--violet);
    margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1.5px solid var(--line);
  }

  /* ---- Summary ---- */
  .summary {
    font-size: 14px;
    color: var(--dim);
    line-height: 1.6;
    margin-bottom: 6px;
  }

  /* ---- Experience ---- */
  .exp-item {
    margin-bottom: 16px;
  }

  .exp-item .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 2px;
  }

  .exp-item .role {
    font-size: 15px;
    font-weight: 700;
    color: #0c0a14;
  }

  .exp-item .co {
    font-size: 13px;
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .exp-item .period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    color: var(--dim2);
    white-space: nowrap;
  }

  .exp-item ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .exp-item li {
    font-size: 12.8px;
    color: var(--dim);
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
  }

  .exp-item li::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: var(--violet);
  }

  .exp-item .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 6px;
  }

  .exp-item .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    padding: 2px 8px;
    border-radius: 5px;
    background: #f3f1f8;
    color: var(--dim2);
  }

  /* ---- Skills ---- */
  .skill-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .skill-block h3 {
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .skill-block h3.i { color: var(--blue); }
  .skill-block h3.a { color: var(--teal); }

  .skill-block .grp {
    margin-bottom: 6px;
  }

  .skill-block .gh {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--dim2);
    margin-bottom: 3px;
  }

  .skill-block .items {
    font-size: 12.5px;
    color: var(--dim);
  }

  /* ---- Projects ---- */
  .proj-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .proj-item {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  .proj-item .pn {
    font-weight: 700;
    font-size: 13px;
    color: #0c0a14;
    white-space: nowrap;
  }

  .proj-item .pd {
    font-size: 12.5px;
    color: var(--dim);
  }

  .proj-item a {
    font-size: 10.5px;
    color: var(--teal);
    text-decoration: none;
    white-space: nowrap;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ---- Education ---- */
  .edu-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 13px;
  }

  .edu-item .en {
    font-weight: 600;
    color: #0c0a14;
  }

  .edu-item .ed {
    color: var(--dim);
  }

  .edu-item .ey {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    color: var(--dim2);
  }

  /* ---- Print ---- */
  @media print {
    body { background: #fff; }
    .page { padding: 40px 56px; }
  }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <h1>Sarvesh Karandikar</h1>
    <div class="title">Senior Software Engineer — Backend, Infra &amp; AI</div>
    <div class="contact">
      <span>sarvesh1karandikar@gmail.com</span>
      <span>linkedin.com/in/sarveshkarandikar</span>
      <span>github.com/sarvesh1karandikar</span>
      <span>resume.sarveshk.dev</span>
    </div>
  </div>

  <!-- Summary -->
  <div class="section">
    <h2>Summary</h2>
    <p class="summary">
      Senior Software Engineer with 5+ years at Cisco spanning backend infrastructure, cloud networking, platform security, and full-stack AI. Currently building multimodal agentic systems with the Claude Agent SDK and MCP — end to end, from model to platform to tooling. Fluent in both infrastructure (Go, Java, Kubernetes, AWS/GCP/Azure) and AI (LLMs, RAG, PyTorch, TensorFlow).
    </p>
  </div>

  <!-- Experience -->
  <div class="section">
    <h2>Experience</h2>

    <div class="exp-item">
      <div class="row"><span class="role">Senior Software Engineer — AI Canvas</span><span class="period">Oct 2025 — present</span></div>
      <div class="co">Cisco Systems</div>
      <ul>
        <li>Built multimodal Canvas Deep Agent — reasons over images, documents, and network captures across fast and plan-execute modes.</li>
        <li>Designed a secure file pipeline: gRPC → presigned S3 streaming (SSRF-guarded), Redis manifest store, MCP file-reader tooling.</li>
        <li>Own the Knowledge-Base SDK and skill/MCP-server registration powering self-serve partner onboarding.</li>
      </ul>
      <div class="tags"><span class="tag">Claude Agent SDK</span><span class="tag">MCP</span><span class="tag">Python</span><span class="tag">gRPC</span><span class="tag">Redis</span><span class="tag">AWS</span></div>
    </div>

    <div class="exp-item">
      <div class="row"><span class="role">Software Engineer — Nexus Dashboard</span><span class="period">Nov 2023 — Sep 2025</span></div>
      <div class="co">Cisco Systems</div>
      <ul>
        <li>Designed a Certificate Management System for automated CA creation and secure signing across Kubernetes communications.</li>
        <li>Enhanced external-CA integration to onboard Cisco XE/XR devices; built an agent-based Postgres/TSDB management interface.</li>
        <li>Implemented an SPI-based Java leader-election framework for active-standby configurations.</li>
      </ul>
      <div class="tags"><span class="tag">Java</span><span class="tag">Go</span><span class="tag">Kubernetes</span><span class="tag">Postgres</span><span class="tag">PKI</span></div>
    </div>

    <div class="exp-item">
      <div class="row"><span class="role">Software Engineer — Cloud Network Controller</span><span class="period">Jul 2020 — Oct 2023</span></div>
      <div class="co">Cisco Systems</div>
      <ul>
        <li>Integrated GCP into the ACI model-based cloud-networking solution for multi-cloud compatibility and scale.</li>
        <li>Built config-drift security detection across L4–L7 service chains and a Terraform collection service feeding a unified graph database.</li>
        <li>Created a firewall-configuration analysis service using Binary Decision Diagrams to assess connectivity and traffic flows.</li>
      </ul>
      <div class="tags"><span class="tag">Python</span><span class="tag">Terraform</span><span class="tag">GCP</span><span class="tag">AWS</span><span class="tag">Azure</span><span class="tag">Dgraph</span></div>
    </div>

    <div class="exp-item">
      <div class="row"><span class="role">WordPress Developer</span><span class="period">2019 — 2020</span></div>
      <div class="co">USC Supply Chain</div>
      <ul>
        <li>Developed and maintained WordPress sites with custom themes and plugins for university supply-chain projects.</li>
        <li>Built REST API integrations connecting WordPress to backend inventory and logistics systems.</li>
        <li>Managed hosting, deployments, and performance optimization across multiple client sites.</li>
      </ul>
      <div class="tags"><span class="tag">WordPress</span><span class="tag">PHP</span><span class="tag">JavaScript</span><span class="tag">MySQL</span><span class="tag">REST APIs</span></div>
    </div>

    <div class="exp-item">
      <div class="row"><span class="role">ML Engineer Intern</span><span class="period">2019 — 2020</span></div>
      <div class="co">Circle Link (fintech)</div>
      <ul>
        <li>Built NER models classifying entities in loan documents with Elasticsearch indexing; fine-tuned OCR/MICR check recognition.</li>
      </ul>
      <div class="tags"><span class="tag">Python</span><span class="tag">NLP</span><span class="tag">Elasticsearch</span><span class="tag">OCR</span></div>
    </div>
  </div>

  <!-- Skills -->
  <div class="section">
    <h2>Skills</h2>
    <div class="skill-grid">
      <div class="skill-block">
        <h3 class="i">⬡ Backend &amp; Infrastructure</h3>
        <div class="grp"><div class="gh">Languages</div><div class="items">Go, Java, C++, Python, TypeScript, GraphQL</div></div>
        <div class="grp"><div class="gh">Orchestration &amp; Data</div><div class="items">Docker, Kubernetes, Postgres, Redis, Dgraph</div></div>
        <div class="grp"><div class="gh">Cloud &amp; IaC</div><div class="items">AWS, Azure, GCP, Terraform, OCI, Stacker</div></div>
      </div>
      <div class="skill-block">
        <h3 class="a">✦ AI &amp; Machine Learning</h3>
        <div class="grp"><div class="gh">Agents &amp; LLM</div><div class="items">Claude Agent SDK, MCP, RAG, Amazon Bedrock</div></div>
        <div class="grp"><div class="gh">Frameworks &amp; Libraries</div><div class="items">TensorFlow, PyTorch, NumPy, Pandas, NLTK</div></div>
        <div class="grp"><div class="gh">Bridges</div><div class="items">Python, gRPC, Redis — the glue across both worlds</div></div>
      </div>
    </div>
  </div>

  <!-- Projects -->
  <div class="section">
    <h2>Selected Projects</h2>
    <div class="proj-list">
      <div class="proj-item">
        <span class="pn">AlpacaBot</span>
        <span class="pd">Weekly-options trading agent — Alpaca execution, Telegram control, terminal dashboard, AWS-hosted.</span>
        <a href="https://github.com/sarvesh1karandikar/alpacabot-dashboard">GitHub ↗</a>
      </div>
      <div class="proj-item">
        <span class="pn">chromadb RAG</span>
        <span class="pd">FastAPI ingest + semantic retrieval with centroid-based collection routing.</span>
        <a href="https://github.com/sarvesh1karandikar/chromadb">GitHub ↗</a>
      </div>
      <div class="proj-item">
        <span class="pn">DriveSuite</span>
        <span class="pd">WhatsApp → Jellyfin/Sonarr media bridge — local Llama for intent, Claude for execution.</span>
        <a href="https://github.com/sarvesh1karandikar/DriveSuite">GitHub ↗</a>
      </div>
    </div>
  </div>

  <!-- Education -->
  <div class="section">
    <h2>Education</h2>
    <div class="edu-item">
      <span class="en">University of Southern California</span>
      <span class="ed">MS, Computer Science</span>
      <span class="ey">2020</span>
    </div>
    <div class="edu-item">
      <span class="en">SRM Institute of Science and Technology</span>
      <span class="ed">BTech, Computer Science &amp; Engineering</span>
      <span class="ey">2019</span>
    </div>
  </div>

</div>
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
  await page.setContent(RESUME_HTML, { waitUntil: "networkidle0" });

  console.log("Generating PDF...");
  await page.pdf({
    path: "public/resume/sarvesh-karandikar.pdf",
    format: "letter",
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log("✅ Resume PDF saved to public/resume/sarvesh-karandikar.pdf");
}

main().catch((err) => {
  console.error("❌ Failed to generate PDF:", err);
  process.exit(1);
});
