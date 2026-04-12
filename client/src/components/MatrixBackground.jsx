import React, { useEffect, useRef } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン!@#$%^&*()_+-=[]{}|;:,.<>?'
    const fontSize = 13
    let columns = Math.floor(canvas.width / fontSize)
    let drops = Array(columns).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = `${fontSize}px "Space Mono", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        // Vary brightness for depth effect
        const alpha = Math.random() > 0.9 ? 1 : 0.4
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="matrix-canvas"
      className="fixed top-0 left-0 z-0 pointer-events-none"
      style={{ opacity: 0.08 }}
    />
  )
}
