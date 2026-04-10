import React from 'react'

export default function OrbBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top-left acid orb */}
      <div
        className="orb absolute"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, transparent 70%)',
          top: '-200px',
          left: '-200px',
          animationDelay: '0s',
          animationDuration: '10s',
        }}
      />
      {/* Bottom-right pink orb */}
      <div
        className="orb absolute"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,45,120,0.1) 0%, transparent 70%)',
          bottom: '-100px',
          right: '-100px',
          animationDelay: '3s',
          animationDuration: '12s',
        }}
      />
      {/* Center cyan orb */}
      <div
        className="orb absolute"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDelay: '6s',
          animationDuration: '15s',
        }}
      />
    </div>
  )
}
