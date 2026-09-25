import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ADV, LINE1, LINE2, MONO, MONO_VIEWBOX } from '../brand/glyphs'
import { Paths } from './BrandMark'

/* Pontos da haste fina do A, em fração da caixa do monograma. */
const HAIR = { x1: 0.4798, y1: 0.2244, x2: 0.2345, y2: 0.9135 }
const WORD_VIEWBOX = '578 1010 1664 830'
const MIN_DURATION = 3400
const MAX_WAIT = 6500
const LEAVE_DURATION = 1250

type Geometry = { w: number; h: number; xt: number; xb: number; ox: number; oy: number }

function Scene({ id }: { id: string }) {
  const advCenter = (ADV[0].b[0] + ADV[ADV.length - 1].b[2]) / 2
  return <div className="intro-art">
    <div className="intro-mono">
      <svg viewBox={MONO_VIEWBOX} aria-hidden="true">
        <defs>
          <pattern id={`fp${id}`} patternUnits="userSpaceOnUse" x="1096" y="280" width="760" height="760">
            <image href="/images/foil-450.webp" width="760" height="760" preserveAspectRatio="xMidYMid slice" />
          </pattern>
          <clipPath id={`mc${id}`}><Paths glyphs={MONO} /></clipPath>
          <linearGradient id={`sh${id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff7e0" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff7e0" stopOpacity=".95" />
            <stop offset="1" stopColor="#fff7e0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill={`url(#fp${id})`}><Paths glyphs={MONO} /></g>
        <g clipPath={`url(#mc${id})`}>
          <g transform="rotate(20 1400 600)"><rect className="intro-sheen" x="880" y="120" width="240" height="960" fill={`url(#sh${id})`} /></g>
        </g>
      </svg>
    </div>
    <svg className="intro-word" viewBox={WORD_VIEWBOX} aria-hidden="true">
      <defs>
        <pattern id={`fw${id}`} patternUnits="userSpaceOnUse" x="578" y="1010" width="820" height="820">
          <image href="/images/foil-450.webp" width="820" height="820" preserveAspectRatio="xMidYMid slice" />
        </pattern>
        <clipPath id={`c1${id}`}><rect x="560" y="1020" width="1700" height="275" /></clipPath>
        <clipPath id={`c2${id}`}><rect x="560" y="1296" width="1700" height="345" /></clipPath>
      </defs>
      <g fill={`url(#fw${id})`}>
        <g clipPath={`url(#c1${id})`}>{LINE1.map((g, i) => <g key={i} className="rise" style={{ '--i': i } as CSSProperties}><path transform={g.t} d={g.d} /></g>)}</g>
        <g clipPath={`url(#c2${id})`}>{LINE2.map((g, i) => <g key={i} className="rise" style={{ '--i': i + 7 } as CSSProperties}><path transform={g.t} d={g.d} /></g>)}</g>
        {ADV.map((g, i) => <g key={i} className="spread" style={{ '--i': i, '--dx': `${((advCenter - (g.b[0] + g.b[2]) / 2) * 0.42).toFixed(0)}px` } as CSSProperties}><path transform={g.t} d={g.d} /></g>)}
      </g>
    </svg>
  </div>
}

export default function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geometry | null>(null)
  const [leaving, setLeaving] = useState(false)
  const leaveRef = useRef(false)

  const measure = useCallback(() => {
    const root = rootRef.current
    const mono = root?.querySelector<HTMLElement>('.sheet-a .intro-mono')
    if (!root || !mono) return
    const W = window.innerWidth, H = window.innerHeight
    const r = mono.getBoundingClientRect()
    const p1 = { x: r.left + HAIR.x1 * r.width, y: r.top + HAIR.y1 * r.height }
    const p2 = { x: r.left + HAIR.x2 * r.width, y: r.top + HAIR.y2 * r.height }
    const dx = p2.x - p1.x, dy = p2.y - p1.y
    const xt = p1.x + (0 - p1.y) * dx / dy
    const xb = p1.x + (H - p1.y) * dx / dy
    const L = Math.hypot(xb - xt, H)
    const dist = Math.hypot(W, H) * 0.62
    setGeo({ w: W, h: H, xt, xb, ox: (H / L) * dist, oy: ((xt - xb) / L) * dist })
  }, [])

  useLayoutEffect(() => {
    measure()
    let t = 0
    const onResize = () => { clearTimeout(t); t = window.setTimeout(measure, 120) }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [measure])

  const leave = useCallback(() => {
    if (leaveRef.current) return
    leaveRef.current = true
    setLeaving(true)
    onReveal()
    window.setTimeout(onDone, LEAVE_DURATION)
  }, [onReveal, onDone])

  useEffect(() => {
    let cancelled = false
    const hero = new Image()
    hero.src = window.matchMedia('(max-width: 768px)').matches ? '/images/hero-dia-mobile.webp' : '/images/hero-dia-desktop.webp'
    const minimum = new Promise<void>(resolve => window.setTimeout(resolve, MIN_DURATION))
    Promise.allSettled([hero.decode(), document.fonts.ready, minimum]).then(() => { if (!cancelled) leave() })
    const failsafe = window.setTimeout(() => { if (!cancelled) leave() }, MAX_WAIT)
    return () => { cancelled = true; clearTimeout(failsafe) }
  }, [leave])

  const vars = geo ? { '--xt': `${geo.xt}px`, '--xb': `${geo.xb}px`, '--ox': `${geo.ox}px`, '--oy': `${geo.oy}px` } as CSSProperties : undefined
  const slash = geo && <svg className="intro-slash" viewBox={`0 0 ${geo.w} ${geo.h}`} preserveAspectRatio="none" aria-hidden="true">
    <line className="slash-glow" x1={geo.xt} y1={0} x2={geo.xb} y2={geo.h} pathLength={1} />
    <line className="slash-core" x1={geo.xt} y1={0} x2={geo.xb} y2={geo.h} pathLength={1} />
  </svg>

  return <div ref={rootRef} className={`intro ${geo ? 'is-playing' : ''} ${leaving ? 'is-leaving' : ''}`} style={vars} role="status" aria-label="Abrindo o manual de identidade Stuepp & Araújo">
    <div className="intro-sheet sheet-a">
      <div className="intro-paper" />
      {slash}
      <div className="intro-stage"><Scene id="a" /><p className="intro-caption">Manual de identidade visual</p></div>
    </div>
    <div className="intro-sheet sheet-b" aria-hidden="true">
      <div className="intro-paper" />
      {slash}
      <div className="intro-stage"><Scene id="b" /><p className="intro-caption">Manual de identidade visual</p></div>
    </div>
    {geo && <span className="intro-nib" aria-hidden="true" style={{ offsetPath: `path('M ${geo.xt} 0 L ${geo.xb} ${geo.h}')` } as CSSProperties} />}
    <button className="intro-skip" onClick={leave}>Pular abertura</button>
  </div>
}
