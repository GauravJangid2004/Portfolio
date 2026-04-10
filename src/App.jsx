import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import MatrixBackground from './components/MatrixBackground'
import OrbBackground from './components/OrbBackground'


function Ticker({ items, color = 'var(--acid)', reverse = false }) {
  const text = items.join('  //  ')
  const style = {
    animation: `driftLeft ${reverse ? '14s' : '18s'} linear infinite ${reverse ? 'reverse' : ''}`,
    whiteSpace: 'nowrap',
    display: 'inline-block',
  }
  return (
    <div className="overflow-hidden py-2 border-y" style={{ borderColor: `${color}18`, background: `${color}06` }}>
      <div style={style}>
        <span className="font-orbitron text-xs tracking-widest font-bold" style={{ color: `${color}66` }}>
          {[text,text,text].join('    ·    ')}
        </span>
      </div>
    </div>
  )
}

function MainPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Experience />
      <Ticker items={["SEEKING INTERNSHIP","CYBERSECURITY","FULL STACK DEV","PYTHON","REACT","LINUX","ALGORITHMS","SECURE CODING"]} />
      <Resume />
      <Projects />
      <Ticker items={["SECURECRYPT","CYBERWALL","ALUMNICONNECT","ELEVRATORSIM","SDG ANALYZER","SPACE INVADER"]} color="var(--pink)" reverse={true} />
      <Skills />
      <Contact />
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <Router>
      <div className="relative min-h-screen bg-dark overflow-x-hidden">
        <MatrixBackground />
        <OrbBackground />
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <CustomCursor />
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  )
}
