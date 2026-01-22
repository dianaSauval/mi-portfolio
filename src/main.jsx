import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import "./assets/styles/global.css";
import App from "./App.jsx";

import "./i18n"; // 👈 importante: inicializa i18next

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
