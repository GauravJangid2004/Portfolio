import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const API_BASE = '/api/resume'

/* ── PDF Modal Preview ─────────────────────────────────────────────────────── */
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
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 rounded-2xl z-50 flex flex-col overflow-hidden"
            style={{ border: '1px solid rgba(0,255,65,0.3)', background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,20,20,0.9))' }}
          >
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,255,65,0.2)' }}>
              <h3 className="font-orbitron font-black text-lg" style={{ color: 'var(--acid)' }}>RESUME_PREVIEW.PDF</h3>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="text-2xl font-bold hover:opacity-70 transition"
                style={{ color: 'var(--acid)' }}
              >✕</motion.button>
            </div>

            {/* PDF iframe — served from server */}
            <div className="flex-1 overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <iframe
                src={`${API_BASE}/preview`}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Resume PDF Preview"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 flex items-center justify-between border-t" style={{ background: 'rgba(0,255,65,0.05)', borderColor: 'rgba(0,255,65,0.2)' }}>
              <p className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.45)' }}>Press ✕ or click outside to close</p>
              <div className="flex gap-3">
                <a
                  href={`${API_BASE}/pdf`}
                  download="Gaurav_Jangid_Resume.pdf"
                  className="font-mono text-xs px-3 py-1 rounded-lg transition-all"
                  style={{ color: 'var(--dark)', background: 'var(--acid)' }}
                >↓ PDF</a>
                <a
                  href={`${API_BASE}/docx`}
                  download="Gaurav_Jangid_Resume.docx"
                  className="font-mono text-xs px-3 py-1 rounded-lg transition-all"
                  style={{ color: 'var(--acid)', border: '1px solid var(--acid)' }}
                >↓ DOCX</a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Download Button (PDF or DOCX) ─────────────────────────────────────────── */
function DownloadButton({ format }) {
  const [state, setState] = useState('idle')

  const isPDF  = format === 'pdf'
  const url    = isPDF ? `${API_BASE}/pdf`  : `${API_BASE}/docx`
  const fname  = isPDF ? 'Gaurav_Jangid_Resume.pdf' : 'Gaurav_Jangid_Resume.docx'
  const label  = isPDF ? 'DOWNLOAD_RESUME.pdf' : 'DOWNLOAD_RESUME.docx'
  const accent = isPDF ? 'var(--acid)' : 'var(--cyan)'

  const handleDownload = async () => {
    setState('downloading')
    try {
      const res  = await fetch(url)
      if (!res.ok) throw new Error('Not found')
      const blob = await res.blob()
      const href = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = href
      a.download = fname
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(href)
      setState('done')
      setTimeout(() => setState('idle'), 3000)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  const labels = {
    idle:        label,
    downloading: 'EXTRACTING...',
    done:        `✓ ${format.toUpperCase()}_SAVED`,
    error:       '⚠ FILE_NOT_FOUND',
  }
  const bg = {
    idle:        isPDF ? 'var(--acid)' : 'transparent',
    downloading: 'rgba(0,255,65,0.15)',
    done:        'rgba(0,255,65,0.12)',
    error:       'rgba(255,60,100,0.15)',
  }
  const fg = {
    idle:        isPDF ? 'var(--dark)' : accent,
    downloading: accent,
    done:        accent,
    error:       'var(--pink)',
  }

  return (
    <motion.button
      data-hover
      onClick={handleDownload}
      whileTap={{ scale: 0.96 }}
      className="relative px-8 py-3 font-orbitron font-black text-sm tracking-widest overflow-hidden"
      style={{
        background:  bg[state],
        color:       fg[state],
        border:      isPDF && state === 'idle' ? 'none' : `1px solid ${state === 'error' ? 'var(--pink)' : accent}`,
        clipPath:    'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
        transition:  'background 0.3s, color 0.3s',
        boxShadow:   state === 'idle' ? `0 0 30px ${isPDF ? 'rgba(0,255,65,0.35)' : 'rgba(0,212,255,0.25)'}` : '0 0 15px rgba(0,255,65,0.15)',
      }}
    >
      {/* Shimmer on idle */}
      {state === 'idle' && isPDF && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)', pointerEvents: 'none' }}
        />
      )}
      {/* Progress bar on downloading */}
      {state === 'downloading' && (
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: accent, transformOrigin: 'left' }}
        />
      )}
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="relative z-10"
        >
          {labels[state]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

/* ── Preview Button ─────────────────────────────────────────────────────────── */
function PreviewButton({ onClick }) {
  return (
    <motion.button
      data-hover
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-3 font-orbitron font-bold text-sm tracking-widest overflow-hidden rounded-lg"
      style={{ background: 'rgba(0,255,65,0.1)', color: 'var(--acid)', border: '1px solid var(--acid)', boxShadow: '0 0 20px rgba(0,255,65,0.2)', transition: 'all 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,65,0.2)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,65,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,65,0.1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,65,0.2)' }}
    >
      👁 PREVIEW_PDF
    </motion.button>
  )
}

/* ── Main Section ───────────────────────────────────────────────────────────── */
export default function Resume() {
  const headerRef     = useRef(null)
  const inView        = useInView(headerRef, { once: true, margin: '-80px' })
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <section id="resume" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
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
            <span className="font-mono text-xs" style={{ color: 'rgba(224,224,224,0.4)' }}>PDF &amp; DOCX AVAILABLE</span>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <DownloadButton format="pdf" />
          <DownloadButton format="docx" />
          {/* <PreviewButton onClick={() => setIsPreviewOpen(true)} /> */}
          <p className="font-mono text-xs w-full sm:w-auto" style={{ color: 'rgba(224,224,224,0.35)' }}>Last updated: 2026</p>
        </motion.div>

        {/* Inline mini-preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="glass rounded-2xl overflow-hidden relative"
          style={{ border: '1px solid rgba(0,255,65,0.2)', height: '520px' }}
        >
          {/* Inline iframe preview */}
          <iframe
            src={`${API_BASE}/preview`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Resume Inline Preview"
          />

          {/* Overlay hint */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 py-3 font-mono text-xs"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)', color: 'rgba(224,224,224,0.5)' }}
          >
            {/* <span>👁 Click <strong style={{ color: 'var(--acid)' }}>PREVIEW_PDF</strong> for full-screen view</span> */}
          </div>
        </motion.div>
      </div>

      <PDFModalPreview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </section>
  )
}
