import { useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Intro from './components/Intro'
import Header from './components/Header'
import Hero from './components/Hero'
import WordRibbon from './components/WordRibbon'
import MonogramSection from './components/MonogramSection'
import Versions from './components/Versions'
import Palette from './components/Palette'
import Typography from './components/Typography'
import Stationery from './components/Stationery'
import DayNight from './components/DayNight'
import Photography from './components/Photography'
import Closing from './components/Closing'
import { MotionPreferencesProvider, useMotionPreferences } from './hooks/useMotionPreferences'
import { ThemeProvider } from './hooks/useTheme'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function Site() {
  const { reduced } = useMotionPreferences()
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [ready, setReady] = useState(!intro)
  useSmoothScroll(!intro)
  const reveal = useCallback(() => setReady(true), [])
  const done = useCallback(() => setIntro(false), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30 })
  useEffect(() => {
    if (!intro) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [intro])
  return <>
    {intro && <Intro onReveal={reveal} onDone={done} />}
    <div inert={intro && !ready}>
      <a className="skip-link" href="#monograma">Pular para o conteúdo</a>
      <motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} />
      <Header />
      <main>
        <Hero ready={ready} />
        <WordRibbon />
        <MonogramSection />
        <Versions />
        <Palette />
        <Typography />
        <Stationery />
        <DayNight />
        <Photography />
      </main>
      <Closing />
    </div>
  </>
}

export default function App() {
  return <ThemeProvider><MotionPreferencesProvider><Site /></MotionPreferencesProvider></ThemeProvider>
}
