import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/Styles/index.css";
import "./assets/Styles/responsiveness.css";
import Router from "./Router/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
