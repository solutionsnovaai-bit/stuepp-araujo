import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Faz a luz do foil seguir o cursor. Lê o retângulo e escreve duas variáveis CSS
 * uma vez por quadro, só enquanto o elemento está na tela e só com mouse.
 */
export function useFoilLight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    let visible = false
    let frame = 0
    let px = 0
    let py = 0
    const apply = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const x = ((px - r.left) / r.width) * 100
      const y = ((py - r.top) / r.height) * 100
      el.style.setProperty('--lx', `${Math.max(-30, Math.min(130, x)).toFixed(1)}%`)
      el.style.setProperty('--ly', `${Math.max(-30, Math.min(130, y)).toFixed(1)}%`)
    }
    const onMove = (e: PointerEvent) => {
      if (!visible || e.pointerType !== 'mouse') return
      px = e.clientX; py = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      el.classList.toggle('foil-in-view', visible)
    }, { threshold: 0 })
    io.observe(el)
    if (fine.matches) {
      el.classList.add('foil-follows')
      window.addEventListener('pointermove', onMove, { passive: true })
    }
    return () => { io.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('pointermove', onMove) }
  }, [ref])
}
