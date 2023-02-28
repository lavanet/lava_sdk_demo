import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
console.log("USAOO");
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
