import { useState, useEffect, useRef } from "react";

/* ── FONTS ─────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Barlow+Condensed:wght@200;300;400;600;700;900&family=Barlow:wght@300;400&display=swap');`;

/* ── PALETTE ────────────────────────────────────────────────── */
const C = {
  gold:      "#C9A84C",
  goldBright:"#FFD700",
  goldDim:   "#7A5E10",
  goldGlow:  "rgba(201,168,76,0.15)",
  black:     "#060606",
  dark:      "#0C0C0C",
  card:      "#111111",
  card2:     "#161616",
  white:     "#F2EAD3",
  dim:       "#9A8A6A",
  muted:     "#444",
  faint:     "rgba(255,255,255,0.04)",
};

/* ── BEATS DATA ─────────────────────────────────────────────── */
const BEATS = [
  {
    id: 0,
    code: "001",
    title: "DFNCHALLENGE",
    subtitle: "The Challenge Begins",
    artist: "Suave Melodies",
    label: "DFN Worldwide Records",
    year: "2026",
    genre: "Amapiano",
    status: "live",
    statusLabel: "Live Now",
    description: "The beat that started the movement. DFNCHALLENGE is the audio embodiment of choosing discipline when everything in you wants to stop. Raw Amapiano pressure — built in Tembisa, registered worldwide.",
    image: "studio1.webp",
    color: "#C9A84C",
    bars: [40,65,30,80,55,70,45,90,35,75,50,85,40,60,70,45,80,55,65,40,75,50,90,35,70,55,80,45,65,40],
  },
  {
    id: 1,
    code: "002",
    title: "DFNstory",
    subtitle: "The Story Unfolds",
    artist: "Suave Melodies",
    label: "DFN Worldwide Records",
    year: "2026",
    genre: "Amapiano",
    status: "soon",
    statusLabel: "Coming Soon",
    description: "Every empire has an origin. DFNstory is where the narrative deepens — the second chapter in a catalog built with intention. The beat tells the story that the book begins.",
    image: "banner1.webp",
    color: "#A08030",
    bars: [55,40,75,30,85,50,65,40,80,45,70,55,90,35,65,50,80,45,75,40,60,70,55,85,40,75,50,65,45,80],
  },
  {
    id: 2,
    code: "003",
    title: "DFNlegacy",
    subtitle: "Built to Last Forever",
    artist: "Suave Melodies",
    label: "DFN Worldwide Records",
    year: "2026",
    genre: "Amapiano",
    status: "soon",
    statusLabel: "Coming Soon",
    description: "The closing chapter of the trilogy. DFNlegacy is not about the grind — it's about what remains when the grind is done. A sound built for the generation that comes after.",
    image: "logo1.webp",
    color: "#8B6914",
    bars: [70,45,85,55,40,80,60,90,35,75,50,65,45,85,40,70,55,80,45,65,75,50,90,35,80,55,70,45,60,85],
  },
];

const PLATFORMS = [
  { name: "Spotify",     icon: "♪", color: "#1DB954", key: "spotify" },
  { name: "Apple Music", icon: "🍎", color: "#fc3c44", key: "apple" },
  { name: "YouTube",     icon: "▶", color: "#FF0000", key: "youtube" },
  { name: "Amazon",      icon: "☁", color: "#FF9900", key: "amazon" },
];

