import { useState, useEffect } from "react";

const C = {
  gold:"#C9A84C", goldBright:"#FFD700", goldDim:"#7A5E10",
  goldBorder:"rgba(201,168,76,0.2)", goldGlow:"rgba(201,168,76,0.07)",
  black:"#060606", dark:"#0D0D0D", card:"#131313", card2:"#1A1A1A",
  white:"#F2EAD3", dim:"#9A8A6A", muted:"#505050",
  green:"#4CAF50", greenBg:"rgba(76,175,80,0.1)", greenBorder:"rgba(76,175,80,0.3)",
};

/* ─── LINKS — update these when live ─────────────────────────── */
const L = {
  gumroad:    "https://suavemelodies.gumroad.com",
  spotify:    "#",
  apple:      "#",
  youtube:    "https://youtube.com/@DFNWorldwide",
  amazon:     "#",
  instagram:  "https://instagram.com/suavemelodies",
  tiktok:     "https://tiktok.com/@suavemelodies",
  twitter:    "https://twitter.com/suavemelodies",
  facebook:   "https://facebook.com/DFNWorldwide",
  website:    "https://dfnworldwide.com",
  presskit:   "https://dfnworldwide.com/pages/press.html",
  tracker:    "https://dfnworldwide.com/apps/tracker",
};

/* ─── WAVEFORM ────────────────────────────────────────────────── */
const BARS = [40,65,30,82,55,70,45,88,35,75,50,85,42,62,72,46,80,54,66,41,74,52,90,36,70,56,80,44,64,42];

function Waveform({ active }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:2, height:28 }}>
      {BARS.map((h, i) => (
        <div key={i} style={{
          flex:1, borderRadius:1,
          height:`${h}%`,
          background: active
            ? `rgba(201,168,76,${0.2 + (h/100)*0.55})`
            : "rgba(255,255,255,0.08)",
          animation: active ? `wb ${0.55 + (i%5)*0.1}s ease-in-out ${i*0.035}s infinite alternate` : "none",
        }}/>
      ))}
    </div>
  );
}

/* ─── LOGO ────────────────────────────────────────────────────── */
function Logo() {
  const [err, setErr] = useState(false);
  return (
    <div style={{
      width:92, height:92, borderRadius:"50%",
      border:`2px solid ${C.gold}`,
      background:`radial-gradient(circle at 38% 35%, #1c1400, ${C.black})`,
      display:"flex", alignItems:"center", justifyContent:"center",
      position:"relative", flexShrink:0,
      boxShadow:`0 0 0 6px rgba(201,168,76,0.06), 0 0 40px rgba(201,168,76,0.1)`,
    }}>
      {!err
        ? <img src="../assets/images/logo1.webp" alt="DFN" onError={()=>setErr(true)}
            style={{ width:"78%", height:"78%", objectFit:"contain", borderRadius:"50%" }}/>
        : <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"1.5rem", color:C.gold, letterSpacing:"-0.02em" }}>DFN</div>
      }
      <div style={{
        position:"absolute", inset:-7, borderRadius:"50%",
        border:`1px solid rgba(201,168,76,0.12)`,
        animation:"pr 3s ease-in-out infinite",
      }}/>
    </div>
  );
}

/* ─── FEATURED BUTTON ─────────────────────────────────────────── */
function FeatBtn({ href, icon, label, sub }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        display:"flex", alignItems:"center", gap:"1rem",
        padding:"1.1rem 1.3rem",
        background: h ? C.goldBright : C.gold,
        textDecoration:"none",
        transform: h ? "translateY(-2px) scale(1.01)" : "none",
        boxShadow: h ? "0 12px 32px rgba(201,168,76,0.35)" : "0 4px 20px rgba(201,168,76,0.18)",
        transition:"all 0.25s cubic-bezier(.34,1.56,.64,1)",
        marginBottom:"0.55rem",
      }}>
      <span style={{ fontSize:"1.15rem", flexShrink:0 }}>{icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"0.85rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.black, lineHeight:1.1 }}>{label}</div>
        {sub && <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.58rem", letterSpacing:"0.07em", color:"rgba(0,0,0,0.5)", marginTop:2 }}>{sub}</div>}
      </div>
      <div style={{ color:"rgba(0,0,0,0.35)", fontSize:"0.9rem" }}>↗</div>
    </a>
  );
}

