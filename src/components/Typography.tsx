import { useRef } from 'react'
import Chapter from './Chapter'
import { useFoilLight } from '../hooks/useFoilLight'

export default function Typography() {
  const aa = useRef<HTMLSpanElement>(null)
  useFoilLight(aa)
  return <section id="tipografia" className="section type-section">
    <div className="wrap">
      <Chapter n="04" title="Letra de inscrição">
        <p>Uma romana gravada em pedra para os títulos, uma sem serifa limpa para o texto do dia a dia.</p>
      </Chapter>
      <div className="type-grid">
        <article className="type-card type-display">
          <span ref={aa} className="type-aa foil-text" aria-hidden="true">Aa</span>
          <div className="type-meta"><h3>Cinzel</h3><p>Títulos, capas e peças institucionais. Conversa com o desenho do nome no logo.</p></div>
          <p className="type-sample-display">Direito do Trabalho</p>
          <p className="type-alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ ÁÂÃÉÊÍÓÔÕÚÇ 0123456789</p>
        </article>
        <article className="type-card type-text">
          <span className="type-aa type-aa-sans" aria-hidden="true">Aa</span>
          <div className="type-meta"><h3>Instrument Sans</h3><p>Textos, legendas, site, propostas e documentos.</p></div>
          <div className="type-weights"><span style={{ fontWeight: 400 }}>Regular 400</span><span style={{ fontWeight: 500 }}>Médio 500</span><span style={{ fontWeight: 600 }}>Seminegrito 600</span></div>
          <p className="type-sample-text">Cada caso começa com uma conversa. Ouvimos a história inteira antes de falar em processo, prazo ou estratégia.</p>
        </article>
      </div>
      <p className="type-rule">O nome no logo é um desenho próprio da marca. Nunca redigite a assinatura com uma fonte: use sempre o arquivo oficial.</p>
    </div>
  </section>
}
