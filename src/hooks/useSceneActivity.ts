import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

/** Run ambient motion only while its scene is visible in a foreground tab. */
export function useSceneActivity(ref: RefObject<HTMLElement | null>, threshold = 0.15) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    let inView = false
    const update = () => setActive(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update() }, { threshold })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [ref, threshold])
  return active
}
