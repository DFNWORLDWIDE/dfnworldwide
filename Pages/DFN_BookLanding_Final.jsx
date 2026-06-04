import { useState, useEffect, useRef } from "react";

const C = {
  gold:"#C9A84C", goldBright:"#FFD700", goldDim:"#7A5E10",
  goldBorder:"rgba(201,168,76,0.2)", goldGlow:"rgba(201,168,76,0.07)",
  black:"#060606", dark:"#0C0C0C", card:"#111", card2:"#181818",
  white:"#F2EAD3", dim:"#9A8A6A", muted:"#505050",
  green:"#4CAF50", greenBg:"rgba(76,175,80,0.1)", greenBorder:"rgba(76,175,80,0.3)",
};

function useReveal(threshold=0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){setVis(true);obs.disconnect();} },{threshold});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return [ref, vis];
}

function Reveal({children, delay=0}){
  const [ref,vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis?1:0,
      transform: vis?"none":"translateY(28px)",
      transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`
    }}>{children}</div>
  );
}

function Line({center=false}){
  return <div style={{width:48,height:2,background:C.gold,margin:center?"1rem auto":"1rem 0"}}/>;
}

function Brow({children, center=false}){
  return <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:".6rem",letterSpacing:".35em",textTransform:"uppercase",color:C.gold,textAlign:center?"center":"left",marginBottom:".3rem"}}>{children}</div>;
}

function StickyCTA({show}){
  return (
    <div style={{
      position:"fixed",bottom:0,left:0,right:0,zIndex:900,
      transform:show?"translateY(0)":"translateY(110%)",
      transition:"transform .45s cubic-bezier(.34,1.56,.64,1)",
      background:"rgba(6,6,6,.97)",
      borderTop:`1px solid ${C.goldBorder}`,
      backdropFilter:"blur(20px)",
      padding:".9rem 2rem",
      display:"flex",alignItems:"center",
      justifyContent:"space-between",gap:"1rem",flexWrap:"wrap",
    }}>
      <div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",color:C.white}}>Discipline From Nothing: The Reset System</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".62rem",color:C.dim,marginTop:2}}>8 chapters · 30-Day Protocol · Worksheets · DFNCHALLENGE soundtrack</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"1.5rem",color:C.gold}}>FREE</div>
        <a href="https://suavemelodies.gumroad.com" target="_blank" rel="noopener"
          style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",background:C.gold,color:C.black,padding:".75rem 1.8rem",textDecoration:"none",whiteSpace:"nowrap"}}>
          ↓ Download Free
        </a>
      </div>
    </div>
  );
}

function BookCover(){
  const [err,setErr] = useState(false);
  return (
    <div style={{width:"100%",aspectRatio:"2/3",position:"relative",boxShadow:"-14px 14px 40px rgba(0,0,0,.85), 0 0 60px rgba(201,168,76,.07)"}}>
      <div style={{position:"absolute",left:-9,top:0,bottom:0,width:9,background:`linear-gradient(to right,${C.goldDim},${C.gold})`}}/>
      {!err
        ? <img src="../assets/images/books1.webp" alt="The Reset System" onError={()=>setErr(true)} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        : <div style={{width:"100%",height:"100%",background:`linear-gradient(160deg,#1a1200,${C.black})`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",padding:"2rem"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:200,fontSize:".6rem",letterSpacing:".35em",textTransform:"uppercase",color:C.goldDim,marginBottom:".8rem",textAlign:"center"}}>DISCIPLINE FROM NOTHING</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:"2.2rem",color:C.white,lineHeight:1.05,textAlign:"center",marginBottom:"1.5rem"}}>THE RESET<br/>SYSTEM</div>
            <div style={{width:40,height:1,background:C.gold,margin:"0 auto 1rem"}}/>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".65rem",letterSpacing:".2em",color:C.goldDim,textAlign:"center"}}>Suave Melodies<br/>DFN Worldwide Publishing</div>
          </div>
      }
    </div>
  );
}

