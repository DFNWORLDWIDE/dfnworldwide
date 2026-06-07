import { useState } from "react";

const C = {
  gold:"#C9A84C",goldBright:"#FFD700",goldDim:"#7A5E10",
  goldBorder:"rgba(201,168,76,0.2)",goldGlow:"rgba(201,168,76,0.06)",
  black:"#060606",dark:"#0C0C0C",card:"#111111",card2:"#181818",
  white:"#F2EAD3",dim:"#9A8A6A",muted:"#555555",
  green:"#4CAF50",greenBg:"rgba(76,175,80,0.1)",greenBorder:"rgba(76,175,80,0.3)",
};

const BIO_SHORT = `Suave Melodies is an independent artist, producer, and system builder from Tembisa, South Africa. He is the founder and CEO of DFN Worldwide PTY Ltd — a registered South African multimedia company encompassing a record label, publishing division, fashion arm, and technology division. His debut project DFNCHALLENGE launched in 2026 alongside the company's official CIPC and SARS registration. He is also the author of the Discipline From Nothing book series, drawn directly from his experience of building an empire from nothing.`;

const BIO_LONG = `Suave Melodies is an independent artist, producer, and system builder from Tembisa, Gauteng, South Africa. He is the founder and CEO of DFN Worldwide PTY Ltd — a registered South African multimedia company encompassing DFN Studio (record label), DFN Publishing, DFN Fashion, and DFN Dev System.

His sound is rooted in Amapiano and cinematic production, released under the DFN Worldwide Records imprint through RouteNote, with full PRO registrations under SAMRO, CAPASSO, SAMPRA, and SoundExchange. His debut project — the DFNCHALLENGE three-beat series — launched in May 2026.

Suave Melodies is also the author of the Discipline From Nothing book series, published under DFN Publishing. The series draws directly from his personal experience of building a company from zero: no budget, no industry connections, no safety net — only two sons as motivation and the decision to stop making excuses.

DFN Worldwide PTY Ltd was officially registered with CIPC (Reg. 2026/408693/07) and SARS on 24 May 2026. The brand now operates across music, publishing, merchandise, web development, and digital products — a fully owned, fully documented creative empire built from nothing in Tembisa, South Africa.`;

function Line({ center = false }) {
  return <div style={{ width: 48, height: 2, background: C.gold, margin: center ? "0.9rem auto" : "0.9rem 0" }} />;
}

function Brow({ children, center = false }) {
  return (
    <div style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
      fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase",
      color: C.gold, textAlign: center ? "center" : "left", marginBottom: "0.3rem",
    }}>{children}</div>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
      fontSize: "0.56rem", letterSpacing: "0.15em", textTransform: "uppercase",
      padding: "0.25rem 0.65rem", border: `1px solid ${C.goldBorder}`,
      color: C.goldDim, display: "inline-block", margin: "2px",
    }}>{children}</span>
  );
}

function StatusPill({ live }) {
  return (
    <span style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
      fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase",
      padding: "0.22rem 0.6rem",
      background: live ? C.greenBg : "rgba(255,255,255,0.04)",
      border: `1px solid ${live ? C.greenBorder : "rgba(255,255,255,0.08)"}`,
      color: live ? C.green : C.muted,
    }}>{live ? "Live" : "Upcoming"}</span>
  );
}

function CopyBtn({ text, label = "Copy" }) {
  const [done, setDone] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  }
  return (
    <button onClick={copy} style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
      fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase",
      padding: "0.35rem 0.9rem", cursor: "pointer", transition: "all 0.2s",
      background: done ? C.greenBg : "transparent",
      border: `1px solid ${done ? C.greenBorder : C.goldBorder}`,
      color: done ? C.green : C.goldDim,
    }}>{done ? "✓ Copied" : label}</button>
  );
}

function RegRow({ label, value, highlight = false }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
      fontSize: "0.8rem", gap: "1rem",
    }}>
      <span style={{ color: C.muted, flexShrink: 0 }}>{label}</span>
      <span style={{ color: highlight ? C.green : C.dim, textAlign: "right", fontWeight: highlight ? 500 : 300 }}>{value}</span>
    </div>
  );
}

