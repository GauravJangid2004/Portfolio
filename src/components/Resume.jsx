import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PDF_URL = '/Gaurav_Resume.pdf'

function PDFModalPreview({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-black rounded-2xl z-50 flex flex-col overflow-hidden"
            style={{ border: '1px solid rgba(0,255,65,0.3)', background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,20,20,0.8))' }}
          >
            <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,255,65,0.2)' }}>
              <h3 className="font-orbitron font-black text-lg" style={{ color: 'var(--acid)' }}>RESUME_PREVIEW.PDF</h3>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="text-2xl font-bold hover:opacity-70 transition" style={{ color: 'var(--acid)' }}>✕</motion.button>
            </div>
            <div className="flex-1 overflow-auto" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <iframe src={`${PDF_URL}#toolbar=1&navpanes=0&scrollbar=1`} style={{ width: '100%', height: '100%', border: 'none' }} title="Resume PDF Preview" />
            </div>
            <div className="px-6 py-3 text-center border-t" style={{ background: 'rgba(0,255,65,0.05)', borderColor: 'rgba(0,255,65,0.2)' }}>
              <p className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.5)' }}>Press ESC or click ✕ to close • Use browser controls to download</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function PreviewButton({ onPreviewClick }) {
  return (
    <motion.button
      data-hover
      onClick={onPreviewClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-3 font-orbitron font-bold text-sm tracking-widest overflow-hidden rounded-lg"
      style={{ background: 'rgba(0,255,65,0.1)', color: 'var(--acid)', border: '1px solid var(--acid)', transition: 'all 0.3s', boxShadow: '0 0 20px rgba(0,255,65,0.2)' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,65,0.2)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,65,0.4)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,255,65,0.1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,65,0.2)' }}
    >
      👁 PREVIEW_PDF
    </motion.button>
  )
}

function DownloadButton() {
  const [state, setState] = useState('idle')
  const handleDownload = async () => {
    setState('downloading')
    try {
      const link = document.createElement('a')
      link.href = PDF_URL
      link.download = 'Gaurav_Jangid_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setState('done')
      setTimeout(() => setState('idle'), 3000)
    } catch (error) {
      setState('idle')
    }
  }
  const labels = { idle: 'DOWNLOAD_RESUME.pdf', downloading: 'EXTRACTING...', done: '✓ RESUME_SAVED' }
  const colors = { idle: { bg: 'var(--acid)', color: 'var(--dark)' }, downloading: { bg: 'rgba(0,255,65,0.2)', color: 'var(--acid)' }, done: { bg: 'rgba(0,255,65,0.15)', color: 'var(--acid)' } }
  return (
    <motion.button
      data-hover onClick={handleDownload} whileTap={{ scale: 0.96 }}
      className="relative px-10 py-4 font-orbitron font-black text-sm tracking-widest overflow-hidden"
      style={{ background: colors[state].bg, color: colors[state].color, border: state !== 'idle' ? '1px solid var(--acid)' : 'none', clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)', transition: 'background 0.3s, color 0.3s', boxShadow: state === 'idle' ? '0 0 40px rgba(0,255,65,0.4)' : '0 0 20px rgba(0,255,65,0.2)' }}
    >
      {state === 'idle' && (
        <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', pointerEvents: 'none' }} />
      )}
      {state === 'downloading' && (
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--acid)', transformOrigin: 'left' }} />
      )}
      <AnimatePresence mode="wait">
        <motion.span key={state} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="relative z-10">
          {labels[state]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function Resume() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: false, margin: '-80px' })
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <section id="resume" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-tag mb-2">// LOG_002.5</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: 'white' }}>
            RESU<span style={{ color: 'var(--acid)' }}>ME</span><span style={{ color: 'var(--acid)' }}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(to right, var(--acid), transparent)' }} />
            <span className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.4)' }}>FULL_CV // CLICK TO DOWNLOAD</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
        >
          <DownloadButton />
          <PreviewButton onPreviewClick={() => setIsPreviewOpen(true)} />
          <p className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.35)' }}>Last updated: 2025 · PDF format</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass rounded-2xl overflow-hidden relative p-8"
          style={{ border: '1px solid rgba(0,255,65,0.2)' }}
        >
          <div className="text-center">
            <p className="font-mono text-sm mb-4" style={{ color: 'rgba(224,224,224,0.6)' }}>Click the preview button above to view the full resume</p>
            <p className="font-orbitron font-black text-2xl" style={{ color: 'var(--acid)', textShadow: '0 0 20px rgba(0,255,65,0.3)' }}>📄 RESUME_READY</p>
            <p className="font-mono text-xs mt-3" style={{ color: 'rgba(224,224,224,0.4)' }}>Preview & Download Available</p>
          </div>
        </motion.div>
      </div>

      <PDFModalPreview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </section>
  )
}
