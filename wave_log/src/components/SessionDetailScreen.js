import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";

// PUBLIC_INTERFACE
function SessionDetailScreen({ session, onBack, onEdit, onDelete, spots, boards, moods, weatherIcons }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    ...session
  });

  const moodObj = moods.find(m => m.code === session.mood);

  // Edit mode change handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleMood = moodCode => setForm(f => ({ ...f, mood: moodCode }));

  // Save changes
  const handleEditSave = e => {
    e.preventDefault();
    onEdit(session.id, form);
    setEditing(false);
  };

  // Delete confirm
  const handleDelete = () => {
    if (window.confirm("Delete this session? This cannot be undone.")) {
      onDelete(session.id);
    }
  };

  return (
    <div
      className="session-detail-card surf-bg-detail"
      style={{
        border: "2.7px solid #fc28a866",
        boxShadow: "0 0 39px #1DE9B633, 0 5px 31px #fc28a822",
        borderRadius: 32,
        background: "linear-gradient(120deg,rgba(255,255,255,0.87) 70%,#fc28a822 100%)",
        position: "relative"
      }}
    >
      {/* Futuristic surfboard accent */}
      <div className="surfboard-animate" style={{ right: 38, bottom: 12, width: 38, height: 25 }}>
        <svg viewBox="0 0 46 26" fill="none">
          <ellipse cx="20" cy="20" rx="12" ry="7" fill="#ffe929" opacity="0.10" />
          <path d="M7,21 Q23,2 39,19 Q36,31 20,24 Q15,21 7,21Z" fill="#fff" stroke="#28aafe" strokeWidth="2"/>
          <ellipse cx="22" cy="23" rx="10" ry="1.8" fill="#28aafe" opacity="0.13" />
        </svg>
      </div>
      <button className="btn" style={{
        position: "absolute",
        left: 12,
        top: 11,
        fontSize: "1.1rem",
        background: "#28aafe",
        color: "#fff"
      }} onClick={onBack}>
        <GiSurferVan /> Back
      </button>
      {!editing ? (
        <>
          <div className="session-detail-mood" style={{ textShadow: "0 0 12px #fc28a8" }}>
            {moodObj ? moodObj.emoji : ""} <span style={{ fontSize: "1.13rem", verticalAlign: 2, color: "#fc28a8" }}>{moodObj ? moodObj.label : ""}</span>
          </div>
          <div className="session-detail-row"><span className="label" style={{ color: "#65ff55" }}>Date:</span> <span style={{ color: "#28aafe" }}>{session.date}</span></div>
          <div className="session-detail-row"><span className="label" style={{ color: "#28aafe" }}>Surf Spot:</span> <span style={{ color: "#fc28a8" }}>{session.spot}</span></div>
          <div className="session-detail-row"><span className="label" style={{ color: "#ffe929" }}>Board:</span> <span style={{ color: "#28aafe" }}>{session.board}</span></div>
          <div className="session-detail-row"><span className="label" style={{ color: "#28aafe" }}>Waves:</span> <span style={{ color: "#65ff55" }}>{session.waves}</span></div>
          <div className="session-detail-row"><span className="label" style={{ color: "#fc28a8" }}>Swell:</span> <span>{session.swell}</span></div>
          <div className="session-detail-row">
            <span className="label" style={{ color: "#1DE9B6" }}>Wind:</span> {weatherIcons[session.wind] || ""} {session.wind.charAt(0).toUpperCase() + session.wind.slice(1)}
          </div>
          <div className="session-detail-row"><span className="label" style={{ color: "#ffe929" }}>Tide:</span> {session.tide}</div>
          <div className="session-detail-row session-notes">{session.notes
            ? <>Notes: <span style={{ color: "#28aafe" }}>{session.notes}</span></>
            : <span className="text-faint">No notes</span>}
          </div>
          <div className="session-detail-actions">
            <button className="btn" style={{ background: "#fc28a8", color: "#fff" }} onClick={() => setEditing(true)}><FaEdit /> Edit</button>
            <button className="btn btn-accent" style={{ background: "#1DE9B6", color: "#101639" }} onClick={handleDelete}><FaTrash /> Delete</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditSave}>
          <div className="form-section">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              style={{ borderColor: "#ffe929" }}
            />
          </div>
          <div className="form-section">
            <label className="form-label">Surf Spot</label>
            <select className="form-select" name="spot" value={form.spot} onChange={handleChange} required style={{ borderColor: "#28aafe" }}>
              {spots.map((spot) => <option key={spot} value={spot}>{spot}</option>)}
            </select>
          </div>
          <div className="form-section">
            <label className="form-label">Board Used</label>
            <select className="form-select" name="board" value={form.board} onChange={handleChange} required style={{ borderColor: "#fc28a8" }}>
              {boards.map((board) => <option key={board} value={board}>{board}</option>)}
            </select>
          </div>
          <div className="form-section">
            <label className="form-label">Mood</label>
            <div className="mood-picker" style={{ background: "rgba(249,255,246,0.36)" }}>
              {moods.map((m) => (
                <button
                  key={m.code}
                  type="button"
                  className={`mood-btn${form.mood === m.code ? " selected" : ""}`}
                  onClick={() => handleMood(m.code)}
                  aria-label={m.label}
                  style={{
                    borderColor: form.mood === m.code ? "#fc28a8" : "#28aafe",
                    transition: "border 0.14s, filter 0.13s"
                  }}
                >{m.emoji}</button>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="condition-row">
              <span className="form-label" style={{ width: 70, color: "#28aafe" }}>Swell</span>
              <input
                className="form-input"
                type="text"
                name="swell"
                placeholder="e.g. 3-5ft"
                value={form.swell}
                onChange={handleChange}
                style={{ borderColor: "#28aafe" }}
              />
            </div>
            <div className="condition-row">
              <span className="form-label" style={{ width: 70, color: "#1DE9B6" }}>Wind</span>
              <select className="form-select" name="wind" value={form.wind} onChange={handleChange} required style={{ borderColor: "#1DE9B6" }}>
                {Object.entries(weatherIcons).map(([code, emoji]) => (
                  <option value={code} key={code}>{emoji} {code.charAt(0).toUpperCase() + code.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="condition-row">
              <span className="form-label" style={{ width: 70, color: "#ffe929" }}>Tide</span>
              <select className="form-select" name="tide" value={form.tide} onChange={handleChange} required style={{ borderColor: "#ffe929" }}>
                <option value="Low">Low</option>
                <option value="Rising">Rising</option>
                <option value="High">High</option>
                <option value="Falling">Falling</option>
              </select>
            </div>
          </div>
          <div className="form-section">
            <label className="form-label">Wave Count</label>
            <input
              className="form-input"
              type="number"
              min={0}
              max={99}
              name="waves"
              value={form.waves}
              onChange={handleChange}
              required
              style={{ borderColor: "#65ff55" }}
            />
          </div>
          <div className="form-section">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              name="notes"
              style={{ minHeight: '55px', borderColor: "#fc28a8" }}
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="button" className="btn" style={{ background: "#fc28a8", color: "#fff" }} onClick={() => setEditing(false)}>Cancel</button>
            <button type="submit" className="btn btn-accent" style={{ background: "#1DE9B6", color: "#101639" }}>Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SessionDetailScreen;
