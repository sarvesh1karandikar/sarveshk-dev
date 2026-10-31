import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const executablePath = [process.env.CHROME_PATH, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(path => path && existsSync(path));
if (!executablePath) throw new Error('Set CHROME_PATH to an installed Chrome or Edge executable.');
const browser = await puppeteer.launch({executablePath, headless: true});
try {
  const page = await browser.newPage();
  await page.setViewport({width:1200,height:630,deviceScaleFactor:1});
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#0b0b0b;color:#f5f2eb;padding:56px 64px;font-family:Arial,sans-serif}header{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:26px;border-bottom:1px solid #494845}.name{font:bold 34px Georgia,serif}.role{font:16px Consolas,monospace;color:#c9c6bf}h1{font:bold 84px/1.06 Georgia,serif;letter-spacing:-3px;margin-top:56px;max-width:1050px}em{font-weight:700}.footer{display:flex;justify-content:space-between;align-items:center;margin-top:44px;padding-top:22px;border-top:1px solid #494845;color:#c9c6bf;font-size:18px}.url{color:#f5f2eb;font:20px Consolas,monospace}
  </style></head><body><header><span class="name">Sarvesh Karandikar.</span><span class="role">SENIOR SOFTWARE ENGINEER / CISCO</span></header><h1>I build infrastructure<br>for <em>AI agents.</em></h1><div class="footer"><span>Cloud networking · Platform engineering · AI systems</span><span class="url">sarveshk.dev</span></div></body></html>`);
  await page.screenshot({path:fileURLToPath(new URL('../public/og.png',import.meta.url)),type:'png'});
} finally { await browser.close(); }
console.log('Generated the 1200×630 portfolio share image.');
