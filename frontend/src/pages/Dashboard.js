import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    bullying: 0,
    safe: 0,
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
    fetchStats(); // first load

    const interval = setInterval(() => {
      fetchStats(); // auto refresh
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>Dashboard (Live)</h2>

      <div className="grid">
        <div className="box">
          <h3>Total Checks</h3>
          <p>{stats.total}</p>
        </div>

        <div className="box">
          <h3>Bullying Detected</h3>
          <p>{stats.bullying}</p>
        </div>

        <div className="box">
          <h3>Safe Messages</h3>
          <p>{stats.safe}</p>
        </div>
      </div>
    </div>
  );
}