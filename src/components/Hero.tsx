import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, Moon, Sun } from 'lucide-react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useTheme } from '../hooks/useTheme'
import { useThemeClick } from './ThemeSwitch'

const ease = [0.22, 1, 0.36, 1] as const

function Plate({ theme }: { theme: 'dia' | 'noite' }) {
  return <picture className={`hero-shot is-${theme}`}>
    <source media="(max-width: 768px)" srcSet={`/images/hero-${theme}-mobile-640.webp 640w, /images/hero-${theme}-mobile.webp 941w`} sizes="100vw" />
    <img src={`/images/hero-${theme}-desktop.webp`} srcSet={`/images/hero-${theme}-desktop-960.webp 960w, /images/hero-${theme}-desktop.webp 1672w`} sizes="100vw"
      alt={theme === 'dia' ? 'Assinatura Stuepp & Araújo Advocacia em hot stamping ouro sobre papel algodão' : ''}
      width="1672" height="941" decoding="async" fetchPriority={theme === 'dia' ? 'high' : 'low'} />
  </picture>
}

export default function Hero({ ready }: { ready: boolean }) {
  const { reduced } = useMotionPreferences()
  const { theme } = useTheme()
  const onTheme = useThemeClick()
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 22, mass: 1.1 })
  const y = useSpring(my, { stiffness: 60, damping: 22, mass: 1.1 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const move = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX / r.width - 0.5) * -22)
    my.set(((e.clientY - r.top) / r.height - 0.5) * -14)
  }
  const night = theme === 'noite'
  const lines = ['Feita para o dia.', 'E para a noite.']
  return <section id="inicio" ref={ref} className={`hero ${ready ? 'is-ready' : ''}`} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0) }}>
    <div className="hero-plate-frame" aria-hidden={false}>
      <motion.div className="hero-plate" style={reduced ? {} : { x, y, translateY: drift }}>
        <Plate theme="dia" />
        <Plate theme="noite" />
      </motion.div>
    </div>
    <motion.div className="hero-content wrap" style={reduced ? {} : { opacity: fade }}>
      <p className="hero-label"><span className="hero-rule" />Manual de identidade visual</p>
      <h1 aria-label={lines.join(' ')}>
        {lines.map((l, i) => <span className="line-mask" aria-hidden="true" key={l}>
          <motion.span initial={reduced ? false : { y: '112%' }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.1, delay: 0.25 + i * 0.14, ease }}>{l}</motion.span>
        </span>)}
      </h1>
      <motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 18 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.7, ease }}>
        <p>A nova identidade do escritório reunida em um só lugar: monograma, cores, tipografia, papelaria e fotografia. Duas versões, a mesma assinatura.</p>
        <div className="hero-actions">
          <button className="button button-gold" onClick={onTheme}>{night ? <Sun size={18} strokeWidth={1.6} /> : <Moon size={18} strokeWidth={1.6} />}<span>{night ? 'Acender a luz' : 'Apagar a luz'}</span></button>
          <a className="text-link" href="#monograma">Conhecer o monograma</a>
        </div>
      </motion.div>
    </motion.div>
    <a className="scroll-cue" href="#monograma" aria-label="Rolar para o monograma"><span /><ArrowDown size={15} strokeWidth={1.5} /></a>
  </section>
}
