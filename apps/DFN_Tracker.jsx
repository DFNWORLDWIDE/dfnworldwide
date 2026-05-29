import { useState, useEffect, useRef, useCallback } from "react";

// ── STORAGE ──────────────────────────────────────────────────────
const KEY = "dfn_tracker_v2";
const todayStr = () => new Date().toISOString().split("T")[0];

const defaultState = () => ({
  startDate: todayStr(),
  identity: "",
  days: {},
});

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultState();
}

function saveState(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

const defaultDay = () => ({
  nn: [false, false, false, false],
  score: "",
  notes: "",
  saved: false,
});

// ── HELPERS ───────────────────────────────────────────────────────
function daysBetween(a, b) {
  return Math.floor((new Date(b) - new Date(a)) / 86400000);
}

function formatDate(dateStr) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-ZA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function calcStreak(days) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 30; i++) {
    const s = new Date(d);
    s.setDate(s.getDate() - i);
    const key = s.toISOString().split("T")[0];
    const day = days[key];
    if (day && day.saved && day.nn.every(Boolean)) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function calcCompleted(days) {
  return Object.values(days).filter(d => d.saved && d.nn.every(Boolean)).length;
}

// ── CONSTANTS ─────────────────────────────────────────────────────
const NN_LABELS = [
  "Morning Anchor — Reset + Main Task",
  "Non-Negotiable Block — Deep Work",
  "Deliberate Discomfort — Push Limits",
  "Evening Review — Score & Reflect",
];

const DFN_RULES = [
  "Motivation is the reward for action, not the requirement for it. Build the structure that makes the feeling irrelevant.",
  "Inconsistency is the silent killer of potential. It doesn't shout. It whispers until your dreams become memories.",
  "Comfortable lies keep you weak. Painful truth sets you free. Face reality without flinching.",
  "When you feel lost, do not wait for clarity. Create it through immediate, decisive action.",
  "Structure defeats chaos. A mediocre plan executed daily beats a perfect plan executed occasionally.",
  "Discipline is temporary. Identity is permanent. Build the identity of a man who no longer negotiates with himself.",
  "Seven days of disciplined action beats seven months of sporadic motivation.",
  "Thirty days of disciplined action will change how the world sees you. More importantly, it will change how you see yourself.",
];

// ── STYLES ────────────────────────────────────────────────────────
const G = {
  gold: "#C9A84C",
  goldBright: "#FFD700",
  goldDim: "#8B6914",
  goldSubtle: "rgba(201,168,76,0.08)",
  goldBorder: "rgba(201,168,76,0.2)",
  black: "#080808",
  dark: "#0f0f0f",
  card: "#141414",
  card2: "#1a1a1a",
  white: "#F0EAD6",
  dim: "#A09070",
  muted: "#555",
  green: "rgba(76,175,80,0.15)",
  greenBright: "#4CAF50",
  greenBorder: "rgba(76,175,80,0.3)",
};

// ── COMPONENTS ────────────────────────────────────────────────────

function GoldLine({ center = false, style = {} }) {
  return (
    <div style={{
      width: 48, height: 2, background: G.gold,
      margin: center ? "12px auto" : "12px 0",
      ...style
    }} />
  );
}

function Eyebrow({ children, center = false }) {
  return (
    <div style={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700, fontSize: "0.62rem",
      letterSpacing: "0.28em", textTransform: "uppercase",
      color: G.gold, textAlign: center ? "center" : "left",
    }}>{children}</div>
  );
}

function Toast({ message, visible }) {
  return (
    <div style={{
      position: "fixed", bottom: "2rem", left: "50%",
      transform: `translateX(-50%) translateY(${visible ? 0 : "80px"})`,
      background: G.gold, color: G.black,
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700, fontSize: "0.72rem",
      letterSpacing: "0.2em", textTransform: "uppercase",
      padding: "0.9rem 2rem", zIndex: 9999,
      transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)",
      whiteSpace: "nowrap", pointerEvents: "none",
      boxShadow: `0 8px 32px rgba(201,168,76,0.3)`,
    }}>{message}</div>
  );
}

