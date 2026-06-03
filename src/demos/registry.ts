import { gallery, beforeAfter, mockChat, note } from "./mountHelpers";

export type DemoStatus = "live" | "prebaked" | "mock";

export interface DemoEntry {
  id: string;
  title: string;
  repo?: string;
  tech: string[];
  status: DemoStatus;
  mount: () => HTMLElement;
}

const base = (id: string) => `/demos/${id}`;

export const demoRegistry: DemoEntry[] = [
  {
    id: "satellite-road-detection",
    title: "Satellite Road Detection",
    repo: "https://github.com/sarvesh1karandikar/satellite-road-detection",
    tech: ["Computer Vision"],
    status: "prebaked",
    mount: () =>
      beforeAfter(`${base("satellite-road-detection")}/before.jpg`, `${base("satellite-road-detection")}/after.jpg`, "Detected roads highlighted in yellow"),
  },
  {
    id: "cifar-dcgan",
    title: "DCGAN Image Synthesis",
    repo: "https://github.com/sarvesh1karandikar/cifar-dcgan",
    tech: ["TensorFlow"],
    status: "prebaked",
    mount: () =>
      gallery("Generated CIFAR-10 samples", [
        `${base("cifar-dcgan")}/grid-1.png`,
        `${base("cifar-dcgan")}/grid-2.png`,
        `${base("cifar-dcgan")}/grid-3.png`,
      ]),
  },
  {
    id: "cifar-image-classifier",
    title: "CIFAR-10 Image Classifier",
    repo: "https://github.com/sarvesh1karandikar/cifar-image-classifier",
    tech: ["TensorFlow"],
    status: "prebaked",
    mount: () => gallery("Sample predictions (75% test accuracy)", [`${base("cifar-image-classifier")}/preds.png`]),
  },
  {
    id: "lstm-text-generator",
    title: "LSTM Text Generator",
    repo: "https://github.com/sarvesh1karandikar/lstm-text-generator",
    tech: ["NumPy"],
    status: "prebaked",
    mount: () => {
      const w = gallery("Sample generated text", []);
      w.appendChild(note('Seed "alice" → "alice was beginning to get very tired of sitting by her sister…"'));
      return w;
    },
  },
  {
    id: "alpacabot-dashboard",
    title: "AlpacaBot Dashboard",
    repo: "https://github.com/sarvesh1karandikar/alpacabot-dashboard",
    tech: ["JavaScript"],
    status: "mock",
    mount: () => {
      const w = gallery("Trading dashboard (demo data)", [`${base("alpacabot-dashboard")}/dashboard.png`]);
      w.classList.add("demo-green-scope");
      return w;
    },
  },
  {
    id: "1DotDev",
    title: "WhatsApp AI Assistant",
    repo: "https://github.com/sarvesh1karandikar/1DotDev",
    tech: ["Node.js", "AWS"],
    status: "mock",
    mount: () =>
      mockChat("WhatsApp AI Assistant", [
        { from: "user", text: "/note buy milk" },
        { from: "bot", text: "📝 Saved to notes." },
        { from: "user", text: "summarize my day" },
        { from: "bot", text: "Here's a quick rundown of today's notes…" },
      ]),
  },
  {
    id: "DriveSuite",
    title: "WhatsApp Media Bridge",
    repo: "https://github.com/sarvesh1karandikar/DriveSuite",
    tech: ["Node.js", "Docker"],
    status: "mock",
    mount: () =>
      mockChat("Media Bridge", [
        { from: "user", text: "Add Breaking Bad" },
        { from: "bot", text: "Added to Sonarr. ~4 hours to download." },
      ]),
  },
  {
    id: "workout",
    title: "Workout Tracker PWA",
    repo: "https://github.com/sarvesh1karandikar/workout",
    tech: ["React", "TypeScript", "PWA"],
    status: "live",
    mount: () => {
      const wrap = document.createElement("div");
      wrap.className = "demo-iframe-wrap";
      const frame = document.createElement("iframe");
      frame.className = "demo-iframe";
      frame.src = "https://sarvesh1karandikar.github.io/workout/";
      frame.loading = "lazy";
      frame.title = "Workout Tracker PWA (live)";
      wrap.appendChild(frame);
      return wrap;
    },
  },
];

export function getDemo(id: string): DemoEntry | undefined {
  return demoRegistry.find((d) => d.id === id);
}
