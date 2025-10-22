import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//import "./index.css"; // Estilos globales (si necesitas alguno base)

/* Creamos el root y montamos App */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
