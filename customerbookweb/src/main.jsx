import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { CLIENT_ID } from "../env";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ThirdwebProvider clientId={CLIENT_ID} activeChain={Sepolia}>
      <App />
    </ThirdwebProvider>
  </BrowserRouter>
);
