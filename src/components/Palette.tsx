import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import Chapter from './Chapter'
import { baseColors, foilGradient, goldRamp, proportions } from '../content'
import type { Swatch } from '../content'
import { useTheme } from '../hooks/useTheme'

const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(' ')

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true } catch {
    const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'
    document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); return ok
  }
}

function Disc({ s, onCopy, kind }: { s: Swatch; onCopy: (v: string) => void; kind: 'base' | 'gold' }) {
  return <li className={`swatch swatch-${kind}`}>
    <button className="disc-button" onClick={() => onCopy(s.hex)} aria-label={`${s.name}, ${s.hex}. Copiar código`}>
      <span className="disc" style={{ background: s.hex }}><span className="disc-copy" aria-hidden="true"><Copy size={16} strokeWidth={1.6} /></span></span>
    </button>
    <div className="swatch-info">
      <strong>{s.name}</strong>
      <span className="swatch-hex">{s.hex}</span>
      <span className="swatch-rgb">RGB {rgb(s.hex)}</span>
      {kind === 'base' && <p>{s.use}</p>}
    </div>
  </li>
}

export default function Palette() {
  const { theme } = useTheme()
  const [toast, setToast] = useState('')
  const timer = useRef(0)
  const onCopy = async (value: string) => {
    const ok = await copyText(value)
    setToast(ok ? `${value} copiado` : 'Não deu para copiar. Selecione o código manualmente.')
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(''), 2200)
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  const bar = proportions[theme]
  return <section id="cores" className="section palette-section">
    <div className="wrap">
      <Chapter n="03" title="Papel, tinta e ouro">
        <p>Quatro neutros e uma escada de ouro. Toque em qualquer cor para copiar o código.</p>
      </Chapter>
      <ul className="base-discs">{baseColors.map(s => <Disc key={s.hex} s={s} onCopy={onCopy} kind="base" />)}</ul>

      <div className="gold-block">
        <div className="gold-head"><h3>A escada do ouro</h3><p>Seis tons que, juntos, desenham o metal. O Ouro #AA7A35 é a cor da marca; os outros existem para dar luz e sombra.</p></div>
        <ul className="gold-discs">{goldRamp.map(s => <Disc key={s.hex} s={s} onCopy={onCopy} kind="gold" />)}</ul>
        <div className="foil-bar" style={{ backgroundImage: `${foilGradient}` }}>
          <span className="foil-bar-texture" aria-hidden="true" />
          <button className="foil-bar-copy" onClick={() => onCopy(foilGradient)}><Copy size={15} strokeWidth={1.6} />Copiar o gradiente do foil</button>
        </div>
      </div>

      <div className="proportion">
        <div className="proportion-head"><h3>Proporção na versão {theme}</h3><p>Muito papel, pouca tinta e o ouro na medida certa. Troque a versão no topo e veja a proporção virar.</p></div>
        <div className="proportion-bar" role="img" aria-label={bar.map(b => `${b.name} ${b.share}%`).join(', ')}>
          {bar.map(b => <span key={b.name + theme} style={{ flexGrow: b.share, background: b.hex }} className={b.hex === '#EDE8E1' || b.hex === '#C09146' || b.hex === '#AA7A35' ? 'on-light' : 'on-dark'}>
            <em>{b.name}</em><b>{b.share}%</b>
          </span>)}
        </div>
      </div>
    </div>
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">{toast && <><Check size={16} strokeWidth={2} />{toast}</>}</div>
  </section>
}
