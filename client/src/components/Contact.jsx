import React, { useRef, useState } from 'react'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SOCIALS = [
  { label:'EMAIL',    value:'gauravjangid1911@gmail.com', icon:'✉', href:'mailto:gauravjangid1911@gmail.com', color:'var(--acid)' },
  { label:'PHONE',    value:'+91 9785593133',             icon:'☏', href:'tel:+919785593133',                 color:'var(--cyan)' },
  { label:'LINKEDIN', value:'Gaurav Jangid',              icon:'◉', href:'https://www.linkedin.com/in/gaurav-jangid-91149a2a8/', color:'var(--pink)' },
  { label:'GITHUB',   value:'GauravJangid2004',           icon:<GitHubIcon />, href:'https://github.com/GauravJangid2004', color:'var(--white)' },
]

export default function Contact() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once:false, margin:'-80px' })
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm({ name:'', email:'', subject:'', message:'' })
        setTimeout(() => setStatus(null), 4000)
      } else {
        setError(data.error || 'Something went wrong.')
        setStatus(null)
      }
    } catch (err) {
      setError('Network error. Please try again or email directly.')
      setStatus(null)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={headerRef}
          initial={{ opacity:0, y:30 }}
          animate={inView?{opacity:1,y:0}:{opacity:0,y:30}}
          transition={{ duration:0.7 }}
          className="mb-20"
        >
          <p className="section-tag mb-2">// LOG_005</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color:'white' }}>
            GET<span style={{color:'var(--acid)'}}>_IN_</span>TOUCH<span style={{color:'var(--acid)'}}>.</span>
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 max-w-xs" style={{ background:'linear-gradient(to right, var(--acid), transparent)' }}/>
            <span className="font-mono text-xs" style={{ color:'rgba(224,224,224,0.4)' }}>OPEN FOR INTERNSHIPS</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:false}} transition={{duration:0.7}}>
            <p className="font-mono text-sm leading-relaxed mb-10" style={{ color:'rgba(224,224,224,0.6)' }}>
              Open to internship opportunities in <span style={{color:'var(--cyan)'}}>Cybersecurity</span>,{' '}
              <span style={{color:'var(--acid)'}}>Full-Stack Development</span>, or{' '}
              <span style={{color:'var(--pink)'}}>Software Engineering</span>. Reach out — let's build something secure together.
            </p>
            <div className="space-y-4 mb-10">
              {SOCIALS.map((s,i)=>(
                <motion.a key={s.label} href={s.href} target={s.href.startsWith('http')?'_blank':undefined} rel="noreferrer" data-hover
                  initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:false}} transition={{delay:i*0.1,duration:0.5}}
                  className="flex items-center gap-4 glass rounded-xl p-4 group transition-all duration-300"
                  style={{ border:`1px solid ${s.color}22` }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=`${s.color}55`}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=`${s.color}22`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background:`${s.color}15`, color:s.color }}>{s.icon}</div>
                  <div><p className="text-xs font-mono tracking-widest mb-0.5" style={{ color:`${s.color}99` }}>{s.label}</p><p className="font-mono text-sm" style={{ color:'rgba(224,224,224,0.8)' }}>{s.value}</p></div>
                  <span className="ml-auto font-mono text-sm transition-transform group-hover:translate-x-1" style={{ color:s.color }}>→</span>
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-3 glass rounded-xl p-4" style={{ border:'1px solid rgba(0,255,65,0.15)' }}>
              <div className="relative"><div className="w-3 h-3 rounded-full bg-green-400"/><div className="w-3 h-3 rounded-full bg-green-400 absolute inset-0 animate-ping opacity-60"/></div>
              <div><p className="font-mono text-xs" style={{ color:'var(--acid)' }}>AVAILABLE FOR OPPORTUNITIES</p><p className="font-mono text-xs" style={{ color:'rgba(224,224,224,0.4)' }}>Jaipur, Rajasthan, India</p></div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:false}} transition={{duration:0.7}}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[{name:'name',label:'NAME',placeholder:'John Doe',type:'text'},{name:'email',label:'EMAIL',placeholder:'john@example.com',type:'email'}].map(field=>(
                  <div key={field.name}>
                    <label className="section-tag block mb-2">{field.label}</label>
                    <input type={field.type} name={field.name} value={form[field.name]} onChange={handleChange}
                      onFocus={()=>setFocusedField(field.name)} onBlur={()=>setFocusedField(null)}
                      placeholder={field.placeholder} required
                      className="cyber-input w-full px-4 py-3 rounded-lg text-sm"
                      style={{ boxShadow:focusedField===field.name?'0 0 20px rgba(0,255,65,0.2)':'none' }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="section-tag block mb-2">SUBJECT</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange}
                  onFocus={()=>setFocusedField('subject')} onBlur={()=>setFocusedField(null)}
                  placeholder="Internship Opportunity" required
                  className="cyber-input w-full px-4 py-3 rounded-lg text-sm"
                  style={{ boxShadow:focusedField==='subject'?'0 0 20px rgba(0,255,65,0.2)':'none' }}
                />
              </div>
              <div>
                <label className="section-tag block mb-2">MESSAGE</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  onFocus={()=>setFocusedField('message')} onBlur={()=>setFocusedField(null)}
                  placeholder="Hi Gaurav, I'd like to discuss..." rows={5} required
                  className="cyber-input w-full px-4 py-3 rounded-lg text-sm resize-none"
                  style={{ boxShadow:focusedField==='message'?'0 0 20px rgba(0,255,65,0.2)':'none' }}
                />
              </div>

              {error && <p className="font-mono text-xs" style={{ color:'var(--pink)' }}>⚠ {error}</p>}

              <button type="submit" data-hover disabled={status==='sending'}
                className="w-full py-4 font-orbitron font-bold text-sm tracking-widest relative overflow-hidden"
                style={{ background:status==='sent'?'rgba(0,255,65,0.15)':'var(--acid)', color:status==='sent'?'var(--acid)':'var(--dark)', border:status==='sent'?'1px solid var(--acid)':'none', clipPath:'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)', boxShadow:'0 0 30px rgba(0,255,65,0.3)' }}
              >
                <AnimatePresence mode="wait">
                  {status==='sending' && <motion.span key="s" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>TRANSMITTING...</motion.span>}
                  {status==='sent'    && <motion.span key="d" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>✓ MESSAGE SENT</motion.span>}
                  {!status            && <motion.span key="i" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>TRANSMIT_MESSAGE →</motion.span>}
                </AnimatePresence>
              </button>
              {/* <p className="font-mono text-xs text-center" style={{ color:'rgba(224,224,224,0.25)' }}>Messages stored</p> */}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:false}} transition={{delay:0.5,duration:0.8}}
          className="mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop:'1px solid rgba(0,255,65,0.1)' }}
        >
          <span className="font-orbitron font-black text-lg" style={{ color:'var(--acid)' }}>GJ<span className="blink">_</span></span>
          <p className="font-mono text-xs text-center" style={{ color:'rgba(224,224,224,0.3)' }}>© 2025 GAURAV_JANGID // MERN STACK // ALL RIGHTS RESERVED</p>
          <span className="font-mono text-xs" style={{ color:'rgba(0,255,65,0.5)' }}>v2.1.0</span>
        </motion.div>
      </div>
    </section>
  )
}
