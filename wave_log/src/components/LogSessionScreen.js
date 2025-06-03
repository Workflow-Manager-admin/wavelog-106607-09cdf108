import React, { useState } from "react";

// PUBLIC_INTERFACE
function LogSessionScreen({ onSave, onCancel, spots, boards, moods, weatherIcons }) {
  // Initial values (today's date as default)
  const today = (new Date()).toISOString().slice(0, 10);
  const [form, setForm] = useState({
    date: today, spot: spots[0], board: boards[0], mood: moods[0].code,
    waves: 3, swell: "", wind: "glassy", tide: "Low", notes: ""
  });

  // Handle text/number input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Handle mood select
  const handleMood = moodCode => setForm(f => ({ ...f, mood: moodCode }));

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      className="log-session-form surf-bg-log"
      onSubmit={handleSubmit}
      style={{
        border: "2.4px solid #28aafe44",
        borderRadius: 28,
        boxShadow: "0 0 34px #06ffe933, 0 2px 14px #fc28a811",
        background: "linear-gradient(105deg,rgba(251,254,255,0.75) 70%, #eafffdc2 100%)",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: 480
      }}
    >
      {/* Futuristic surfboard accent */}
      <div className="surfboard-animate" style={{ right: 28, bottom: 8, width: 30, height: 20 }}>
        <svg viewBox="0 0 46 26" fill="none">
          <ellipse cx="20" cy="20" rx="13" ry="5" fill="#ffe929" opacity="0.15" />
          <path d="M7,21 Q23,2 39,19 Q36,31 20,24 Q15,21 7,21Z" fill="#fff" stroke="#28aafe" strokeWidth="2"/>
          <ellipse cx="22" cy="23" rx="9" ry="1.2" fill="#28aafe" opacity="0.14" />
        </svg>
      </div>
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
        <select
          className="form-select"
          name="spot"
          value={form.spot}
          onChange={handleChange}
          required
          style={{ borderColor: "#28aafe" }}
        >
          {spots.map(spot => (
            <option key={spot} value={spot}>{spot}</option>
          ))}
        </select>
      </div>
      <div className="form-section">
        <label className="form-label">Board Used</label>
        <select
          className="form-select"
          name="board"
          value={form.board}
          onChange={handleChange}
          required
          style={{ borderColor: "#fc28a8" }}
        >
          {boards.map(board => (
            <option key={board} value={board}>{board}</option>
          ))}
        </select>
      </div>
      <div className="form-section">
        <label className="form-label">Mood</label>
        <div className="mood-picker" style={{ background: "rgba(249,255,246,0.36)" }}>
          {moods.map(m => (
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
            >
              {m.emoji}
            </button>
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
          <select
            className="form-select"
            name="wind"
            value={form.wind}
            onChange={handleChange}
            required
            style={{ borderColor: "#1DE9B6" }}
          >
            {Object.entries(weatherIcons).map(([code, emoji]) => (
              <option value={code} key={code}>{emoji} {code.charAt(0).toUpperCase() + code.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="condition-row">
          <span className="form-label" style={{ width: 70, color: "#ffe929" }}>Tide</span>
          <select
            className="form-select"
            name="tide"
            value={form.tide}
            onChange={handleChange}
            required
            style={{ borderColor: "#ffe929" }}
          >
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
          placeholder="How many waves?"
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
          style={{ minHeight: "58px", borderColor: "#fc28a8" }}
          name="notes"
          placeholder="What stood out, or fun highlights?"
          value={form.notes}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="btn" style={{ background: "#fc28a8", color: "#fff"}} onClick={onCancel}>Cancel</button>
        <button className="btn btn-accent" type="submit" style={{ background: "#1DE9B6", color: "#101639" }}>Save</button>
      </div>
    </form>
  );
}

export default LogSessionScreen;
