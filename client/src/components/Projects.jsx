import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'SecureCrypt',
    subtitle: 'Cryptography Security App',
    category: 'CYBERSECURITY',
    color: '#00ff41',
    description: 'Organization-based security application implementing multiple cryptographic algorithms for secure data encryption, decryption, and key management.',
    longDesc: `SecureCrypt is an enterprise-grade cryptographic toolkit for organisations needing robust, algorithm-agnostic data protection.\n\nExposes a clean CLI and GUI for teams to choose from AES-256-GCM, RSA-2048, ChaCha20-Poly1305, and custom hybrid schemes. Every encryption operation produces tamper-evident outputs with embedded HMAC signatures.\n\nKey highlights: role-based key vaults, automated key-rotation schedules, audit logging for compliance, and a drag-and-drop file encryption interface.`,
    tags: ['Python', 'Cryptographic Algorithms', 'AES', 'RSA', 'HMAC'],
    icon: '',
    featured: true,
    lines: 'ENCRYPT // PROTECT // SECURE',
    githubUrl: 'https://github.com/GauravJangid2004/SecureCrypt',
    liveUrl: '',
    challenges: ['Implementing constant-time comparisons to prevent timing attacks', 'Building a key-derivation pipeline resistant to brute-force', 'Cross-platform key export / import with no data leakage'],
    screenshots: ['terminal', 'dashboard', 'keyvault'],
    demoColor: '#00ff41',
  },
  {
    id: 2,
    title: 'CyberWall',
    subtitle: 'Client-Server Linux Firewall System',
    category: 'NETWORKING',
    color: '#ff2d78',
    description: 'Full-stack Linux-based firewall system with real-time packet inspection, rule management, and a React dashboard for live network monitoring.',
    longDesc: `CyberWall is a complete client-server firewall solution running on Linux, combining a Python/FastAPI backend for packet analysis with a React front-end for live threat visualization.\n\nUses raw sockets and iptables hooks to intercept traffic, classify it by protocol/port/IP reputation, and enforce rule sets in under 2 ms per packet.\n\nThe dashboard renders real-time charts, blocked-IP heat maps, and a rule builder with drag-and-drop priority ordering — all via WebSocket push.`,
    tags: ['Python', 'NodeJS', 'React', 'FastAPI', 'PostgreSQL', 'Linux'],
    icon: '',
    featured: true,
    lines: 'MONITOR // FILTER // PROTECT',
    githubUrl: 'https://github.com/GauravJangid2004',
    liveUrl: '',
    challenges: ['Zero-copy packet capture without impacting throughput', 'Sub-millisecond rule evaluation for high-traffic environments', 'Keeping React dashboard smooth at 60fps with 1000+ events/sec'],
    screenshots: ['dashboard', 'terminal', 'chart'],
    demoColor: '#ff2d78',
  },
  {
    id: 3,
    title: 'AlumniConnect',
    subtitle: 'Group Notification & Chatbox Platform',
    category: 'FULLSTACK',
    color: '#00d4ff',
    description: 'Working alumni group communication system featuring real-time notifications, group chat, and alumni network management.',
    longDesc: `AlumniConnect is a lightweight yet fully functional alumni networking platform allowing departments to spin up group channels, push broadcast notifications, and enable direct messaging.\n\nFastAPI backend handles auth with JWT, stores messages in MySQL, and broadcasts updates over Server-Sent Events.\n\nFeatures: threaded group chats, @mention notifications, read-receipts, file sharing, and an admin panel for managing members.`,
    tags: ['Python', 'FastAPI', 'SQL Connector', 'MySQL', 'JWT'],
    icon: '',
    featured: false,
    lines: 'NOTIFY // CONNECT // ENGAGE',
    githubUrl: 'https://github.com/GauravJangid2004',
    liveUrl: '',
    challenges: ['Maintaining message ordering across concurrent connections', 'Efficient fan-out for large broadcast groups', 'Cursor-based infinite scroll for chat history'],
    screenshots: ['chat', 'dashboard', 'notifications'],
    demoColor: '#00d4ff',
  },
  {
    id: 4,
    title: 'ElevatorSim',
    subtitle: 'Moving Elevator Simulator',
    category: 'GUI APP',
    color: '#a855f7',
    description: "Fully functional elevator simulator with working buttons, floor logic, queue management, and smooth animations built with Python's tkinter.",
    longDesc: `ElevatorSim models the real-world scheduling problem of multi-floor elevator dispatch using the SCAN algorithm.\n\nThe tkinter GUI renders a live cross-section of the building: the cabin travels floor-to-floor with smooth interpolation, doors animate open/close, and call buttons light up.\n\nThe dispatch engine queues requests, deduplicates stops on the same path, and logs travel times — a useful educational tool for demonstrating OS scheduling concepts.`,
    tags: ['Python', 'tkinter', 'GUI', 'OOP', 'SCAN Algorithm'],
    icon: '',
    featured: false,
    lines: 'SIMULATE // ANIMATE // CONTROL',
    githubUrl: 'https://github.com/GauravJangid2004',
    liveUrl: '',
    challenges: ['Smooth pixel-level animation inside tkinter fixed-tick canvas', 'SCAN algorithm edge cases with simultaneous floor requests', 'Thread-safe button state without freezing the UI'],
    screenshots: ['elevator', 'controls', 'log'],
    demoColor: '#a855f7',
  },
  {
    id: 5,
    title: 'SDG Analyzer',
    subtitle: 'Research & Analysis on SDG Goals',
    category: 'DATA SCIENCE',
    color: '#f59e0b',
    description: 'Data research and visualization platform analyzing Sustainable Development Goal metrics using Python data science libraries.',
    longDesc: `SDG Analyzer ingests UN public datasets covering all 17 Sustainable Development Goals and produces interactive visualizations for researchers and policymakers.\n\nThe pandas pipeline cleans, normalises, and pivots multi-year country-level data. Matplotlib + Seaborn render publication-quality charts: trend lines, heatmaps, radar plots.\n\nA report module auto-generates PDF summaries with embedded figures — useful for academic submissions.`,
    tags: ['Python', 'Matplotlib', 'Pandas', 'Seaborn', 'Data Analysis'],
    icon: '',
    featured: false,
    lines: 'ANALYZE // VISUALIZE // REPORT',
    githubUrl: 'https://github.com/GauravJangid2004',
    liveUrl: '',
    challenges: ['Handling missing UN data with statistically sound imputation', 'Rendering 50+ country datasets without memory overflow', 'Designing accessible color schemes for color-blind readers'],
    screenshots: ['chart', 'dashboard', 'report'],
    demoColor: '#f59e0b',
  },
  {
    id: 6,
    title: 'Space Invader',
    subtitle: 'Classic Arcade Game',
    category: 'GAME DEV',
    color: '#ec4899',
    description: "Fully playable retro-style Space Invader arcade game with enemy waves, scoring system, lives, and smooth animations built with pygame.",
    longDesc: `Space Invader is a pixel-perfect recreation of the 1978 arcade classic, built in Python with pygame.\n\nFeatures: procedurally generated enemy formations that speed up as eliminated, shield barriers with destructible pixel blocks, a high-score leaderboard persisted to SQLite, and a chiptune-style sound engine.\n\nThe game loop runs at a locked 60 fps with delta-time physics. A built-in level editor lets players design custom invasion patterns.`,
    tags: ['Python', 'pygame', 'Game Dev', 'OOP', 'SQLite'],
    icon: '',
    featured: false,
    lines: 'PLAY // DESTROY // SURVIVE',
    githubUrl: 'https://github.com/GauravJangid2004',
    liveUrl: '',
    challenges: ['Delta-time physics for frame-rate independence', 'Pixel-accurate collision with irregularly shaped shields', 'Procedural difficulty scaling that stays fun'],
    screenshots: ['game', 'menu', 'leaderboard'],
    demoColor: '#ec4899',
  },
]

