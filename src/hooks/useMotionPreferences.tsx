import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'

const MotionPreferences = createContext({ paused: false, reduced: false, toggle: () => {} })
export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const reduced = Boolean(systemReduced) || paused
  return <MotionPreferences.Provider value={{ paused, reduced, toggle: () => setPaused(value => !value) }}>
    <MotionConfig reducedMotion={reduced ? 'always' : 'user'}><div className={reduced ? 'motion-is-paused' : ''}>{children}</div></MotionConfig>
  </MotionPreferences.Provider>
}
export const useMotionPreferences = () => useContext(MotionPreferences)
