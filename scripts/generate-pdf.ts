// Generates the public one-page résumé PDF with a print-safe, monochrome layout.
// Usage: npm run generate:pdf (set CHROME_PATH on machines without Edge/Chrome at the default path).

import puppeteer from "puppeteer-core";
import { existsSync } from "node:fs";

const RESUME_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" /><title>Sarvesh Karandikar - Resume</title><meta name="author" content="Sarvesh Karandikar" />
<style>
  @page { size: Letter; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; color: #191919; background: #fff; font-size: 9.6pt; line-height: 1.32; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 8.5in; height: 11in; padding: .48in .55in .42in; overflow: hidden; }
  header { border-bottom: 1px solid #7c7c7c; padding-bottom: 13px; margin-bottom: 14px; }
  .topline { display:flex; justify-content:space-between; align-items:baseline; gap:16px; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-size: 27pt; letter-spacing: -.65pt; line-height: 1; margin:0; font-weight:700; }
  .title { font-size:10pt; color:#444; margin:5px 0 9px; }
  .contact { display:flex; flex-wrap:wrap; gap:5px 14px; color:#444; font-size:8.7pt; }
  a { color:inherit; text-decoration:none; }
  .summary { font-size:9.6pt; line-height:1.38; margin:0; max-width:720px; }
  .layout { display:grid; grid-template-columns: 1.58fr .92fr; gap:22px; }
  section { margin:0 0 13px; break-inside:avoid; }
  h2 { font: bold 9pt Arial, Helvetica, sans-serif; text-transform:uppercase; letter-spacing:1.2px; padding-bottom:4px; border-bottom:1px solid #9b9b9b; margin:0 0 7px; }
  .job { margin-bottom:9px; break-inside:avoid; }
  .job-head { display:flex; justify-content:space-between; gap:10px; align-items:baseline; }
  h3 { margin:0; font-size:9.8pt; line-height:1.2; }
  .date { color:#555; white-space:nowrap; font-size:8pt; }
  .company { margin:2px 0 3px; color:#4a4a4a; font-size:8.5pt; font-weight:600; }
  ul { margin:0; padding-left:13px; }
  li { padding-left:1px; margin:0 0 2px; line-height:1.3; }
  .skills-group { margin:0 0 6px; }
  .skills-group strong { font-size:8.9pt; }
  .skills-group p { margin:1px 0 0; color:#404040; line-height:1.32; }
  .project { margin:0 0 7px; }
  .project strong { font-size:9pt; }
  .project p { margin:1px 0 0; color:#404040; line-height:1.3; }
  .edu { margin:0 0 7px; }
  .edu strong { display:block; font-size:8.8pt; }
  .edu span { color:#454545; }
  .footer { margin-top:4px; padding-top:7px; border-top:1px solid #b0b0b0; color:#555; font-size:7.7pt; display:flex; justify-content:space-between; }
  @media screen { body { background:#e8e8e8; } .page { margin:20px auto; box-shadow:0 2px 18px #0002; } }
</style>
</head>
<body>
<main class="page">
  <header>
    <div class="topline"><h1>Sarvesh Karandikar</h1></div>
    <p class="title">Senior Software Engineer | AI, Infrastructure &amp; Cloud Systems</p>
    <div class="contact"><a href="mailto:sarvesh1karandikar@gmail.com">sarvesh1karandikar@gmail.com</a><a href="https://www.linkedin.com/in/sarveshkarandikar/">linkedin.com/in/sarveshkarandikar</a><a href="https://github.com/sarvesh1karandikar">github.com/sarvesh1karandikar</a><a href="https://sarveshk.dev/resume/">sarveshk.dev/resume/</a></div>
  </header>
  <section>
    <h2>Profile</h2>
    <p class="summary">Senior Software Engineer at Cisco building multimodal AI agents and developer platforms. Experience spans cloud networking, Kubernetes security, backend systems, and applied machine learning.</p>
  </section>
  <div class="layout">
    <div>
      <section>
        <h2>Experience</h2>
        <article class="job"><div class="job-head"><h3>Senior Software Engineer | AI Canvas</h3><span class="date">Oct 2025 - Present</span></div><p class="company">Cisco Systems</p><ul>
          <li>Built multimodal agent workflows for images, documents, and network captures across fast and plan-execute modes.</li>
          <li>Designed secure file handling from gRPC through presigned S3 streaming, Redis manifests, and MCP file-reader tools.</li>
          <li>Own the Knowledge-Base SDK and skill/MCP-server registration for partner onboarding.</li>
        </ul></article>
        <article class="job"><div class="job-head"><h3>Software Engineer | Nexus Dashboard</h3><span class="date">Nov 2023 - Sep 2025</span></div><p class="company">Cisco Systems</p><ul>
          <li>Designed Kubernetes certificate management for CA creation and secure service signing.</li>
          <li>Extended external-CA support for XE/XR devices and built agent-based Postgres/TSDB management.</li>
          <li>Implemented an SPI-based Java leader-election framework for active-standby configurations.</li>
        </ul></article>
        <article class="job"><div class="job-head"><h3>Software Engineer | Cloud Network Controller</h3><span class="date">Jul 2020 - Oct 2023</span></div><p class="company">Cisco Systems</p><ul>
          <li>Integrated GCP into a model-based cloud-networking solution alongside AWS and Azure.</li>
          <li>Built L4-L7 config-drift detection, Terraform collection into a graph database, and BDD-based firewall-flow analysis.</li>
        </ul></article>
        <article class="job"><div class="job-head"><h3>WordPress Developer</h3><span class="date">2019 - 2020</span></div><p class="company">USC Supply Chain</p><ul><li>Developed custom themes, plugins, and REST API integrations; managed hosting, deployments, and performance for university supply-chain projects.</li></ul></article>
        <article class="job"><div class="job-head"><h3>ML Engineer Intern</h3><span class="date">2019 - 2020</span></div><p class="company">Circle Link | Fintech</p><ul><li>Built NER and Elasticsearch workflows for loan documents; fine-tuned OCR/MICR check recognition.</li></ul></article>
      </section>
    </div>
    <aside>
      <section><h2>Technical toolkit</h2>
        <div class="skills-group"><strong>Languages</strong><p>Python, Go, Java, C++, TypeScript, GraphQL</p></div>
        <div class="skills-group"><strong>AI &amp; agents</strong><p>Claude Agent SDK, MCP, RAG, Amazon Bedrock, PyTorch, TensorFlow</p></div>
        <div class="skills-group"><strong>Infrastructure</strong><p>Kubernetes, Docker, Redis, gRPC, Postgres, Dgraph</p></div>
        <div class="skills-group"><strong>Cloud &amp; IaC</strong><p>AWS, Azure, GCP, Terraform, OCI</p></div>
      </section>
      <section><h2>Selected projects</h2>
        <div class="project"><strong>AlpacaBot Dashboard</strong><p>Terminal-style monitoring interface for a trading-agent project. <a href="https://github.com/sarvesh1karandikar/alpacabot-dashboard">GitHub</a></p></div>
        <div class="project"><strong>ChromaDB Retrieval</strong><p>FastAPI retrieval prototype with centroid-based collection routing. <a href="https://github.com/sarvesh1karandikar/chromadb">GitHub</a></p></div>
        <div class="project"><strong>DriveSuite</strong><p>Home-media assistant in development: earlier WhatsApp bridge, newer Telegram agent, and MCP scaffold. <a href="https://github.com/sarvesh1karandikar/DriveSuite">GitHub</a></p></div>
      </section>
      <section><h2>Education</h2>
        <div class="edu"><strong>University of Southern California</strong><span>MS, Computer Science | 2020</span></div>
        <div class="edu"><strong>SRM Institute of Science and Technology</strong><span>BTech, Computer Science &amp; Engineering | 2019</span></div>
      </section>
    </aside>
  </div>
  <div class="footer"><span>Selected contributions delivered with cross-functional teams.</span><span>sarveshk.dev/resume/</span></div>
</main>
</body>
</html>`;

async function main(): Promise<void> {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
  ].filter((path): path is string => Boolean(path));
  const executablePath = candidates.find((path) => existsSync(path));
  if (!executablePath) throw new Error("Chrome or Edge was not found. Set CHROME_PATH to its executable path.");
  const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setContent(RESUME_HTML, { waitUntil: "networkidle0" });
    await page.pdf({ path: "public/resume/sarvesh-karandikar.pdf", format: "letter", margin: { top: 0, right: 0, bottom: 0, left: 0 }, printBackground: true, preferCSSPageSize: true });
  } finally { await browser.close(); }
  console.log(`Resume PDF generated using ${executablePath}`);
}

main().catch((error) => { console.error(error); process.exit(1); });





