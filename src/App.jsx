import { lazy, Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Navigation, ChevronDown, Heart } from 'lucide-react'
import './index.css'

const W = {
  groom: 'Vinay',
  bride: 'Jaynita',
  groomFullName: 'Vinay',
  brideFullName: 'Jaynita',
  weddingDate: '2026-09-20T10:00:00',
  displayDate: 'June 27, 2026',
  weddingDay: 'Saturday',
  venue: 'Veerdency Luxury Resort',
  venueAddress: 'Near Riverside, Udaipur, Rajasthan',
  mapUrl: 'https://www.google.com/maps?q=Veerdency+Luxury+Resort+Udaipur+Rajasthan&output=embed',
  hashtag: '#AronSira',
  inviteMsg: 'Two souls bound by destiny, two families joined by love.',
  events: [
    {
      title: 'Haldi',
      description: 'A joyful pre-wedding ritual where family and friends apply turmeric paste for blessings and good luck.',
      day: 'Fri',
      date: 'September 18, 2026',
      time: '11:00 AM',
      venue: 'Krupa Apartments, Nairobi, Kenya',
      mapUrl: 'https://maps.app.goo.gl/e62Xy5J3VsVAVVjo7',
      color: 'from-yellow-500 to-yellow-800',
      image: '/haldi.png',
    },
    {
      title: 'Mehndi',
      description: 'An evening of intricate henna art, music, and celebration as the bride is adorned with beautiful mehndi designs.',
      day: 'Fri',
      date: 'September 18, 2026',
      time: '2:00 PM',
      venue: 'Krupa Apartments, Nairobi, Kenya',
      mapUrl: 'https://maps.app.goo.gl/e62Xy5J3VsVAVVjo7',
      color: 'from-emerald-700 to-emerald-950',
      image: '/mehendi.png',
    },
    {
      title: 'Sangeet',
      description: 'A night of music, dance, and celebration as both families come together for an unforgettable evening of joy.',
      day: 'Sat',
      date: 'September 19, 2026',
      time: '3:30 PM',
      venue: 'Jain Bhavan, Nairobi, Kenya',
      mapUrl: 'https://maps.app.goo.gl/zxwDKaajZq8gNAxj7',
      color: 'from-teal-700 to-teal-950',
      image: '/sangeet.png',
    },
    {
      title: 'Wedding',
      description: 'The sacred union of two souls as they take their vows around the holy fire.',
      day: 'Sun',
      date: 'September 20, 2026',
      time: '10:00 AM',
      venue: 'Naiposha Gardens, Nairobi, Kenya',
      mapUrl: 'https://maps.app.goo.gl/vvUKC6R2AQi3Xbcn8',
      color: 'from-blue-800 to-blue-950',
      image: '/wedding.png',
    },
  ],
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function FloatingPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      emoji: ['🌸', '🌿', '🌼', '🌺', '💮', '🌷', '🏵️', '🍃'][i % 8],
      left: `${Math.random() * 95 + 2}%`,
      size: `${Math.random() * 14 + 18}px`,
      duration: `${Math.random() * 12 + 12}s`,
      delay: `${Math.random() * 8}s`,
    })), [])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map(p => (
        <span
          key={p.id}
          className="absolute animate-float-petal"
          style={{
            left: p.left,
            top: '-10vh',
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            filter: 'drop-shadow(0 2px 4px hsl(var(--ink) / 0.1))',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function ButterflySVG({ color1 = '#C9A84C', color2 = '#E8C97E', size = 38 }) {
  return (
    <svg width={size} height={size * 0.84} viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
      <g>
        <ellipse cx="32" cy="26" rx="1.6" ry="11" fill="#1f2937" />
        <circle cx="32" cy="14" r="2.2" fill="#1f2937" />
        <path d="M32 13 C 29 8, 27 6, 25 5" stroke="#1f2937" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M32 13 C 35 8, 37 6, 39 5" stroke="#1f2937" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M30 22 C 10 10, 2 22, 6 32 C 10 42, 24 38, 30 30 Z" fill={color1} opacity="0.95" />
        <path d="M30 30 C 18 38, 10 44, 14 48 C 20 50, 28 42, 30 36 Z" fill={color2} opacity="0.95" />
        <path d="M34 22 C 54 10, 62 22, 58 32 C 54 42, 40 38, 34 30 Z" fill={color1} opacity="0.95" />
        <path d="M34 30 C 46 38, 54 44, 50 48 C 44 50, 36 42, 34 36 Z" fill={color2} opacity="0.95" />
        <circle cx="14" cy="26" r="1.6" fill="#fff" opacity="0.85" />
        <circle cx="50" cy="26" r="1.6" fill="#fff" opacity="0.85" />
      </g>
    </svg>
  )
}

function MultipleButterflies() {
  const butterflies = useMemo(() => [
    { id: 0, top: '10vh', duration: '14s', size: 42, color1: '#C9A84C', color2: '#E8C97E', anim: 'bf0' },
    { id: 1, top: '30vh', duration: '18s', size: 32, color1: '#8B5CF6', color2: '#C4B5FD', anim: 'bf1' },
    { id: 2, top: '50vh', duration: '20s', size: 36, color1: '#E8956D', color2: '#FF6B9D', anim: 'bf2' },
    { id: 3, top: '20vh', duration: '16s', size: 28, color1: '#60a5fa', color2: '#93c5fd', anim: 'bf3' },
    { id: 4, top: '60vh', duration: '22s', size: 34, color1: '#f472b6', color2: '#fbcfe8', anim: 'bf4' },
  ], [])

  return (
    <>
      {butterflies.map(b => (
        <div
          key={b.id}
          className="bf-fixed"
          aria-hidden="true"
          style={{
            top: b.top,
            animationName: b.anim,
            animationDuration: b.duration,
          }}
        >
          <span className="bf-wings">
            <ButterflySVG color1={b.color1} color2={b.color2} size={b.size} />
          </span>
        </div>
      ))}
    </>
  )
}

function MusicPlayer({ start }) {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !start) return
    audio.volume = 0.45
    audio.loop = true
    audio.muted = false
    audio.play().catch(() => {})
  }, [start])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.muted = muted
  }, [muted])

  return (
    <>
      <audio ref={audioRef} src="/music.mp4" preload="auto" />
      {start && (
        <button
          type="button"
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          onClick={() => {
            const audio = audioRef.current
            if (muted) { audio.muted = false; audio.play().catch(() => {}) }
            else { audio.muted = true }
            setMuted(m => !m)
          }}
          className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full bg-foreground/80 text-cream backdrop-blur shadow-elegant flex items-center justify-center hover:scale-105 transition"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </>
  )
}

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const diff = Math.max(0, target - now)
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    calc()
    const timer = setInterval(calc, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-4 sm:gap-6 justify-center">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="glass rounded-xl w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center ornate-border">
            <AnimatePresence mode="wait">
              <motion.span
                key={u.value}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className="font-cinzel text-2xl sm:text-3xl text-gold font-semibold"
              >
                {String(u.value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="font-cinzel text-[10px] sm:text-xs text-gold-soft/80 mt-2 uppercase tracking-widest">{u.label}</span>
        </div>
      ))}
    </div>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-cream">
      <img
        src="/front-page-1.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />


      <motion.div style={{ y, opacity }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center -mt-32">
        <Reveal delay={0.2}>
          <h1 className="text-6xl sm:text-8xl md:text-9xl leading-tight flex items-center gap-2 sm:gap-4 flex-wrap justify-center" style={{ fontFamily: '"DancingScript", cursive', color: '#c43c46' }}>
            <span>{W.groom}</span>
            <span className="text-4xl sm:text-5xl md:text-6xl italic" style={{ fontFamily: '"DancingScript", cursive', color: '#c43c46' }}>&</span>
            <span>{W.bride}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.9}>
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-gold/60" />
          </motion.div>
        </Reveal>
      </motion.div>
    </section>
  )
}

