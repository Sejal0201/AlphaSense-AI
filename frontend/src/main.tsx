import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/app/App";
import { QueryProvider } from "@/app/providers/query-provider";
import { StockProvider } from "@/context/StockContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <StockProvider>
          <App />
        </StockProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);