function ChapterCard({num,title,hook,index}){
  const [ref,vis] = useReveal();
  const [hov,setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        opacity:vis?1:0,transform:vis?"none":"translateY(20px)",
        transition:`all .25s ease, opacity .6s ease ${index*.07}s, transform .6s ease ${index*.07}s`,
        background:hov?C.card2:C.card,
        border:`1px solid ${hov?C.goldBorder:"rgba(255,255,255,.05)"}`,
        borderLeft:`3px solid ${hov?C.gold:"transparent"}`,
        padding:"1.4rem 1.5rem",display:"flex",gap:"1.2rem",alignItems:"flex-start",
      }}>
      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:"2.2rem",color:hov?C.gold:"rgba(255,255,255,.07)",lineHeight:1,flexShrink:0,width:48,transition:"color .25s"}}>
        {String(num).padStart(2,"0")}
      </div>
      <div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".92rem",letterSpacing:".06em",textTransform:"uppercase",color:hov?C.white:C.dim,marginBottom:".4rem",transition:"color .25s"}}>{title}</div>
        <div style={{fontSize:".8rem",color:C.muted,lineHeight:1.65}}>{hook}</div>
      </div>
    </div>
  );
}

function RuleCard({num,rule,index}){
  const [ref,vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity:vis?1:0,transform:vis?"none":"translateY(16px)",
      transition:`all .6s ease ${index*.1}s`,
      borderLeft:`2px solid ${C.gold}`,padding:"1.2rem 1.4rem",background:C.goldGlow,
    }}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".55rem",letterSpacing:".25em",textTransform:"uppercase",color:C.goldDim,marginBottom:".5rem"}}>DFN Rule · Chapter {num}</div>
      <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:".98rem",color:C.white,lineHeight:1.75}}>{rule}</div>
    </div>
  );
}

