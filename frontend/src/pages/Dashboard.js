import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    categories: {}
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/stats");
      setStats(res.data);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const categories = stats.categories || {};

  const safeCount = categories["Not Cyberbullying"] || 0;

  const bullyingCount =
    Object.entries(categories)
      .filter(([key]) => key !== "Not Cyberbullying")
      .reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="card">
      <h2>Dashboard (Live)</h2>

      <div className="grid">
        <div className="box">
          <h3>Total Checks</h3>
          <p>{stats.total}</p>
        </div>

        <div className="box">
          <h3>Total Cyberbullying</h3>
          <p>{bullyingCount}</p>
        </div>

        <div className="box">
          <h3>Safe Messages</h3>
          <p>{safeCount}</p>
        </div>
      </div>

      <h3 style={{ marginTop: "25px" }}>
        Cyberbullying Categories
      </h3>

      <div className="grid">
        <div className="box">
          <h4>Gender</h4>
          <p>{categories["Gender Cyberbullying"] || 0}</p>
        </div>

        <div className="box">
          <h4>Religion</h4>
          <p>{categories["Religious Cyberbullying"] || 0}</p>
        </div>

        <div className="box">
          <h4>Age</h4>
          <p>{categories["Age-based Cyberbullying"] || 0}</p>
        </div>

        <div className="box">
          <h4>Ethnicity</h4>
          <p>{categories["Ethnicity Cyberbullying"] || 0}</p>
        </div>

        <div className="box">
          <h4>General</h4>
          <p>{categories["General Cyberbullying"] || 0}</p>
        </div>
      </div>
    </div>
  );
}