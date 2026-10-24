// main.jsx — Application entry point
import React from "react";
import ReactDOM from "react-dom/client";
import { LibraryProvider } from "./context/LibraryContext";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";
import "./index.css"; // Tailwind styles

// ReactDOM.createRoot finds the <div id='root'> in index.html
// and renders the React application into it.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* LibraryProvider wraps everything — books and users accessible everywhere
    in main.jsx wraps the app and intentionally calls every component function 
    twice in development. This catches components with side effects in the wrong place. In production, 
    Strict Mode has no effect — it is a development tool only. 
     */}
    <LibraryProvider>
      <App />
    </LibraryProvider>
    <Analytics />
  </React.StrictMode>,
);
