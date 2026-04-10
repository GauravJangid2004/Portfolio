import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const posRef  = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const state   = useRef({ hovering: false, clicking: false })

  useEffect(() => {
    let animId

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      state.current.hovering = !!el?.closest('a, button, [data-hover], input, textarea, select, label')
    }
    const onDown = () => { state.current.clicking = true }
    const onUp   = () => { state.current.clicking = false }

    const tick = () => {
      const { x: tx, y: ty } = posRef.current
      const r = ringPos.current
      const { hovering, clicking } = state.current

      // Lerp ring (0.08 = smooth delay feel)
      r.x += (tx - r.x) * 0.08
      r.y += (ty - r.y) * 0.08

      const dotColor  = hovering ? '#ff2d78' : '#00ff41'
      const ringColor = clicking ? 'rgba(255,45,120,0.9)' : hovering ? 'rgba(255,45,120,0.65)' : 'rgba(0,255,65,0.5)'
      const ringGlow  = clicking ? '0 0 20px rgba(255,45,120,0.8)' : hovering ? '0 0 14px rgba(255,45,120,0.5)' : '0 0 10px rgba(0,255,65,0.25)'
      const ringSize  = clicking ? 20 : hovering ? 56 : 38
      const bRadius   = hovering ? '6px' : '50%'
      const dotScale  = clicking ? 0.55 : 1

      const dot = dotRef.current
      if (dot) {
        dot.style.transform = `translate(${tx - 10}px, ${ty - 10}px) scale(${dotScale})`
        dot.querySelectorAll('circle, line').forEach(el => {
          el.setAttribute('stroke', dotColor)
          el.setAttribute('fill',   dotColor)
        })
        const lbl = dot.querySelector('#clabel')
        if (lbl) lbl.style.opacity = hovering ? '1' : '0'
      }

      const ring = ringRef.current
      if (ring) {
        const half = ringSize / 2
        const rot  = clicking ? ' rotate(45deg)' : ''
        ring.style.transform   = `translate(${r.x - half}px, ${r.y - half}px)${rot}`
        ring.style.width       = `${ringSize}px`
        ring.style.height      = `${ringSize}px`
        ring.style.borderColor = ringColor
        ring.style.boxShadow   = ringGlow
        ring.style.borderRadius = bRadius
      }

      animId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* Crosshair dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99999, pointerEvents: 'none', willChange: 'transform',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" style={{ display: 'block' }}>
          <circle cx="10" cy="10" r="2.2" fill="#00ff41" />
          <line x1="10" y1="0"    x2="10" y2="5.5"  stroke="#00ff41" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="10" y1="14.5" x2="10" y2="20"   stroke="#00ff41" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0"  y1="10"   x2="5.5" y2="10"  stroke="#00ff41" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="14.5" y1="10" x2="20"  y2="10"  stroke="#00ff41" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {/* CLICK label — shows on hover */}
        <div
          id="clabel"
          style={{
            position: 'absolute', top: '-18px', left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '7px', fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.15em', color: '#ff2d78',
            opacity: 0, transition: 'opacity 0.15s ease',
            whiteSpace: 'nowrap', pointerEvents: 'none',
            textShadow: '0 0 8px rgba(255,45,120,0.9)',
          }}
        >
          CLICK
        </div>
      </div>

      {/* Lagging outer ring — rAF driven, no CSS transition for max smoothness */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99998, pointerEvents: 'none',
          border: '1.5px solid rgba(0,255,65,0.5)',
          borderRadius: '50%',
          willChange: 'transform, width, height',
          boxSizing: 'border-box',
          transition: 'border-radius 0.2s ease, border-color 0.15s ease, box-shadow 0.15s ease',
        }}
      />
    </>
  )
}
