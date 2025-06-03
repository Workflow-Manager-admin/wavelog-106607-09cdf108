import React from "react";
import { FaArrowLeft } from "react-icons/fa";

// Helper: get most common value in array
function mostCommon(arr) {
  if (!arr.length) return "";
  const counts = {};
  arr.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
  let max = 0, val = "";
  Object.entries(counts).forEach(([k, c]) => {
    if (c > max) { max = c; val = k; }
  });
  return val;
}

// Helper: count per value in array
function countBy(arr) {
  const map = {};
  arr.forEach((v) => { map[v] = (map[v] || 0) + 1; });
  return map;
}

// PUBLIC_INTERFACE
function DashboardScreen({ sessions, goHome }) {
  const total = sessions.length;
  const spots = countBy(sessions.map(s => s.spot));
  const boards = countBy(sessions.map(s => s.board));
  const moods = countBy(sessions.map(s => s.mood));

  // Pie chart helpers
  const PieChart = ({ data, colors, labels }) => {
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    let acc = 0;
    const arcs = Object.entries(data).map(([k, v], idx) => {
      const start = acc / total;
      acc += v;
      const end = acc / total;
      const large = end - start > 0.5 ? 1 : 0;
      const angle1 = start * 2 * Math.PI;
      const angle2 = end * 2 * Math.PI;
      const x1 = 60 + 50 * Math.sin(angle1), y1 = 60 - 50 * Math.cos(angle1);
      const x2 = 60 + 50 * Math.sin(angle2), y2 = 60 - 50 * Math.cos(angle2);
      const d = `M60,60 L${x1},${y1} A50,50 0 ${large} 1 ${x2},${y2} Z`;
      return <path key={k} d={d} fill={colors[idx % colors.length]} stroke="#fff" />;
    });
    // For legend
    const keys = Object.keys(data);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
        <svg width="120" height="120">{arcs}</svg>
        <div>
          {keys.map((k, i) => (
            <div key={k} style={{ color: colors[i % colors.length], fontWeight: 500 }}>
              <span style={{ marginRight: 8, fontSize: "1.1em" }}>⬤</span>
              {labels[k] || k}: <span style={{fontWeight:400}}>{data[k]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mood trend
  const moodEmojis = {
    happy: "😃",
    chill: "😌",
    tired: "😩",
    excited: "🤪",
    frustrated: "😠"
  };

  return (
    <div className="dashboard-card">
      <button className="btn" style={{ position: "absolute", left: 16, top: 18, fontSize: "0.95rem" }} onClick={goHome}>
        <FaArrowLeft /> Home
      </button>
      <div className="dashboard-summary">
        <b>Total sessions:</b> {total}<br/>
        <b>Most visited spot:</b> {mostCommon(sessions.map(s=>s.spot)) || "—"}<br/>
        <b>Fav. board:</b> {mostCommon(sessions.map(s=>s.board)) || "—"}
      </div>
      <div className="dashboard-charts">
        <div>
          <div className="chart-title">Board Usage</div>
          <PieChart data={boards}
            colors={["#3A8DAD", "#1DE9B6", "#F4E9D8", "#aadcf5", "#1b6f9a"]}
            labels={{}} />
        </div>
        <div>
          <div className="chart-title">Spot Frequency</div>
          <PieChart data={spots}
            colors={["#1DE9B6", "#3A8DAD", "#F4E9D8", "#19777e", "#8ee7d2", "#bbb9f2"]}
            labels={{}} />
        </div>
        <div>
          <div className="chart-title">Mood Over Time</div>
          {sessions.length === 0 ? <div>No data</div> :
            <svg width="100%" height="65" style={{ background: "#eafafe", borderRadius: 7 }}>
              {sessions.slice(0, 12).map((s, i) => (
                <text
                  x={12 + i*28} y="39"
                  fontSize="2em"
                  key={s.id}
                  style={{ opacity: 0.93 }}
                >
                  {moodEmojis[s.mood] || "▪️"}
                </text>
              ))}
            </svg>
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
