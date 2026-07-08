import React from "react";
import ReactDOM from "react-dom/client";
import { useTemporal } from "./lib/hooks/useTemporal";
import "./style.css";

function App() {
  const [text, setText, { undo, redo, clear, canUndo, canRedo, history }] =
    useTemporal("Hello", { clone: true, limit: 3 });
  const handleUpdateGhostText = (value: string) => {
    setText(value, true);
  };
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        color: "#f8fafc",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "30px", color: "#f4f4f4" }}>
          Limit and history skip test{" "}
        </h1>

        {/* inputs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>
              Main input (record history):
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                background: "#1e293b",
                color: "#fff",
                border: "1px border #334155",
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: "12px", color: "#94a3b8" }}>
              "Ghost" input (it doesn't history, skipHistory):
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => handleUpdateGhostText(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                background: "#1e293b",
                color: "#38bdf8",
                border: "1px border #334155",
              }}
            />
          </div>
        </div>

        {/* buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={undo}
            disabled={!canUndo}
            style={{
              padding: "8px 16px",
              background: canUndo ? "#4f46e5" : "#1e1b4b",
              color: "#fff",
            }}
          >
            Undo
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            style={{
              padding: "8px 16px",
              background: canRedo ? "#4f46e5" : "#1e1b4b",
              color: "#fff",
            }}
          >
            Redo
          </button>
          <button
            onClick={clear}
            style={{
              padding: "8px 16px",
              background: "#ef4444",
              color: "#fff",
            }}
          >
            Clear History
          </button>
        </div>

        {/* history dashboard */}
        <div
          style={{
            padding: "15px",
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "8px",
          }}
        >
          <h3
            style={{ fontSize: "14px", margin: "0 0 10px 0", color: "#38bdf8" }}
          >
            History (Limit: 3 steps):
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
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
