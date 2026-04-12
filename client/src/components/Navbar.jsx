import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { label:'INIT',     href:'#hero' },
  { label:'ABOUT',    href:'#about' },
  { label:'EXP',      href:'#experience' },
  { label:'RESUME',   href:'#resume' },
  { label:'PROJECTS', href:'#projects' },
  { label:'SKILLS',   href:'#skills' },
  { label:'CONTACT',  href:'#contact' },
]

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <motion.button
      data-hover
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="relative w-12 h-6 rounded-full flex items-center px-0.5 transition-all duration-300"
      style={{ background: dark ? 'rgba(0,255,65,0.15)' : 'rgba(255,220,0,0.25)', border: `1px solid ${dark ? 'rgba(0,255,65,0.4)' : 'rgba(255,200,0,0.5)'}` }}
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        animate={{ x: dark ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
        style={{ background: dark ? 'var(--acid)' : '#ffd700', boxShadow: dark ? '0 0 8px rgba(0,255,65,0.6)' : '0 0 8px rgba(255,215,0,0.6)' }}
      >
        {dark ? '☽' : '☀'}
      </motion.div>
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('INIT')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = ['hero','about','experience','resume','projects','skills','contact']
      const labelMap = { hero:'INIT', about:'ABOUT', experience:'EXP', resume:'RESUME', projects:'PROJECTS', skills:'SKILLS', contact:'CONTACT' }
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) { const rect = el.getBoundingClientRect(); if (rect.top <= 100 && rect.bottom >= 100) { setActive(labelMap[id]); break } }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = href => {
    const el = document.getElementById(href.replace('#',''))
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y:-100, opacity:0 }} animate={{ y:0, opacity:1 }}
      transition={{ delay:0.5, type:'spring', stiffness:200 }}
      className="fixed top-6 left-0 right-0 z-[9990] flex justify-center px-4"
    >
      <div className="glass flex items-center gap-1 px-3 py-2 rounded-full"
        style={{ border:`1px solid rgba(0,255,65,${scrolled?0.3:0.12})`, boxShadow:scrolled?'0 8px 32px rgba(0,255,65,0.1)':'none', transition:'all 0.4s ease' }}
      >
        <span className="font-orbitron font-black text-xs mr-3 tracking-widest" style={{ color:'var(--acid)' }}>
          GJ<span className="blink" style={{ color:'var(--acid)' }}>_</span>
        </span>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = active === item.label
            return (
              <button key={item.label} onClick={() => scrollTo(item.href)} data-hover
                className="relative px-3 py-1.5 text-xs font-mono tracking-widest transition-all duration-300"
                style={{ color: isActive ? 'var(--dark)' : 'rgba(224,224,224,0.55)', fontFamily:'"Space Mono",monospace' }}
              >
                {isActive && <motion.div layoutId="nav-active" className="absolute inset-0 rounded-full" style={{ background:'var(--acid)' }} transition={{ type:'spring', stiffness:400, damping:30 }} />}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Theme toggle */}
        {/* <div className="ml-2 mr-1"><ThemeToggle /></div> */}

        {/* Status badge */}
        <div className="hidden md:flex items-center gap-1.5 ml-1 px-2 py-1 rounded-full border border-green-500/20 bg-green-500/5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation:'pulse 2s infinite' }}/>
          <span className="text-xs text-green-400 font-mono">OPEN</span>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-2 p-1" data-hover>
          <div className="flex flex-col gap-1">
            <motion.div animate={{ rotate:menuOpen?45:0, y:menuOpen?6:0 }} className="w-4 h-0.5" style={{ background:'var(--acid)' }}/>
            <motion.div animate={{ opacity:menuOpen?0:1 }} className="w-4 h-0.5" style={{ background:'var(--acid)' }}/>
            <motion.div animate={{ rotate:menuOpen?-45:0, y:menuOpen?-6:0 }} className="w-4 h-0.5" style={{ background:'var(--acid)' }}/>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0,y:-20,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-20,scale:0.95}} transition={{duration:0.2}}
            className="glass absolute top-16 left-4 right-4 rounded-2xl p-4 flex flex-col gap-2"
            style={{ border:'1px solid rgba(0,255,65,0.2)' }}
          >
            {NAV_ITEMS.map(item=>(
              <button key={item.label} onClick={()=>scrollTo(item.href)}
                className="text-left px-4 py-3 text-sm font-mono tracking-widest border-b border-white/5 last:border-0"
                style={{ color:active===item.label?'var(--acid)':'rgba(224,224,224,0.7)' }}
              >
                <span className="text-acid/50 mr-2">{'>'}</span>{item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}