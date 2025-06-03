import React from "react";
import { GiWaveSurfer } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";

// PUBLIC_INTERFACE
function HomeScreen({
  sessions,
  filter,
  setFilter,
  spots,
  boards,
  moods,
  goLog,
  goDetail
}) {
  const resetFilter = () =>
    setFilter({ spot: "", board: "", mood: "" });

  return (
    <div className="surf-bg-home" style={{ borderRadius: 20, minHeight: "100vh", position: "relative" }}>
      <div className="action-bar">
        <button className="btn neon-gradient" onClick={goLog}>
          <GiWaveSurfer style={{ filter: "drop-shadow(0 0 7px #06ffe9)" }} /> Log New Session
        </button>
        <span className="text-faint" style={{ fontSize: "1.14rem", textShadow: "0 0 7px #28aafeaf" }}>
          <FaSwimmer style={{ verticalAlign: -2, marginRight: 4, color: "#28aafe" }} />
          {sessions.length} session{sessions.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="filter-bar" style={{ boxShadow: "0 0 13px #28aaff33", border: "1.5px solid #28aafe33" }}>
        <label>
          <span style={{ color: "#28aafe", fontWeight: 800 }}>Spot:</span>
          <select
            className="filter-select"
            value={filter.spot}
            onChange={(e) => setFilter(f => ({ ...f, spot: e.target.value }))}
            aria-label="Filter by spot"
            style={{ marginLeft: 4, fontWeight: 600 }}
          >
            <option value="">All</option>
            {spots.map(spot => (
              <option value={spot} key={spot}>{spot}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ color: "#fc28a8", fontWeight: 800 }}>Board:</span>
          <select
            className="filter-select"
            value={filter.board}
            onChange={e => setFilter(f => ({ ...f, board: e.target.value }))}
            aria-label="Filter by board"
            style={{ marginLeft: 4, fontWeight: 600 }}
          >
            <option value="">All</option>
            {boards.map(b => (
              <option value={b} key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label>
          <span style={{ color: "#ffe929", fontWeight: 900 }}>Mood:</span>
          <select
            className="filter-select"
            value={filter.mood}
            onChange={e => setFilter(f => ({ ...f, mood: e.target.value }))}
            aria-label="Filter by mood"
            style={{ marginLeft: 4, fontWeight: 600 }}
          >
            <option value="">All</option>
            {moods.map(m => (
              <option value={m.code} key={m.code}>
                {m.emoji} {m.label}
              </option>
            ))}
          </select>
        </label>
        <button className="reset-filter-btn" style={{color:"#28aafe", fontWeight:900}} onClick={resetFilter}>
          Reset
        </button>
      </div>
      {/* Animated wave SVG between filters and session list for playfulness */}
      <svg className="surf-divider-wave" viewBox="0 0 1440 60" height="36" aria-hidden="true" style={{ marginTop: -17 }}>
        <defs>
          <linearGradient id="wah1" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fc28a8"/>
            <stop offset="1.0" stopColor="#28aafe"/>
          </linearGradient>
        </defs>
        <path d="M0,34 Q370,57 660,22 T1440,31 L1440,60 L0,60 Z"
          fill="url(#wah1)" opacity="0.18"/>
      </svg>
      <div className="session-list">
        {sessions.length === 0 && (
          <div style={{
            background: "linear-gradient(95deg,#f1faffbb 75%,#ffe929aa 100%)",
            color: "#28aafe",
            padding: "21px",
            borderRadius: "19px",
            marginTop: "21px",
            textAlign: "center",
            fontWeight: 800,
            fontSize: "1.17rem",
            boxShadow: "0 3px 26px #28aaff1c"
          }}>
            No sessions found. Try changing your filters, or <span style={{ fontWeight: "bold", color: "#fc28a8" }}>Log a new session!</span>
          </div>
        )}
        {sessions.map(s => (
          <SessionCard
            key={s.id}
            session={s}
            moods={moods}
            onClick={() => goDetail(s.id)}
          />
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function SessionCard({ session, moods, onClick }) {
  const moodObj = moods.find(m => m.code === session.mood);
  return (
    <div
      className="session-card surf-glass-card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`${session.spot} session`}
      style={{
        position: "relative",
        overflow: "visible",
        border: "2.5px solid #28aafe33",
        marginBottom: 26,
        background:
          "linear-gradient(107deg,rgba(255,255,255,0.67) 59%,rgba(216,252,251,0.7) 100%,#fc28a840 113%)"
      }}
    >
      {/* Bobbing neon surfboard as a playful surf accent */}
      <div className="surfboard-animate" style={{
        right: 20, bottom: 5, width: 35, height:22, pointerEvents: "none"
      }}>
        <svg viewBox="0 0 46 26" fill="none">
          <ellipse cx="20" cy="20" rx="15" ry="7" fill="#ffe929" opacity="0.13" />
          <path d="M7,21 Q23,2 39,19 Q36,31 20,24 Q15,21 7,21Z" fill="#fff" stroke="#28aafe" strokeWidth="2"/>
          <ellipse cx="22" cy="23" rx="10" ry="1.7" fill="#28aafe" opacity="0.15" />
        </svg>
      </div>
      <div className="session-main">
        <div className="spot" style={{ color: "#fc28a8", fontWeight:900 }}>{session.spot}</div>
        <div className="session-details-row">
          <span >Board: <b style={{color:'#28aafe'}}>{session.board}</b></span>
          <span>Waves: <b style={{color:'#65ff55'}}>{session.waves}</b></span>
          <span className="session-mood" style={{filter:"drop-shadow(0 0 10px #28aafe)"}}>{moodObj ? moodObj.emoji : ""}</span>
        </div>
      </div>
      <span className="surf-date">{session.date}</span>
    </div>
  );
}

export default HomeScreen;
