import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { srcSet } from '../assets'
import { useSceneActivity } from '../hooks/useSceneActivity'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

/** Placa às 10h e às 22h. Varre sozinha até alguém pegar no controle. */
export default function DayNight() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useSceneActivity(ref, 0.2)
  const { reduced } = useMotionPreferences()
  const [pos, setPos] = useState<number | null>(null)
  const dragging = useRef(false)
  const setFrom = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)))
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const cur = pos ?? 50
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPos(Math.max(0, cur - 5)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setPos(Math.min(100, cur + 5)) }
    if (e.key === 'Home') { e.preventDefault(); setPos(0) }
    if (e.key === 'End') { e.preventDefault(); setPos(100) }
  }
  const auto = pos === null
  return <section className="section daynight-section" aria-labelledby="daynight-title">
    <div className="wrap daynight-head">
      <h2 id="daynight-title" className="daynight-title">A mesma placa, às 10h e às 22h.</h2>
      <p>Arraste a linha. A marca atravessa o dia sem perder a presença.</p>
    </div>
    <div ref={ref} className={`compare wrap-wide ${auto ? 'is-auto' : ''} ${auto && active && !reduced ? 'is-moving' : ''}`}
      style={auto ? undefined : { ['--pos' as string]: `${pos}%` }}
      role="slider" tabIndex={0} aria-label="Comparar placa de dia e de noite" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos ?? 50)} aria-valuetext={`${Math.round(pos ?? 50)}% dia`}
      onKeyDown={onKey}
      onPointerDown={e => { dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); setFrom(e) }}
      onPointerMove={e => { if (dragging.current) setFrom(e) }}
      onPointerUp={() => { dragging.current = false }} onPointerCancel={() => { dragging.current = false }}>
      <img className="compare-base" src="/images/placa-noite.webp" srcSet={srcSet('placa-noite')} sizes="(max-width: 1400px) 96vw, 1340px" width="1448" height="1086" alt="Placa de latão com o logo, à noite, iluminada por um spot" loading="lazy" decoding="async" draggable={false} />
      <img className="compare-top" src="/images/placa-dia.webp" srcSet={srcSet('placa-dia')} sizes="(max-width: 1400px) 96vw, 1340px" width="1448" height="1086" alt="A mesma placa durante o dia, com sol rasante na pedra" loading="lazy" decoding="async" draggable={false} />
      <div className="compare-handle" aria-hidden="true"><span className="compare-line" /><span className="compare-knob"><MoveHorizontal size={18} strokeWidth={1.6} /></span></div>
      <span className="compare-tag tag-dia" aria-hidden="true">10h</span>
      <span className="compare-tag tag-noite" aria-hidden="true">22h</span>
    </div>
  </section>
}
