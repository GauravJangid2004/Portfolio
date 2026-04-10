import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Project data  (screenshots = SVG mocks; video = animated canvas loop)
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'SecureCrypt',
    subtitle: 'Cryptography Security App',
    category: 'CYBERSECURITY',
    color: '#00ff41',
    description: 'Organization-based security application implementing multiple cryptographic algorithms for secure data encryption, decryption, and key management within enterprise environments.',
    longDesc: `SecureCrypt is an enterprise-grade cryptographic toolkit designed for organisations that need robust, algorithm-agnostic data protection.\n\nThe app exposes a clean CLI and GUI allowing teams to choose from AES-256-GCM, RSA-2048, ChaCha20-Poly1305, and custom hybrid schemes. Every encryption operation produces tamper-evident outputs with embedded HMAC signatures, ensuring both confidentiality and data integrity.\n\nKey highlights include role-based key vaults, automated key-rotation schedules, audit logging for compliance, and a drag-and-drop file encryption interface built with tkinter.`,
    tags: ['Python', 'Cryptographic Algorithms', 'AES', 'RSA', 'HMAC', 'Security'],
    icon: '',
    featured: true,
    lines: 'ENCRYPT // PROTECT // SECURE',
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
    description: 'Full-stack Linux-based firewall system with real-time packet inspection, rule management, and a React dashboard for live network monitoring and threat visualization.',
    longDesc: `CyberWall is a complete client-server firewall solution running on Linux, combining a Python/FastAPI backend for packet analysis with a React front-end for live threat visualization.\n\nThe system uses raw sockets and iptables hooks to intercept traffic, classify it by protocol/port/IP reputation, and enforce rule sets in under 2 ms per packet. Suspicious packets are logged to PostgreSQL for post-hoc forensics.\n\nThe dashboard renders real-time charts of bandwidth per protocol, blocked-IP heat maps, and a rule builder with drag-and-drop priority ordering — all updating via WebSocket push.`,
    tags: ['Python', 'NodeJS', 'React', 'FastAPI', 'PostgreSQL', 'Linux', 'iptables', 'WebSockets'],
    icon: '',
    featured: true,
    lines: 'MONITOR // FILTER // PROTECT',
    challenges: ['Zero-copy packet capture without impacting network throughput', 'Sub-millisecond rule evaluation for high-traffic environments', 'Keeping the React dashboard smooth at 60 fps with 1000+ live events/sec'],
    screenshots: ['dashboard', 'terminal', 'chart'],
    demoColor: '#ff2d78',
  },
  {
    id: 3,
    title: 'AlumniConnect',
    subtitle: 'Group Notification & Chatbox Platform',
    category: 'FULLSTACK',
    color: '#00d4ff',
    description: 'Working alumni group communication system featuring real-time notifications, group chat, and alumni network management backed by a FastAPI and MySQL architecture.',
    longDesc: `AlumniConnect is a lightweight yet fully functional alumni networking platform. It allows university departments to spin up group channels, push broadcast notifications, and enable direct messaging between alumni.\n\nThe FastAPI backend handles auth with JWT, stores messages in MySQL, and broadcasts updates over Server-Sent Events. The Python sql_connector layer abstracts all DB operations with a connection-pool for efficiency.\n\nFeatures include threaded group chats, @mention notifications, read-receipts, file sharing, and an admin panel for managing members and broadcasting announcements.`,
    tags: ['Python', 'FastAPI', 'SQL Connector', 'MySQL', 'JWT', 'SSE'],
    icon: '',
    featured: false,
    lines: 'NOTIFY // CONNECT // ENGAGE',
    challenges: ['Maintaining message ordering across concurrent connections', 'Efficient fan-out for large broadcast groups without duplicates', 'Pagination with cursor-based infinite scroll for chat history'],
    screenshots: ['chat', 'dashboard', 'notifications'],
    demoColor: '#00d4ff',
  },
  {
    id: 4,
    title: 'ElevatorSim',
    subtitle: 'Moving Elevator Simulator',
    category: 'GUI APP',
    color: '#a855f7',
    description: "Fully functional elevator simulator with working buttons, floor logic, queue management, and smooth animation built using Python's tkinter GUI framework.",
    longDesc: `ElevatorSim models the real-world scheduling problem of multi-floor elevator dispatch using the SCAN (elevator) algorithm.\n\nThe tkinter GUI renders a live cross-section of the building: the cabin travels floor-to-floor with smooth interpolation, doors animate open/close, and internal/external call buttons light up as passengers request floors.\n\nThe dispatch engine queues requests, deduplicates stops on the same path, and logs travel times — making it a useful educational tool for demonstrating OS scheduling concepts in a visual way.`,
    tags: ['Python', 'tkinter', 'GUI', 'OOP', 'SCAN Algorithm', 'Animation'],
    icon: '',
    featured: false,
    lines: 'SIMULATE // ANIMATE // CONTROL',
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
    description: 'Data research and visualization platform analyzing Sustainable Development Goal metrics using Python data science libraries for actionable insights and reporting.',
    longDesc: `SDG Analyzer ingests UN public datasets covering all 17 Sustainable Development Goals and produces interactive visualizations for researchers and policymakers.\n\nThe pandas pipeline cleans, normalises, and pivots multi-year country-level data. Matplotlib + Seaborn render publication-quality charts: trend lines, choropleth-style heatmaps, radar plots for multi-goal comparisons, and animated progress bars per SDG.\n\nA report module auto-generates PDF summaries with embedded figures — useful for academic submissions and presentations.`,
    tags: ['Python', 'Matplotlib', 'Pandas', 'Seaborn', 'Data Cleaning', 'Visualization'],
    icon: '',
    featured: false,
    lines: 'ANALYZE // VISUALIZE // REPORT',
    challenges: ['Handling missing UN data with statistically sound imputation', 'Rendering 50+ country datasets without memory overflow', 'Designing color schemes accessible to color-blind readers'],
    screenshots: ['chart', 'dashboard', 'report'],
    demoColor: '#f59e0b',
  },
  {
    id: 6,
    title: 'Space Invader',
    subtitle: 'Classic Arcade Game',
    category: 'GAME DEV',
    color: '#ec4899',
    description: "Fully playable retro-style Space Invader arcade game with enemy waves, scoring system, lives, and smooth animations built with Python's pygame engine.",
    longDesc: `Space Invader is a pixel-perfect recreation of the 1978 arcade classic, built entirely in Python with pygame.\n\nFeatures include procedurally generated enemy formations that speed up as they are eliminated, shield barriers with destructible pixel blocks, a high-score leaderboard persisted to a local SQLite DB, and a chiptune-style sound engine using pygame.mixer.\n\nThe game loop runs at a locked 60 fps with delta-time physics, ensuring consistent speed across hardware. A built-in level editor lets players design custom invasion patterns.`,
    tags: ['Python', 'pygame', 'Game Dev', 'OOP', 'SQLite', 'Chiptune Audio'],
    icon: '',
    featured: false,
    lines: 'PLAY // DESTROY // SURVIVE',
    challenges: ['Delta-time physics for frame-rate independence', 'Pixel-accurate collision with irregularly shaped shields', 'Procedural difficulty scaling that stays fun, not frustrating'],
    screenshots: ['game', 'menu', 'leaderboard'],
    demoColor: '#ec4899',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Animated "Demo" video loop — SVG canvas per project type
// ─────────────────────────────────────────────────────────────────────────────
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = `rgba(${r},${g},${b},0.07)`
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 30) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke() }
      for (let y = 0; y < canvas.height; y += 30) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke() }

      // Animated waveform / bar chart
      const bars = 32
      const bw = canvas.width / bars
      for (let i = 0; i < bars; i++) {
        const h = 30 + Math.sin(frame * 0.05 + i * 0.4) * 25 + Math.sin(frame * 0.03 + i * 0.2) * 15
        const alpha = 0.5 + Math.sin(frame * 0.04 + i * 0.3) * 0.3
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fillRect(i * bw + 2, canvas.height/2 - h/2, bw - 4, h)
      }

      // Scanning line
      const scanY = (frame * 2) % canvas.height
      const grad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.4)`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 20, canvas.width, 40)

      // Pulsing center circle
      const pulse = 20 + Math.sin(frame * 0.06) * 8
      ctx.beginPath()
      ctx.arc(canvas.width/2, canvas.height/2, pulse, 0, Math.PI*2)
      ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`
      ctx.lineWidth = 2
      ctx.stroke()

      // Floating particles
      for (let p = 0; p < 12; p++) {
        const px = (canvas.width * ((p * 137 + frame * 0.3) % 100) / 100)
        const py = (canvas.height * ((p * 71 + frame * 0.2) % 100) / 100)
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`
        ctx.fill()
      }

      // Project title overlay
      ctx.fillStyle = `rgba(${r},${g},${b},0.15)`
      ctx.font = 'bold 11px "Space Mono", monospace'
      ctx.letterSpacing = '0.3em'
      ctx.fillText('LIVE_DEMO // ' + project.title.toUpperCase(), 12, canvas.height - 14)

      frame++
      animId = requestAnimationFrame(draw)
    }
    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [project])

  return (
    <canvas
      ref={canvasRef}
      width={560}
      height={220}
      className="w-full rounded-xl"
      style={{ border: `1px solid ${project.demoColor}33`, background: '#050505' }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock screenshots — styled SVG panels
// ─────────────────────────────────────────────────────────────────────────────
function MockScreen({ type, color, title }) {
  const hex = color
  const panels = {
    terminal: (
      <div className="rounded-lg overflow-hidden" style={{ background: '#0a0a0a', border: `1px solid ${hex}22`, fontFamily: '"Space Mono", monospace', fontSize: '10px' }}>
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: '#111', borderBottom: `1px solid ${hex}22` }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-xs" style={{ color: `${hex}66` }}>terminal — bash</span>
        </div>
        <div className="p-3 space-y-1" style={{ color: hex }}>
          {['$ python main.py --encrypt', '> Initializing AES-256-GCM...', '> Key derived. HMAC verified.', '> [████████████] 100%', '> Output: secure_data.enc ✓'].map((l,i)=>(
            <div key={i} style={{ opacity: 0.5 + i*0.1 }}>{l}</div>
          ))}
        </div>
      </div>
    ),
    dashboard: (
      <div className="rounded-lg overflow-hidden p-3" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="text-xs font-mono mb-2" style={{ color: `${hex}88` }}>DASHBOARD // LIVE</div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {['ACTIVE', 'BLOCKED', 'EVENTS'].map((l,i)=>(
            <div key={i} className="rounded p-1.5 text-center" style={{ background: `${hex}0d`, border: `1px solid ${hex}22` }}>
              <div className="text-base font-bold" style={{ color: hex }}>{[42,18,307][i]}</div>
              <div className="text-xs" style={{ color: `${hex}66` }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-1 h-12 items-end">
          {[4,7,5,9,3,8,6,10,4,7,5,8].map((v,i)=>(
            <div key={i} className="flex-1 rounded-t" style={{ height: `${v*10}%`, background: `${hex}`, opacity: 0.4 + i*0.03 }} />
          ))}
        </div>
      </div>
    ),
    chat: (
      <div className="rounded-lg overflow-hidden p-3" style={{ background: '#0a0a0a', border: `1px solid ${hex}22`, fontSize:'10px', fontFamily:'"Space Mono",monospace' }}>
        <div className="mb-2 text-xs" style={{ color: `${hex}88` }}>GROUP_CHAT // ALUMNI</div>
        {[['Rahul','Message about event...'],['Priya','See you at the meetup!'],['You','Confirmed ✓']].map(([name,msg],i)=>(
          <div key={i} className={`flex gap-2 mb-1.5 ${i===2?'flex-row-reverse':''}`}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0" style={{ background:`${hex}22`, color:hex }}>{name[0]}</div>
            <div className="rounded px-2 py-1" style={{ background:`${hex}${i===2?'22':'11'}`, color:'rgba(224,224,224,0.7)', maxWidth:'70%' }}>{msg}</div>
          </div>
        ))}
      </div>
    ),
    chart: (
      <div className="rounded-lg overflow-hidden p-3" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="text-xs font-mono mb-2" style={{ color: `${hex}88` }}>SDG PROGRESS // 2024</div>
        {[['Goal 1 — No Poverty', 68],['Goal 3 — Good Health', 74],['Goal 4 — Education', 81],['Goal 13 — Climate', 45]].map(([label,val],i)=>(
          <div key={i} className="mb-1.5">
            <div className="flex justify-between text-xs font-mono mb-0.5" style={{ color:'rgba(224,224,224,0.5)' }}>
              <span>{label}</span><span style={{ color:hex }}>{val}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background:`${hex}22` }}>
              <div className="h-full rounded-full" style={{ width:`${val}%`, background: hex, boxShadow:`0 0 6px ${hex}` }} />
            </div>
          </div>
        ))}
      </div>
    ),
    game: (
      <div className="rounded-lg overflow-hidden p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="flex justify-between mb-2" style={{ color: `${hex}88` }}><span>SCORE: 4820</span><span>LIVES: ♥♥♥</span></div>
        <div className="grid grid-cols-10 gap-0.5 mb-3">
          {Array(30).fill(0).map((_,i)=>(
            <div key={i} className="text-center" style={{ color: hex, opacity: Math.random()>0.3?0.8:0, fontSize:'8px' }}>👾</div>
          ))}
        </div>
        <div className="text-center" style={{ color: hex, fontSize:'14px' }}>▲</div>
      </div>
    ),
    elevator: (
      <div className="rounded-lg overflow-hidden p-3" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="text-xs font-mono mb-2" style={{ color: `${hex}88` }}>ELEVATOR_SIM</div>
        <div className="flex gap-2">
          <div className="flex flex-col-reverse gap-0.5">
            {[1,2,3,4,5].map(f=>(
              <div key={f} className="h-6 w-8 flex items-center justify-center text-xs font-mono rounded" style={{ background:f===3?`${hex}33`:'transparent', border:`1px solid ${hex}22`, color: hex }}>
                {f===3?'▣':f}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 justify-center">
            {[5,4,3,2,1].map(f=>(
              <button key={f} className="px-2 py-0.5 text-xs rounded font-mono" style={{ background:`${hex}11`, border:`1px solid ${hex}33`, color:hex }}>{f} ▶</button>
            ))}
          </div>
        </div>
      </div>
    ),
    keyvault: (
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="mb-2" style={{ color:`${hex}88` }}>KEY_VAULT // ACTIVE</div>
        {['AES-256-GCM','RSA-2048','ChaCha20'].map((alg,i)=>(
          <div key={i} className="flex items-center justify-between mb-1 px-2 py-1 rounded" style={{ background:`${hex}0d`, border:`1px solid ${hex}22` }}>
            <span style={{ color:'rgba(224,224,224,0.6)' }}>{alg}</span>
            <span style={{ color: hex }}>● ACTIVE</span>
          </div>
        ))}
      </div>
    ),
    notifications: (
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="mb-2" style={{ color:`${hex}88` }}>NOTIFICATIONS</div>
        {['New message in #alumni','Event: Reunion 2025','3 connection requests'].map((n,i)=>(
          <div key={i} className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: hex }} />
            <span style={{ color:'rgba(224,224,224,0.6)' }}>{n}</span>
          </div>
        ))}
      </div>
    ),
    controls: (
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="mb-2" style={{ color:`${hex}88` }}>CONTROL_PANEL</div>
        <div className="grid grid-cols-2 gap-1.5">
          {['Open Door','Close Door','Emergency','Diagnostics'].map((btn,i)=>(
            <button key={i} className="py-1.5 rounded text-xs" style={{ background:`${hex}11`, border:`1px solid ${hex}33`, color:hex }}>{btn}</button>
          ))}
        </div>
      </div>
    ),
    log: (
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="mb-2" style={{ color:`${hex}88` }}>EVENT_LOG</div>
        {['Floor 3 → 5 (2.1s)','Door open F2 (3s)','Request queued F1','Floor 5 → 2 (3.8s)'].map((l,i)=>(
          <div key={i} className="mb-1" style={{ color:'rgba(224,224,224,0.5)' }}><span style={{ color:hex }}>▸</span> {l}</div>
        ))}
      </div>
    ),
    report: (
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="mb-2" style={{ color:`${hex}88` }}>AUTO_REPORT.PDF</div>
        <div className="space-y-1.5">
          {['Introduction','Data Analysis','SDG Metrics','Conclusions','Appendix'].map((s,i)=>(
            <div key={i} className="flex justify-between" style={{ color:'rgba(224,224,224,0.5)', borderBottom:'1px solid rgba(255,255,255,0.04)', paddingBottom:'2px' }}>
              <span>{i+1}. {s}</span><span style={{ color:hex }}>p.{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    menu: (
      <div className="rounded-lg p-3 font-mono text-xs text-center" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="text-base mb-2" style={{ color: hex, textShadow:`0 0 10px ${hex}` }}>SPACE INVADER</div>
        {['▶ NEW GAME','⊞ HIGH SCORES','⚙ SETTINGS'].map((item,i)=>(
          <div key={i} className="py-1 my-0.5 rounded" style={{ background: i===0?`${hex}22`:'transparent', color: i===0?hex:'rgba(224,224,224,0.4)', border:`1px solid ${i===0?hex+'44':'transparent'}` }}>{item}</div>
        ))}
      </div>
    ),
    leaderboard: (
      <div className="rounded-lg p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: `1px solid ${hex}22` }}>
        <div className="mb-2 text-center" style={{ color:`${hex}88` }}>HIGH SCORES</div>
        {[['GJX',9820],['ACE',7430],['YOU',4820]].map(([name,score],i)=>(
          <div key={i} className="flex justify-between py-0.5" style={{ color: i===0?hex:'rgba(224,224,224,0.5)' }}>
            <span>{i+1}. {name}</span><span>{score}</span>
          </div>
        ))}
      </div>
    ),
  }
  return panels[type] || panels['dashboard']
}

// ─────────────────────────────────────────────────────────────────────────────
// Full-screen project modal
// ─────────────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [tab, setTab] = useState('overview')
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 60 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col"
          style={{ background: '#080808', border: `1px solid ${project.color}44`, boxShadow: `0 0 80px ${project.color}22` }}
        >
          {/* Animated top border */}
          <motion.div
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="h-0.5 w-full shrink-0"
            style={{ background: `linear-gradient(90deg, ${project.color}, #00d4ff, #ff2d78, ${project.color})`, backgroundSize: '300%' }}
          />

          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 shrink-0" style={{ borderBottom: `1px solid ${project.color}22` }}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{project.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded tracking-widest" style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }}>{project.category}</span>
                  {project.featured && <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background:'rgba(255,215,0,0.1)', color:'#ffd700', border:'1px solid rgba(255,215,0,0.3)' }}>★ FEATURED</span>}
                </div>
                <h2 className="font-orbitron font-black text-2xl" style={{ color: 'white' }}>{project.title}</h2>
                <p className="font-mono text-xs mt-0.5" style={{ color: project.color }}>{project.subtitle}</p>
              </div>
            </div>
            <motion.button
              data-hover
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}44` }}
            >✕</motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4 shrink-0">
            {['overview', 'demo', 'screenshots', 'challenges'].map(t => (
              <button
                key={t}
                data-hover
                onClick={() => setTab(t)}
                className="relative px-4 py-1.5 text-xs font-orbitron font-bold tracking-widest rounded-t transition-all duration-200"
                style={{ color: tab===t ? project.color : 'rgba(224,224,224,0.35)', background: tab===t ? `${project.color}12` : 'transparent' }}
              >
                {t.toUpperCase()}
                {tab===t && <motion.div layoutId="modal-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: project.color }} />}
              </button>
            ))}
          </div>

          {/* Tab content — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5" style={{ scrollbarWidth: 'thin', scrollbarColor: `${project.color} transparent` }}>
            <AnimatePresence mode="wait">

              {/* OVERVIEW */}
              {tab === 'overview' && (
                <motion.div key="overview" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration: 0.25 }}>
                  <p className="font-mono text-sm leading-loose mb-6" style={{ color:'rgba(224,224,224,0.7)' }}>
                    {project.longDesc.split('\n\n').map((para,i) => <span key={i}>{para}<br/><br/></span>)}
                  </p>
                  <div>
                    <p className="section-tag mb-3">TECH_STACK</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className="text-xs font-mono px-3 py-1.5 rounded"
                          style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }}
                        >{tag}</motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DEMO */}
              {tab === 'demo' && (
                <motion.div key="demo" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration: 0.25 }}>
                  <p className="section-tag mb-4">LIVE_VISUALIZATION // LOOPING</p>
                  <DemoVideo project={project} />
                  <p className="font-mono text-xs mt-3 text-center" style={{ color:'rgba(224,224,224,0.35)' }}>
                    Animated demo loop — represents live data patterns of {project.title}
                  </p>
                </motion.div>
              )}

              {/* SCREENSHOTS */}
              {tab === 'screenshots' && (
                <motion.div key="screenshots" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration: 0.25 }}>
                  <p className="section-tag mb-4">INTERFACE_PREVIEWS</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.screenshots.map((type, i) => (
                      <motion.div
                        key={type}
                        initial={{ opacity:0, y:20 }}
                        animate={{ opacity:1, y:0 }}
                        transition={{ delay: i*0.1 }}
                        whileHover={{ scale: 1.03, y: -4 }}
                      >
                        <div className="text-xs font-mono mb-1.5 tracking-widest" style={{ color:`${project.color}77` }}>
                          SCREEN_{i+1} // {type.toUpperCase()}
                        </div>
                        <MockScreen type={type} color={project.color} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CHALLENGES */}
              {tab === 'challenges' && (
                <motion.div key="challenges" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration: 0.25 }}>
                  <p className="section-tag mb-5">ENGINEERING_CHALLENGES</p>
                  <div className="space-y-4">
                    {project.challenges.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity:0, x:-20 }}
                        animate={{ opacity:1, x:0 }}
                        transition={{ delay: i*0.12, duration: 0.4 }}
                        className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ background:`${project.color}08`, border:`1px solid ${project.color}22` }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-orbitron font-black text-sm" style={{ background:`${project.color}22`, color:project.color, border:`1px solid ${project.color}55` }}>
                          {String(i+1).padStart(2,'0')}
                        </div>
                        <p className="font-mono text-sm leading-relaxed" style={{ color:'rgba(224,224,224,0.7)' }}>{c}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="shrink-0 px-6 py-4 flex items-center justify-between" style={{ borderTop:`1px solid ${project.color}18`, background:`${project.color}05` }}>
            <span className="font-mono text-xs" style={{ color:`${project.color}66` }}>ESC or click outside to close</span>
            <div className="flex gap-2">
              {['overview','demo','screenshots','challenges'].map(t => (
                <div key={t} className="w-1.5 h-1.5 rounded-full" style={{ background: tab===t ? project.color : `${project.color}33` }} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Project card (grid)
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowing, setGlowing] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width/2))  / (rect.width/2)
    const dy = (e.clientY - (rect.top  + rect.height/2)) / (rect.height/2)
    setTilt({ x: dy * -10, y: dx * 10 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: 'easeOut' }}
      className={project.featured ? 'col-span-1 md:col-span-2' : 'col-span-1'}
    >
      <div
        data-hover
        onClick={() => onOpen(project)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setGlowing(true)}
        onMouseLeave={() => { setTilt({ x:0, y:0 }); setGlowing(false) }}
        className="glass rounded-2xl overflow-hidden h-full relative group"
        style={{
          border: `1px solid ${project.color}22`,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? 'transform 0.5s ease, box-shadow 0.3s' : 'transform 0.08s ease',
          boxShadow: glowing ? `0 20px 60px ${project.color}25` : '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top accent */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }} />

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-xs font-mono tracking-widest px-2 py-0.5 rounded mb-3 inline-block"
                style={{ background:`${project.color}15`, color:project.color, border:`1px solid ${project.color}33` }}>
                {project.category}
              </span>
              <h3 className="font-orbitron font-black text-xl md:text-2xl mt-1" style={{ color:'white' }}>{project.title}</h3>
              <p className="font-mono text-xs mt-1" style={{ color: project.color }}>{project.subtitle}</p>
            </div>
            <span className="text-4xl">{project.icon}</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background:`${project.color}33` }} />
            <span className="text-xs font-mono" style={{ color:`${project.color}77` }}>{project.lines}</span>
            <div className="h-px flex-1" style={{ background:`${project.color}33` }} />
          </div>

          <p className="text-sm font-mono leading-relaxed mb-5" style={{ color:'rgba(224,224,224,0.6)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0,4).map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-1 rounded"
                style={{ background:`${project.color}0d`, color:project.color, border:`1px solid ${project.color}22` }}>
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-xs font-mono px-2 py-1 rounded" style={{ color:'rgba(224,224,224,0.4)', border:'1px solid rgba(224,224,224,0.1)' }}>
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* "Read more" CTA — animated on hover */}
          <motion.div
            className="flex items-center gap-2 text-xs font-orbitron font-bold tracking-widest"
            style={{ color: project.color, opacity: glowing ? 1 : 0.4, transition: 'opacity 0.3s' }}
          >
            <motion.span animate={glowing ? { x:[0,4,0] } : {}} transition={{ duration:0.6, repeat: Infinity }}>→</motion.span>
            CLICK_TO_EXPAND
          </motion.div>
        </div>

        {project.featured && (
          <div className="absolute top-4 right-4 text-xs font-mono px-2 py-0.5 rounded-full"
            style={{ background:`${project.color}22`, color:project.color, border:`1px solid ${project.color}44` }}>
            FEATURED
          </div>
        )}

        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500"
          style={{ background:`radial-gradient(circle, ${project.color}20, transparent 70%)`, opacity: glowing ? 1 : 0 }} />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: false, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-tag mb-2">// LOG_003</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: 'white' }}>
            PROJ<span style={{ color: 'var(--pink)' }}>ECTS</span><span style={{ color:'var(--pink)' }}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background:'linear-gradient(to right, var(--pink), transparent)' }} />
            <span className="font-mono text-xs" style={{ color:'rgba(224,224,224,0.4)' }}>6 BUILDS // CLICK TO EXPAND</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
