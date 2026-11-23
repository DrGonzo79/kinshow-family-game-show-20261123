"use client";
import {useEffect,useMemo,useState} from "react"; import demo from "@/data/demo.json"; import {buildShow,type Story} from "@/lib/show";
export default function Home(){
 const [stories,setStories]=useState<Story[]>(demo.stories); const [format,setFormat]=useState("Story quiz"); const [generated,setGenerated]=useState(false); const [error,setError]=useState(""); const [checked,setChecked]=useState<string[]>([]); const [hostMode,setHostMode]=useState(false); const [ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 const rounds=useMemo(()=>buildShow(stories,format),[stories,format]);
 function toggleStory(id:string){setStories(v=>v.map(s=>s.id===id?{...s,approved:!s.approved}:s));setGenerated(false);setError("")}
 function create(){if(stories.filter(s=>s.approved).length<2){setError("Approve at least two family stories to build a playable show.");return}setGenerated(true);setError("");setHostMode(false)}
 const rehearsal=["Names and dates checked","Sensitive stories approved","Host practised opening cue"];
 return <main data-ready={ready} className={hostMode?"hostMode":""}>
  <nav><span className="mark">K</span><strong>KINSHOW</strong><div>Fictional demo · no uploads leave this browser</div></nav>
  <header><div><p className="eyebrow">RUTH'S 80TH · SHOW WORKROOM</p><h1>Family stories,<br/><em>ready for the spotlight.</em></h1><p className="lede">Shape approved memories into a timed, host-ready game show—without handing a nervous relative a blank PowerPoint.</p></div><aside><small>EVENT CARD</small><b>{demo.event.date}</b><span>{demo.event.guests} guests · hosted by {demo.event.host}</span><i>7-day delivery target</i></aside></header>
  <section className="workspace"><div className="sectionHead"><span>01</span><div><h2>Approve the story reel</h2><p>Every source stays attributed. Uncheck anything too private for the room.</p></div><b>{stories.filter(s=>s.approved).length}/{stories.length} cleared</b></div>
   <div className="stories">{stories.map(s=><button type="button" key={s.id} aria-pressed={s.approved} onClick={()=>toggleStory(s.id)}><div><span>{s.approved?"✓ APPROVED":"HOLD"}</span><time>{s.year}</time></div><p>{s.story}</p><small>{s.relative}</small></button>)}</div>
  </section>
  <section className="builder"><div className="sectionHead"><span>02</span><div><h2>Set the room format</h2><p>Format changes pacing, not the approved facts.</p></div></div><div className="controls"><label>Show format<select aria-label="Show format" value={format} onChange={e=>{setFormat(e.target.value);setGenerated(false)}}><option>Story quiz</option><option>Family Feud</option><option>Photo reveal</option></select></label><button className="primary" onClick={create}>Build the run of show <b>→</b></button></div>{error&&<p role="alert" className="error">{error}</p>}
   {!generated?<div className="empty"><span>✦</span><p>Your approved memories become timed rounds, answers and host cues here.</p></div>:<div className="show"><div className="showTop"><div><small>20-MINUTE SIGNATURE SHOW</small><h3>{format} for Ruth</h3></div><button onClick={()=>setHostMode(v=>!v)}>{hostMode?"Exit host view":"Open host view"}</button></div>{rounds.map((r,i)=><article key={r.id}><span>{String(i+1).padStart(2,"0")}</span><div><small>{r.label}</small><h4>{r.prompt}</h4><p><b>Answer:</b> {r.answer}</p><em>{r.cue}</em></div></article>)}</div>}
  </section>
  {generated&&<section className="rehearsal"><div><p className="eyebrow">BEFORE THE PARTY</p><h2>Host rehearsal</h2><p>Check the human details before anyone takes the mic.</p></div><div>{rehearsal.map(x=><label key={x}><input type="checkbox" checked={checked.includes(x)} onChange={()=>setChecked(v=>v.includes(x)?v.filter(y=>y!==x):[...v,x])}/><span>{x}</span></label>)}<strong>{checked.length===3?"Ready for showtime ✓":`${3-checked.length} checks remaining`}</strong></div></section>}
  <footer><div><b>DEMO BOUNDARY</b><p>All people, stories and event details are fictional. Question drafting is deterministic; simulated AI is not making factual claims.</p></div><span>Made for the family member who said “I’ll handle entertainment.”</span></footer>
 </main>
}
