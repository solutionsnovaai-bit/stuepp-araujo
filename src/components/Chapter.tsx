import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreferences } from '../hooks/useMotionPreferences'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Abertura de capítulo: o fio de ouro corre e o título sobe de trás dele.
 * O disparo é do bloco inteiro (o título mascarado não é "visível" para o observer).
 */
export default function Chapter({ n, title, children }: { n: string; title: string; children?: ReactNode }) {
  const { reduced } = useMotionPreferences()
  return <motion.div className="chapter" initial={reduced ? 'show' : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.35 }}>
    <div className="chapter-mark">
      <span className="chapter-n">{n}</span>
      <motion.span className="chapter-rule" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease } } }} />
    </div>
    <h2 className="chapter-title"><span className="line-mask">
      <motion.span variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1, delay: 0.12, ease } } }}>{title}</motion.span>
    </span></h2>
    {children && <motion.div className="chapter-intro" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.3, ease } } }}>{children}</motion.div>}
  </motion.div>
}
