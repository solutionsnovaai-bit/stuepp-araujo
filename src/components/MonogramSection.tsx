import { useState } from 'react'
import { Grid3x3 } from 'lucide-react'
import Chapter from './Chapter'
import { FoilMark } from './BrandMark'

/* Palco em coordenadas do vetor: monograma (1096..1740 × 280..904) com folga para a área de proteção. */
const STAGE = { x: 940, y: 124, w: 956, h: 936 }
const pct = (v: number, o: number, s: number) => `${((v - o) / s) * 100}%`

export default function MonogramSection() {
  const [guides, setGuides] = useState(false)
  const pad = 153
  return <section id="monograma" className="section monogram-section">
    <div className="wrap">
      <Chapter n="01" title="O monograma">
        <p>O S e o A dividem o mesmo traço. A haste fina do A atravessa o S como uma assinatura: dois sobrenomes, uma só marca.</p>
      </Chapter>
      <div className="monogram-grid">
        <div className={`mono-stage ${guides ? 'show-guides' : ''}`}>
          <FoilMark kind="monograma" label="Monograma SA em ouro" style={{ left: pct(1096, STAGE.x, STAGE.w), top: pct(280, STAGE.y, STAGE.h), width: pct(1096 + 644, 1096, STAGE.w), height: pct(280 + 624, 280, STAGE.h) }} />
          <svg className="mono-guides" viewBox={`${STAGE.x} ${STAGE.y} ${STAGE.w} ${STAGE.h}`} aria-hidden="true">
            <rect className="g-dash" x={1102 - pad} y={286 - pad} width={632 + pad * 2} height={612 + pad * 2} pathLength={1} />
            <rect className="g-line" x="1102" y="286" width="632" height="612" pathLength={1} />
            <line className="g-line" x1="960" y1="898" x2="1876" y2="898" pathLength={1} />
            <line className="g-line" x1="960" y1="286" x2="1876" y2="286" pathLength={1} />
            <line className="g-hair" x1="1498" y1="170" x2="1180" y2="1030" pathLength={1} />
            <path className="g-line" d="M 1180 1030 L 1330 1030" pathLength={1} />
            <path className="g-arc" d="M 1300 1030 A 120 120 0 0 0 1222 917" pathLength={1} />
            <text className="g-label" x="1340" y="1000">69,6°</text>
            <text className="g-label" x={1102 - pad + 14} y={286 - pad + 44}>x</text>
            <text className="g-label" x={1102 - 60} y={600}>x</text>
            <text className="g-label g-label-sm" x={1102 - pad + 14} y={1045}>x = ¼ da altura</text>
          </svg>
          <button className="guide-toggle" onClick={() => setGuides(v => !v)} aria-pressed={guides}><Grid3x3 size={16} strokeWidth={1.5} />{guides ? 'Esconder construção' : 'Mostrar construção'}</button>
        </div>
        <dl className="spec-list">
          <div><dt>Ângulo do traço</dt><dd>69,6°. É o mesmo corte que abriu este manual.</dd></div>
          <div><dt>Área de proteção</dt><dd>Um quarto da altura do monograma livre em todos os lados. Nada entra nesse espaço.</dd></div>
          <div><dt>Tamanho mínimo</dt><dd>Monograma: 24 px na tela e 12 mm impresso. Assinatura completa: 120 px e 30 mm.</dd></div>
          <div><dt>Onde usar sozinho</dt><dd>Avatar, favicon, lacre, relevo seco, verso do cartão e detalhes em couro.</dd></div>
        </dl>
      </div>
    </div>
  </section>
}
