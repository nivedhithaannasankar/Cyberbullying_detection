export default function Navbar({ setPage, page }) {
  const items = ["Home", "Detect", "Dashboard", "About"];

  return (
    <div className="navbar">
      <h2 style={{ color: "#00e5ff" }}>CyberShield AI</h2>
      <div className="nav-links">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={page === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}