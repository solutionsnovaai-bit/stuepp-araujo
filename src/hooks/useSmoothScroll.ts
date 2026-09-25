import { useEffect } from 'react'
import { useMotionPreferences } from './useMotionPreferences'
import type Lenis from 'lenis'

/** Native touch/keyboard scrolling remains intact; desktop inertia runs on demand. */
export function useSmoothScroll(enabled: boolean) {
  const { reduced } = useMotionPreferences()
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!enabled || reduced || !finePointer.matches) return

    let disposed = false
    let instance: Lenis | undefined
    let frame = 0
    let previous = 0
    let virtualTime = 0
    const tick = (time: number) => {
      if (!instance || disposed || document.hidden) { frame = 0; return }
      virtualTime += Math.min(Math.max(time - previous, 0), 32)
      previous = time
      instance.raf(virtualTime)
      frame = instance.isScrolling === 'smooth' ? requestAnimationFrame(tick) : 0
    }
    const wake = () => {
      if (disposed || !instance || document.hidden || frame) return
      previous = performance.now()
      frame = requestAnimationFrame(tick)
    }
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; instance?.stop() }
      else { instance?.start(); wake() }
    }
    const onPointerChange = () => {
      if (!finePointer.matches) { cancelAnimationFrame(frame); frame = 0; instance?.destroy(); instance = undefined }
    }

    void import('lenis').then(({ default: SmoothScroll }) => {
      if (disposed || !finePointer.matches) return
      instance = new SmoothScroll({
        autoRaf: false,
        lerp: 0.095,
        smoothWheel: true,
        syncTouch: false,
        anchors: { duration: 1.05 },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        prevent: node => node.closest('[data-lenis-prevent]') !== null,
      })
      instance.on('scroll', wake)
      window.addEventListener('wheel', wake, { passive: true })
      window.addEventListener('click', wake)
      document.addEventListener('visibilitychange', visibility)
      finePointer.addEventListener('change', onPointerChange)
    }).catch(() => {
      // A failed optional chunk never prevents native navigation or scrolling.
    })

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      instance?.destroy()
      window.removeEventListener('wheel', wake)
      window.removeEventListener('click', wake)
      document.removeEventListener('visibilitychange', visibility)
      finePointer.removeEventListener('change', onPointerChange)
    }
  }, [enabled, reduced])
}
