import { useState } from "react";
import CatalogPlain from "./CatalogPlain";
import CatalogOptimized from "./CatalogOptimized";
import "./OptimizationPage.css";

function CatalogCompare({ products, children }) {
  const [mode, setMode] = useState("plain");

  const switchMode = (next) => {
    console.clear(); // чистая консоль для сравнения
    setMode(next);
  };

  return (
    <div className="opt-page">
      {children}

      <div className="opt-mode">
        <button
          className={`opt-mode__btn ${mode === "plain" ? "opt-mode__btn--active" : ""}`}
          onClick={() => switchMode("plain")}
        >
          ❌ Без оптимизации
        </button>
        <button
          className={`opt-mode__btn ${mode === "optimized" ? "opt-mode__btn--active" : ""}`}
          onClick={() => switchMode("optimized")}
        >
          ✅ С оптимизацией
        </button>
      </div>

      {mode === "plain" ? (
        <CatalogPlain key="plain" products={products} />
      ) : (
        <CatalogOptimized key="optimized" products={products} />
      )}
    </div>
  );
}

export default CatalogCompare;