/* ── WAVEFORM ────────────────────────────────────────────────── */
function Waveform({ bars, active, color, progress = 0 }) {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      gap: 3, height: 56, padding: "0 4px",
    }}>
      {bars.map((h, i) => {
        const pct = i / bars.length;
        const isPast = pct < progress;
        return (
          <div key={i} style={{
            flex: 1, borderRadius: 1,
            height: `${h}%`,
            background: isPast
              ? color
              : active
              ? `rgba(${hexToRgb(color)},0.35)`
              : "rgba(255,255,255,0.1)",
            transition: active ? `height 0.15s ease ${i * 0.01}s, background 0.3s` : "none",
            animation: active && !isPast ? `wave ${0.6 + (i % 5) * 0.12}s ease-in-out ${i * 0.04}s infinite alternate` : "none",
          }} />
        );
      })}
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ── BEAT CARD ───────────────────────────────────────────────── */
function BeatCard({ beat, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = isSelected || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isSelected ? C.card2 : C.card,
        border: `1px solid ${isSelected ? beat.color : "rgba(255,255,255,0.06)"}`,
        borderLeft: `3px solid ${isSelected ? beat.color : "transparent"}`,
        padding: "1.4rem",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: isSelected ? "translateX(4px)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow when selected */}
      {isSelected && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 60% 100% at 0% 50%, rgba(${hexToRgb(beat.color)},0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", position: "relative" }}>
        {/* Number */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900, fontSize: "2.2rem",
          color: isSelected ? beat.color : C.muted,
          lineHeight: 1, width: 44, flexShrink: 0,
          transition: "color 0.3s",
        }}>{beat.code}</div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: "1.1rem",
            letterSpacing: "0.04em", textTransform: "uppercase",
            color: isSelected ? C.white : C.dim,
            transition: "color 0.3s",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>{beat.title}</div>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.65rem", letterSpacing: "0.15em",
            color: C.muted, marginTop: 2,
          }}>{beat.genre} · {beat.year}</div>
        </div>

        {/* Status */}
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: "0.55rem",
          letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "0.25rem 0.6rem",
          background: beat.status === "live" ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.05)",
          color: beat.status === "live" ? "#4CAF50" : C.muted,
          border: `1px solid ${beat.status === "live" ? "rgba(76,175,80,0.3)" : "rgba(255,255,255,0.06)"}`,
          flexShrink: 0,
        }}>{beat.statusLabel}</div>
      </div>

      {/* Mini waveform when selected */}
      {isSelected && (
        <div style={{ marginTop: "0.8rem" }}>
          <Waveform bars={beat.bars} active={isSelected} color={beat.color} />
        </div>
      )}
    </div>
  );
}

