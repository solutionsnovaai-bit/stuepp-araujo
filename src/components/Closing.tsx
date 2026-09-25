import { ArrowUp, Moon, Sun } from 'lucide-react'
import { FoilMark } from './BrandMark'
import { useTheme } from '../hooks/useTheme'
import { useThemeClick } from './ThemeSwitch'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

export default function Closing() {
  const { theme } = useTheme()
  const onTheme = useThemeClick()
  const { paused, toggle } = useMotionPreferences()
  const night = theme === 'noite'
  return <footer className="closing">
    <div className="wrap closing-inner">
      <FoilMark kind="monograma" className="closing-mark" label="Monograma SA" />
      <p className="closing-title">Stuepp & Araújo<br />Advocacia</p>
      <p className="closing-text">Manual de identidade visual, primeira edição. Setembro de 2026.</p>
      <div className="closing-actions">
        <button className="button button-gold" onClick={onTheme}>{night ? <Sun size={18} strokeWidth={1.6} /> : <Moon size={18} strokeWidth={1.6} />}<span>{night ? 'Ver de dia' : 'Ver à noite'}</span></button>
        <a className="text-link" href="#inicio"><ArrowUp size={15} strokeWidth={1.6} />Voltar ao início</a>
      </div>
    </div>
    <div className="wrap closing-bottom">
      <span>Apresentação desenvolvida por Nova AI Solutions.</span>
      <button className="motion-toggle" onClick={toggle} aria-pressed={paused}>{paused ? 'Retomar movimento' : 'Pausar movimento'}</button>
    </div>
  </footer>
}
