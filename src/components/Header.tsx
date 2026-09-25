import { useEffect, useState } from 'react'
import { MonogramIcon } from './BrandMark'
import ThemeSwitch from './ThemeSwitch'

const links = [
  { id: 'monograma', name: 'Monograma' },
  { id: 'cores', name: 'Cores' },
  { id: 'tipografia', name: 'Tipografia' },
  { id: 'papelaria', name: 'Papelaria' },
  { id: 'fotografia', name: 'Fotografia' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const sections = links.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => io.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <a className="brand-link" href="#inicio" aria-label="Stuepp & Araújo, voltar ao início">
      <MonogramIcon className="brand-mono" />
      <span className="brand-name">Stuepp & Araújo<small>Manual de identidade</small></span>
    </a>
    <nav className="desktop-nav" aria-label="Capítulos do manual">
      {links.map((l, i) => <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} aria-current={active === l.id ? 'true' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{l.name}</a>)}
    </nav>
    <div className="header-actions"><ThemeSwitch /></div>
  </header>
}
