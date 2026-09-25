import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Chapter from './Chapter'
import { stationery } from '../content'
import { srcSet } from '../assets'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'
import { useTheme } from '../hooks/useTheme'

const INTERVAL = 3000
const ease = [0.22, 1, 0.36, 1] as const
const sizes = '(max-width: 900px) 100vw, 62vw'

/** Par dia/noite empilhado: o tema decide qual aparece, sem recarregar nada. */
export function PairImage({ name, alt, sizes: s = sizes, eager = false }: { name: string; alt: string; sizes?: string; eager?: boolean }) {
  return <>
    <img className="pair-img is-dia" src={`/images/${name}-dia.webp`} srcSet={srcSet(`${name}-dia`)} sizes={s} width="1448" height="1086" alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" draggable={false} />
    <img className="pair-img is-noite" src={`/images/${name}-noite.webp`} srcSet={srcSet(`${name}-noite`)} sizes={s} width="1448" height="1086" alt="" loading="lazy" decoding="async" draggable={false} />
  </>
}

function Filmstrip() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useSceneActivity(ref, 0)
  const { reduced } = useMotionPreferences()
  const frames = stationery.flatMap(s => [`${s.image}-dia`, `${s.image}-noite`])
  return <div ref={ref} className={`filmstrip ${active && !reduced ? 'is-moving' : ''}`} aria-hidden="true">
    <div className="filmstrip-track">{[0, 1].map(c => <div className="filmstrip-group" key={c}>
      {frames.map(f => <div className="filmstrip-frame" key={f}><img src={`/images/${f}-640.webp`} width="640" height="480" alt="" loading="lazy" decoding="async" /></div>)}
    </div>)}</div>
  </div>
}

export default function Stationery() {
  const { reduced } = useMotionPreferences()
  const { theme } = useTheme()
  const ref = useRef<HTMLElement>(null)
  const visible = useSceneActivity(ref)
  const [[index, dir], setSlide] = useState([0, 1])
  const [holding, setHolding] = useState(false)
  const start = useRef<{ x: number; y: number } | null>(null)
  const running = visible && !reduced && !holding
  const go = useCallback((d: number) => setSlide(([i]) => [(i + d + stationery.length) % stationery.length, d]), [])
  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => go(1), INTERVAL)
    return () => clearTimeout(t)
  }, [running, index, go])
  useEffect(() => {
    if (!visible) return
    const next = stationery[(index + 1) % stationery.length]
    const t = window.setTimeout(() => {
      for (const v of ['dia', 'noite']) { const im = new Image(); im.decoding = 'async'; im.sizes = sizes; im.srcset = srcSet(`${next.image}-${v}`); im.src = `/images/${next.image}-${v}.webp` }
    }, 250)
    return () => clearTimeout(t)
  }, [visible, index])
  const slide = stationery[index]
  return <section id="papelaria" ref={ref} className="section stationery-section">
    <div className="wrap">
      <Chapter n="05" title="Papelaria">
        <p>Do papel timbrado à placa da porta. Cada peça existe nas duas versões, e as fotos acompanham o tema que você escolher lá no topo.</p>
      </Chapter>
    </div>
    <div className="gallery wrap" tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Peças de papelaria. Passa sozinho; use as setas do teclado ou arraste."
      onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) } }}>
      <div className="gallery-visual"
        onPointerDown={e => { start.current = { x: e.clientX, y: e.clientY }; setHolding(true); e.currentTarget.setPointerCapture(e.pointerId) }}
        onPointerUp={e => { if (start.current) { const dx = e.clientX - start.current.x, dy = e.clientY - start.current.y; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1) } start.current = null; setHolding(false) }}
        onPointerCancel={() => { start.current = null; setHolding(false) }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div key={slide.image} className="gallery-slide" custom={dir}
            variants={{ enter: (d: number) => ({ opacity: 0, scale: 1.06, x: reduced ? 0 : d * 60 }), center: { opacity: 1, scale: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, scale: 0.98, x: reduced ? 0 : d * -40 }) }}
            initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.8, ease }}>
            <PairImage name={slide.image} alt={`${slide.title}, versão ${theme}`} />
          </motion.div>
        </AnimatePresence>
        <span className="gallery-badge">Versão {theme}</span>
      </div>
      <div className="gallery-story">
        <span className="gallery-count" aria-hidden="true">{String(index + 1).padStart(2, '0')}<small> / {String(stationery.length).padStart(2, '0')}</small></span>
        <motion.div key={index} className="gallery-copy" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }} aria-live="off">
          <h3>{slide.title}</h3>
          <p>{slide.text}</p>
          <span className="gallery-spec">{slide.spec}</span>
        </motion.div>
        <div className="gallery-timeline" aria-hidden="true">{stationery.map((s, i) => <button tabIndex={-1} key={s.image} className={i < index ? 'is-complete' : ''} onClick={() => setSlide([i, i > index ? 1 : -1])}>
          {i === index && <i key={`${index}-${running}`} style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? 'running' : 'paused' }} />}
        </button>)}</div>
      </div>
    </div>
    <Filmstrip />
  </section>
}
