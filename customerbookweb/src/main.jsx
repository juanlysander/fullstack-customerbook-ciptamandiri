import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { CLIENT_ID } from "./addresses";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ThirdwebProvider clientId={CLIENT_ID} activeChain={Mumbai}>
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
);
