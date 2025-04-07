import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import and initialize Tempo Devtools
import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
