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
    <form className="log-session-form surf-bg-log" onSubmit={handleSubmit}>
      <div className="form-section">
        <label className="form-label">Date</label>
        <input
          className="form-input"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
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
        >
          {boards.map(board => (
            <option key={board} value={board}>{board}</option>
          ))}
        </select>
      </div>
      <div className="form-section">
        <label className="form-label">Mood</label>
        <div className="mood-picker">
          {moods.map(m => (
            <button
              key={m.code}
              type="button"
              className={`mood-btn${form.mood === m.code ? " selected" : ""}`}
              onClick={() => handleMood(m.code)}
              aria-label={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>
      <div className="form-section">
        <div className="condition-row">
          <span className="form-label" style={{ width: 70 }}>Swell</span>
          <input
            className="form-input"
            type="text"
            name="swell"
            placeholder="e.g. 3-5ft"
            value={form.swell}
            onChange={handleChange}
          />
        </div>
        <div className="condition-row">
          <span className="form-label" style={{ width: 70 }}>Wind</span>
          <select
            className="form-select"
            name="wind"
            value={form.wind}
            onChange={handleChange}
            required
          >
            {Object.entries(weatherIcons).map(([code, emoji]) => (
              <option value={code} key={code}>{emoji} {code.charAt(0).toUpperCase() + code.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="condition-row">
          <span className="form-label" style={{ width: 70 }}>Tide</span>
          <select
            className="form-select"
            name="tide"
            value={form.tide}
            onChange={handleChange}
            required
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
        />
      </div>
      <div className="form-section">
        <label className="form-label">Notes</label>
        <textarea
          className="form-input"
          style={{ minHeight: "58px" }}
          name="notes"
          placeholder="What stood out, or fun highlights?"
          value={form.notes}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn btn-accent" type="submit">Save</button>
      </div>
    </form>
  );
}

export default LogSessionScreen;
