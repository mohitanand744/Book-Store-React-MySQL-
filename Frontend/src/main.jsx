import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/Styles/index.css";
import "./assets/Styles/responsiveness.css";
import Router from "./Router/Router.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Provider } from "react-redux";
import store from "./store/Redux/ConfigureReduxStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