/* ── PLATFORM BTN ────────────────────────────────────────────── */
function PlatformBtn({ platform, beat }) {
  const [hov, setHov] = useState(false);
  const isLive = beat.status === "live";

  return (
    <a
      href={isLive ? "#" : undefined}
      onClick={!isLive ? e => e.preventDefault() : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.75rem 1.1rem",
        background: hov && isLive ? platform.color : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov && isLive ? platform.color : "rgba(255,255,255,0.08)"}`,
        color: hov && isLive ? "#000" : isLive ? C.dim : C.muted,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontSize: "0.72rem",
        letterSpacing: "0.1em", textTransform: "uppercase",
        textDecoration: "none", cursor: isLive ? "pointer" : "default",
        transition: "all 0.2s", opacity: isLive ? 1 : 0.4,
      }}
    >
      <span style={{ fontSize: "0.9rem" }}>{platform.icon}</span>
      <span>{platform.name}</span>
      {isLive && <span style={{ marginLeft: "auto", fontSize: "0.65rem", opacity: 0.6 }}>↗</span>}
    </a>
  );
}

/* ── MAIN ────────────────────────────────────────────────────── */
export default function BeatPlayer() {
  const [selected, setSelected] = useState(0);
  const [imgError, setImgError] = useState({});
  const [mounted, setMounted] = useState(false);
  const beat = BEATS[selected];

  useEffect(() => {
    setTimeout(() => setMounted(true), 60);
  }, []);

  // Roadmap phases
  const phases = [
    { label: "Phase 1", title: "Singles / Beats", items: ["DFNCHALLENGE", "DFNstory", "DFNlegacy"], status: "active" },
    { label: "Phase 2", title: "DFNCHALLENGE Series", items: ["EP", "Mixtape", "Album"], status: "upcoming" },
    { label: "Phase 3", title: "DFNstory Series", items: ["EP", "Mixtape", "Album"], status: "upcoming" },
    { label: "Phase 4", title: "DFNlegacy Series", items: ["EP", "Mixtape", "Album"], status: "upcoming" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: C.black,
      color: C.white,
      fontFamily: "'Barlow', sans-serif",
      fontWeight: 300,
      overflowX: "hidden",
    }}>
      <style>{`
        ${FONTS}
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.black}; }
        ::-webkit-scrollbar-thumb { background: ${C.goldDim}; }
        @keyframes wave {
          from { transform: scaleY(0.7); }
          to   { transform: scaleY(1.15); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* ── HERO / MAIN PLAYER ─────────────────────────────── */}
      <div style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        overflow: "hidden",
      }}>

        {/* Background artwork blur */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 80% 80% at 30% 50%, rgba(${hexToRgb(beat.color)},0.06) 0%, transparent 60%)`,
          transition: "all 1s ease",
          pointerEvents: "none",
        }} />

        {/* ── LEFT: NOW PLAYING ──────────────────────────────── */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "6rem 3rem 4rem 3.5rem",
          position: "relative",
          animation: mounted ? "fadeUp 0.8s ease forwards" : "none",
        }}>

          {/* Label */}
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600, fontSize: "0.6rem",
            letterSpacing: "0.4em", textTransform: "uppercase",
            color: beat.color, marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: "0.8rem",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: beat.status === "live" ? "#4CAF50" : C.muted,
              animation: beat.status === "live" ? "pulse 2s infinite" : "none",
            }} />
            {beat.status === "live" ? "DFN WORLDWIDE RECORDS · STREAMING NOW" : "DFN WORLDWIDE RECORDS · COMING SOON"}
          </div>

          {/* Beat number */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(5rem, 12vw, 10rem)",
            color: "rgba(255,255,255,0.04)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            marginBottom: "-1rem",
            userSelect: "none",
          }}>{beat.code}</div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: C.white,
            marginBottom: "0.4rem",
            position: "relative", zIndex: 1,
          }}>
            {beat.title.replace("DFN", "")}
            <span style={{ color: beat.color }}>.</span>
          </h1>

          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 300, fontSize: "0.85rem",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: C.dim, marginBottom: "2.5rem",
          }}>
            {beat.artist} &nbsp;·&nbsp; {beat.genre} &nbsp;·&nbsp; {beat.year}
          </div>

          {/* Description */}
          <p style={{
            fontSize: "0.95rem", color: C.dim,
            lineHeight: 1.85, maxWidth: 480,
            marginBottom: "3rem",
          }}>{beat.description}</p>

          {/* Waveform display */}
          <div style={{
            background: C.card,
            border: `1px solid rgba(255,255,255,0.06)`,
            padding: "1.2rem 1.4rem",
            marginBottom: "2rem",
            maxWidth: 520,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginBottom: "0.8rem",
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.2em",
                textTransform: "uppercase", color: C.muted,
              }}>Waveform Preview</span>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.1em",
                color: beat.status === "live" ? "#4CAF50" : C.muted,
              }}>{beat.status === "live" ? "Available on all platforms" : "Dropping soon"}</span>
            </div>
            <Waveform bars={beat.bars} active={beat.status === "live"} color={beat.color} />
          </div>

          {/* Platform buttons */}
          <div style={{ maxWidth: 520 }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.58rem", fontWeight: 700,
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: C.muted, marginBottom: "0.7rem",
            }}>
              {beat.status === "live" ? "Stream on your platform" : "Will be available on"}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 6,
            }}>
              {PLATFORMS.map(p => (
                <PlatformBtn key={p.key} platform={p} beat={beat} />
              ))}
            </div>
          </div>

          {/* P&C line */}
          <div style={{
            marginTop: "2.5rem",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.6rem", letterSpacing: "0.1em",
            color: C.muted, lineHeight: 1.8,
          }}>
            ℗ &amp; © 2026 DFN Worldwide PTY Ltd · All Rights Reserved<br />
            Reg. 2026/408693/07 · Tembisa, Gauteng, South Africa<br />
            SAMRO · CAPASSO · SAMPRA · SoundExchange · RouteNote
          </div>
        </div>

        {/* ── RIGHT: ARTWORK + TRACKLIST ─────────────────────── */}
        <div style={{
          background: C.dark,
          borderLeft: `1px solid rgba(255,255,255,0.04)`,
          display: "flex", flexDirection: "column",
          position: "relative",
        }}>

          {/* Artwork */}
          <div style={{
            height: 320, position: "relative",
            overflow: "hidden", flexShrink: 0,
          }}>
            {/* Placeholder / actual image */}
            {!imgError[beat.id] ? (
              <img
                src={`../assets/images/${beat.image}`}
                alt={beat.title}
                onError={() => setImgError(e => ({ ...e, [beat.id]: true }))}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.7) saturate(0.8)",
                  transition: "all 0.6s ease",
                }}
              />
            ) : (
              <div style={{
                width: "100%", height: "100%",
                background: `linear-gradient(135deg, #1a1200 0%, ${C.black} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900, fontSize: "4rem",
                  color: beat.color, opacity: 0.4,
                  letterSpacing: "-0.03em", textAlign: "center",
                  lineHeight: 1,
                }}>
                  DFN<br/>
                  <span style={{ fontSize: "2.5rem" }}>
                    {beat.title.replace("DFN", "")}
                  </span>
                </div>
              </div>
            )}

            {/* Overlay gradient */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to bottom, transparent 40%, ${C.dark} 100%)`,
            }} />

            {/* Beat info overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "1.2rem 1.5rem",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700, fontSize: "1.4rem",
                color: C.white,
              }}>{beat.title}</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.65rem", letterSpacing: "0.15em",
                color: beat.color, marginTop: 2,
              }}>{beat.subtitle}</div>
            </div>

            {/* Spinning record indicator when live */}
            {beat.status === "live" && (
              <div style={{
                position: "absolute", top: "1rem", right: "1rem",
                width: 40, height: 40,
                borderRadius: "50%",
                border: `2px solid ${beat.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "spin 4s linear infinite",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: beat.color,
                }} />
              </div>
            )}
          </div>

          {/* Tracklist */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0" }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.55rem", fontWeight: 700,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: C.muted, padding: "0.5rem 1.5rem 0.8rem",
            }}>The Project</div>

            {BEATS.map(b => (
              <BeatCard
                key={b.id}
                beat={b}
                isSelected={b.id === selected}
                onClick={() => setSelected(b.id)}
              />
            ))}

            {/* Spotify embed placeholder */}
            <div style={{
              margin: "1rem",
              background: C.card,
              border: `1px solid rgba(255,255,255,0.05)`,
              padding: "1.2rem",
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.55rem", fontWeight: 700,
                letterSpacing: "0.25em", textTransform: "uppercase",
                color: C.muted, marginBottom: "0.6rem",
              }}>Spotify Player</div>
              <div style={{
                height: 80,
                border: `1px dashed rgba(201,168,76,0.15)`,
                display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column", gap: 4,
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "0.6rem", color: C.goldDim,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>Paste Spotify Embed Here</div>
                <div style={{ fontSize: "0.65rem", color: C.muted }}>
                  Spotify → Share → Embed Track → Copy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RELEASE ROADMAP ────────────────────────────────────── */}
      <div style={{
        background: C.dark,
        borderTop: `1px solid rgba(255,255,255,0.04)`,
        padding: "5rem 3.5rem",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600, fontSize: "0.6rem",
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: C.gold, marginBottom: "0.8rem",
          }}>DFN Studio · Release Roadmap</div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: "clamp(2rem,4vw,3.5rem)",
            lineHeight: 1.05, marginBottom: "3rem",
          }}>
            The Catalog<br/>
            <span style={{ color: C.gold }}>Machine.</span>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 1,
            background: "rgba(201,168,76,0.08)",
          }}>
            {phases.map((phase, i) => (
              <div key={i} style={{
                background: phase.status === "active" ? C.card2 : C.card,
                padding: "2rem 1.5rem",
                borderTop: phase.status === "active" ? `2px solid ${C.gold}` : `2px solid transparent`,
                transition: "all 0.2s",
              }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: "0.58rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: phase.status === "active" ? C.gold : C.muted,
                  marginBottom: "0.5rem",
                }}>{phase.label}</div>

                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700, fontSize: "1.1rem",
                  color: phase.status === "active" ? C.white : C.dim,
                  marginBottom: "1rem", lineHeight: 1.2,
                }}>{phase.title}</div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {phase.items.map(item => (
                    <div key={item} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      fontSize: "0.82rem", color: C.muted,
                    }}>
                      <div style={{
                        width: 14, height: 1,
                        background: phase.status === "active" ? C.gold : C.muted,
                        flexShrink: 0,
                      }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: "1.5rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: "0.55rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "0.25rem 0.6rem",
                  background: phase.status === "active" ? "rgba(76,175,80,0.1)" : "rgba(255,255,255,0.04)",
                  color: phase.status === "active" ? "#4CAF50" : C.muted,
                  display: "inline-block",
                }}>
                  {phase.status === "active" ? "In Progress" : "Planned"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REGISTRATIONS STRIP ────────────────────────────────── */}
      <div style={{
        background: C.black,
        borderTop: `1px solid rgba(201,168,76,0.1)`,
        padding: "2rem 3.5rem",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: "1.2rem",
            color: C.gold,
          }}>DFN Worldwide Records</div>

          <div style={{
            display: "flex", gap: "0.5rem", flexWrap: "wrap",
          }}>
            {["SAMRO","CAPASSO","SAMPRA","SoundExchange","RouteNote"].map(r => (
              <div key={r} style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "0.25rem 0.7rem",
                border: "1px solid rgba(201,168,76,0.2)",
                color: C.goldDim,
              }}>{r}</div>
            ))}
          </div>

          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.6rem", color: C.muted,
            letterSpacing: "0.08em",
          }}>℗ &amp; © 2026 DFN Worldwide PTY Ltd · Reg. 2026/408693/07</div>
        </div>
      </div>
    </div>
  );
}