function StatBlock({ num, label, gold = false }) {
  return (
    <div style={{
      background: G.card, padding: "1.5rem 1rem",
      textAlign: "center", flex: 1, minWidth: 80,
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 700, fontSize: "clamp(2rem,5vw,3rem)",
        color: gold ? G.goldBright : G.gold,
        lineHeight: 1,
        textShadow: gold ? `0 0 20px rgba(255,215,0,0.3)` : "none",
      }}>{num}</div>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "0.58rem", letterSpacing: "0.2em",
        textTransform: "uppercase", color: G.muted, marginTop: 6,
      }}>{label}</div>
    </div>
  );
}

function NNItem({ label, done, onClick, index }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: "1rem",
      padding: "1rem 1.2rem",
      background: done ? "rgba(76,175,80,0.08)" : G.card2,
      border: `1px solid ${done ? G.greenBorder : "rgba(255,255,255,0.05)"}`,
      cursor: "pointer", transition: "all 0.2s",
      marginBottom: "0.5rem",
      borderLeft: `3px solid ${done ? G.greenBright : "rgba(255,255,255,0.1)"}`,
    }}>
      <div style={{
        width: 24, height: 24, flexShrink: 0,
        border: `1.5px solid ${done ? G.greenBright : G.muted}`,
        background: done ? "rgba(76,175,80,0.2)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem", color: G.greenBright,
        transition: "all 0.2s",
      }}>
        {done ? "✓" : ""}
      </div>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 600, fontSize: "0.85rem",
        letterSpacing: "0.05em", textTransform: "uppercase",
        color: done ? G.muted : G.white,
        textDecoration: done ? "line-through" : "none",
        flex: 1, transition: "all 0.2s",
      }}>{label}</div>
      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "0.6rem", color: done ? G.greenBright : G.goldDim,
        fontWeight: 700, letterSpacing: "0.1em",
      }}>
        {done ? "DONE" : `0${index + 1}`}
      </div>
    </div>
  );
}

function CalDay({ day, status }) {
  const colors = {
    done:   { bg: "rgba(76,175,80,0.25)", border: G.greenBorder, color: G.greenBright },
    today:  { bg: "rgba(201,168,76,0.15)", border: G.gold, color: G.gold },
    missed: { bg: "rgba(180,60,60,0.15)", border: "rgba(180,60,60,0.3)", color: "#e06060" },
    future: { bg: "rgba(255,255,255,0.02)", border: "transparent", color: "rgba(255,255,255,0.12)" },
  };
  const c = colors[status] || colors.future;
  return (
    <div style={{
      aspectRatio: "1", display: "flex", alignItems: "center",
      justifyContent: "center", background: c.bg,
      border: `1px solid ${c.border}`, color: c.color,
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 700, fontSize: "0.68rem",
      transition: "all 0.2s",
    }}>{day}</div>
  );
}

