import React, { useState } from "react";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";

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
    <div className="session-detail-card">
      <button className="btn" style={{ position: "absolute", left: 15, top: 13, fontSize: "0.93rem" }} onClick={onBack}>
        <FaArrowLeft /> Back
      </button>
      {!editing ? (
        <>
          <div className="session-detail-mood">
            {moodObj ? moodObj.emoji : ""} <span style={{ fontSize: "1.1rem", verticalAlign: 2 }}>{moodObj ? moodObj.label : ""}</span>
          </div>
          <div className="session-detail-row"><span className="label">Date:</span> {session.date}</div>
          <div className="session-detail-row"><span className="label">Surf Spot:</span> {session.spot}</div>
          <div className="session-detail-row"><span className="label">Board:</span> {session.board}</div>
          <div className="session-detail-row"><span className="label">Waves:</span> {session.waves}</div>
          <div className="session-detail-row"><span className="label">Swell:</span> {session.swell}</div>
          <div className="session-detail-row"><span className="label">Wind:</span> {weatherIcons[session.wind] || ""} {session.wind.charAt(0).toUpperCase() + session.wind.slice(1)}</div>
          <div className="session-detail-row"><span className="label">Tide:</span> {session.tide}</div>
          <div className="session-detail-row session-notes">{session.notes ? <>Notes: {session.notes}</> : <span className="text-faint">No notes</span>}</div>
          <div className="session-detail-actions">
            <button className="btn" onClick={() => setEditing(true)}><FaEdit /> Edit</button>
            <button className="btn btn-accent" onClick={handleDelete}><FaTrash /> Delete</button>
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
            />
          </div>
          <div className="form-section">
            <label className="form-label">Surf Spot</label>
            <select className="form-select" name="spot" value={form.spot} onChange={handleChange} required>
              {spots.map((spot) => <option key={spot} value={spot}>{spot}</option>)}
            </select>
          </div>
          <div className="form-section">
            <label className="form-label">Board Used</label>
            <select className="form-select" name="board" value={form.board} onChange={handleChange} required>
              {boards.map((board) => <option key={board} value={board}>{board}</option>)}
            </select>
          </div>
          <div className="form-section">
            <label className="form-label">Mood</label>
            <div className="mood-picker">
              {moods.map((m) => (
                <button
                  key={m.code}
                  type="button"
                  className={`mood-btn${form.mood === m.code ? " selected" : ""}`}
                  onClick={() => handleMood(m.code)}
                  aria-label={m.label}
                >{m.emoji}</button>
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
              <select className="form-select" name="wind" value={form.wind} onChange={handleChange} required>
                {Object.entries(weatherIcons).map(([code, emoji]) => (
                  <option value={code} key={code}>{emoji} {code.charAt(0).toUpperCase() + code.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="condition-row">
              <span className="form-label" style={{ width: 70 }}>Tide</span>
              <select className="form-select" name="tide" value={form.tide} onChange={handleChange} required>
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
            />
          </div>
          <div className="form-section">
            <label className="form-label">Notes</label>
            <textarea
              className="form-input"
              name="notes"
              style={{ minHeight: '55px' }}
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="button" className="btn" onClick={() => setEditing(false)}>Cancel</button>
            <button type="submit" className="btn btn-accent">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SessionDetailScreen;
