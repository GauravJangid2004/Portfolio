import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  { name: 'Python', level: 90, color: 'var(--acid)', size: 'lg' },
  { name: 'C/C++', level: 75, color: 'var(--cyan)', size: 'md' },
  { name: 'HTML/CSS', level: 88, color: 'var(--pink)', size: 'lg' },
  { name: 'JavaScript', level: 80, color: '#f59e0b', size: 'md' },
  { name: 'MySQL', level: 78, color: '#a855f7', size: 'md' },
  { name: 'Bash', level: 70, color: 'var(--cyan)', size: 'sm' },
  { name: 'Linux', level: 72, color: 'var(--acid)', size: 'sm' },
  { name: 'React', level: 74, color: 'var(--cyan)', size: 'md' },
  { name: 'FastAPI', level: 68, color: 'var(--pink)', size: 'sm' },
  { name: 'Git', level: 80, color: '#f59e0b', size: 'sm' },
]

const CERTS = [
  {
    org: 'COURSERA',
    color: 'var(--acid)',
    icon: '◈',
    items: [
      'Programming Fundamentals of C — Duke University',
      'Exploring C — University of Michigan',
      'Programming for Everybody (Python) — University of Michigan',
      'Create Your UI/UX Portfolio with GitHub',
      'Using MySQL Database with PHP',
      'Foundations of Cybersecurity — Google',
    ],
  },
  {
    org: 'EC-COUNCIL',
    color: 'var(--pink)',
    icon: '◉',
    items: [
      'Linux Command Line — From Zero to Expert',
      'Web Application Security Testing with Google Hacking',
      'Hacking WEP/WPA/WPA2 Wi-Fi Networks using Kali Linux 2.0',
    ],
  },
  {
    org: 'COGNITIVE CLASS (IBM)',
    color: 'var(--cyan)',
    icon: '◆',
    items: ['Spark Fundamentals I — IBM'],
  },
]

function SkillBubble({ skill, index }) {
  const [hover, setHover] = useState(false)
  const sizeMap = { lg: 'w-24 h-24', md: 'w-20 h-20', sm: 'w-16 h-16' }
  const fontMap = { lg: 'text-sm', md: 'text-xs', sm: 'text-xs' }
  const delay = index * 0.1
  const floatDuration = 4 + (index % 3) * 2

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 300 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={{
          y: hover ? 0 : [0, -12, 0],
          scale: hover ? 1.15 : 1,
        }}
        transition={hover
          ? { duration: 0.2 }
          : { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        data-hover
        className={`${sizeMap[skill.size]} rounded-full flex flex-col items-center justify-center relative cursor-pointer`}
        style={{
          background: hover
            ? `radial-gradient(circle at 40% 40%, ${skill.color}33, ${skill.color}11)`
            : `radial-gradient(circle at 40% 40%, ${skill.color}22, ${skill.color}08)`,
          border: `1px solid ${skill.color}${hover ? '88' : '33'}`,
          boxShadow: hover
            ? `0 0 30px ${skill.color}44, inset 0 0 20px ${skill.color}11`
            : `0 0 15px ${skill.color}22`,
          transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
        }}
      >
        <span className={`font-mono font-bold ${fontMap[skill.size]} text-center px-1`} style={{ color: skill.color }}>
          {skill.name}
        </span>
        {hover && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono mt-0.5"
            style={{ color: 'rgba(224,224,224,0.5)' }}
          >
            {skill.level}%
          </motion.span>
        )}
      </motion.div>
      {hover && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="w-12 h-px"
          style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}` }}
        />
      )}
    </motion.div>
  )
}

function CertAccordion({ cert, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="mb-3 overflow-hidden rounded-xl"
      style={{ border: `1px solid ${cert.color}22` }}
    >
      <button
        data-hover
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left transition-all duration-300"
        style={{
          background: open ? `${cert.color}0d` : 'transparent',
        }}
        onMouseEnter={e => e.currentTarget.style.background = `${cert.color}0d`}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg" style={{ color: cert.color }}>{cert.icon}</span>
          <span className="font-orbitron font-bold text-sm tracking-widest" style={{ color: cert.color }}>
            {cert.org}
          </span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{ background: `${cert.color}22`, color: cert.color }}
          >
            {cert.items.length} CERTS
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-lg"
          style={{ color: cert.color }}
        >
          +
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-4 pb-4 space-y-2 pt-1">
          {cert.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -10 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 text-sm font-mono py-2 border-b last:border-0"
              style={{
                color: 'rgba(224,224,224,0.65)',
                borderColor: `${cert.color}11`,
              }}
            >
              <span style={{ color: cert.color, flexShrink: 0 }}>▸</span>
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: false })
  const skillsRef = useRef(null)
  const skillsInView = useInView(skillsRef, { once: false })

  return (
    <section id="skills" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-tag mb-2">// LOG_004</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: 'white' }}>
            SKILL<span style={{ color: 'var(--cyan)' }}>SET</span>
            <span style={{ color: 'var(--cyan)' }}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, var(--cyan), transparent)' }} />
            <span className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.4)' }}>SKILLS // CERTS // ACHIEVEMENTS</span>
          </div>
        </motion.div>

        {/* Skills bubbles */}
        <div ref={skillsRef} className="mb-24">
          <p className="section-tag mb-8 text-center">TECHNICAL_SKILLS</p>
          <div className="flex flex-wrap justify-center gap-6">
            {skillsInView && SKILLS.map((skill, i) => (
              <SkillBubble key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <p className="section-tag mb-8">ACHIEVEMENTS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🏆',
                title: '2nd Winner',
                subtitle: 'Competitive Programming Battle Week',
                color: '#f59e0b',
                desc: 'Secured 2nd place in an intense competitive programming contest showcasing algorithmic problem-solving under time constraints.',
              },
              {
                icon: '🎓',
                title: '75% Academic Scholarship',
                subtitle: 'JK Lakshmipat University',
                color: 'var(--acid)',
                desc: 'Awarded a merit-based academic scholarship covering 75% of tuition for demonstrated excellence in academics and potential.',
              },
            ].map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass rounded-2xl p-6 relative overflow-hidden group"
                style={{ border: `1px solid ${ach.color}22` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${ach.color}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${ach.color}22`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `${ach.color}15`,
                      border: `2px solid ${ach.color}44`,
                      animation: `float ${6 + i * 2}s ease-in-out infinite`,
                    }}
                  >
                    {ach.icon}
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-base mb-0.5" style={{ color: ach.color }}>
                      {ach.title}
                    </h3>
                    <p className="font-mono text-xs mb-3" style={{ color: 'rgba(224,224,224,0.5)' }}>{ach.subtitle}</p>
                    <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(224,224,224,0.55)' }}>{ach.desc}</p>
                  </div>
                </div>
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
                  style={{ background: `radial-gradient(circle, ${ach.color}15, transparent 70%)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p className="section-tag mb-8">CERTIFICATIONS</p>
          {CERTS.map((cert, i) => (
            <CertAccordion key={cert.org} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