const ALL_CATEGORIES = ['ALL', ...new Set(PROJECTS.map(p => p.category))]

// ── Animated demo canvas ────────────────────────────────────────────────────
function DemoVideo({ project }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0, animId
    const hex = project.demoColor
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.fillStyle='#050505'; ctx.fillRect(0,0,canvas.width,canvas.height)
      ctx.strokeStyle=`rgba(${r},${g},${b},0.07)`; ctx.lineWidth=1
      for(let x=0;x<canvas.width;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}
      for(let y=0;y<canvas.height;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}
      const bars=32, bw=canvas.width/bars
      for(let i=0;i<bars;i++){
        const h=30+Math.sin(frame*0.05+i*0.4)*25+Math.sin(frame*0.03+i*0.2)*15
        const alpha=0.5+Math.sin(frame*0.04+i*0.3)*0.3
        ctx.fillStyle=`rgba(${r},${g},${b},${alpha})`
        ctx.fillRect(i*bw+2,canvas.height/2-h/2,bw-4,h)
      }
      const scanY=(frame*2)%canvas.height
      const grad=ctx.createLinearGradient(0,scanY-20,0,scanY+20)
      grad.addColorStop(0,'transparent'); grad.addColorStop(0.5,`rgba(${r},${g},${b},0.4)`); grad.addColorStop(1,'transparent')
      ctx.fillStyle=grad; ctx.fillRect(0,scanY-20,canvas.width,40)
      const pulse=20+Math.sin(frame*0.06)*8
      ctx.beginPath(); ctx.arc(canvas.width/2,canvas.height/2,pulse,0,Math.PI*2)
      ctx.strokeStyle=`rgba(${r},${g},${b},0.6)`; ctx.lineWidth=2; ctx.stroke()
      for(let p=0;p<12;p++){
        const px=canvas.width*((p*137+frame*0.3)%100)/100
        const py=canvas.height*((p*71+frame*0.2)%100)/100
        ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2)
        ctx.fillStyle=`rgba(${r},${g},${b},0.7)`; ctx.fill()
      }
      frame++; animId=requestAnimationFrame(draw)
    }
    animId=requestAnimationFrame(draw)
    return ()=>cancelAnimationFrame(animId)
  },[project])
  return <canvas ref={canvasRef} width={560} height={220} className="w-full rounded-xl" style={{ border:`1px solid ${project.demoColor}33`, background:'#050505' }} />
}

