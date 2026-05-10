import { useState } from "react";
import API from "../api";

export default function Detect() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await API.post("/predict", { text });
      setResult(res.data.prediction);
    } catch {
      setResult("Error connecting backend");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Detect Cyberbullying</h2>

      <textarea
        rows="6"
        placeholder="Enter text..."
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleCheck}>
        {loading ? "Analyzing..." : "Check"}
      </button>

      {result && (
      <h3
  style={{
    color:
      result === "Cyberbullying"
        ? "red"
        : result === "Not Cyberbullying"
        ? "#28742d"
        : "black"
  }}
>
  Result: {result}
</h3>
      )}
    </div>
  );
}