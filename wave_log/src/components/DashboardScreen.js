import React from "react";
import { GiWaveSurfer } from "react-icons/gi";

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
    // SVG Pie segment labels (show percentage if space)
    const keys = Object.keys(data);
    const percentLabels = Object.entries(data).map(([k, v], idx) => {
      const value = v;
      // Compute percent and arc midpoint angle
      let acc2 = 0;
      for (let i = 0; i < idx; i++) acc2 += Object.values(data)[i];
      const startF = acc2 / total;
      const endF = (acc2 + value) / total;
      const angle = Math.PI * 2 * ((startF + endF) / 2);
      const pct = Math.round((value / total) * 100);
      // Only put label if big enough (at least 10%) and not too many slices
      if (pct < 10 || keys.length > 8) return null;
      const xText = 60 + 33 * Math.sin(angle);
      const yText = 60 - 33 * Math.cos(angle);
      return (
        <g key={k + "-lbl-group"}>
          {/* semi-opaque background for text clarity */}
          <rect
            x={xText - 20}
            y={yText - 14}
            width="40"
            height="23"
            rx="7"
            fill="rgba(19,51,95,0.80)"
            stroke="#fff5"
            strokeWidth="0.8"
            filter="url(#label-bg-shadow)"
          />
          <text
            x={xText}
            y={yText}
            className="svg-dashboard-label"
            style={{
              fill: "#fff",
              fontWeight: 900,
              fontSize: "1.30rem",
              textShadow: "0 2px 10px #1de9b7,0 1px 0 #153969ad",
              filter: "drop-shadow(0 2px 7px #1de9b7cc)"
            }}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {pct}%
          </text>
        </g>
      );
    });

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
        <svg width="120" height="120" style={{ flexShrink: 0 }}>
          <defs>
            {/* subtle drop shadow for label backgrounds */}
            <filter id="label-bg-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#164575aa" />
            </filter>
          </defs>
          {arcs}
          {percentLabels}
        </svg>
        <div>
          {keys.map((k, i) => (
            <div
              key={k}
              className="dashboard-legend-label"
              style={{
                color: "#fff",
                fontWeight: 900,
                fontSize: "1.25em",
                letterSpacing: "0.02em",
                padding: "2.5px 5px",
                marginBottom: "4px",
                borderRadius: "8px",
                background: "rgba(15,35,62,0.84)",
                boxShadow: "0 2.5px 14px #1839446c, 0 1.5px 3.5px #fff6",
                lineHeight: 1.4,
                display: "inline-block",
                minWidth: 0,
              }}
            >
              <span style={{
                marginRight: 8,
                fontSize: "1.10em",
                verticalAlign: "-2px",
                filter: `drop-shadow(0 0 4px #1DE9B6de)`
              }}>⬤
              </span>
              <span
                style={{
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "0.01em"
                }}
              >
                {labels[k] || k}:
              </span>{" "}
              <span style={{ fontWeight: 800, color: "#fff" }}>{data[k]}</span>
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
    <div className="dashboard-card surf-bg-dashboard">
      <button className="btn" style={{ position: "absolute", left: 16, top: 18, fontSize: "0.99rem" }} onClick={goHome}>
        <GiWaveSurfer /> Home
      </button>
      <div className="dashboard-summary">
        <b>Total sessions:</b> {total}<br />
        <b>Most visited spot:</b> {mostCommon(sessions.map(s => s.spot)) || "—"}<br />
        <b>Fav. board:</b> {mostCommon(sessions.map(s => s.board)) || "—"}
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
            <svg width="100%" height="65" style={{ background: "#1a6093cc", borderRadius: 9 }}>
              {sessions.slice(0, 12).map((s, i) => {
                const x = 18 + i * 28, y = 40;
                return (
                  <g key={s.id}>
                    {/* semi-opaque background for emoji label */}
                    <rect
                      x={x - 17}
                      y={y - 22}
                      width="34"
                      height="37"
                      rx="11"
                      fill="rgba(15,37,68,0.54)"
                      filter="url(#mood-label-bg)"
                    />
                    <text
                      x={x}
                      y={y}
                      fontSize="2.4em"
                      fill="#fff"
                      fontWeight="bold"
                      stroke="#1de9b6"
                      strokeWidth="0.6"
                      style={{
                        filter: 'drop-shadow(0 2.5px 12px #1de9b7cc) drop-shadow(0 2px 7px #23456944)',
                        paintOrder: 'stroke'
                      }}
                      className="svg-dashboard-label"
                      dominantBaseline="middle"
                      textAnchor="middle"
                    >
                      {moodEmojis[s.mood] || "▪️"}
                    </text>
                  </g>
                );
              })}
              <defs>
                <filter id="mood-label-bg" x="-40%" y="-40%" width="180%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#164575aa" />
                </filter>
              </defs>
            </svg>
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
