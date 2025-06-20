import { useEffect, useState } from "react";
import { initWeb3, getMessage, setMessage } from "./utils/web3";

function App() {
  const [message, setMsg] = useState("Loading...");
  const [newMessage, setNewMessage] = useState("");

  const fetchMessage = async () => {
    try {
      await initWeb3();
      const msg = await getMessage();
      setMsg(msg);
    } catch (error) {
      console.error("Error fetching message:", error);
      setMsg("Error loading message");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const handleUpdateMessage = async () => {
    await setMessage(newMessage);
    setMsg(newMessage);
  };

  const handleRefresh = async () => {
    setNewMessage("");
    setMsg("Loading...");
    await fetchMessage();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#1a1a1a", marginBottom: "1.5rem" }}>
          Hello World and Name DApp
        </h1>
        <div
          style={{
            background: "#f8f9fa",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ margin: 0, color: "#4a5568" }}>
            Name: <span style={{ fontWeight: "500" }}>{message}</span>
          </p>
        </div>
        <input
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your name"
        />
        <div
          style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}
        >
          <button
            onClick={handleUpdateMessage}
            style={{
              background: "#4299e1",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
          >
            Get Name
          </button>
          <button
            onClick={handleRefresh}
            style={{
              background: "#48bb78",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "background 0.2s",
            }}
          >
            Set Name
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
