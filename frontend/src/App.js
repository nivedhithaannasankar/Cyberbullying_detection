import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("Home");

  return (
    <div className="app">
      <Navbar setPage={setPage} page={page} />

      <div className="content">
        {page === "Home" && <Home />}
        {page === "Detect" && <Detect />}
        {page === "Dashboard" && <Dashboard />}
        {page === "About" && <About />}
      </div>
    </div>
  );
}