/* ─── LINK BUTTON ─────────────────────────────────────────────── */
function Btn({ href, icon, label, sub, accent, live=true }) {
  const [h, setH] = useState(false);
  return (
    <a href={live ? href : undefined} target={live?"_blank":undefined} rel="noopener"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        display:"flex", alignItems:"center", gap:"0.85rem",
        padding:"0.88rem 1.1rem",
        background: h && live ? C.card2 : C.card,
        border:`1px solid ${h && live ? (accent||C.goldBorder) : "rgba(255,255,255,0.06)"}`,
        borderLeft:`3px solid ${live ? (accent||C.gold) : "rgba(255,255,255,0.08)"}`,
        textDecoration:"none", cursor: live ? "pointer" : "default",
        transform: h && live ? "translateX(3px)" : "none",
        opacity: live ? 1 : 0.45,
        transition:"all 0.2s ease",
        marginBottom:"0.45rem",
      }}>
      <span style={{ fontSize:"0.95rem", flexShrink:0, width:20, textAlign:"center" }}>{icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.8rem", letterSpacing:"0.07em", textTransform:"uppercase", color: live ? C.white : C.muted, lineHeight:1.1 }}>{label}</div>
        {sub && <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.57rem", letterSpacing:"0.05em", color:C.muted, marginTop:1 }}>{sub}</div>}
      </div>
      {!live && <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.5rem", letterSpacing:"0.15em", textTransform:"uppercase", padding:"0.18rem 0.45rem", border:"1px solid rgba(255,255,255,0.07)", color:C.muted }}>Soon</span>}
      {live && <span style={{ color: accent||C.goldDim, fontSize:"0.8rem" }}>↗</span>}
    </a>
  );
}

/* ─── DIVIDER ─────────────────────────────────────────────────── */
function Div({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", margin:"1.3rem 0 0.8rem" }}>
      <div style={{ flex:1, height:1, background:"rgba(201,168,76,0.1)" }}/>
      <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.52rem", letterSpacing:"0.3em", textTransform:"uppercase", color:C.goldDim, whiteSpace:"nowrap" }}>{label}</span>
      <div style={{ flex:1, height:1, background:"rgba(201,168,76,0.1)" }}/>
    </div>
  );
}

/* ─── SOCIAL ICON ─────────────────────────────────────────────── */
function Soc({ href, label, color }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener"
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        width:42, height:42,
        border:`1px solid ${h ? (color||C.gold) : "rgba(201,168,76,0.13)"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        color: h ? (color||C.gold) : C.muted,
        fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.62rem",
        textDecoration:"none", transition:"all 0.2s",
        background: h ? `rgba(201,168,76,0.05)` : "transparent",
      }}>{label}</a>
  );
}

/* ─── MAIN ────────────────────────────────────────────────────── */
export default function LinkInBio() {
  const [on, setOn] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => { setTimeout(() => setOn(true), 60); }, []);

  return (
    <div style={{
      minHeight:"100vh", background:C.black, color:C.white,
      fontFamily:"'Barlow',sans-serif", fontWeight:300,
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"0 0 5rem", overflowX:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Barlow+Condensed:wght@200;300;400;600;700;900&family=Barlow:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-thumb{background:${C.goldDim};}
        a{color:inherit;text-decoration:none;}
        @keyframes pr{0%,100%{transform:scale(1);opacity:0.25;}50%{transform:scale(1.07);opacity:0.08;}}
        @keyframes wb{from{transform:scaleY(0.65);}to{transform:scaleY(1.2);}}
        @keyframes ld{0%,100%{opacity:1;}50%{opacity:0.3;}}
        @keyframes gp{0%,100%{opacity:0.07;}50%{opacity:0.13;}}
        @keyframes fu{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
      `}</style>

      {/* Background radial glow */}
      <div style={{
        position:"fixed", top:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:480, height:"55vh",
        background:"radial-gradient(ellipse 90% 65% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
        pointerEvents:"none", zIndex:0, animation:"gp 4s ease-in-out infinite",
      }}/>

      {/* Wrapper */}
      <div style={{
        width:"100%", maxWidth:430, padding:"2.8rem 1.1rem 2rem",
        position:"relative", zIndex:1,
        opacity: on ? 1 : 0, transform: on ? "none" : "translateY(14px)",
        transition:"opacity 0.65s ease, transform 0.65s ease",
      }}>

        {/* ── PROFILE ──────────────────────────────────────── */}
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"1rem" }}>
            <Logo/>
          </div>

          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontWeight:900,
            fontSize:"1.85rem", letterSpacing:"-0.01em", color:C.white,
            lineHeight:1, marginBottom:"0.3rem",
          }}>Suave Melodies</h1>

          <div style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600,
            fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase",
            color:C.gold, marginBottom:"0.65rem",
          }}>@suavemelodies</div>

          <p style={{ fontSize:"0.83rem", color:C.dim, lineHeight:1.7, maxWidth:300, margin:"0 auto 0.9rem" }}>
            Artist · Producer · CEO · System Builder<br/>
            Building an empire from nothing.<br/>
            Tembisa, South Africa.
          </p>

          {/* Verified company pill */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"0.5rem",
            border:`1px solid ${C.goldBorder}`, padding:"0.33rem 0.85rem",
            marginBottom:"0.8rem",
          }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, animation:"ld 2s infinite" }}/>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.53rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.goldDim }}>
              DFN Worldwide PTY Ltd · Reg. 2026/408693/07
            </span>
          </div>

          {/* Division badges */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:4 }}>
            {["DFN Studio","DFN Publishing","DFN Fashion","DFN Dev"].map(d=>(
              <span key={d} style={{
                fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
                fontSize:"0.5rem", letterSpacing:"0.15em", textTransform:"uppercase",
                padding:"0.2rem 0.55rem", border:"1px solid rgba(201,168,76,0.1)", color:C.muted,
              }}>{d}</span>
            ))}
          </div>
        </div>

        {/* ── FEATURED CTA ─────────────────────────────────── */}
        <Div label="Start Here"/>
        <FeatBtn href={L.gumroad} icon="📖" label="Download Free Book — The Reset System" sub="Discipline From Nothing · 100% Free · No sign-up needed"/>

        {/* ── MUSIC ────────────────────────────────────────── */}
        <Div label="Stream DFNCHALLENGE"/>
        <Btn href={L.spotify} icon="♪"  label="DFNCHALLENGE on Spotify"    sub="Amapiano · DFN Worldwide Records · 2026" accent="#1DB954"/>
        <Btn href={L.apple}   icon="🍎" label="Apple Music"                sub="Coming soon"                              accent="#FC3C44" live={false}/>
        <Btn href={L.youtube} icon="▶"  label="YouTube — DFN Worldwide"    sub="Music videos · Updates · Behind the scenes" accent="#FF0000"/>
        <Btn href={L.amazon}  icon="☁"  label="Amazon Music"               sub="Coming soon"                              accent="#FF9900" live={false}/>

        {/* ── PRODUCTS ─────────────────────────────────────── */}
        <Div label="Books & Products"/>
        <Btn href={L.gumroad} icon="⚡" label="DFN Gumroad Store"       sub="Books · Digital products · Free & premium" accent={C.gold}/>
        <Btn href="#"          icon="👕" label="DFN Fashion — Merch"     sub="Limited edition · Coming soon"             accent={C.goldDim} live={false}/>

        {/* ── EMPIRE ───────────────────────────────────────── */}
        <Div label="The Empire"/>
        <Btn href={L.website}  icon="🌍" label="DFN Worldwide — Main Site" sub="Music · Books · Merch · The full ecosystem" accent={C.gold}/>
        <Btn href={L.presskit} icon="📋" label="Press Kit & Media"         sub="For blogs · Playlists · Radio · Sync"       accent={C.goldDim}/>
        <Btn href={L.tracker}  icon="🔥" label="Discipline Tracker — Free App" sub="30-Day Protocol · Daily execution"      accent={C.gold}/>

        {/* ── NOW PLAYING CARD ─────────────────────────────── */}
        <Div label="Latest Release"/>
        <div style={{
          background:`linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 100%)`,
          border:`1px solid ${C.goldBorder}`, padding:"1.3rem",
          marginBottom:"0.55rem", position:"relative",
        }}>
          {/* Live badge */}
          <div style={{ position:"absolute", top:"0.9rem", right:"1rem", display:"flex", alignItems:"center", gap:"0.35rem" }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:C.green, animation:"ld 2s infinite" }}/>
            <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.5rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.green }}>Live Now</span>
          </div>

          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.53rem", letterSpacing:"0.25em", textTransform:"uppercase", color:C.goldDim, marginBottom:"0.4rem" }}>DFN Studio · 2026</div>

          <div style={{ display:"flex", gap:"0.9rem", alignItems:"center", marginBottom:"0.9rem" }}>
            <div style={{ width:58, height:58, flexShrink:0, background:`linear-gradient(135deg,#1a1200,${C.black})`, border:`1px solid rgba(201,168,76,0.18)`, overflow:"hidden" }}>
              <img src="../assets/images/studio1.webp" alt="DFNCHALLENGE" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"1.05rem", letterSpacing:"0.04em", textTransform:"uppercase", color:C.white, lineHeight:1 }}>DFNCHALLENGE</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.6rem", letterSpacing:"0.08em", color:C.dim, marginTop:3 }}>Suave Melodies · Amapiano · DFN Worldwide Records</div>
            </div>
          </div>

          <Waveform active={true}/>

          <a href={L.spotify} target="_blank" rel="noopener" style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
            width:"100%", padding:"0.7rem", marginTop:"0.9rem",
            background:"#1DB954", color:"#000",
            fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
            fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase",
          }}>♪ &nbsp; Stream on Spotify</a>
        </div>

        {/* ── BOOK CARD ─────────────────────────────────────── */}
        <div style={{
          background:C.card, border:`1px solid ${C.goldBorder}`,
          borderTop:`2px solid ${C.gold}`, padding:"1.2rem",
          display:"flex", gap:"0.9rem", alignItems:"center",
          marginBottom:"0.55rem",
        }}>
          <div style={{ width:50, aspectRatio:"2/3", flexShrink:0, background:`linear-gradient(160deg,#1a1200,${C.black})`, border:`1px solid rgba(201,168,76,0.18)`, overflow:"hidden", position:"relative" }}>
            <img src="../assets/images/books1.webp" alt="Book" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
            <div style={{ position:"absolute", left:-3, top:0, bottom:0, width:3, background:C.gold }}/>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.53rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, marginBottom:"0.25rem" }}>Free Book · DFN Publishing</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"0.95rem", color:C.white, lineHeight:1.15, marginBottom:"0.4rem" }}>Discipline From Nothing:<br/>The Reset System</div>
            <div style={{ fontSize:"0.68rem", color:C.muted, marginBottom:"0.6rem" }}>8 chapters · 30-Day Protocol · Full Worksheets</div>
            <a href={L.gumroad} target="_blank" rel="noopener" style={{
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.6rem",
              letterSpacing:"0.15em", textTransform:"uppercase",
              background:C.gold, color:C.black, padding:"0.38rem 0.9rem", display:"inline-block",
            }}>↓ Free Download</a>
          </div>
        </div>

        {/* ── SOCIAL ICONS ─────────────────────────────────── */}
        <Div label="Follow"/>
        <div style={{ display:"flex", justifyContent:"center", gap:"0.45rem", flexWrap:"wrap" }}>
          <Soc href={L.instagram} label="IG"  color="#E1306C"/>
          <Soc href={L.tiktok}    label="TT"  color="#69C9D0"/>
          <Soc href={L.youtube}   label="YT"  color="#FF0000"/>
          <Soc href={L.twitter}   label="X"   color={C.white}/>
          <Soc href={L.facebook}  label="FB"  color="#1877F2"/>
          <Soc href="mailto:info@dfnworldwide.com" label="✉" color={C.gold}/>
        </div>

        {/* ── MANIFESTO ─────────────────────────────────────── */}
        <div style={{
          margin:"2rem 0 0", textAlign:"center",
          padding:"1.4rem 1rem",
          borderTop:"1px solid rgba(201,168,76,0.09)",
          borderBottom:"1px solid rgba(201,168,76,0.09)",
        }}>
          <div style={{
            fontFamily:"'Playfair Display',serif", fontStyle:"italic",
            fontSize:"0.98rem", color:C.dim, lineHeight:1.8,
          }}>
            "From nothing —<br/>
            <span style={{ color:C.gold, fontWeight:700, fontStyle:"normal" }}>we build everything.</span>"
          </div>
          <div style={{
            fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.55rem",
            letterSpacing:"0.2em", textTransform:"uppercase",
            color:C.muted, marginTop:"0.6rem",
          }}>— Suave Melodies · DFN Worldwide</div>
        </div>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <div style={{ textAlign:"center", marginTop:"1.8rem" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"0.88rem", letterSpacing:"0.15em", color:C.gold, marginBottom:"0.3rem" }}>DFN WORLDWIDE</div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.52rem", letterSpacing:"0.13em", textTransform:"uppercase", color:C.muted, lineHeight:2 }}>
            ℗ & © 2026 DFN Worldwide PTY Ltd<br/>
            Reg. 2026/408693/07 · Tembisa, South Africa<br/>
            From Nothing, Build Everything
          </div>
        </div>

      </div>
    </div>
  );
}
