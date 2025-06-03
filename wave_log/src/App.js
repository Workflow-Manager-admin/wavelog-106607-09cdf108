import React, { useState, useEffect } from "react";
import "./App.css";
import { FaHome, FaWater, FaEdit, FaTrash } from "react-icons/fa";
import { GiSurferVan, GiWaveSurfer } from "react-icons/gi";
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
    }`} style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Navbar */}
      <nav className="navbar ocean-nav">
        <div className="logo">
          <span className="logo-symbol"><GiWaveSurfer /></span> SurfSync
        </div>
        <div className="nav-actions">
          <button className="btn nav-btn" onClick={goDashboard} aria-label="Stats">
            <MdOutlineBarChart /> <span className="hide-mobile">Dashboard</span>
          </button>
          <button className="btn nav-btn" onClick={goLog} aria-label="Log new session">
            <GiWaveSurfer /> <span className="hide-mobile">Log Session</span>
          </button>
        </div>
      </nav>

      {/* Futuristic animated SVG wave divider (top/main) */}
      <svg className="surf-divider-wave" viewBox="0 0 1440 70" height="44" fill="none" style={{marginTop:-16}} aria-hidden="true">
        <defs>
          <linearGradient id="sw1" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06ffe9"/>
            <stop offset="0.7" stopColor="#28aafe"/>
            <stop offset="1.0" stopColor="#fc28a8"/>
          </linearGradient>
        </defs>
        <path d="M0,37 C224,78 489,73 720,37 C951,1 1267,64 1440,44 L1440,70 L0,70 Z"
          fill="url(#sw1)" opacity="0.38"/>
      </svg>

      <main>
        {showReminder &&
          <div className="reminder-bar" role="status">
            🏄‍♂️ <span className="hide-mobile">Don&apos;t forget to log today&apos;s surf session!</span>
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

      {/* Animated surfboard as playful touch */}
      <div className="surfboard-animate" aria-hidden="true" title="Animated Surfboard">
        <svg viewBox="0 0 46 26" fill="none">
          <ellipse cx="20" cy="20" rx="16" ry="7.5" fill="#ffe929" opacity="0.15" />
          <path d="M7,21 Q23,2 39,19 Q36,31 20,24 Q15,21 7,21Z" fill="#fff" stroke="#28aafe" strokeWidth="2"/>
          <ellipse cx="22" cy="23" rx="12" ry="2.1" fill="#28aafe" opacity="0.19" />
          <rect x="27" y="17" width="7" height="2.8" rx="1" fill="#fc28a8"/>
        </svg>
      </div>

      {/* Neon animated bottom divider */}
      <svg className="surf-divider-wave" viewBox="0 0 1440 78" height="39" style={{transform:"rotate(180deg)", marginBottom:-12}} aria-hidden="true">
        <defs>
          <linearGradient id="sw2" x1="0" y1="0" x2="0" y2="78" gradientUnits="userSpaceOnUse">
            <stop stopColor="#65ff55"/>
            <stop offset="0.8" stopColor="#28aafe"/>
            <stop offset="1.0" stopColor="#fc28a8"/>
          </linearGradient>
        </defs>
        <path d="M0,71 C274,24 794,80 1440,55 L1440,78 L0,78 Z"
          fill="url(#sw2)" opacity="0.21"/>
      </svg>

      {/* Footer navigation */}
      <footer className="footer-nav">
        <button className="footer-btn" onClick={goHome}><MdOutlineWater /><div>Home</div></button>
        <button className="footer-btn" onClick={goLog}><GiWaveSurfer /><div>Log</div></button>
        <button className="footer-btn" onClick={goDashboard}><MdOutlineBarChart /><div>Dashboard</div></button>
      </footer>
    </div>
  );
}

export default App;
