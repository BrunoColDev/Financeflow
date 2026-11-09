// Ponto de entrada: é aqui que o React "liga" no HTML (div id="root").
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// BrowserRouter habilita as rotas (/login, /usuarios, ...) em toda a aplicação.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
