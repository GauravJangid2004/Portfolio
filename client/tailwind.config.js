/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        acid: '#00ff41',
        pink: '#ff2d78',
        cyan: '#00d4ff',
        dark: '#050505',
        glass: 'rgba(255,255,255,0.03)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'pulse-acid': 'pulseAcid 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseAcid: {
          '0%, 100%': { boxShadow: '0 0 20px #00ff41, 0 0 40px #00ff4155' },
          '50%': { boxShadow: '0 0 40px #00ff41, 0 0 80px #00ff4177' },
        }
      }
    },
  },
  plugins: [],
}