const RELEASES = [
  { code:"001", title:"DFNCHALLENGE",         type:"Single / Beat", genre:"Amapiano", year:"2026", live:true  },
  { code:"002", title:"DFNstory",             type:"Single / Beat", genre:"Amapiano", year:"2026", live:false },
  { code:"003", title:"DFNlegacy",            type:"Single / Beat", genre:"Amapiano", year:"2026", live:false },
  { code:"004", title:"DFNCHALLENGE EP",      type:"Extended Play",  genre:"Amapiano", year:"2026", live:false },
  { code:"005", title:"DFNCHALLENGE Mixtape", type:"Mixtape",        genre:"Amapiano", year:"2026", live:false },
  { code:"006", title:"DFNCHALLENGE Album",   type:"Album",          genre:"Amapiano", year:"2026", live:false },
];

const BOOKS = [
  { title:"Discipline From Nothing: The Reset System", edition:"Foundation Edition (Free)", price:"$0.00", live:true  },
  { title:"Discipline From Nothing: The Full System",  edition:"Premium Edition",           price:"$7.99", live:false },
];

const PROS = [
  { org:"SAMRO",        full:"South African Music Rights Organisation",       role:"Performing Rights",  country:"South Africa"  },
  { org:"CAPASSO",      full:"Composers, Authors & Publishers Association",   role:"Mechanical Rights",  country:"South Africa"  },
  { org:"SAMPRA",       full:"South African Music Performance Rights Assn",   role:"Neighbouring Rights",country:"South Africa"  },
  { org:"SoundExchange",full:"SoundExchange Inc.",                            role:"Digital Performance",country:"United States" },
  { org:"RouteNote",    full:"RouteNote Limited",                             role:"Global Distribution",country:"International" },
  { org:"CIPC",         full:"Companies & Intellectual Property Commission",  role:"Company Registration",country:"South Africa" },
];

const DIVISIONS = [
  { code:"01", name:"DFN Studio",      desc:"Record label. Amapiano and cinematic production. DFNCHALLENGE project series via RouteNote." },
  { code:"02", name:"DFN Publishing",  desc:"Books and digital products. Discipline From Nothing series on Gumroad and Amazon KDP." },
  { code:"03", name:"DFN Fashion",     desc:"Premium branded merchandise. Print-on-demand and limited edition drops." },
  { code:"04", name:"DFN Dev System",  desc:"Web apps, digital tools, and technology products built and owned by the company." },
];

const PC_LINE = "℗ & © 2026 DFN Worldwide PTY Ltd. All Rights Reserved. Under exclusive licence to DFN Worldwide Records.";

