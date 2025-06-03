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
    <div className="surf-bg-home" style={{ borderRadius: 16, minHeight: "100vh" }}>
      <div className="action-bar">
        <button className="btn" onClick={goLog}>
          <GiWaveSurfer /> Log New Session
        </button>
        <span className="text-faint" style={{ fontSize: "1.07rem" }}>
          <FaSwimmer style={{ verticalAlign: -2, marginRight: 3 }} />
          {sessions.length} session{sessions.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="filter-bar">
        <label>
          Spot:
          <select
            className="filter-select"
            value={filter.spot}
            onChange={(e) => setFilter(f => ({ ...f, spot: e.target.value }))}
            aria-label="Filter by spot"
          >
            <option value="">All</option>
            {spots.map(spot => (
              <option value={spot} key={spot}>{spot}</option>
            ))}
          </select>
        </label>
        <label>
          Board:
          <select
            className="filter-select"
            value={filter.board}
            onChange={e => setFilter(f => ({ ...f, board: e.target.value }))}
            aria-label="Filter by board"
          >
            <option value="">All</option>
            {boards.map(b => (
              <option value={b} key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label>
          Mood:
          <select
            className="filter-select"
            value={filter.mood}
            onChange={e => setFilter(f => ({ ...f, mood: e.target.value }))}
            aria-label="Filter by mood"
          >
            <option value="">All</option>
            {moods.map(m => (
              <option value={m.code} key={m.code}>
                {m.emoji} {m.label}
              </option>
            ))}
          </select>
        </label>
        <button className="reset-filter-btn" onClick={resetFilter}>
          Reset
        </button>
      </div>
      <div className="session-list">
        {sessions.length === 0 && (
          <div style={{
            background: "#d7f6fb",
            color: "#226085",
            padding: "18px",
            borderRadius: "16px",
            marginTop: "14px",
            textAlign: "center"
          }}>
            No sessions found. Try changing your filters, or <span style={{ fontWeight: "bold" }}>Log a new session!</span>
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
    <div className="session-card surf-glass-card" onClick={onClick} tabIndex={0} role="button" aria-label={`${session.spot} session`} >
      <div className="session-main">
        <div className="spot">{session.spot}</div>
        <div className="session-details-row">
          <span>Board: <b>{session.board}</b></span>
          <span>Waves: <b>{session.waves}</b></span>
          <span className="session-mood">{moodObj ? moodObj.emoji : ""}</span>
        </div>
      </div>
      <span className="surf-date">{session.date}</span>
    </div>
  );
}

export default HomeScreen;
