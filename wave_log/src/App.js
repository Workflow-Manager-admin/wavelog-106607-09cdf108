import React, { useState, useEffect } from "react";
import "./App.css";
import { FaHome, FaWater, FaEdit, FaTrash } from "react-icons/fa";
import { GiSurferVan, GiSurfboard, GiWaveSurfer } from "react-icons/gi";
import { MdOutlineWater, MdOutlineBarChart } from "react-icons/md";
import { FaSwimmer } from "react-icons/fa";
import HomeScreen from "./components/HomeScreen";
import LogSessionScreen from "./components/LogSessionScreen";
import SessionDetailScreen from "./components/SessionDetailScreen";
import DashboardScreen from "./components/DashboardScreen";
import { sampleSessions, surfSpots, boards, moods, weatherIcons } from "./data/sampleData";

// PUBLIC_INTERFACE
function App() {
  // App "route": simple state, since single page.
  const [screen, setScreen] = useState("home"); // 'home', 'log', 'detail', 'dashboard'
  const [sessions, setSessions] = useState(() => sampleSessions); // Preloaded data
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState({ spot: "", board: "", mood: "" });
  const [showReminder, setShowReminder] = useState(false);

  // Daily reminder: show once per page load if no session today
  useEffect(() => {
    const today = (new Date()).toISOString().slice(0, 10);
    const hasToday = sessions.some(s => s.date === today);
    setShowReminder(!hasToday);
  }, [sessions]);

  // Navigation helpers
  const goHome = () => { setScreen("home"); setSelectedId(null); };
  const goLog = () => setScreen("log");
  const goDetail = id => { setSelectedId(id); setScreen("detail"); };
  const goDashboard = () => setScreen("dashboard");

  // Session helpers
  const addSession = (session) => {
    const newSessions = [{ ...session, id: Date.now().toString() }, ...sessions];
    setSessions(newSessions);
    setScreen("home");
  };
  const editSession = (id, updated) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, ...updated } : s));
    setScreen("detail");
  };
  const deleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
    setScreen("home");
  };

  // Filtering
  const filterSessions = () => (
    sessions.filter(s =>
      (!filter.spot || s.spot === filter.spot) &&
      (!filter.board || s.board === filter.board) &&
      (!filter.mood || s.mood === filter.mood)
    )
  );

  // Reminder Acknowledgement
  const dismissReminder = () => setShowReminder(false);

  // App main render
  return (
    <div className={`app ${
      screen === "home" ? "surf-bg-home"
      : screen === "dashboard" ? "surf-bg-dashboard"
      : screen === "log" ? "surf-bg-log"
      : screen === "detail" ? "surf-bg-detail"
      : "ocean-bg"
    }`}>
      <nav className="navbar ocean-nav">
        <div className="logo">
          <span className="logo-symbol"><GiWaveSurfer /></span> SurfSync
        </div>
        <div className="nav-actions">
          <button className="btn nav-btn" onClick={goDashboard} aria-label="Stats">
            <MdOutlineBarChart /> <span className="hide-mobile">Dashboard</span>
          </button>
          <button className="btn nav-btn" onClick={goLog} aria-label="Log new session">
            <GiSurfboard /> <span className="hide-mobile">Log Session</span>
          </button>
        </div>
      </nav>

      <main>
        {showReminder &&
          <div className="reminder-bar">
            🌊 Don't forget to log today's surf session!
            <button className="btn btn-accent" onClick={dismissReminder}>Dismiss</button>
          </div>
        }
        {screen === "home" &&
          <HomeScreen
            sessions={filterSessions()}
            filter={filter}
            setFilter={setFilter}
            spots={surfSpots}
            boards={boards}
            moods={moods}
            goLog={goLog}
            goDetail={goDetail}
          />
        }
        {screen === "log" &&
          <LogSessionScreen
            onSave={addSession}
            onCancel={goHome}
            spots={surfSpots}
            boards={boards}
            moods={moods}
            weatherIcons={weatherIcons}
          />
        }
        {screen === "detail" && selectedId &&
          <SessionDetailScreen
            session={sessions.find(s => s.id === selectedId)}
            onBack={goHome}
            onEdit={editSession}
            onDelete={deleteSession}
            spots={surfSpots}
            boards={boards}
            moods={moods}
            weatherIcons={weatherIcons}
          />
        }
        {screen === "dashboard" &&
          <DashboardScreen
            sessions={sessions}
            goHome={goHome}
          />
        }
      </main>

      <footer className="footer-nav">
        <button className="footer-btn" onClick={goHome}><MdOutlineWater /><div>Home</div></button>
        <button className="footer-btn" onClick={goLog}><GiSurfboard /><div>Log</div></button>
        <button className="footer-btn" onClick={goDashboard}><MdOutlineBarChart /><div>Dashboard</div></button>
      </footer>
    </div>
  );
}

export default App;
