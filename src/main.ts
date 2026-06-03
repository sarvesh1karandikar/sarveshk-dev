import "./styles/tokens.css";
import "./styles/resume.css";
import { renderStatusBar } from "./statusbar";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.appendChild(renderStatusBar());
