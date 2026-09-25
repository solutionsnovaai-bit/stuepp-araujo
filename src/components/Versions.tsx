import { X } from 'lucide-react'
import Chapter from './Chapter'
import { LogoVector, MonogramIcon } from './BrandMark'
import { srcSet } from '../assets'

const misuse = [
  { cls: 'mis-stretch', text: 'Esticar ou achatar.' },
  { cls: 'mis-color', text: 'Trocar o ouro por outra cor.' },
  { cls: 'mis-rotate', text: 'Girar ou inclinar.' },
  { cls: 'mis-type', text: 'Redigitar o nome com uma fonte.' },
]

export default function Versions() {
  return <section id="versoes" className="section versions-section">
    <div className="wrap">
      <Chapter n="02" title="Duas versões">
        <p>A mesma assinatura em dois papéis. O ouro não muda: o que muda é a luz ao redor dele.</p>
      </Chapter>
      <div className="versions-grid">
        <figure className="version-card">
          <div className="version-image"><img src="/images/logo-dia.webp" srcSet={srcSet('logo-dia')} sizes="(max-width: 768px) 92vw, 45vw" width="1448" height="1086" loading="lazy" decoding="async" alt="Assinatura em ouro sobre papel algodão claro" /></div>
          <figcaption><strong>Dia</strong><span>Ouro sobre papel algodão. Para papelaria, documentos, propostas e fundos claros.</span></figcaption>
        </figure>
        <figure className="version-card">
          <div className="version-image"><img src="/images/logo-noite.webp" srcSet={srcSet('logo-noite')} sizes="(max-width: 768px) 92vw, 45vw" width="1448" height="1086" loading="lazy" decoding="async" alt="Assinatura em ouro sobre papel preto" /></div>
          <figcaption><strong>Noite</strong><span>Ouro sobre papel preto. Para placa, redes sociais, apresentações e fundos escuros.</span></figcaption>
        </figure>
      </div>
      <div className="misuse">
        <h3>O que não fazer</h3>
        <ul className="misuse-grid">
          {misuse.map(m => <li key={m.cls} className="misuse-card">
            <div className={`misuse-art ${m.cls}`}>
              {m.cls === 'mis-type'
                ? <div className="mis-type-lockup" aria-hidden="true"><MonogramIcon className="mis-type-mono" /><span>STUEPP & ARAÚJO</span><small>ADVOCACIA</small></div>
                : <LogoVector className="misuse-logo" label="" />}
              <span className="misuse-x" aria-hidden="true"><X size={16} strokeWidth={2} /></span>
            </div>
            <p>{m.text}</p>
          </li>)}
        </ul>
      </div>
    </div>
  </section>
}
