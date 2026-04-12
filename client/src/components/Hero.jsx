import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ROLES = [
  'CS STUDENT',
  'CYBER SECURITY ENTHUSIAST',
  'FULL STACK DEVELOPER',
  'PROBLEM SOLVER',
  'INTERN SEEKER',
]

function SplitGlitchText({ text, className, style }) {
  return (
    <div className={`relative inline-block ${className}`} style={style}>
      {/* Main text */}
      <span style={{ position: 'relative', zIndex: 2 }}>{text}</span>
      {/* Glitch layer 1 */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'var(--pink)',
          zIndex: 1,
          clipPath: 'inset(30% 0 50% 0)',
          animation: 'glitch 3s infinite',
          textShadow: '3px 0 var(--pink)',
        }}
      >
        {text}
      </span>
      {/* Glitch layer 2 */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'var(--cyan)',
          zIndex: 1,
          clipPath: 'inset(60% 0 20% 0)',
          animation: 'glitch2 3s infinite',
          textShadow: '-3px 0 var(--cyan)',
        }}
      >
        {text}
      </span>
    </div>
  )
}

function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = words[index]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      }, 80)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx(charIdx - 1)
      }, 40)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setIndex((index + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, index, words])

  return (
    <span>
      <span style={{ color: 'var(--acid)' }}>{displayed}</span>
      <span className="blink" style={{ color: 'var(--acid)', marginLeft: '2px' }}>█</span>
    </span>
  )
}

function TerminalLine({ text, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="text-xs font-mono"
      style={{ color: 'rgba(0,255,65,0.6)' }}
    >
      {text}
    </motion.div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(t)
  }, [])

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Left vertical text */}
      <div
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="text-xs font-mono tracking-widest" style={{ color: 'rgba(0,255,65,0.4)' }}>
          PORTFOLIO_2025
        </span>
        <div className="w-px h-24" style={{ background: 'linear-gradient(to bottom, transparent, var(--acid))' }} />
      </div>

      {/* Right social links */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4"
      >
        <a
          href="https://www.linkedin.com/in/gaurav-jangid-91149a2a8/"
          target="_blank"
          rel="noreferrer"
          data-hover
          className="text-xs font-mono tracking-widest hover:text-acid transition-colors duration-300"
          style={{ color: 'rgba(224,224,224,0.4)', writingMode: 'vertical-rl' }}
        >
          LINKEDIN
        </a>
        <div className="w-px h-24" style={{ background: 'linear-gradient(to bottom, var(--acid), transparent)' }} />
        <a
          href="mailto:gauravjangid1911@gmail.com"
          data-hover
          className="text-xs font-mono tracking-widest hover:text-acid transition-colors duration-300"
          style={{ color: 'rgba(224,224,224,0.4)', writingMode: 'vertical-rl' }}
        >
          EMAIL
        </a>
      </motion.div>

      <div className="max-w-6xl mx-auto w-full z-10 pt-24">
        {/* Terminal boot lines */}
        <div className="mb-8 space-y-1">
          <TerminalLine text="> INITIALIZING PORTFOLIO_v2.0.25..." delay={0} />
          <TerminalLine text="> LOADING GAURAV_JANGID.exe..." delay={300} />
          <TerminalLine text="> STATUS: SEEKING_INTERNSHIP [ACTIVE]" delay={600} />
          <TerminalLine text="> DOMAIN: CYBERSECURITY + FULL_STACK" delay={900} />
        </div>

        {/* Name */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="mb-2">
              <span className="section-tag">// IDENTITY_FILE</span>
            </div>
            <h1
              className="font-orbitron font-black leading-none mb-4"
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                color: 'var(--acid)',
                textShadow: '0 0 40px rgba(0,255,65,0.4)',
              }}
            >
              <SplitGlitchText text="GAURAV" />
              <br />
              <SplitGlitchText text="JANGID" style={{ marginLeft: 'clamp(1rem, 5vw, 5rem)' }} />
            </h1>
          </motion.div>
        )}

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-xl md:text-2xl font-mono mb-6"
          style={{ color: 'rgba(224,224,224,0.7)' }}
        >
          {'// '}<Typewriter words={ROLES} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-sm md:text-base font-mono max-w-2xl mb-10 leading-relaxed"
          style={{ color: 'rgba(224,224,224,0.5)', borderLeft: '2px solid var(--acid)', paddingLeft: '1rem' }}
        >
          A motivated Computer Science student with strong problem-solving skills and a
          passion for <span style={{ color: 'var(--cyan)' }}>Cyber Security</span>. Seeking an internship
          to apply my knowledge of secure systems, full-stack development, and cryptographic
          algorithms — and gain real industry experience.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <button
            onClick={scrollDown}
            data-hover
            className="relative px-8 py-3 font-orbitron font-bold text-sm tracking-widest overflow-hidden transition-all duration-300 group"
            style={{
              background: 'var(--acid)',
              color: 'var(--dark)',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}
          >
            <span className="relative z-10">EXPLORE_PROFILE</span>
          </button>

          <a
            href="mailto:gauravjangid1911@gmail.com"
            data-hover
            className="px-8 py-3 font-orbitron font-bold text-sm tracking-widest transition-all duration-300"
            style={{
              color: 'var(--acid)',
              border: '1px solid var(--acid)',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,65,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            HIRE_ME
          </a>

          <button
            onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
            data-hover
            className="px-8 py-3 font-orbitron font-bold text-sm tracking-widest transition-all duration-300"
            style={{ color: 'var(--cyan)', border: '1px solid var(--cyan)', clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            ↓ RESUME
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="flex flex-wrap gap-8"
        >
          {[
            { val: '6+', label: 'PROJECTS' },
            { val: '2ND', label: 'CP_BATTLE_WINNER' },
            { val: '75%', label: 'SCHOLARSHIP' },
            { val: '1', label: 'INTERNSHIP' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-orbitron font-black text-2xl" style={{ color: 'var(--acid)' }}>{stat.val}</span>
              <span className="text-xs font-mono tracking-widest" style={{ color: 'rgba(224,224,224,0.4)' }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono tracking-widest" style={{ color: 'rgba(0,255,65,0.4)' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--acid), transparent)' }}
        />
      </motion.div>

      {/* Decorative corner brackets */}
      <div className="absolute top-24 left-6 md:left-16 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: 'rgba(0,255,65,0.4)' }} />
      <div className="absolute top-24 right-6 md:right-16 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: 'rgba(0,255,65,0.4)' }} />
      <div className="absolute bottom-24 left-6 md:left-16 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: 'rgba(0,255,65,0.4)' }} />
      <div className="absolute bottom-24 right-6 md:right-16 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: 'rgba(0,255,65,0.4)' }} />
    </section>
  )
}
