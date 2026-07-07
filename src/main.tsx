import React from "react";
import ReactDOM from "react-dom/client";
import { useTemporal } from "./lib/hooks/useTemporal";
import "./style.css";

function App() {
  const [text, setText, { undo, redo, clear, canUndo, canRedo, history }] =
    useTemporal("Hello", { clone: true });

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        color: "#f8fafc",
        backgroundColor: "#0f172a",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1
          style={{ fontSize: "24px", marginBottom: "20px", color: "#8d93b3" }}
        >
          useTemporal Test App
        </h1>

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #334155",
            backgroundColor: "#1e293b",
            color: "#fff",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        {/* History dashboard */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <button
            onClick={undo}
            disabled={!canUndo}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: canUndo ? "#4f46e5" : "#334155",
              color: canUndo ? "#fff" : "#94a3b8",
              cursor: canUndo ? "pointer" : "not-allowed",
              fontWeight: "bold",
            }}
          >
            ← Undo
          </button>

          <button
            onClick={redo}
            disabled={!canRedo}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: canRedo ? "#4f46e5" : "#334155",
              color: canRedo ? "#fff" : "#94a3b8",
              cursor: canRedo ? "pointer" : "not-allowed",
              fontWeight: "bold",
            }}
          >
            Redo →
          </button>

          <button
            onClick={clear}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "auto",
            }}
          >
            Clear History
          </button>
        </div>

        {/* Reactive history array display section */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "#1e293b",
            borderRadius: "8px",
            border: "1px solid #334155",
          }}
        >
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "14px",
              textTransform: "uppercase",
              color: "#94a3b8",
              letterSpacing: "1px",
            }}
          >
            History Log ({history.length} steps)
          </h3>
          {history.length === 0 ? (
            <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
              История пуста
            </p>
          ) : (
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                fontSize: "14px",
                color: "#cbd5e1",
              }}
            >
              {history.map((step, index) => (
                <li key={index} style={{ marginBottom: "6px" }}>
                  Step {index + 1}:{" "}
                  <span style={{ fontWeight: "bold", color: "#818cf8" }}>
                    "{step}"
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

// Render app in the root div
const rootElement = document.getElementById("app");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
