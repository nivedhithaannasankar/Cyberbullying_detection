import { useState } from "react";
import API from "../api";

export default function Detect() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const res = await API.post("/predict", { text });

      setPrediction(res.data.prediction);
      setConfidence(res.data.confidence);
    } catch (error) {
      setPrediction("Error connecting backend");
      setConfidence(null);
    }

    setLoading(false);
  };

  const getColor = () => {
    if (prediction === "Not Cyberbullying") {
      return "#2e7d32";
    }
    return "#d32f2f";
  };

  const getCategoryMessage = () => {
    switch (prediction) {
      case "Gender Cyberbullying":
        return "This text contains gender-based bullying.";

      case "Religious Cyberbullying":
        return "This text contains religion-based bullying.";

      case "Age-based Cyberbullying":
        return "This text contains age-based bullying.";

      case "Ethnicity Cyberbullying":
        return "This text contains ethnicity-based bullying.";

      case "General Cyberbullying":
        return "This text contains general cyberbullying.";

      case "Not Cyberbullying":
        return "This text appears safe and non-abusive.";

      default:
        return "";
    }
  };

  return (
    <div className="card">
      <h2>Detect Cyberbullying</h2>

      <textarea
        rows="6"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleCheck}>
        {loading ? "Analyzing..." : "Check"}
      </button>

      {prediction && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
            border: `2px solid ${getColor()}`
          }}
        >
          <h3 style={{ color: getColor() }}>
            Result: {prediction}
          </h3>

          <p>
            <strong>Category:</strong>{" "}
            {prediction === "Not Cyberbullying"
              ? "Safe Content"
              : prediction}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {getCategoryMessage()}
          </p>

          {confidence !== null && (
            <p>
              <strong>Confidence:</strong> {confidence}%
            </p>
          )}
        </div>
      )}
    </div>
  );
}