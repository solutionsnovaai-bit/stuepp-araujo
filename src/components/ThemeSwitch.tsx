import { Moon, Sun } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useTheme } from '../hooks/useTheme'

export function useThemeClick() {
  const { toggle } = useTheme()
  return (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }
}

/** Interruptor Dia | Noite do cabeçalho. */
export default function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const { theme } = useTheme()
  const onClick = useThemeClick()
  const night = theme === 'noite'
  return <button className={`theme-switch ${compact ? 'is-compact' : ''}`} onClick={onClick} role="switch" aria-checked={night} aria-label={night ? 'Versão noite ativa. Mudar para a versão dia' : 'Versão dia ativa. Mudar para a versão noite'}>
    <span className={`theme-option ${!night ? 'is-active' : ''}`}><Sun size={14} strokeWidth={1.6} />{!compact && <span>Dia</span>}</span>
    <span className={`theme-option ${night ? 'is-active' : ''}`}><Moon size={14} strokeWidth={1.6} />{!compact && <span>Noite</span>}</span>
    <span className="theme-thumb" aria-hidden="true" />
  </button>
}
