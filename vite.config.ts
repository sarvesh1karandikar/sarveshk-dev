import { defineConfig } from "vite";
import { renderPage } from "./src/page";

export default defineConfig({
  base: "./",
  plugins: [{
    name: 'render-resume-html',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!context.filename.endsWith('resume.html')) return html;
        if (!html.includes('<div id="app"></div>')) throw new Error('Missing résumé render target');
        return html.replace('<div id="app"></div>', `<div id="app">${renderPage()}</div>`)
          .replace(/\r\n?/g, '\n').replace(/[ \t]+$/gm, '');
      },
    },
  }],
  build: {
    target: "es2022",
    sourcemap: false,
    rollupOptions: { input: { index: "index.html", resume: "resume.html" } },
  },
});
