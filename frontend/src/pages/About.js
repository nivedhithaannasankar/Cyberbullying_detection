export default function About() {
  return (
    <div className="card">
      <h2>About CyberShield AI</h2>

      <p style={{ lineHeight: "1.8" }}>
        CyberShield AI is an intelligent cyberbullying detection system that
        uses <strong>Machine Learning</strong> and{" "}
        <strong>Natural Language Processing (NLP)</strong> to identify harmful,
        abusive, and offensive content in real time.
      </p>

      <h3 style={{ marginTop: "25px" }}>Project Features</h3>

      <ul style={{ lineHeight: "2" }}>
        <li>Real-time cyberbullying detection</li>
        <li>Multi-category bullying classification</li>
        <li>Confidence score prediction</li>
        <li>Dashboard with live statistics</li>
        <li>History tracking of analyzed messages</li>
      </ul>
</div>
    );
  }