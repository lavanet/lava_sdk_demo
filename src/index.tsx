import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Ethers from "./ethers/Ethers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Ethers />
  </React.StrictMode>
);