// ── Mock screens ────────────────────────────────────────────────────────────
function MockScreen({ type, color }) {
  if (type.startsWith('/')) {
    return <div className="rounded-xl overflow-hidden" style={{ border:`1px solid ${color}22` }}><img src={type} alt="Screenshot" className="w-full h-40 object-cover" /></div>
  }
  const panels = {
    terminal: (<div className="rounded-lg overflow-hidden" style={{ background:'#0a0a0a', border:`1px solid ${color}22`, fontFamily:'"Space Mono",monospace', fontSize:'10px' }}><div className="flex items-center gap-1.5 px-3 py-2" style={{ background:'#111', borderBottom:`1px solid ${color}22` }}><div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/></div><div className="p-3 space-y-1" style={{ color }}>{ ['$ python main.py --encrypt','> Initializing AES-256-GCM...','> Key derived. HMAC verified.','> [████████████] 100%','> Output: secure_data.enc ✓'].map((l,i)=><div key={i} style={{opacity:0.5+i*0.1}}>{l}</div>)}</div></div>),
    dashboard: (<div className="rounded-lg p-3" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="text-xs font-mono mb-2" style={{ color:`${color}88` }}>DASHBOARD // LIVE</div><div className="grid grid-cols-3 gap-2 mb-2">{['ACTIVE','BLOCKED','EVENTS'].map((l,i)=><div key={i} className="rounded p-1.5 text-center" style={{ background:`${color}0d`, border:`1px solid ${color}22` }}><div className="text-base font-bold" style={{color}}>{[42,18,307][i]}</div><div className="text-xs" style={{color:`${color}66`}}>{l}</div></div>)}</div><div className="flex gap-1 h-10 items-end">{[4,7,5,9,3,8,6,10,4,7,5,8].map((v,i)=><div key={i} className="flex-1 rounded-t" style={{height:`${v*10}%`,background:color,opacity:0.4+i*0.03}}/>)}</div></div>),
    chat: (<div className="rounded-lg p-3" style={{ background:'#0a0a0a', border:`1px solid ${color}22`, fontSize:'10px', fontFamily:'"Space Mono",monospace' }}><div className="mb-2 text-xs" style={{color:`${color}88`}}>GROUP_CHAT</div>{[['R','Hey, event update...'],['P','See you there!'],['Y','Confirmed ✓']].map(([n,m],i)=><div key={i} className={`flex gap-2 mb-1.5 ${i===2?'flex-row-reverse':''}`}><div className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0" style={{background:`${color}22`,color}}>{n}</div><div className="rounded px-2 py-1" style={{background:`${color}${i===2?'22':'11'}`,color:'rgba(224,224,224,0.7)',maxWidth:'70%'}}>{m}</div></div>)}</div>),
    chart: (<div className="rounded-lg p-3" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="text-xs font-mono mb-2" style={{color:`${color}88`}}>SDG PROGRESS</div>{[['Goal 1 — No Poverty',68],['Goal 3 — Good Health',74],['Goal 4 — Education',81],['Goal 13 — Climate',45]].map(([label,val],i)=><div key={i} className="mb-1.5"><div className="flex justify-between text-xs font-mono mb-0.5" style={{color:'rgba(224,224,224,0.5)'}}><span>{label}</span><span style={{color}}>{val}%</span></div><div className="h-1.5 rounded-full" style={{background:`${color}22`}}><div className="h-full rounded-full" style={{width:`${val}%`,background:color}}/></div></div>)}</div>),
    game: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="flex justify-between mb-2" style={{color:`${color}88`}}><span>SCORE: 4820</span><span>LIVES: ♥♥♥</span></div><div className="grid grid-cols-10 gap-0.5 mb-3">{Array(30).fill(0).map((_,i)=><div key={i} className="text-center" style={{color,opacity:Math.random()>0.3?0.8:0,fontSize:'8px'}}>👾</div>)}</div><div className="text-center" style={{color,fontSize:'14px'}}>▲</div></div>),
    elevator: (<div className="rounded-lg p-3" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="text-xs font-mono mb-2" style={{color:`${color}88`}}>ELEVATOR_SIM</div><div className="flex gap-2">{[1,2,3,4,5].reverse().map(f=><div key={f} className="h-6 w-8 flex items-center justify-center text-xs font-mono rounded" style={{background:f===3?`${color}33`:'transparent',border:`1px solid ${color}22`,color}}>{f===3?'▣':f}</div>)}</div></div>),
    keyvault: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="mb-2" style={{color:`${color}88`}}>KEY_VAULT</div>{['AES-256-GCM','RSA-2048','ChaCha20'].map((alg,i)=><div key={i} className="flex items-center justify-between mb-1 px-2 py-1 rounded" style={{background:`${color}0d`,border:`1px solid ${color}22`}}><span style={{color:'rgba(224,224,224,0.6)'}}>{alg}</span><span style={{color}}>● ACTIVE</span></div>)}</div>),
    notifications: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="mb-2" style={{color:`${color}88`}}>NOTIFICATIONS</div>{['New message in #alumni','Event: Reunion 2025','3 connection requests'].map((n,i)=><div key={i} className="flex items-center gap-2 mb-1.5"><div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:color}}/><span style={{color:'rgba(224,224,224,0.6)'}}>{n}</span></div>)}</div>),
    controls: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="mb-2" style={{color:`${color}88`}}>CONTROLS</div><div className="grid grid-cols-2 gap-1.5">{['Open Door','Close Door','Emergency','Diagnostics'].map((btn,i)=><button key={i} className="py-1.5 rounded text-xs" style={{background:`${color}11`,border:`1px solid ${color}33`,color}}>{btn}</button>)}</div></div>),
    log: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="mb-2" style={{color:`${color}88`}}>EVENT_LOG</div>{['Floor 3→5 (2.1s)','Door open F2 (3s)','Queue F1','Floor 5→2 (3.8s)'].map((l,i)=><div key={i} className="mb-1" style={{color:'rgba(224,224,224,0.5)'}}><span style={{color}}>▸</span> {l}</div>)}</div>),
    report: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="mb-2" style={{color:`${color}88`}}>AUTO_REPORT.PDF</div>{['Introduction','Data Analysis','SDG Metrics','Conclusions'].map((s,i)=><div key={i} className="flex justify-between border-b last:border-0 pb-1 mb-1" style={{color:'rgba(224,224,224,0.5)',borderColor:`${color}11`}}><span>{i+1}. {s}</span><span style={{color}}>p.{i+1}</span></div>)}</div>),
    menu: (<div className="rounded-lg p-3 font-mono text-xs text-center" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="text-base mb-2" style={{color,textShadow:`0 0 10px ${color}`}}>SPACE INVADER</div>{['▶ NEW GAME','⊞ HIGH SCORES','⚙ SETTINGS'].map((item,i)=><div key={i} className="py-1 my-0.5 rounded" style={{background:i===0?`${color}22`:'transparent',color:i===0?color:'rgba(224,224,224,0.4)',border:`1px solid ${i===0?color+'44':'transparent'}`}}>{item}</div>)}</div>),
    leaderboard: (<div className="rounded-lg p-3 font-mono text-xs" style={{ background:'#0a0a0a', border:`1px solid ${color}22` }}><div className="mb-2 text-center" style={{color:`${color}88`}}>HIGH SCORES</div>{[['GJX',9820],['ACE',7430],['YOU',4820]].map(([name,score],i)=><div key={i} className="flex justify-between py-0.5" style={{color:i===0?color:'rgba(224,224,224,0.5)'}}><span>{i+1}. {name}</span><span>{score}</span></div>)}</div>),
  }
  return panels[type] || panels['dashboard']
}