export default function PressKit() {
  const [bioMode, setBioMode] = useState("short");
  const [tab, setTab] = useState("music");

  const sec = (bg = C.black, top = true) => ({
    padding: "5rem 1.5rem",
    background: bg,
    borderTop: top ? "1px solid rgba(255,255,255,0.04)" : "none",
  });

  const inner = { maxWidth: 960, margin: "0 auto" };

  const h2 = {
    fontFamily: "'Playfair Display', serif", fontWeight: 700,
    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.05, color: C.white,
  };

  return (
    <div style={{ background: C.black, color: C.white, fontFamily: "'Barlow', sans-serif", fontWeight: 300, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Barlow+Condensed:wght@200;300;400;600;700;900&family=Barlow:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(201,168,76,0.25);}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${C.goldDim};}
        a{color:inherit;text-decoration:none;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        table{border-collapse:collapse;width:100%;}
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(135deg,#0a0800 0%,${C.black} 60%)`,
        padding: "7rem 1.5rem 5rem", position: "relative", overflow: "hidden",
        animation: "fadeUp 0.8s ease forwards",
      }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 65%)", pointerEvents:"none" }} />
        <div style={{ ...inner, position:"relative", zIndex:1 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"3rem", alignItems:"start" }}>

            {/* Left */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"2rem" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.6rem", letterSpacing:"0.25em", textTransform:"uppercase", background:C.gold, color:C.black, padding:"0.35rem 0.9rem" }}>Official Press Kit</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.dim }}>Updated 2026 · Confidential</div>
              </div>

              <h1 style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:"clamp(3rem,8vw,6rem)", lineHeight:0.9, letterSpacing:"-0.02em", marginBottom:"0.8rem" }}>
                DFN<br/><span style={{ color:C.gold }}>WORLD</span><br/>WIDE
              </h1>

              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:200, fontSize:"0.82rem", letterSpacing:"0.5em", textTransform:"uppercase", color:C.dim, marginBottom:"2.5rem" }}>FROM NOTHING, BUILD EVERYTHING</div>

              <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
                <a href="mailto:info@dfnworldwide.com" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", background:C.gold, color:C.black, padding:"0.75rem 1.8rem" }}>✉ Contact Us</a>
                <a href="https://dfnworldwide.com" target="_blank" rel="noopener" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.72rem", letterSpacing:"0.18em", textTransform:"uppercase", border:`1px solid ${C.goldBorder}`, color:C.dim, padding:"0.75rem 1.8rem" }}>↗ dfnworldwide.com</a>
              </div>
            </div>

            {/* Registration card */}
            <div style={{ background:C.card, border:`1px solid ${C.goldBorder}`, borderTop:`3px solid ${C.gold}`, padding:"2rem", minWidth:270 }}>
              <Brow light>Company Registration</Brow>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.3rem", color:C.white, margin:"0.5rem 0 1.2rem" }}>DFN Worldwide PTY Ltd</div>
              <RegRow label="Reg. No."   value="2026/408693/07" />
              <RegRow label="Registered" value="CIPC & SARS" />
              <RegRow label="Date"       value="24 May 2026" />
              <RegRow label="Location"   value="Tembisa, Gauteng, SA" />
              <RegRow label="CEO"        value="Suave Melodies" />
              <RegRow label="Type"       value="Proprietary Limited" />
              <RegRow label="Status"     value="Active & Tax Registered" highlight />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section style={sec(C.dark)}>
        <div style={inner}>
          <div style={{ marginBottom:"3rem" }}>
            <Brow>About the Company</Brow><Line/>
            <h2 style={h2}>A Creative Empire Built on Discipline</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }}>
            <div>
              {["DFN Worldwide PTY Ltd is a South African multimedia company registered with CIPC and SARS on 24 May 2026. It encompasses a record label, publishing division, fashion arm, and technology division — all operating under one unifying principle.",
                "Founded by Suave Melodies in Tembisa, Gauteng, DFN Worldwide was built without external investment, without traditional industry infrastructure, and without compromise on creative ownership.",
              ].map((p,i)=><p key={i} style={{ fontSize:"0.92rem", color:C.dim, lineHeight:1.85, marginBottom:"1rem" }}>{p}</p>)}
              <div style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"1.05rem", color:C.white, lineHeight:1.7, borderLeft:`2px solid ${C.gold}`, padding:"1rem 1.4rem", background:C.goldGlow, marginTop:"1.5rem" }}>
                "Every product, every release, every line of code is owned entirely by DFN Worldwide PTY Ltd."
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:1, background:C.goldBorder }}>
              {DIVISIONS.map(d=>(
                <div key={d.code} style={{ background:C.card, padding:"1.3rem 1.4rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"0.4rem" }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.3rem", color:"rgba(201,168,76,0.22)", lineHeight:1, flexShrink:0, width:32 }}>{d.code}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.06em", textTransform:"uppercase", color:C.white }}>{d.name}</div>
                  </div>
                  <div style={{ fontSize:"0.75rem", color:C.muted, lineHeight:1.65, paddingLeft:40 }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTIST BIO ───────────────────────────────────────── */}
      <section style={sec(C.black)}>
        <div style={inner}>
          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:"3.5rem", alignItems:"start" }}>

            <div style={{ width:"100%", aspectRatio:"3/4", background:`linear-gradient(135deg,#1a1200,${C.black})`, border:`1px solid ${C.goldBorder}`, overflow:"hidden", position:"relative" }}>
              <img src="../assets/images/banner1.webp" alt="Suave Melodies" style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(6,6,6,0.92),transparent)", padding:"1.2rem 1rem" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.1rem", color:C.white }}>Suave Melodies</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.gold, marginTop:2 }}>Founder & CEO</div>
              </div>
            </div>

            <div>
              <Brow>Artist Biography</Brow><Line/>
              <h2 style={{ ...h2, marginBottom:"1.2rem" }}>Suave Melodies</h2>

              {/* Bio toggle */}
              <div style={{ display:"flex", gap:1, marginBottom:"1.4rem", width:"fit-content", background:C.goldBorder }}>
                {["short","long"].map(mode=>(
                  <button key={mode} onClick={()=>setBioMode(mode)} style={{
                    fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
                    fontSize:"0.62rem", letterSpacing:"0.15em", textTransform:"uppercase",
                    padding:"0.45rem 1.1rem", border:"none", cursor:"pointer",
                    background: bioMode===mode ? C.gold : C.card,
                    color: bioMode===mode ? C.black : C.muted,
                    transition:"all 0.2s",
                  }}>{mode==="short"?"Short (150w)":"Long (400w)"}</button>
                ))}
              </div>

              <div style={{ fontSize:"0.9rem", color:C.dim, lineHeight:1.88, whiteSpace:"pre-line", marginBottom:"1.2rem" }}>
                {bioMode==="short" ? BIO_SHORT : BIO_LONG}
              </div>

              <div style={{ display:"flex", gap:"0.6rem", marginBottom:"1.4rem", flexWrap:"wrap" }}>
                <CopyBtn text={bioMode==="short" ? BIO_SHORT : BIO_LONG} label={`Copy ${bioMode==="short"?"Short":"Long"} Bio`} />
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {["DFN Worldwide PTY Ltd","Reg. 2026/408693/07","SAMRO","CAPASSO","SAMPRA","SoundExchange","RouteNote"].map(t=><Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELEASES & BOOKS ─────────────────────────────────── */}
      <section style={sec(C.dark)}>
        <div style={inner}>
          <div style={{ marginBottom:"2rem" }}>
            <Brow>Catalogue</Brow><Line/>
            <h2 style={h2}>Official Releases & Publications</h2>
          </div>

          {/* Tab switcher */}
          <div style={{ display:"flex", gap:1, marginBottom:"2rem", background:C.goldBorder, width:"fit-content" }}>
            {[["music","🎵 Music"],["books","📖 Books"]].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{
                fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700,
                fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase",
                padding:"0.55rem 1.4rem", border:"none", cursor:"pointer",
                background: tab===id ? C.gold : C.card,
                color: tab===id ? C.black : C.muted,
                transition:"all 0.2s",
              }}>{label}</button>
            ))}
          </div>

          {tab==="music" && (
            <>
              <table>
                <thead>
                  <tr style={{ borderBottom:`1px solid ${C.goldBorder}` }}>
                    {["#","Title","Type","Genre","Label","Year","Status"].map(h=>(
                      <th key={h} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.57rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, padding:"0.6rem 0.8rem", textAlign:"left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RELEASES.map((r,i)=>(
                    <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,0.03)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:"0.8rem 0.8rem", color:C.muted, fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.7rem" }}>{r.code}</td>
                      <td style={{ padding:"0.8rem 0.8rem", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.85rem", letterSpacing:"0.04em", textTransform:"uppercase", color:C.white }}>{r.title}</td>
                      <td style={{ padding:"0.8rem 0.8rem", fontSize:"0.78rem", color:C.dim }}>{r.type}</td>
                      <td style={{ padding:"0.8rem 0.8rem", fontSize:"0.78rem", color:C.dim }}>{r.genre}</td>
                      <td style={{ padding:"0.8rem 0.8rem", fontSize:"0.78rem", color:C.dim }}>DFN Studio</td>
                      <td style={{ padding:"0.8rem 0.8rem", fontSize:"0.78rem", color:C.dim }}>{r.year}</td>
                      <td style={{ padding:"0.8rem 0.8rem" }}><StatusPill live={r.live}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop:"1rem", padding:"1rem 1.2rem", background:C.card, border:"1px solid rgba(255,255,255,0.05)", fontSize:"0.72rem", color:C.muted, lineHeight:1.7 }}>
                ℗ & © 2026 DFN Worldwide PTY Ltd · All music registered with SAMRO, CAPASSO, SAMPRA & SoundExchange · Distributed via RouteNote
              </div>
            </>
          )}

          {tab==="books" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem" }}>
              {BOOKS.map((b,i)=>(
                <div key={i} style={{ background:C.card, border:`1px solid ${b.live ? C.goldBorder : "rgba(255,255,255,0.05)"}`, borderTop:`3px solid ${b.live ? C.gold : "transparent"}`, padding:"2rem" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
                    <StatusPill live={b.live}/>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.8rem", color:b.live ? C.gold : C.muted, lineHeight:1 }}>{b.price}</div>
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.15rem", color:C.white, lineHeight:1.2, marginBottom:"0.5rem" }}>{b.title}</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.62rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.goldDim, marginBottom:"0.8rem" }}>{b.edition}</div>
                  <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                    <Tag>DFN Publishing</Tag>
                    <Tag>2026</Tag>
                    {b.live && <Tag>Gumroad · KDP</Tag>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PRO REGISTRATIONS ────────────────────────────────── */}
      <section style={sec(C.black)}>
        <div style={inner}>
          <div style={{ marginBottom:"2.5rem" }}>
            <Brow>Rights & Registrations</Brow><Line/>
            <h2 style={h2}>Professional Registrations</h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:C.goldBorder, marginBottom:"1.5rem" }}>
            {PROS.map(p=>(
              <div key={p.org} style={{ background:C.card, padding:"1.5rem" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:"1rem", letterSpacing:"0.04em", color:C.white, marginBottom:"0.35rem" }}>{p.org}</div>
                <div style={{ fontSize:"0.7rem", color:C.muted, lineHeight:1.6, marginBottom:"0.7rem" }}>{p.full}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                  <Tag>{p.role}</Tag>
                  <Tag>{p.country}</Tag>
                </div>
              </div>
            ))}
          </div>

          {/* P&C line */}
          <div style={{ background:C.goldGlow, border:`1px solid ${C.goldBorder}`, padding:"1.4rem 1.6rem" }}>
            <Brow light>Official P & C Line — Use This on All Credits</Brow>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600, fontSize:"0.88rem", letterSpacing:"0.04em", color:C.white, margin:"0.5rem 0 0.8rem", lineHeight:1.6 }}>
              {PC_LINE}
            </div>
            <CopyBtn text={PC_LINE} label="Copy P&C Line" />
          </div>
        </div>
      </section>

      {/* ── MEDIA ASSETS ─────────────────────────────────────── */}
      <section style={sec(C.dark)}>
        <div style={inner}>
          <div style={{ marginBottom:"2.5rem" }}>
            <Brow>Media Assets</Brow><Line/>
            <h2 style={h2}>Press Downloads</h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:C.goldBorder, marginBottom:"1.2rem" }}>
            {[
              { icon:"🖼", name:"Logo Pack",     desc:"DFN globe logo · Gold & white variants · PNG / SVG", how:"Request via email" },
              { icon:"📸", name:"Artist Photos", desc:"Hi-res press photography · Editorial use cleared",   how:"Request via email" },
              { icon:"🎵", name:"Music Artwork", desc:"DFNCHALLENGE · DFNstory · DFNlegacy · 3000×3000px", how:"Request via email" },
              { icon:"📖", name:"Book Covers",   desc:"Discipline From Nothing · Print & digital formats",  how:"Via books page" },
              { icon:"📋", name:"Biography",     desc:"Short (150w) & Long (400w) · Copy from this page",  how:"Copy above ↑" },
              { icon:"⎙",  name:"Full Kit PDF",  desc:"Save or print this entire press kit as PDF",         how:"Print this page" },
            ].map((a,i)=>(
              <div key={i} style={{ background:C.card, padding:"1.6rem 1.4rem", cursor:"default", transition:"background 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.card2}
                onMouseLeave={e=>e.currentTarget.style.background=C.card}>
                <div style={{ fontSize:"1.6rem", marginBottom:"0.7rem" }}>{a.icon}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.8rem", letterSpacing:"0.08em", textTransform:"uppercase", color:C.white, marginBottom:"0.4rem" }}>{a.name}</div>
                <div style={{ fontSize:"0.72rem", color:C.muted, lineHeight:1.6, marginBottom:"0.7rem" }}>{a.desc}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.56rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.goldDim }}>→ {a.how}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center", fontSize:"0.75rem", color:C.muted, lineHeight:1.7 }}>
            For hi-resolution assets contact <a href="mailto:info@dfnworldwide.com" style={{ color:C.gold }}>info@dfnworldwide.com</a> &nbsp;·&nbsp; Please credit "DFN Worldwide PTY Ltd" in all editorial use
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section style={sec(C.black)}>
        <div style={inner}>
          <div style={{ marginBottom:"2.5rem" }}>
            <Brow>Get in Touch</Brow><Line/>
            <h2 style={h2}>Contact & Enquiries</h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"2rem" }}>
            {[
              { role:"General Enquiries",      email:"info@dfnworldwide.com",          icon:"✉" },
              { role:"Music & Sync Licensing", email:"music@dfnworldwide.com",         icon:"♪" },
              { role:"Publishing & Media",     email:"publishing@dfnworldwide.com",    icon:"📖" },
              { role:"Partnerships",           email:"partnerships@dfnworldwide.com",  icon:"🤝" },
            ].map(c=>(
              <a key={c.role} href={`mailto:${c.email}`}
                style={{ display:"flex", alignItems:"flex-start", gap:"1rem", background:C.card, border:"1px solid rgba(255,255,255,0.05)", padding:"1.4rem", transition:"border-color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=C.goldBorder}
                onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"}>
                <span style={{ fontSize:"1.1rem", flexShrink:0, marginTop:"0.1rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:"0.57rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.gold, marginBottom:"0.3rem" }}>{c.role}</div>
                  <div style={{ fontSize:"0.82rem", color:C.dim }}>{c.email}</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
            <div style={{ background:C.card, border:"1px solid rgba(255,255,255,0.05)", padding:"1.5rem" }}>
              <Brow light>Social Media</Brow>
              <div style={{ marginTop:"0.8rem", display:"flex", flexDirection:"column", gap:4 }}>
                {[["Instagram","@suavemelodies"],["TikTok","@suavemelodies"],["YouTube","DFN Worldwide"],["X / Twitter","@suavemelodies"]].map(([pl,h])=>(
                  <div key={pl} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem", padding:"0.35rem 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color:C.muted }}>{pl}</span>
                    <span style={{ color:C.dim }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:C.card, border:"1px solid rgba(255,255,255,0.05)", padding:"1.5rem" }}>
              <Brow light>Official Links</Brow>
              <div style={{ marginTop:"0.8rem", display:"flex", flexDirection:"column", gap:4 }}>
                {[["Website","dfnworldwide.com"],["Free Book","suavemelodies.gumroad.com"],["Spotify","Search: DFNCHALLENGE"],["GitHub","DFN Dev System"]].map(([lb,val])=>(
                  <div key={lb} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem", padding:"0.35rem 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color:C.muted }}>{lb}</span>
                    <span style={{ color:C.dim }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <div style={{ padding:"2.5rem 1.5rem", borderTop:`1px solid ${C.goldBorder}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.3rem", color:C.gold }}>DFN Worldwide</div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.57rem", letterSpacing:"0.1em", color:C.muted, textAlign:"center", lineHeight:1.9 }}>
          ℗ & © 2026 DFN Worldwide PTY Ltd · Reg. 2026/408693/07<br/>
          Tembisa, Gauteng, South Africa · All Rights Reserved · Official Press Kit
        </div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"0.57rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.goldDim }}>From Nothing, Build Everything</div>
      </div>
    </div>
  );
}
