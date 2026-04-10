import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCE = [
  {
    type: 'WORK',
    role: 'Software Developer Intern',
    org: 'Smartlink Soft',
    period: 'May 2025 — July 2025',
    color: 'var(--acid)',
    icon: '◈',
    description:
      'Worked on the complete development cycle of a dynamic and responsive website — from designing and building backend APIs to frontend integration. Utilized HTML, CSS, JavaScript, and MySQL to deliver a robust, performant product. Ensured secure data handling through proper form validation and input sanitization.',
    tags: ['HTML/CSS', 'JavaScript', 'MySQL', 'Backend APIs', 'Form Validation', 'Secure Data Handling'],
  },
]

const EDUCATION = [
  {
    type: 'EDUCATION',
    role: 'B.Tech — Computer Science Engineering',
    org: 'JK Lakshmipat University',
    period: '2023 — 2027',
    color: 'var(--cyan)',
    icon: '◉',
    description:
      'Pursuing a full-stack Computer Science degree with focus on cybersecurity and software engineering.',
    tags: [
      'DSA', 'DAA', 'Computer Networks', 'TOC', 'Full Stack Dev',
      'Machine Learning', 'Python', 'Big Data Analytics', 'DBMS',
      'Probability & Statistics', 'COA', 'Operating System', 'Digital Circuits',
    ],
  },
]

function TimelineItem({ item, index, side }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      className={`flex ${side === 'right' ? 'flex-row-reverse' : 'flex-row'} gap-0 md:gap-6 mb-12 relative`}
    >
      {/* Card */}
      <div
        className="glass rounded-2xl p-6 flex-1 relative overflow-hidden card-shimmer group hover:border-opacity-50 transition-all duration-500"
        style={{
          border: `1px solid ${item.color}22`,
          maxWidth: '90%',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = `${item.color}55`}
        onMouseLeave={e => e.currentTarget.style.borderColor = `${item.color}22`}
      >
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-mono tracking-widest px-2 py-0.5 rounded"
            style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}
          >
            {item.type}
          </span>
          <span className="text-xs font-mono" style={{ color: 'rgba(224,224,224,0.4)' }}>{item.period}</span>
        </div>

        <h3 className="font-orbitron font-bold text-lg mb-1" style={{ color: item.color }}>
          {item.role}
        </h3>
        <p className="font-mono text-sm mb-4" style={{ color: 'rgba(224,224,224,0.6)' }}>
          @ {item.org}
        </p>
        <p className="text-sm font-mono mb-5 leading-relaxed" style={{ color: 'rgba(224,224,224,0.6)' }}>
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 rounded"
              style={{
                background: `${item.color}0d`,
                color: item.color,
                border: `1px solid ${item.color}22`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Corner glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${item.color}15, transparent 70%)` }}
        />
      </div>

      {/* Timeline dot — hidden on mobile, shown on md+ */}
      <div className="hidden md:flex flex-col items-center justify-start pt-6 px-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-lg z-10"
          style={{
            background: `${item.color}22`,
            border: `2px solid ${item.color}`,
            color: item.color,
            boxShadow: `0 0 20px ${item.color}55`,
          }}
        >
          {item.icon}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  return (
    <section id="experience" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-tag mb-2">// LOG_002</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: 'white' }}>
            EXP<span style={{ color: 'var(--acid)' }}>ERIENCE</span>
            <span style={{ color: 'var(--acid)' }}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, var(--acid), transparent)' }} />
            <span className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.4)' }}>WORK + EDU</span>
          </div>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--acid)44, var(--cyan)44, transparent)' }}
          />

          {/* Work label */}
          <div className="mb-8 flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold tracking-widest" style={{ color: 'var(--acid)' }}>WORK_EXPERIENCE</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, var(--acid)44, transparent)' }} />
          </div>

          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} side="left" />
          ))}

          {/* Education label */}
          <div className="mb-8 mt-4 flex items-center gap-3">
            <span className="font-orbitron text-xs font-bold tracking-widest" style={{ color: 'var(--cyan)' }}>EDUCATION</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, var(--cyan)44, transparent)' }} />
          </div>

          {EDUCATION.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} side="right" />
          ))}
        </div>
      </div>
    </section>
  )
}
