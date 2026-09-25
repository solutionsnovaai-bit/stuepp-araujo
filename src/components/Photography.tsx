import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Chapter from './Chapter'
import { areas, photos, principles } from '../content'
import { STILL_FULL, srcSet } from '../assets'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

const INTERVAL = 2600
const N = photos.length

export default function Photography() {
  const ref = useRef<HTMLElement>(null)
  const visible = useSceneActivity(ref)
  const { reduced } = useMotionPreferences()
  const [index, setIndex] = useState(0)
  const [holding, setHolding] = useState(false)
  const start = useRef<number | null>(null)
  const running = visible && !reduced && !holding
  const go = useCallback((d: number) => setIndex(i => (i + d + N) % N), [])
  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => go(1), INTERVAL)
    return () => clearTimeout(t)
  }, [running, index, go])
  const current = photos[index]
  return <section id="fotografia" ref={ref} className="section photo-section">
    <div className="wrap">
      <Chapter n="06" title="Fotografia">
        <p>Luz de janela e gente de verdade. As imagens contam o direito pelo que ele toca: a carteira, as mãos, a assinatura.</p>
      </Chapter>
      <ul className="principles">{principles.map((p, i) => <motion.li key={p.title} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: i * 0.08 }}>
        <h3>{p.title}</h3><p>{p.text}</p>
      </motion.li>)}</ul>
      <div className="area-tabs" role="tablist" aria-label="Áreas de atuação">
        {areas.map(a => <button key={a} role="tab" aria-selected={current.area === a} className={current.area === a ? 'is-active' : ''} onClick={() => setIndex(photos.findIndex(p => p.area === a))}>{a}</button>)}
      </div>
    </div>
    <div className="coverflow" tabIndex={0} role="region" aria-roledescription="carrossel" aria-label="Fotografias por área. Passa sozinho; use as setas do teclado ou arraste."
      onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) } }}
      onPointerDown={e => { start.current = e.clientX; setHolding(true) }}
      onPointerUp={e => { if (start.current !== null) { const dx = e.clientX - start.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1) } start.current = null; setHolding(false) }}
      onPointerLeave={() => { start.current = null; setHolding(false) }}>
      <div className="coverflow-stage">
        {photos.map((p, i) => {
          let o = i - index
          if (o > N / 2) o -= N
          if (o < -N / 2) o += N
          const far = Math.abs(o) > 2
          return <figure key={p.image} className={`cover-card ${o === 0 ? 'is-active' : ''}`} aria-hidden={o !== 0}
            style={{ transform: `translate3d(calc(${o} * var(--cover-step)), 0, 0) scale(${o === 0 ? 1 : 0.8})`, opacity: far ? 0 : o === 0 ? 1 : 0.42, zIndex: 10 - Math.abs(o) }}
            onClick={() => { if (o !== 0) go(o) }}>
            <img src={`/images/${p.image}.webp`} srcSet={srcSet(p.image, STILL_FULL)} sizes="(max-width: 768px) 80vw, 600px" width="1292" height="966" alt={p.alt} loading="lazy" decoding="async" draggable={false} />
            <span className="cover-area">{p.area}</span>
          </figure>
        })}
      </div>
      <motion.p key={index} className="cover-caption" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{current.caption}</motion.p>
      <div className="cover-dots" aria-hidden="true">{photos.map((p, i) => <span key={p.image} className={i === index ? 'is-active' : ''}>{i === index && <i key={`${index}-${running}`} style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? 'running' : 'paused' }} />}</span>)}</div>
    </div>
  </section>
}
