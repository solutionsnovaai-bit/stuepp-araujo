import { useId, useRef } from 'react'
import type { CSSProperties } from 'react'
import { ADV, LINE1, LINE2, LOGO_VIEWBOX, MONO, MONO_VIEWBOX } from '../brand/glyphs'
import type { Glyph } from '../brand/glyphs'
import { useFoilLight } from '../hooks/useFoilLight'

export const Paths = ({ glyphs }: { glyphs: Glyph[] }) => <>{glyphs.map((g, i) => <path key={i} transform={g.t} d={g.d} />)}</>

/** Gradiente do metal para usos pequenos (cabeçalho, favicon, ícones). */
function GoldGradient({ id }: { id: string }) {
  return <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#E1B866" /><stop offset=".45" stopColor="#AA7A35" /><stop offset=".7" stopColor="#C09146" /><stop offset="1" stopColor="#6C4316" />
  </linearGradient>
}

export function MonogramIcon({ className = '', title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, '')
  return <svg className={className} viewBox={MONO_VIEWBOX} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
    <defs><GoldGradient id={`g${id}`} /></defs>
    <g fill={`url(#g${id})`}><Paths glyphs={MONO} /></g>
  </svg>
}

/** Assinatura completa em vetor, na cor que o contexto pedir. */
export function LogoVector({ className = '', fill = 'currentColor', label = 'Stuepp & Araújo Advocacia' }: { className?: string; fill?: string; label?: string }) {
  return <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={label}>
    <g fill={fill}><Paths glyphs={MONO} /><Paths glyphs={LINE1} /><Paths glyphs={LINE2} /><Paths glyphs={ADV} /></g>
  </svg>
}

/**
 * Marca em foil: a forma vem do SVG como máscara, o metal vem da textura,
 * e o brilho segue o cursor. Duas camadas estáticas por trás fazem o efeito prensado.
 */
export function FoilMark({ kind = 'monograma', className = '', style, label }: { kind?: 'monograma' | 'logo'; className?: string; style?: CSSProperties; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useFoilLight(ref)
  return <div ref={ref} className={`foil-mark foil-${kind} ${className}`} style={style} role="img" aria-label={label}>
    <span className="foil-layer foil-shadow" aria-hidden="true" />
    <span className="foil-layer foil-edge" aria-hidden="true" />
    <span className="foil-layer foil-metal" aria-hidden="true" />
  </div>
}
