import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FACTS = [
  { icon: '', label: 'LOCATION',   value: 'Jaipur, Rajasthan, India' },
  { icon: '', label: 'STATUS',     value: 'B.Tech CSE Student (2023–27)' },
  { icon: '', label: 'FOCUS',      value: 'Cybersecurity + Full-Stack' },
  { icon: '', label: 'AVAILABLE',  value: 'Open to Internships' },
]

const INTERESTS = ['Ethical Hacking', 'Cryptography', 'Network Security', 'Web Development', 'Data Analysis', 'Open Source', 'Competitive Programming', 'Linux']

function StatBox({ icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-xl p-4 flex items-center gap-3"
      style={{ border: '1px solid rgba(0,255,65,0.15)' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,65,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,255,65,0.15)'}
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-mono tracking-widest" style={{ color: 'var(--acid)', opacity: 0.7 }}>{label}</p>
        <p className="text-sm font-mono" style={{ color: 'rgba(224,224,224,0.85)' }}>{value}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <section id="about" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-tag mb-2">// LOG_001.5</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: 'white' }}>
            ABOUT<span style={{ color: 'var(--cyan)' }}>_ME</span>
            <span style={{ color: 'var(--cyan)' }}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, var(--cyan), transparent)' }} />
            <span className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.4)' }}>IDENTITY // MISSION // INTERESTS</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — photo + facts */}
          <div>
            {/* Profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="relative mb-8"
            >
              {/* Photo frame */}
              <div className="relative w-52 h-52 mx-auto lg:mx-0">
                {/* Rotating ring */}
                <div
                  className="absolute inset-0 rounded-full spin-slow"
                  style={{
                    background: 'conic-gradient(var(--acid), var(--cyan), var(--pink), var(--acid))',
                    padding: '2px',
                  }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: 'var(--dark)' }} />
                </div>

                <div
                  className="absolute inset-2 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,255,65,0.1), rgba(0,212,255,0.1))', border: '1px solid rgba(0,255,65,0.3)' }}
                >
                  <div className="text-center">
                    <img src="/profile.jpg" alt="Gaurav Jangid" className="w-full h-full object-cover" />
                    <p className="text-xs font-mono" style={{ color: 'rgba(0,255,65,0.6)' }}>GAURAV.jpg</p>
                  </div>
                </div>

                {/* Status dot */}
                <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ background: '#050505', borderColor: 'var(--acid)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
                </div>
              </div>

              {/* Name card below photo */}
              <div className="text-center lg:text-left mt-4">
                <p className="font-orbitron font-black text-xl" style={{ color: 'var(--acid)' }}>Gaurav Jangid</p>
                <p className="font-mono text-xs mt-1" style={{ color: 'rgba(224,224,224,0.5)' }}>CS Engineer · Cyber Security · Developer</p>
              </div>
            </motion.div>

            {/* Fact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FACTS.map((f, i) => <StatBox key={f.label} {...f} delay={i * 0.1} />)}
            </div>
          </div>

          {/* Right — bio + interests */}
          <div>
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <p className="section-tag mb-4">// BIO</p>
              {[
                "I'm a passionate Computer Science Engineering student at JK Lakshmipat University (2023–27), specialising in Cybersecurity and Full-Stack Development. My journey into tech started with a deep curiosity for how systems can be both built and broken — which led me straight to the world of ethical hacking, cryptography, and secure software design.",
                "I've worked as a Software Developer Intern at Smartlink Soft, where I handled the complete development cycle of a web product — from designing MySQL-backed APIs to securing form inputs against injection attacks. I believe security isn't an afterthought; it's the foundation.",
                "Outside of work I enjoy competitive programming, Linux tinkering, and building side projects that solve real problems. I'm currently seeking an internship where I can bring both my development and security skills to a team that values both.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="font-mono text-sm leading-relaxed mb-4"
                  style={{ color: 'rgba(224,224,224,0.65)', borderLeft: i === 0 ? '2px solid var(--cyan)' : 'none', paddingLeft: i === 0 ? '1rem' : '0' }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="section-tag mb-4">// INTERESTS</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest, i) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    data-hover
                    className="text-xs font-mono px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      color: 'var(--cyan)',
                      border: '1px solid rgba(0,212,255,0.25)',
                    }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Quick contact strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 p-4 rounded-xl flex flex-wrap gap-4"
              style={{ background: 'rgba(0,255,65,0.04)', border: '1px solid rgba(0,255,65,0.15)' }}
            >
              <a href="mailto:gauravjangid1911@gmail.com" data-hover className="font-mono text-xs hover:opacity-100 transition-opacity" style={{ color: 'var(--acid)', opacity: 0.7 }}>
                ✉ gauravjangid1911@gmail.com
              </a>
              <a href="tel:+919785593133" data-hover className="font-mono text-xs hover:opacity-100 transition-opacity" style={{ color: 'var(--cyan)', opacity: 0.7 }}>
                ☏ +91 9785593133
              </a>
              <a href="https://www.linkedin.com/in/gaurav-jangid-91149a2a8/" target="_blank" rel="noreferrer" data-hover className="font-mono text-xs hover:opacity-100 transition-opacity" style={{ color: 'var(--pink)', opacity: 0.7 }}>
                ◉ LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
