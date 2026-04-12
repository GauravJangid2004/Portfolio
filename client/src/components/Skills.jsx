import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category: 'FRONTEND',
    color: 'var(--cyan)',
    icon: '◈',
    skills: [
      { name: 'HTML / CSS',    level: 88, note: 'Semantic HTML5, Flexbox, Grid, Animations' },
      { name: 'JavaScript',   level: 90, note: 'DOM, Async/Await, Fetch API' },
      { name: 'React.js',     level: 85, note: 'Hooks, Router, Framer Motion, Vite' },
      { name: 'Tailwind CSS', level: 80, note: 'Utility-first, responsive design' },
    ],
  },
  {
    category: 'BACKEND & DB',
    color: 'var(--acid)',
    icon: '◉',
    skills: [
      { name: 'Python',  level: 90, note: 'FastAPI, scripting, data analysis, crypto' },
      { name: 'MySQL',   level: 80, note: 'Queries, joins, indexing, stored procedures' },
      { name: 'FastAPI', level: 75, note: 'REST APIs, JWT auth, async routes' },
      { name: 'Node.js', level: 85, note: 'Express, REST API, middleware' },
    ],
  },
  {
    category: 'TOOLS & SECURITY',
    color: 'var(--pink)',
    icon: '◆',
    skills: [
      { name: 'Linux / Bash',  level: 72, note: 'Shell scripting, system admin, networking' },
      { name: 'C / C++',       level: 85, note: 'DSA, memory management, OOP' },
      { name: 'Git',           level: 80, note: 'Branching, PRs, GitHub workflows' },
      { name: 'Cybersecurity', level: 65, note: 'Kali Linux, WPA cracking, web app testing' },
    ],
  },
]