function EmailCapture(){
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  function submit(){ if(!email||!email.includes("@"))return; setDone(true); }
  if(done) return <div style={{padding:"1rem 1.5rem",background:C.greenBg,border:`1px solid ${C.greenBorder}`,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".75rem",letterSpacing:".15em",textTransform:"uppercase",color:C.green,textAlign:"center"}}>✓ You're on the list. Check your inbox.</div>;
  return (
    <div style={{display:"flex",maxWidth:460}}>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Your email address"
        style={{flex:1,background:"rgba(255,255,255,.04)",border:`1px solid ${C.goldBorder}`,borderRight:"none",color:C.white,fontFamily:"'Barlow',sans-serif",fontSize:".9rem",padding:".85rem 1.2rem",outline:"none"}}/>
      <button onClick={submit} style={{background:C.gold,color:C.black,fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".7rem",letterSpacing:".15em",textTransform:"uppercase",padding:".85rem 1.4rem",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>Notify Me</button>
    </div>
  );
}

export default function BookLanding(){
  const [showSticky,setShowSticky]=useState(false);
  const heroRef=useRef(null);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>setShowSticky(!e.isIntersecting),{threshold:0});
    if(heroRef.current) obs.observe(heroRef.current);
    return ()=>obs.disconnect();
  },[]);

  const chapters=[
    ["The Failure of Motivation","Why motivation always fails and what replaces it permanently."],
    ["The Cost of Inconsistency","The hidden price you pay every day you don't execute. The silent erosion of self-respect."],
    ["Facing Reality","Your Zero Score. No excuses. The brutal honesty that makes change possible."],
    ["The 15-Minute Reset","An emergency protocol that rebuilds momentum in under 15 minutes, every single time."],
    ["Building Daily Structure","The framework that replaces willpower with automatic, non-negotiable action."],
    ["Identity and Discipline","Stop trying to do discipline. Start becoming a disciplined man."],
    ["The 7-Day Reset Challenge","Seven days that prove to yourself you can execute consistently."],
    ["The 30-Day Protocol","Thirty days that forge a new identity. This is where transformation locks in permanently."],
  ];

  const rules=[
    [1,"Motivation is the reward for action, not the requirement for it. Stop waiting for the feeling. Build the structure that makes the feeling irrelevant."],
    [3,"Comfortable lies keep you weak. Painful truth sets you free. Face reality without flinching, and the power to change it becomes yours."],
    [5,"Structure defeats chaos. A mediocre plan executed daily beats a perfect plan executed occasionally."],
    [6,"Discipline is temporary. Identity is permanent. Build the identity of a man who no longer negotiates with himself."],
  ];

  const s={
    sec:(bg="#060606",top=true)=>({ padding:"6rem 2rem", background:bg, borderTop:top?`1px solid rgba(255,255,255,.04)`:"none" }),
    inner:{ maxWidth:900, margin:"0 auto" },
    h2:{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(2rem,4vw,3.5rem)", lineHeight:1.05 },
  };

  return (
    <div style={{background:C.black,color:C.white,fontFamily:"'Barlow',sans-serif",fontWeight:300,overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Barlow+Condensed:wght@200;300;400;600;700;900&family=Barlow:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(201,168,76,.25);}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${C.goldDim};}
        a{color:inherit;text-decoration:none;}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight:"100vh", display:"grid",
        gridTemplateColumns:"1fr 400px",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 80% at 70% 50%,rgba(201,168,76,.05) 0%,transparent 60%)",pointerEvents:"none"}}/>

        {/* Left */}
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"7rem 3.5rem 5rem",animation:"fadeUp .9s ease forwards"}}>

          <div style={{display:"inline-flex",alignItems:"center",gap:".6rem",marginBottom:"2rem",width:"fit-content"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".62rem",letterSpacing:".25em",textTransform:"uppercase",background:C.gold,color:C.black,padding:".35rem .9rem"}}>100% Free</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",color:C.dim}}>DFN Publishing · Foundation Edition</div>
          </div>

          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:200,fontSize:".78rem",letterSpacing:".4em",textTransform:"uppercase",color:C.dim,marginBottom:".5rem"}}>Discipline From Nothing</div>

          <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:"clamp(2.8rem,7vw,5.5rem)",lineHeight:.95,letterSpacing:"-.02em",marginBottom:".5rem"}}>
            The Reset<br/>
            <span style={{background:`linear-gradient(90deg,${C.gold},${C.goldBright},${C.gold})`,backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 3s linear infinite"}}>System.</span>
          </h1>

          <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.15rem",color:C.dim,marginBottom:"2.5rem"}}>Rebuild Your Life When Motivation Is Dead.</div>

          <p style={{fontSize:".95rem",color:C.dim,lineHeight:1.85,maxWidth:460,marginBottom:"2.5rem"}}>
            Eight chapters. One protocol. The complete system for rebuilding consistency from zero — forged in Tembisa under real pressure, written for men who have nothing left to lose and everything left to build.
          </p>

          <div style={{display:"flex",gap:".8rem",flexWrap:"wrap",marginBottom:"2.5rem"}}>
            <a href="https://suavemelodies.gumroad.com" target="_blank" rel="noopener"
              style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".8rem",letterSpacing:".2em",textTransform:"uppercase",background:C.gold,color:C.black,padding:"1rem 2.2rem",display:"inline-flex",alignItems:"center",gap:".5rem",boxShadow:"0 8px 32px rgba(201,168,76,.2)"}}>
              ↓ &nbsp;Download Free — Gumroad
            </a>
            <a href="#chapters"
              style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".8rem",letterSpacing:".2em",textTransform:"uppercase",border:`1px solid ${C.goldBorder}`,color:C.dim,padding:"1rem 1.8rem",display:"inline-flex",alignItems:"center"}}>
              What's Inside
            </a>
          </div>

          {/* Mini features */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,maxWidth:440}}>
            {[["⚡","15-Minute Reset Protocol"],["📋","Worksheets & Trackers"],["🔥","7-Day Challenge"],["🏆","30-Day Protocol"],["🧠","Identity Installation"],["♪","DFNCHALLENGE Soundtrack"]].map(([icon,text])=>(
              <div key={text} style={{display:"flex",alignItems:"center",gap:".6rem",padding:".65rem .9rem",background:C.card,border:"1px solid rgba(255,255,255,.05)"}}>
                <span style={{fontSize:".95rem"}}>{icon}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".72rem",fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:C.dim}}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Cover */}
        <div style={{background:C.dark,borderLeft:"1px solid rgba(255,255,255,.04)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"6rem 2.5rem",position:"relative",animation:"fadeUp .9s ease .15s both"}}>
          <div style={{position:"absolute",width:260,height:260,background:"radial-gradient(circle,rgba(201,168,76,.1) 0%,transparent 70%)",pointerEvents:"none"}}/>
          <div style={{width:"72%",position:"relative",zIndex:1}}><BookCover/></div>
          <div style={{marginTop:"2.2rem",textAlign:"center",borderTop:"1px solid rgba(201,168,76,.12)",paddingTop:"1.5rem",width:"72%"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1rem"}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".78rem",textDecoration:"line-through",color:C.muted}}>$9.99</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"2.5rem",color:C.gold,lineHeight:1}}>FREE</div>
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".6rem",letterSpacing:".12em",textTransform:"uppercase",color:C.muted,marginTop:5}}>No payment · No sign-up required</div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
      <section style={s.sec(C.dark)}>
        <div style={s.inner}>
          <Reveal><Brow center>Who This Book Is For</Brow><Line center/></Reveal>
          <Reveal delay={.1}><h2 style={{...s.h2,textAlign:"center",marginBottom:"3.5rem"}}>You've started over<br/><span style={{color:C.gold}}>more than once.</span></h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:C.goldBorder}}>
            {[
              ["You start strong, then quit when the excitement fades.","You know the pattern. You've lived it. This book breaks it permanently."],
              ["You know exactly what to do. You just don't do it consistently.","Information was never your problem. Execution is. This solves execution."],
              ["You've tried motivation. The videos. The quotes. The new starts.","Motivation doesn't last. This book replaces it with something that does."],
            ].map(([prob,sol],i)=>(
              <Reveal key={i} delay={i*.1}>
                <div style={{background:C.card,padding:"2.5rem 2rem",height:"100%"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"1.05rem",color:C.white,lineHeight:1.7,marginBottom:"1.2rem"}}>"{prob}"</div>
                  <div style={{width:32,height:1,background:C.gold,margin:"0 0 1rem"}}/>
                  <div style={{fontSize:".82rem",color:C.muted,lineHeight:1.7}}>{sol}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTERS ─────────────────────────────────────────── */}
      <section id="chapters" style={s.sec(C.black)}>
        <div style={s.inner}>
          <Reveal><Brow center>Inside the Book</Brow><Line center/></Reveal>
          <Reveal delay={.1}><h2 style={{...s.h2,textAlign:"center",marginBottom:"3rem"}}>Eight Chapters.<br/>One System.</h2></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:"2rem"}}>
            {chapters.map(([title,hook],i)=><ChapterCard key={i} num={i+1} title={title} hook={hook} index={i}/>)}
          </div>
          {/* Extras */}
          <Reveal delay={.2}>
            <div style={{background:C.goldGlow,border:`1px solid ${C.goldBorder}`,padding:"2.5rem",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"1.5rem",marginTop:"1rem"}}>
              {[["Appendix A","Worksheets & Trackers","Daily log, weekly review, 30-day tracker, identity statement builder — print or copy into a notebook."],
                ["Appendix B","DFN Emergency Reference","All 8 DFN Rules. 15-Min Reset quick guide. Use it when pressure peaks and you need the system fast."],
                ["Bonus","DFNCHALLENGE Soundtrack","Stream the music built in the same conditions as this book. Let it be the soundtrack of your rebuild."]
              ].map(([tag,title,desc])=>(
                <div key={tag}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".58rem",letterSpacing:".25em",textTransform:"uppercase",color:C.goldDim,marginBottom:".5rem"}}>{tag}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:600,fontSize:".85rem",textTransform:"uppercase",letterSpacing:".05em",color:C.white,marginBottom:".5rem"}}>{title}</div>
                  <div style={{fontSize:".78rem",color:C.muted,lineHeight:1.65}}>{desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DFN RULES ────────────────────────────────────────── */}
      <section style={s.sec(C.dark)}>
        <div style={s.inner}>
          <Reveal><Brow center>From Inside the Book</Brow><Line center/></Reveal>
          <Reveal delay={.1}><h2 style={{...s.h2,textAlign:"center",marginBottom:"3rem"}}>The Rules<br/>That Run the System</h2></Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {rules.map(([num,rule],i)=><RuleCard key={num} num={num} rule={rule} index={i}/>)}
          </div>
        </div>
      </section>

      {/* ── 15-MIN RESET ─────────────────────────────────────── */}
      <section style={s.sec(C.black)}>
        <div style={s.inner}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}}>
            <Reveal>
              <Brow>The Core Tool</Brow><Line/>
              <h2 style={{...s.h2,marginBottom:"1.5rem"}}>The 15-Minute<br/><span style={{color:C.gold}}>Reset Protocol.</span></h2>
              <p style={{color:C.dim,lineHeight:1.85,marginBottom:"1.2rem"}}>The single most important tool in this book. When pressure hits, when the day has gone wrong, when everything in you wants to wait — you don't wait. You run the Reset.</p>
              <p style={{color:C.dim,lineHeight:1.85}}>Fifteen minutes. Three steps. It bypasses emotional resistance completely and creates momentum from nothing. Works every time. That's the point.</p>
            </Reveal>
            <Reveal delay={.15}>
              <div style={{background:C.goldGlow,border:`1px solid ${C.goldBorder}`,padding:"2.5rem"}}>
                {[["01 — 05","Face Reality","Write your Zero Score. Real hours of forward movement today. No softening. No excuses."],
                  ["06 — 10","Reclaim Identity","Read your identity statement aloud. Write one declaration of who you are choosing to be today."],
                  ["11 — 15","Take Action","One task. Related to your biggest goal. Execute immediately. No planning. Pure movement."]
                ].map(([time,title,desc],i)=>(
                  <div key={i} style={{display:"flex",gap:"1.2rem",paddingBottom:i<2?"1.5rem":0,marginBottom:i<2?"1.5rem":0,borderBottom:i<2?"1px solid rgba(255,255,255,.05)":"none"}}>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".58rem",letterSpacing:".15em",color:C.gold,flexShrink:0,paddingTop:".2rem",minWidth:50}}>MIN {time}</div>
                    <div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".85rem",letterSpacing:".06em",textTransform:"uppercase",color:C.white,marginBottom:".4rem"}}>{title}</div>
                      <div style={{fontSize:".78rem",color:C.muted,lineHeight:1.65}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AUTHOR ───────────────────────────────────────────── */}
      <section style={s.sec(C.dark)}>
        <div style={s.inner}>
          <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:"4rem",alignItems:"start"}}>
            <Reveal>
              <div style={{width:"100%",aspectRatio:"3/4",background:`linear-gradient(135deg,#1a1200,${C.black})`,border:`1px solid ${C.goldBorder}`,overflow:"hidden",position:"relative"}}>
                <img src="../assets/images/banner1.webp" alt="Suave Melodies" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(6,6,6,.9),transparent)",padding:"1.5rem 1.2rem"}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"1.2rem",color:C.white}}>Suave Melodies</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".6rem",letterSpacing:".15em",textTransform:"uppercase",color:C.gold,marginTop:2}}>Founder, DFN Worldwide</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={.1}>
              <Brow>The Author</Brow><Line/>
              <h2 style={{...s.h2,marginBottom:"1.5rem"}}>This is not success<br/>speaking down to struggle.</h2>
              {["Suave Melodies is an independent creator from Tembisa, South Africa. He built DFN Worldwide PTY Ltd from nothing — no external investment, no industry connections, no safety net. Registered with CIPC and SARS on 24 May 2026.",
                "The Discipline From Nothing philosophy was forged under real pressure: single-parent upbringing, financial hardship, depression, and fatherhood. He didn't study these conditions from the outside. He built inside them.",
                "Every protocol in this book was tested before it was written. The Reset System is not theory — it is the documented method of a man who had no other option but to figure it out."
              ].map((p,i)=><p key={i} style={{color:C.dim,lineHeight:1.85,marginBottom:"1.1rem",fontSize:".93rem"}}>{p}</p>)}
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:"1.5rem"}}>
                {["DFN Worldwide PTY Ltd","Reg. 2026/408693/07","SAMRO","CAPASSO","SAMPRA","SoundExchange"].map(t=>(
                  <div key={t} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".58rem",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",padding:".25rem .6rem",border:`1px solid ${C.goldBorder}`,color:C.goldDim}}>{t}</div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── UPSELL ───────────────────────────────────────────── */}
      <section style={s.sec(C.black)}>
        <div style={s.inner}>
          <Reveal>
            <div style={{display:"grid",gridTemplateColumns:"1fr 240px",gap:"3rem",alignItems:"center",background:C.card,border:`1px solid ${C.goldBorder}`,borderTop:`3px solid ${C.gold}`,padding:"3rem"}}>
              <div>
                <Brow>DFN Publishing · Premium Edition</Brow><Line/>
                <h2 style={{...s.h2,marginBottom:"1.5rem"}}>Ready for the<br/>Full System?</h2>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:"2rem"}}>
                  {["16 full chapters — Destruction, Rebuild, Execution, Dominance","Five income architecture pillars built into the system","System Implementation and Expansion framework","Advanced protocols, complete resource vault"].map(item=>(
                    <div key={item} style={{display:"flex",alignItems:"flex-start",gap:".8rem",fontSize:".86rem",color:C.dim,lineHeight:1.6}}>
                      <div style={{width:16,height:1,background:C.gold,flexShrink:0,marginTop:".6rem"}}/>{item}
                    </div>
                  ))}
                </div>
                <EmailCapture/>
                <div style={{fontSize:".65rem",color:C.muted,marginTop:".6rem"}}>Notified the moment it launches. Free book included on sign-up.</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".58rem",fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:C.muted,marginBottom:".4rem"}}>Premium Price</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"3.5rem",color:C.gold,lineHeight:1}}>$7.99</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".62rem",color:C.muted,marginBottom:"2rem",marginTop:".3rem"}}>Print from $14.99</div>
                <div style={{height:1,background:"rgba(255,255,255,.06)",marginBottom:"1.5rem"}}/>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".58rem",color:C.muted,marginBottom:".3rem"}}>You currently have</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"2rem",color:C.white}}>$0.00</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".58rem",color:C.gold,marginTop:".3rem"}}>The Reset System — Free</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section style={{padding:"8rem 2rem",background:C.dark,borderTop:"1px solid rgba(201,168,76,.1)",textAlign:"center"}}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
          <Reveal>
            <Brow center>DFN Publishing · Foundation Edition</Brow>
            <div style={{width:48,height:2,background:C.gold,margin:"1rem auto"}}/>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:"clamp(3rem,8vw,5.5rem)",lineHeight:.95,letterSpacing:"-.02em",marginBottom:"1.5rem"}}>
              Stop<br/><span style={{color:C.gold}}>Starting</span><br/>Over.
            </h2>
            <p style={{color:C.dim,fontSize:".95rem",lineHeight:1.85,maxWidth:480,margin:"0 auto 3rem"}}>
              The Reset System is free. There is no reason to not have it. Download it now. Read Chapter 4 tonight. Run the protocol tomorrow morning.
            </p>
            <div style={{display:"flex",gap:".8rem",justifyContent:"center",flexWrap:"wrap"}}>
              <a href="https://suavemelodies.gumroad.com" target="_blank" rel="noopener"
                style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".82rem",letterSpacing:".2em",textTransform:"uppercase",background:C.gold,color:C.black,padding:"1.1rem 2.8rem",boxShadow:"0 0 40px rgba(201,168,76,.15)",display:"inline-block"}}>
                ↓ Download Free — Gumroad
              </a>
              <a href="#" style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:".82rem",letterSpacing:".2em",textTransform:"uppercase",border:`1px solid ${C.goldBorder}`,color:C.dim,padding:"1.1rem 2rem",display:"inline-block"}}>
                Read on Amazon KDP
              </a>
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".6rem",color:C.muted,letterSpacing:".08em",marginTop:"1.2rem"}}>No payment. No account. No excuses.</div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{padding:"2.5rem 2rem",borderTop:`1px solid ${C.goldBorder}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"1.2rem",color:C.gold}}>DFN Worldwide</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".58rem",letterSpacing:".1em",color:C.muted,textAlign:"center",lineHeight:1.8}}>℗ &amp; © 2026 DFN Worldwide PTY Ltd · Reg. 2026/408693/07<br/>Tembisa, Gauteng, South Africa · All Rights Reserved</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:".58rem",letterSpacing:".2em",textTransform:"uppercase",color:C.goldDim}}>From Nothing, Build Everything</div>
      </div>

      <StickyCTA show={showSticky}/>
    </div>
  );
}