// ── TIMER HOOK ────────────────────────────────────────────────────
function useTimer() {
  const [seconds, setSeconds] = useState(900);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef(null);

  const start = useCallback(() => {
    if (running) {
      clearInterval(ref.current);
      setRunning(false);
    } else {
      if (finished) { setSeconds(900); setFinished(false); }
      setRunning(true);
    }
  }, [running, finished]);

  const reset = useCallback(() => {
    clearInterval(ref.current);
    setRunning(false);
    setFinished(false);
    setSeconds(900);
  }, []);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(ref.current);
            setRunning(false);
            setFinished(true);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return { display: `${mm}:${ss}`, running, finished, start, reset, seconds };
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function DFNTracker() {
  const [state, setState] = useState(loadState);
  const [editingId, setEditingId] = useState(false);
  const [idDraft, setIdDraft] = useState("");
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [activeTab, setActiveTab] = useState("today"); // today | calendar | rules
  const toastRef = useRef(null);
  const timer = useTimer();

  const today = todayStr();
  const todayData = state.days[today] || defaultDay();

  // Auto-save on change
  useEffect(() => { saveState(state); }, [state]);

  function showToast(msg) {
    clearTimeout(toastRef.current);
    setToast({ msg, visible: true });
    toastRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }

  function updateToday(patch) {
    setState(s => ({
      ...s,
      days: {
        ...s.days,
        [today]: { ...(s.days[today] || defaultDay()), ...patch },
      },
    }));
  }

  function toggleNN(i) {
    const nn = [...todayData.nn];
    nn[i] = !nn[i];
    updateToday({ nn });
    if (nn[i] && nn.every(Boolean)) showToast("ALL TASKS COMPLETE. ZERO DAYS ARE DEAD.");
  }

  function saveDay() {
    updateToday({ saved: true });
    showToast("Day logged. No zero days.");
  }

  function resetApp() {
    if (window.confirm("Reset ALL progress? This cannot be undone.")) {
      const fresh = defaultState();
      setState(fresh);
      saveState(fresh);
      showToast("Reset. Start again. Stronger.");
    }
  }

  // Stats
  const streak = calcStreak(state.days);
  const completed = calcCompleted(state.days);
  const startDate = state.startDate;
  const protocolDay = Math.min(Math.max(daysBetween(startDate, today) + 1, 1), 30);
  const nnDone = todayData.nn.filter(Boolean).length;
  const allDone = nnDone === 4;

  // Calendar
  const calDays = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(startDate + "T12:00:00");
    d.setDate(d.getDate() + i);
    const ds = d.toISOString().split("T")[0];
    const isToday = ds === today;
    const isPast = ds < today;
    const data = state.days[ds];
    let status = "future";
    if (isToday) status = "today";
    else if (data && data.saved && data.nn.every(Boolean)) status = "done";
    else if (isPast) status = "missed";
    return { day: i + 1, status };
  });

  const progressPct = Math.round((completed / 30) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: G.black,
      color: G.white,
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 300,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "100%", height: "50vh",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.97)",
        borderBottom: `1px solid ${G.goldBorder}`,
        backdropFilter: "blur(16px)",
        padding: "0 1.5rem",
      }}>
        <div style={{
          maxWidth: 720, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 0",
        }}>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: "1rem",
              letterSpacing: "0.15em", color: G.gold,
            }}>DFN</div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.55rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: G.muted, marginTop: 1,
            }}>Discipline Tracker</div>
          </div>

          {/* Progress bar */}
          <div style={{ flex: 1, margin: "0 2rem" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: 4,
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.6rem", letterSpacing: "0.15em",
                textTransform: "uppercase", color: G.muted,
              }}>30-Day Protocol</span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.9rem", color: G.gold, fontWeight: 700,
              }}>{progressPct}%</span>
            </div>
            <div style={{
              height: 2, background: "rgba(255,255,255,0.06)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0,
                width: `${progressPct}%`,
                background: `linear-gradient(to right, ${G.goldDim}, ${G.goldBright})`,
                transition: "width 0.8s ease",
                boxShadow: `0 0 8px ${G.gold}`,
              }} />
            </div>
          </div>

          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.65rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            color: G.black, background: G.gold,
            padding: "0.35rem 0.8rem", whiteSpace: "nowrap",
          }}>Day {protocolDay}/30</div>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem" }}>

        {/* STATS ROW */}
        <div style={{
          display: "flex", gap: 1,
          background: G.goldBorder,
          marginBottom: "1.5rem",
        }}>
          <StatBlock num={streak} label="Day Streak" gold={streak >= 7} />
          <StatBlock num={completed} label="Completed" />
          <StatBlock num={`${nnDone}/4`} label="Today" gold={allDone} />
          <StatBlock num={protocolDay} label="Protocol Day" />
        </div>

        {/* IDENTITY STATEMENT */}
        <div style={{
          background: G.card,
          border: `1px solid ${G.goldBorder}`,
          borderLeft: `3px solid ${G.gold}`,
          padding: "1.4rem 1.5rem",
          marginBottom: "1.5rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <Eyebrow>My Identity Statement</Eyebrow>
            {!editingId ? (
              <button onClick={() => { setEditingId(true); setIdDraft(state.identity); }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: G.goldDim, background: "none", border: "none",
                  cursor: "pointer",
                }}>✎ Edit</button>
            ) : (
              <button onClick={() => {
                setState(s => ({ ...s, identity: idDraft }));
                setEditingId(false);
                showToast("Identity locked in.");
              }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: G.gold, background: "none", border: "none",
                  cursor: "pointer",
                }}>✓ Save</button>
            )}
          </div>

          {editingId ? (
            <textarea
              value={idDraft}
              onChange={e => setIdDraft(e.target.value)}
              autoFocus
              style={{
                width: "100%", background: "rgba(255,255,255,0.03)",
                border: `1px solid ${G.gold}`,
                color: G.white, fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontSize: "1.1rem",
                padding: "0.7rem 1rem", outline: "none", resize: "none",
                lineHeight: 1.7, minHeight: 72,
              }}
              placeholder="I am a disciplined man. I execute under pressure. I build my legacy daily for my sons."
            />
          ) : (
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontSize: "1.15rem",
              color: state.identity ? G.white : G.muted,
              lineHeight: 1.7, minHeight: 40,
            }}>
              {state.identity || "Tap Edit to write your identity statement — the man you are choosing to become."}
            </div>
          )}
        </div>

        {/* TABS */}
        <div style={{
          display: "flex", borderBottom: `1px solid ${G.goldBorder}`,
          marginBottom: "1.5rem",
        }}>
          {[["today", "Today"], ["calendar", "30 Days"], ["rules", "DFN Rules"]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "0.75rem 1.4rem", border: "none",
                background: "none", cursor: "pointer",
                color: activeTab === id ? G.gold : G.muted,
                borderBottom: activeTab === id ? `2px solid ${G.gold}` : "2px solid transparent",
                marginBottom: -1, transition: "color 0.2s",
              }}>{label}</button>
          ))}
        </div>

        {/* ── TAB: TODAY ── */}
        {activeTab === "today" && (
          <div>

            {/* Date + all-done badge */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "1.2rem", flexWrap: "wrap", gap: 8,
            }}>
              <div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700, fontSize: "1.6rem", lineHeight: 1,
                }}>Today's Execution</div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.65rem", letterSpacing: "0.12em",
                  color: G.muted, marginTop: 4,
                }}>{formatDate(today)}</div>
              </div>
              {allDone && (
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: "0.65rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  background: "rgba(76,175,80,0.15)",
                  border: `1px solid ${G.greenBorder}`,
                  color: G.greenBright, padding: "0.4rem 1rem",
                  animation: "pulse 2s infinite",
                }}>✓ Zero Day Defeated</div>
              )}
            </div>

            {/* Non-negotiables */}
            <div style={{ marginBottom: "1.5rem" }}>
              <Eyebrow>Daily Non-Negotiables</Eyebrow>
              <div style={{ marginTop: 10 }}>
                {NN_LABELS.map((label, i) => (
                  <NNItem key={i} label={label} done={todayData.nn[i]}
                    onClick={() => toggleNN(i)} index={i} />
                ))}
              </div>
            </div>

            {/* 15-Minute Reset Timer */}
            <div style={{
              background: `linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 100%)`,
              border: `1px solid ${G.goldBorder}`,
              padding: "1.8rem", marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <Eyebrow>15-Minute Reset Protocol</Eyebrow>
                  <GoldLine style={{ margin: "8px 0" }} />
                </div>
                <button onClick={timer.reset}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.6rem", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: G.muted, background: "none",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    padding: "0.3rem 0.7rem", cursor: "pointer",
                  }}>Reset</button>
              </div>

              {/* Timer display */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(3.5rem,10vw,5.5rem)",
                color: timer.finished ? G.greenBright : timer.running ? G.goldBright : G.gold,
                textAlign: "center", lineHeight: 1,
                margin: "1rem 0",
                letterSpacing: "-0.02em",
                textShadow: timer.running ? `0 0 40px rgba(255,215,0,0.3)` : "none",
                transition: "color 0.3s, text-shadow 0.3s",
              }}>
                {timer.finished ? "EXECUTE" : timer.display}
              </div>

              {/* Steps */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(3,1fr)",
                gap: 8, marginBottom: "1.2rem",
              }}>
                {[
                  ["01–05", "Face Reality", "Write your Zero Score. No softening."],
                  ["06–10", "Reclaim Identity", "Read your statement aloud. Declare it."],
                  ["11–15", "Take Action", "One task. Immediate. No planning."],
                ].map(([time, name, desc]) => (
                  <div key={time} style={{
                    background: G.dark, border: "1px solid rgba(255,255,255,0.05)",
                    padding: "0.9rem 0.8rem", textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.58rem", fontWeight: 700,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: G.goldDim, marginBottom: 4,
                    }}>MIN {time}</div>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: "0.8rem",
                      color: G.white, marginBottom: 4,
                    }}>{name}</div>
                    <div style={{ fontSize: "0.7rem", color: G.muted, lineHeight: 1.4 }}>{desc}</div>
                  </div>
                ))}
              </div>

              <button onClick={timer.start}
                style={{
                  width: "100%", padding: "1rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: "0.8rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  background: timer.running ? "rgba(201,168,76,0.1)" : G.gold,
                  color: timer.running ? G.gold : G.black,
                  border: timer.running ? `1px solid ${G.gold}` : "none",
                  cursor: "pointer", transition: "all 0.2s",
                }}>
                {timer.running ? "⏸  Pause" : timer.finished ? "▶  Run Again" : "▶  Start 15-Minute Reset"}
              </button>
            </div>

            {/* Zero Score */}
            <div style={{
              background: G.card,
              border: `1px solid ${G.goldBorder}`,
              padding: "1.5rem", marginBottom: "1.5rem",
            }}>
              <Eyebrow>Zero Score — Today</Eyebrow>
              <GoldLine style={{ margin: "8px 0 12px" }} />
              <div style={{ fontSize: "0.82rem", color: G.muted, marginBottom: "0.8rem", lineHeight: 1.6 }}>
                How many hours today were genuine forward movement toward your most important goal?
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
                <input
                  type="number" min="0" max="24"
                  value={todayData.score}
                  onChange={e => updateToday({ score: e.target.value })}
                  style={{
                    width: 80, background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${G.goldBorder}`,
                    color: G.gold, fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700, fontSize: "1.8rem",
                    padding: "0.5rem", outline: "none", textAlign: "center",
                  }}
                  placeholder="0"
                />
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", color: G.dim,
                }}>hours of real execution</span>
              </div>

              <Eyebrow>Evening Reflection</Eyebrow>
              <textarea
                value={todayData.notes}
                onChange={e => updateToday({ notes: e.target.value })}
                placeholder={"Biggest win today:\n\nBiggest failure / lesson:\n\nOne improvement for tomorrow:"}
                style={{
                  width: "100%", marginTop: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(201,168,76,0.15)`,
                  color: G.white, fontFamily: "'Barlow', sans-serif",
                  fontSize: "0.88rem", padding: "0.9rem 1rem",
                  outline: "none", resize: "vertical",
                  minHeight: 100, lineHeight: 1.7,
                }}
              />
            </div>

            {/* Save */}
            <button onClick={saveDay}
              style={{
                width: "100%", padding: "1.1rem",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.82rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                background: allDone ? G.gold : "rgba(201,168,76,0.15)",
                color: allDone ? G.black : G.gold,
                border: `1px solid ${G.gold}`,
                cursor: "pointer", transition: "all 0.3s",
                marginBottom: "1rem",
              }}>
              {todayData.saved ? "✓  Day Logged — Execution Complete" : "✓  Save Today's Entry"}
            </button>

            <div style={{ textAlign: "center" }}>
              <button onClick={resetApp}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.6rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: G.muted, background: "none",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "0.4rem 1rem", cursor: "pointer",
                }}>Reset All Progress</button>
            </div>
          </div>
        )}

        {/* ── TAB: CALENDAR ── */}
        {activeTab === "calendar" && (
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <Eyebrow center>30-Day Progress Map</Eyebrow>
              <GoldLine center />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontSize: "2rem",
                textAlign: "center", marginBottom: "0.3rem",
              }}>
                {completed} / 30 Days Complete
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem", letterSpacing: "0.15em",
                textTransform: "uppercase", color: G.muted,
                textAlign: "center",
              }}>Started {formatDate(startDate)}</div>
            </div>

            {/* Calendar grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(6,1fr)",
              gap: 4, marginBottom: "1rem",
            }}>
              {calDays.map(({ day, status }) => (
                <CalDay key={day} day={day} status={status} />
              ))}
            </div>

            {/* Legend */}
            <div style={{
              display: "flex", gap: "1.2rem", flexWrap: "wrap",
              margin: "1rem 0 2rem",
            }}>
              {[
                [G.greenBright, "rgba(76,175,80,0.25)", "Done"],
                [G.gold, "rgba(201,168,76,0.15)", "Today"],
                ["#e06060", "rgba(180,60,60,0.15)", "Missed"],
                ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.02)", "Future"],
              ].map(([color, bg, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 14, height: 14, background: bg, border: `1px solid ${color}` }} />
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "0.65rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", color: G.muted,
                  }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Phase breakdown */}
            <div style={{ border: `1px solid ${G.goldBorder}` }}>
              {[
                ["Week 1", "Days 1–7", "Foundation — Show up daily. Build the habit."],
                ["Week 2", "Days 8–14", "Intensity — Push harder. Deepen the non-negotiable."],
                ["Week 3", "Days 15–21", "Resistance — The dip. Push through or lose everything."],
                ["Week 4", "Days 22–30", "Identity Lock — Execute at your highest. This is who you are."],
              ].map(([week, days, desc], i) => (
                <div key={week} style={{
                  display: "flex", gap: "1.5rem", alignItems: "flex-start",
                  padding: "1.2rem 1.4rem",
                  borderBottom: i < 3 ? `1px solid rgba(255,255,255,0.05)` : "none",
                  background: i % 2 === 0 ? G.card : "transparent",
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700, fontSize: "0.65rem",
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      color: G.gold,
                    }}>{week}</div>
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.6rem", color: G.muted, marginTop: 2,
                    }}>{days}</div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: G.dim, lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: RULES ── */}
        {activeTab === "rules" && (
          <div>
            <Eyebrow center>All DFN Rules</Eyebrow>
            <GoldLine center />
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700, fontSize: "2rem",
              textAlign: "center", marginBottom: "2rem",
            }}>Your Quick Reference</div>

            {DFN_RULES.map((rule, i) => (
              <div key={i} style={{
                background: G.card,
                borderLeft: `3px solid ${G.gold}`,
                border: `1px solid ${G.goldBorder}`,
                borderLeft: `3px solid ${G.gold}`,
                padding: "1.4rem 1.5rem",
                marginBottom: "0.7rem",
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: "0.58rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: G.goldDim, marginBottom: 8,
                }}>DFN Rule 0{i + 1} — Chapter {i + 1}</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic", fontSize: "1rem",
                  color: G.white, lineHeight: 1.7,
                }}>{rule}</div>
              </div>
            ))}

            <div style={{
              marginTop: "2rem", padding: "2rem",
              background: `linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 100%)`,
              border: `1px solid ${G.goldBorder}`,
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700, fontStyle: "italic",
                fontSize: "1.5rem", color: G.white,
                lineHeight: 1.5, marginBottom: "0.8rem",
              }}>
                "From nothing — we build everything."
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: G.gold,
              }}>— Suave Melodies · DFN Worldwide</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${G.goldBorder}`,
          marginTop: "2rem", paddingTop: "1.5rem",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: "0.8rem",
            letterSpacing: "0.15em", color: G.gold,
            marginBottom: 4,
          }}>DFN WORLDWIDE</div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.58rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: G.muted,
          }}>Reg. 2026/408693/07 · From Nothing, Build Everything</div>
        </div>

      </main>

      <Toast message={toast.msg} visible={toast.visible} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,400&family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        textarea { font-size: 0.88rem; }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(76,175,80,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(76,175,80,0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); }
      `}</style>
    </div>
  );
}