function RadialProgress({ level, color, size = 36 }) {
  const r = (size - 6) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (level / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${color}22`} strokeWidth="3" />
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="3"
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  )
}

function SkillBar({ skill, color, index }) {
  const [tooltip, setTooltip] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: '-30px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="mb-4 relative"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      data-hover
    >
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-mono text-sm font-bold" style={{ color: 'rgba(224,224,224,0.85)' }}>{skill.name}</span>
          <AnimatePresence>
            {tooltip && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-xs px-2 py-0.5 rounded hidden sm:inline-block"
                style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}
              >
                {skill.note}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span className="font-orbitron font-bold text-xs ml-2 shrink-0" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: `${color}18` }}>
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: false }}
          transition={{ duration: 1.1, delay: index * 0.08, ease: 'easeOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(to right, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}66` }}
        >
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.5 }}
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function SkillGroupCard({ group, groupIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: groupIndex * 0.12 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
      style={{ border: `1px solid ${group.color}22` }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${group.color}44`}
      onMouseLeave={e => e.currentTarget.style.borderColor = `${group.color}22`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span style={{ color: group.color }}>{group.icon}</span>
          <span className="font-orbitron font-bold text-sm tracking-widest" style={{ color: group.color }}>{group.category}</span>
        </div>
        <div className="flex gap-1">
          {group.skills.slice(0,3).map((s,i) => (
            <div key={s.name} className="relative" title={`${s.name}: ${s.level}%`}>
              <RadialProgress level={s.level} color={group.color} size={36} />
              <span className="absolute inset-0 flex items-center justify-center font-mono font-bold"
                style={{ color: group.color, fontSize: '7px', transform: 'rotate(90deg)' }}>
                {s.level}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${group.color}44, transparent)` }} />
      {group.skills.map((skill, i) => <SkillBar key={skill.name} skill={skill} color={group.color} index={i} />)}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${group.color}10, transparent 70%)` }} />
    </motion.div>
  )
}

const CERTS = [
  {
    org: 'COURSERA',
    color: 'var(--acid)',
    icon: '◈',
    items: [
      { name: 'Programming Fundamentals of C', issuer: 'Duke University', url: 'https://coursera.org/verify/7QJ84HKGR4Q3' },
      { name: 'Exploring C', issuer: 'University of Michigan', url: 'https://coursera.org/verify/CWDQ7FQHPQ9V' },
      { name: 'Programming for Everybody (Python)', issuer: 'University of Michigan', url: 'https://coursera.org/verify/W2PL4ECWFKVP' },
      { name: 'Create Your UI/UX Portfolio with GitHub', issuer: 'Coursera', url: 'https://coursera.org/verify/ANDNDG2YEFF4' },
      { name: 'Using MySQL Database with PHP', issuer: 'Coursera', url: 'https://coursera.org/verify/ME09VJTTMHVD' },
      { name: 'Foundations of Cybersecurity', issuer: 'Google', url: 'https://coursera.org/verify/AA5S2M9ATM2D' },
    ],
  },
  {
    org: 'EC-COUNCIL',
    color: 'var(--pink)',
    icon: '◉',
    items: [
      { name: 'Linux Command Line — Zero to Expert', issuer: 'EC-Council', url: 'https://learn.eccouncil.org/' },
      { name: 'Web App Security Testing with Google Hacking', issuer: 'EC-Council', url: 'https://learn.eccouncil.org/' },
      { name: 'Hacking WEP/WPA/WPA2 with Kali Linux 2.0', issuer: 'EC-Council', url: 'https://learn.eccouncil.org/' },
    ],
  },
  {
    org: 'IBM — COGNITIVE CLASS',
    color: 'var(--cyan)',
    icon: '◆',
    items: [
      { name: 'Spark Fundamentals I', issuer: 'IBM', url: 'https://courses.cognitiveclass.ai/certificates/e6b173d8539949098c767ced7fb490ce' },
    ],
  },
]

function CertAccordion({ cert, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="mb-3 rounded-xl overflow-hidden"
      style={{ border: `1px solid ${cert.color}22` }}
    >
      <button data-hover onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
        style={{ background: open ? `${cert.color}0d` : 'transparent' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = `${cert.color}08` }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent' }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: cert.color }}>{cert.icon}</span>
          <span className="font-orbitron font-bold text-sm tracking-widest" style={{ color: cert.color }}>{cert.org}</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: `${cert.color}22`, color: cert.color }}>{cert.items.length}</span>
        </div>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} style={{ color: cert.color }}>+</motion.span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
        <div className="px-4 pb-4 space-y-1 pt-1">
          {cert.items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -10 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-center justify-between py-1.5 border-b last:border-0"
              style={{ borderColor: `${cert.color}11` }}
            >
              <div className="flex items-start gap-2 text-sm font-mono" style={{ color: 'rgba(224,224,224,0.65)' }}>
                <span style={{ color: cert.color, flexShrink: 0 }}>▸</span>
                <span>{item.name} <span className="text-xs" style={{ color: 'rgba(224,224,224,0.35)' }}>— {item.issuer}</span></span>
              </div>
              <a href={item.url} target="_blank" rel="noreferrer" data-hover
                className="text-xs font-mono px-2 py-0.5 rounded ml-3 shrink-0 transition-all"
                style={{ color: cert.color, border: `1px solid ${cert.color}33`, background: `${cert.color}08` }}
                onMouseEnter={e => e.currentTarget.style.background = `${cert.color}22`}
                onMouseLeave={e => e.currentTarget.style.background = `${cert.color}08`}
              >VERIFY ↗</a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: false, margin: '-80px' })
  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-tag mb-2">// LOG_004</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: 'white' }}>
            SKILL<span style={{ color: 'var(--cyan)' }}>SET</span><span style={{ color: 'var(--cyan)' }}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, var(--cyan), transparent)' }} />
            <span className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.4)' }}>hover bars for details</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {SKILL_GROUPS.map((group, i) => <SkillGroupCard key={group.category} group={group} groupIndex={i} />)}
        </div>

        <div className="mb-20">
          <p className="section-tag mb-8">ACHIEVEMENTS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🏆', title: '2nd Winner', subtitle: 'Competitive Programming Battle Week', color: '#f59e0b', desc: 'Secured 2nd place in an intense competitive programming contest showcasing algorithmic problem-solving under time constraints.' },
              { icon: '🎓', title: '75% Academic Scholarship', subtitle: 'JK Lakshmipat University', color: 'var(--acid)', desc: 'Awarded a merit-based academic scholarship covering 75% of tuition for demonstrated excellence in academics.' },
            ].map((ach, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass rounded-2xl p-6 relative overflow-hidden"
                style={{ border: `1px solid ${ach.color}22` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${ach.color}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${ach.color}22`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0" style={{ background: `${ach.color}15`, border: `2px solid ${ach.color}44` }}>{ach.icon}</div>
                  <div>
                    <h3 className="font-orbitron font-bold text-base mb-0.5" style={{ color: ach.color }}>{ach.title}</h3>
                    <p className="font-mono text-xs mb-3" style={{ color: 'rgba(224,224,224,0.5)' }}>{ach.subtitle}</p>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(224,224,224,0.55)' }}>{ach.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="section-tag mb-2">CERTIFICATIONS</p>
          <p className="font-mono text-xs mb-6" style={{ color: 'rgba(224,224,224,0.35)' }}>Click VERIFY to view verified credential</p>
          {CERTS.map((cert, i) => <CertAccordion key={cert.org} cert={cert} index={i} />)}
        </div>
      </div>
    </section>
  )
}