function CountdownSection() {
  return (
    <section className="section-padding bg-cream relative">
      <Reveal>
        <div className="text-center max-w-lg mx-auto">
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold-soft uppercase mb-2">Counting down to</p>
          <h2 className="font-script text-4xl sm:text-5xl text-foreground mb-2">Our Special Day</h2>
          <div className="flex items-center gap-3 justify-center my-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-gold">✦</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <div className="mt-8">
            <Countdown targetDate={W.weddingDate} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function EventsSection() {
  return (
    <section className="section-padding bg-cream-dark relative">
      <Reveal>
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold-soft uppercase mb-2">Celebrations</p>
          <h2 className="font-script text-4xl sm:text-5xl text-foreground">Our Events</h2>
          <div className="flex items-center gap-3 justify-center mt-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-gold">❀</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
        </div>
      </Reveal>

      <div className="max-w-5xl mx-auto space-y-8">
        {W.events.map((event, i) => (
          <Reveal key={event.title} delay={i * 0.15}>
            {event.image ? (
              <div className="event-card border border-gold/20 group overflow-hidden rounded-2xl relative min-h-[380px] sm:min-h-[440px]">
                <img src={event.image} alt={event.title} loading="lazy" width="1200" height="600" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8 sm:p-10 text-center text-cream">
                  <h3 className="font-script text-5xl text-cream mb-2">{event.title}</h3>
                  <p className="italic text-base text-cream/80 max-w-md mx-auto whitespace-pre-line">{event.description}</p>
                  <div className="flex items-center gap-3 justify-center my-5">
                    <span className="h-px w-10 bg-cream/30" />
                    <span className="text-gold-light">❀</span>
                    <span className="h-px w-10 bg-cream/30" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="font-cinzel text-sm text-gold-light/80">Date</div>
                      <div className="font-serif-display text-xl mt-1 text-cream">{event.day} · {event.date}</div>
                    </div>
                    <div>
                      <div className="font-cinzel text-sm text-gold-light/80">Time</div>
                      <div className="font-serif-display text-xl mt-1 text-cream">{event.time}</div>
                    </div>
                    <div>
                      <div className="font-cinzel text-sm text-gold-light/80">Venue</div>
                      <div className="font-serif-display text-lg mt-1 text-cream">{event.venue}</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-cream/30 text-cream hover:bg-cream/10 transition-all duration-300">
                      <Navigation className="w-3.5 h-3.5" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="event-card border border-gold/20 group overflow-hidden rounded-2xl">
                <div className={`relative bg-gradient-to-br ${event.color} p-8 sm:p-10`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 text-center text-cream">
                    <h3 className="font-script text-5xl text-cream mb-2">{event.title}</h3>
                    <p className="italic text-base text-cream/80 max-w-md mx-auto whitespace-pre-line">{event.description}</p>
                    <div className="flex items-center gap-3 justify-center my-5">
                      <span className="h-px w-10 bg-cream/30" />
                      <span className="text-gold-light">❀</span>
                      <span className="h-px w-10 bg-cream/30" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="font-cinzel text-sm text-gold-light/80">Date</div>
                        <div className="font-serif-display text-xl mt-1 text-cream">{event.day} · {event.date}</div>
                      </div>
                      <div>
                        <div className="font-cinzel text-sm text-gold-light/80">Time</div>
                        <div className="font-serif-display text-xl mt-1 text-cream">{event.time}</div>
                      </div>
                      <div>
                        <div className="font-cinzel text-sm text-gold-light/80">Venue</div>
                        <div className="font-serif-display text-lg mt-1 text-cream">{event.venue}</div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-cinzel text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-cream/30 text-cream hover:bg-cream/10 transition-all duration-300">
                        <Navigation className="w-3.5 h-3.5" />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function RSVPSection() {
  const [form, setForm] = useState({ name: '', guests: '1', side: '', events: [], message: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const eventList = [
    { id: 'haldi', label: 'Haldi — Sep 18, 11:00 AM' },
    { id: 'mehndi', label: 'Mehndi — Sep 18, 2:00 PM' },
    { id: 'sangeet', label: 'Sangeet — Sep 19, 3:30 PM' },
    { id: 'wedding', label: 'Wedding — Sep 20, 10:00 AM' },
  ]

  const toggleEvent = (id) => {
    setForm(prev => ({
      ...prev,
      events: prev.events.includes(id)
        ? prev.events.filter(e => e !== id)
        : [...prev.events, id]
    }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.side) e.side = 'Please select a side'
    if (form.events.length === 0) e.events = 'Please select at least one event'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setDone(true)
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-cream border ${
      errors[field] ? 'border-red-400' : 'border-gold/30'
    } font-serif-display text-foreground placeholder-foreground/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition`

  return (
    <section className="section-padding bg-cream-dark relative">
      <Reveal>
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[0.3em] text-gold-soft uppercase mb-2">Respond</p>
          <h2 className="font-script text-4xl sm:text-5xl text-foreground">RSVP</h2>
          <div className="flex items-center gap-3 justify-center mt-4">
            <span className="h-px w-10 bg-gold/40" />
            <span className="text-gold">❀</span>
            <span className="h-px w-10 bg-gold/40" />
          </div>
          <p className="font-serif-display text-sm text-foreground/60 mt-4 max-w-md mx-auto">
            We would be honored by your presence.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-lg mx-auto">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 ornate-border text-center"
            >
              <div className="text-5xl mb-4">💌</div>
              <h3 className="font-script text-4xl text-foreground mb-2">Thank You!</h3>
              <p className="font-serif-display text-base text-foreground/70">
                Your response has been received.<br />We look forward to celebrating with you!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 sm:p-10 ornate-border space-y-5">
              <div>
                <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: '#8B6914' }}>Full Name</label>
                <input
                  type="text"
                  className={inputClass('name')}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 font-serif-display">{errors.name}</p>}
              </div>

              <div>
                <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: '#8B6914' }}>Number of Guests</label>
                <select
                  className={inputClass('guests')}
                  value={form.guests}
                  onChange={e => setForm({ ...form, guests: e.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: '#8B6914' }}>Which Side?</label>
                <select
                  className={inputClass('side')}
                  value={form.side}
                  onChange={e => setForm({ ...form, side: e.target.value })}
                >
                  <option value="">Select side</option>
                  <option value="bride">Bride's Side</option>
                  <option value="groom">Groom's Side</option>
                </select>
                {errors.side && <p className="text-red-400 text-xs mt-1 font-serif-display">{errors.side}</p>}
              </div>

              <div>
                <label className="font-cinzel text-xs tracking-widest uppercase block mb-3" style={{ color: '#8B6914' }}>Functions Attending</label>
                <div className="space-y-2">
                  {eventList.map(ev => (
                    <label key={ev.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={form.events.includes(ev.id)}
                        onChange={() => toggleEvent(ev.id)}
                        className="w-5 h-5 rounded border-gold/40 text-gold accent-gold focus:ring-gold/30"
                      />
                      <span className="font-serif-display text-foreground/80 group-hover:text-foreground transition">{ev.label}</span>
                    </label>
                  ))}
                </div>
                {errors.events && <p className="text-red-400 text-xs mt-1 font-serif-display">{errors.events}</p>}
              </div>

              <div>
                <label className="font-cinzel text-xs tracking-widest uppercase block mb-2" style={{ color: '#8B6914' }}>Message (Optional)</label>
                <textarea
                  className={`${inputClass('message')} resize-none`}
                  rows={3}
                  placeholder="Your wishes for the couple..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center font-serif-display">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-cream font-cinzel text-sm tracking-widest uppercase hover:shadow-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-cream-dark to-cream py-16 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="mandala absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '400px', height: '400px' }}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <Reveal>
        <div className="relative z-10">
          <div className="flex items-center gap-3 justify-center mb-6">
            <span className="h-px w-10 bg-gold/40" />
            <Heart className="w-4 h-4 text-gold" fill="currentColor" />
            <span className="h-px w-10 bg-gold/40" />
          </div>

          <h2 className="text-5xl sm:text-6xl mb-2" style={{ fontFamily: '"DancingScript", cursive', color: '#c43c46' }}>
            {W.groom} <span className="text-3xl italic" style={{ fontFamily: '"DancingScript", cursive', color: '#c43c46' }}>&</span> {W.bride}
          </h2>

          <div className="gold-line w-32 mx-auto my-8" />

          <p className="font-serif-display text-sm text-foreground/50 italic">
            Made with love for the most beautiful day
          </p>
        </div>
      </Reveal>
    </footer>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    document.title = `${W.groom} & ${W.bride} - Wedding Invitation`
  }, [])

  return (
    <div className="relative">
      {!started && (
        <div
          onClick={() => setStarted(true)}
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center cursor-pointer"
        >
          <div className="text-center">
            <img src="/envelop.png" alt="Open Invitation" className="w-56 sm:w-72 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-200" />
            <p className="mt-4 font-script text-xl text-white drop-shadow-lg">Tap to open</p>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        <FloatingPetals />
        <MultipleButterflies />
      </Suspense>
      <MusicPlayer start={started} />

      <style>{`
        .bf-fixed {
          position: fixed;
          top: 0; left: 0;
          z-index: 40;
          pointer-events: none;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .bf-wings {
          display: inline-block;
          animation: butterflyFlap 0.25s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes bf0 {
          0%   { transform: translate(15vw, 10vh) rotate(-8deg) scale(1); }
          15%  { transform: translate(35vw, 25vh) rotate(6deg) scale(1.05); }
          35%  { transform: translate(55vw, 15vh) rotate(-4deg) scale(0.95); }
          55%  { transform: translate(75vw, 30vh) rotate(8deg) scale(1.1); }
          75%  { transform: translate(90vw, 20vh) rotate(-6deg) scale(1); }
          100% { transform: translate(110vw, 25vh) rotate(4deg) scale(1); }
        }
        @keyframes bf1 {
          0%   { transform: translate(5vw, 40vh) rotate(5deg) scale(0.9); }
          20%  { transform: translate(25vw, 30vh) rotate(-7deg) scale(1); }
          40%  { transform: translate(48vw, 45vh) rotate(3deg) scale(1.05); }
          60%  { transform: translate(70vw, 35vh) rotate(-5deg) scale(0.95); }
          80%  { transform: translate(92vw, 42vh) rotate(7deg) scale(1); }
          100% { transform: translate(115vw, 38vh) rotate(-3deg) scale(0.9); }
        }
        @keyframes bf2 {
          0%   { transform: translate(25vw, 55vh) rotate(-6deg) scale(0.95); }
          25%  { transform: translate(45vw, 48vh) rotate(4deg) scale(1.05); }
          50%  { transform: translate(65vw, 58vh) rotate(-8deg) scale(1); }
          75%  { transform: translate(85vw, 50vh) rotate(6deg) scale(0.95); }
          100% { transform: translate(112vw, 52vh) rotate(-4deg) scale(1); }
        }
        @keyframes bf3 {
          0%   { transform: translate(10vw, 28vh) rotate(7deg) scale(0.85); }
          20%  { transform: translate(30vw, 18vh) rotate(-5deg) scale(0.95); }
          45%  { transform: translate(52vw, 32vh) rotate(8deg) scale(1); }
          65%  { transform: translate(72vw, 22vh) rotate(-6deg) scale(0.9); }
          85%  { transform: translate(95vw, 28vh) rotate(4deg) scale(0.95); }
          100% { transform: translate(118vw, 24vh) rotate(-7deg) scale(0.85); }
        }
        @keyframes bf4 {
          0%   { transform: translate(8vw, 65vh) rotate(4deg) scale(0.9); }
          18%  { transform: translate(28vw, 55vh) rotate(-6deg) scale(1); }
          38%  { transform: translate(50vw, 68vh) rotate(5deg) scale(0.95); }
          58%  { transform: translate(72vw, 58vh) rotate(-8deg) scale(1.05); }
          78%  { transform: translate(93vw, 62vh) rotate(6deg) scale(0.9); }
          100% { transform: translate(116vw, 60vh) rotate(-4deg) scale(0.95); }
        }
        @keyframes butterflyFlap {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.55); }
        }
      `}</style>

      <main className="relative animate-fade-in">
        <HeroSection />
        <CountdownSection />
        <EventsSection />
        <RSVPSection />
        <Footer />
      </main>
    </div>
  )
}