// ── Project Modal ───────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('overview')
  useEffect(() => {
    const esc = e => { if(e.key==='Escape') onClose() }
    document.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow='' }
  },[onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-8"
        style={{ background:'rgba(0,0,0,0.85)', backdropFilter:'blur(12px)' }}
        onClick={e => { if(e.target===e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity:0, scale:0.85, y:60 }} animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.85, y:60 }}
          transition={{ type:'spring', damping:28, stiffness:300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col"
          style={{ background:'#080808', border:`1px solid ${project.color}44`, boxShadow:`0 0 80px ${project.color}22` }}
        >
          <motion.div animate={{ backgroundPosition:['0% 50%','100% 50%','0% 50%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear' }}
            className="h-0.5 w-full shrink-0"
            style={{ background:`linear-gradient(90deg, ${project.color}, #00d4ff, #ff2d78, ${project.color})`, backgroundSize:'300%' }} />

          {/* Header */}
          <div className="flex items-start justify-between px-6 py-4 shrink-0" style={{ borderBottom:`1px solid ${project.color}22` }}>
            <div className="flex items-center gap-4">
              <span className="text-3xl">{project.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded tracking-widest" style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }}>{project.category}</span>
                  {project.featured && <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background:'rgba(255,215,0,0.1)', color:'#ffd700', border:'1px solid rgba(255,215,0,0.3)' }}>★ FEATURED</span>}
                </div>
                <h2 className="font-orbitron font-black text-xl" style={{ color:'white' }}>{project.title}</h2>
                <p className="font-mono text-xs mt-0.5" style={{ color:project.color }}>{project.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" data-hover className="px-3 py-1.5 font-mono text-xs rounded transition-all" style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }} onMouseEnter={e=>e.currentTarget.style.background=`${project.color}25`} onMouseLeave={e=>e.currentTarget.style.background=`${project.color}15`}>GitHub ↗</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" data-hover className="px-3 py-1.5 font-mono text-xs rounded" style={{ background:project.color, color:'#050505' }}>Live Demo ↗</a>}
              <motion.button data-hover whileHover={{ rotate:90, scale:1.1 }} transition={{ duration:0.2 }} onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center ml-1"
                style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}44` }}>✕</motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-3 shrink-0">
            {['overview','demo','screenshots','challenges'].map(t => (
              <button key={t} data-hover onClick={() => setTab(t)}
                className="relative px-4 py-1.5 text-xs font-orbitron font-bold tracking-widest rounded-t"
                style={{ color:tab===t?project.color:'rgba(224,224,224,0.3)', background:tab===t?`${project.color}12`:'transparent' }}
              >
                {t.toUpperCase()}
                {tab===t && <motion.div layoutId="modal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background:project.color }} />}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <AnimatePresence mode="wait">
              {tab==='overview' && (
                <motion.div key="overview" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <p className="font-mono text-sm leading-loose mb-5" style={{ color:'rgba(224,224,224,0.7)' }}>
                    {project.longDesc.split('\n\n').map((p,i)=><span key={i}>{p}<br/><br/></span>)}
                  </p>
                  <p className="section-tag mb-3">TECH_STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag=><motion.span key={tag} whileHover={{scale:1.08,y:-2}} className="text-xs font-mono px-3 py-1.5 rounded" style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }}>{tag}</motion.span>)}
                  </div>
                </motion.div>
              )}
              {tab==='demo' && (
                <motion.div key="demo" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <p className="section-tag mb-4">LIVE_VISUALIZATION // LOOPING</p>
                  <DemoVideo project={project} />
                  <p className="font-mono text-xs mt-3 text-center" style={{ color:'rgba(224,224,224,0.35)' }}>Animated demo loop representing live data patterns</p>
                </motion.div>
              )}
              {tab==='screenshots' && (
                <motion.div key="screenshots" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <p className="section-tag mb-4">INTERFACE_PREVIEWS</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.screenshots.map((type,i)=>(
                      <motion.div key={type} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} whileHover={{scale:1.03,y:-4}}>
                        <div className="text-xs font-mono mb-1.5 tracking-widest" style={{ color:`${project.color}77` }}>SCREEN_{i+1}</div>
                        <MockScreen type={type} color={project.color} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              {tab==='challenges' && (
                <motion.div key="challenges" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} transition={{duration:0.25}}>
                  <p className="section-tag mb-5">ENGINEERING_CHALLENGES</p>
                  <div className="space-y-4">
                    {project.challenges.map((c,i)=>(
                      <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.12}} className="flex items-start gap-4 p-4 rounded-xl" style={{ background:`${project.color}08`, border:`1px solid ${project.color}22` }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-orbitron font-black text-xs" style={{ background:`${project.color}22`, color:project.color, border:`1px solid ${project.color}55` }}>{String(i+1).padStart(2,'0')}</div>
                        <p className="font-mono text-sm leading-relaxed" style={{ color:'rgba(224,224,224,0.7)' }}>{c}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="shrink-0 px-6 py-3 flex items-center justify-between" style={{ borderTop:`1px solid ${project.color}18`, background:`${project.color}05` }}>
            <span className="font-mono text-xs" style={{ color:`${project.color}55` }}>ESC or click outside to close</span>
            <div className="flex gap-1.5">
              {['overview','demo','screenshots','challenges'].map(t=><div key={t} className="w-1.5 h-1.5 rounded-full" style={{ background:tab===t?project.color:`${project.color}33` }}/>)}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Card ────────────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once:false, margin:'-60px' })
  const [tilt, setTilt] = useState({ x:0, y:0 })
  const [glowing, setGlowing] = useState(false)
  const handleMouseMove = e => {
    const rect=e.currentTarget.getBoundingClientRect()
    const dx=(e.clientX-(rect.left+rect.width/2))/(rect.width/2)
    const dy=(e.clientY-(rect.top+rect.height/2))/(rect.height/2)
    setTilt({x:dy*-10,y:dx*10})
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:50, scale:0.95 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : { opacity:0, y:50, scale:0.95 }}
      transition={{ duration:0.55, delay:index*0.07, ease:'easeOut' }}
      className={project.featured ? 'col-span-1 md:col-span-2' : 'col-span-1'}
    >
      <div
        data-hover onClick={() => onOpen(project)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setGlowing(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setGlowing(false) }}
        className="glass rounded-2xl overflow-hidden h-full relative group"
        style={{ border:`1px solid ${project.color}22`, transform:`perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition:tilt.x===0?'transform 0.5s ease, box-shadow 0.3s':'transform 0.08s ease', boxShadow:glowing?`0 20px 60px ${project.color}25`:'0 4px 20px rgba(0,0,0,0.5)' }}
      >
        <div className="h-0.5 w-full" style={{ background:`linear-gradient(to right, ${project.color}, transparent)` }} />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-mono tracking-widest px-2 py-0.5 rounded mb-3 inline-block" style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }}>{project.category}</span>
              <h3 className="font-orbitron font-black text-xl mt-1" style={{ color:'white' }}>{project.title}</h3>
              <p className="font-mono text-xs mt-1" style={{ color:project.color }}>{project.subtitle}</p>
            </div>
            <span className="text-4xl">{project.icon}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background:`${project.color}33` }}/>
            <span className="text-xs font-mono" style={{ color:`${project.color}77` }}>{project.lines}</span>
            <div className="h-px flex-1" style={{ background:`${project.color}33` }}/>
          </div>
          <p className="text-sm font-mono leading-relaxed mb-4" style={{ color:'rgba(224,224,224,0.6)' }}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0,4).map(tag=><span key={tag} className="text-xs font-mono px-2 py-1 rounded" style={{ background:`${project.color}0d`, color:project.color, border:`1px solid ${project.color}22` }}>{tag}</span>)}
            {project.tags.length>4 && <span className="text-xs font-mono px-2 py-1 rounded" style={{ color:'rgba(224,224,224,0.4)', border:'1px solid rgba(224,224,224,0.1)' }}>+{project.tags.length-4}</span>}
          </div>

          {/* GitHub + Live links on card */}
          <div className="flex items-center gap-3 mb-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" data-hover
                onClick={e => e.stopPropagation()}
                className="text-xs font-mono px-3 py-1 rounded transition-all"
                style={{ background:`${project.color}10`, color:project.color, border:`1px solid ${project.color}33` }}
                onMouseEnter={e=>e.currentTarget.style.background=`${project.color}22`}
                onMouseLeave={e=>e.currentTarget.style.background=`${project.color}10`}
              >⌥ GitHub</a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" data-hover
                onClick={e => e.stopPropagation()}
                className="text-xs font-mono px-3 py-1 rounded transition-all"
                style={{ background:`${project.color}10`, color:project.color, border:`1px solid ${project.color}33` }}
                onMouseEnter={e=>e.currentTarget.style.background=`${project.color}22`}
                onMouseLeave={e=>e.currentTarget.style.background=`${project.color}10`}
              >◉ Live</a>
            )}
            {!project.liveUrl && <span className="text-xs font-mono" style={{ color:'rgba(224,224,224,0.25)' }}>No live demo</span>}
          </div>

          <motion.div className="flex items-center gap-2 text-xs font-orbitron font-bold tracking-widest"
            style={{ color:project.color, opacity:glowing?1:0.35, transition:'opacity 0.3s' }}>
            <motion.span animate={glowing?{x:[0,4,0]}:{}} transition={{duration:0.6,repeat:Infinity}}>→</motion.span>
            CLICK_TO_EXPAND
          </motion.div>
        </div>
        {project.featured && <div className="absolute top-4 right-4 text-xs font-mono px-2 py-0.5 rounded-full" style={{ background:`${project.color}22`, color:project.color, border:`1px solid ${project.color}44` }}>FEATURED</div>}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background:`radial-gradient(circle, ${project.color}20, transparent 70%)`, opacity:glowing?1:0, transition:'opacity 0.5s' }}/>
      </div>
    </motion.div>
  )
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once:false, margin:'-80px' })
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('ALL')

  const filtered = filter==='ALL' ? PROJECTS : PROJECTS.filter(p=>p.category===filter)

  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={headerRef}
          initial={{ opacity:0, y:30 }}
          animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
          transition={{ duration:0.7 }}
          className="mb-12"
        >
          <p className="section-tag mb-2">// LOG_003</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color:'white' }}>
            PROJ<span style={{color:'var(--pink)'}}>ECTS</span><span style={{color:'var(--pink)'}}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background:'linear-gradient(to right, var(--pink), transparent)' }}/>
            <span className="font-mono text-xs" style={{ color:'rgba(224,224,224,0.4)' }}>6 BUILDS // CLICK TO EXPAND</span>
          </div>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={inView?{opacity:1,y:0}:{opacity:0,y:20}}
          transition={{ delay:0.2, duration:0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {ALL_CATEGORIES.map(cat => (
            <button key={cat} data-hover onClick={() => setFilter(cat)}
              className="px-4 py-1.5 text-xs font-orbitron font-bold tracking-widest rounded-full transition-all duration-300"
              style={{
                background: filter===cat ? 'var(--pink)' : 'rgba(255,45,120,0.08)',
                color: filter===cat ? '#050505' : 'rgba(255,45,120,0.7)',
                border: `1px solid ${filter===cat ? 'var(--pink)' : 'rgba(255,45,120,0.25)'}`,
              }}
            >{cat}</button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p,i) => <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />)}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
