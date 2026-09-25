import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'dia' | 'noite'
type Ctx = { theme: Theme; toggle: (origin?: { x: number; y: number }) => void }
const ThemeContext = createContext<Ctx>({ theme: 'dia', toggle: () => {} })

const COLORS: Record<Theme, string> = { dia: '#EDE8E1', noite: '#0E0D0C' }

/** A apresentação sempre abre na versão dia. A troca usa View Transitions quando o navegador suporta. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dia')
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme === 'noite' ? 'dark' : 'light'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme])
  }, [theme])
  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = theme === 'dia' ? 'noite' : 'dia'
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.motion-is-paused') !== null
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }
    if (!doc.startViewTransition || reduced) { setTheme(next); return }
    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? window.innerHeight / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${r}px`)
    root.classList.add('is-theme-switching')
    const transition = doc.startViewTransition(() => { flushSync(() => setTheme(next)) })
    transition.finished.finally(() => root.classList.remove('is-theme-switching'))
  }, [theme])
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
