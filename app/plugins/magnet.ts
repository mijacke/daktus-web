import { gsap } from 'gsap'

const handlers = new WeakMap<HTMLElement, (event: MouseEvent) => void>()

/** Šírka citlivého lemu okolo tlačidla v px — mimo neho sa magnet nechytá. */
const HALO = 16

/** Najväčší posun tlačidla v px — drift je rovnaký pre široké aj úzke tlačidlo. */
const SHIFT = 15

/**
 * v-magnet — jemné priťahovanie prvku ku kurzoru (len presný pointer, bez reduced motion).
 * Modifikátor `.left` / `.right` obmedzí vodorovný ťah na jednu stranu, takže susedná
 * dvojica tlačidiel sa od seba len vzďaľuje a nikdy sa vizuálne nezlepí.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement>('magnet', {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (import.meta.server) return
      if (!window.matchMedia('(pointer: fine)').matches) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const clampX = gsap.utils.clamp(
        binding.modifiers.right ? 0 : -SHIFT,
        binding.modifiers.left ? 0 : SHIFT,
      )
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const onMove = (event: MouseEvent) => {
        if (!el.offsetParent) return
        const rect = el.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        // Pole kopíruje tvar tlačidla + úzky halo; kruh podľa šírky siahal zvisle priďaleko.
        const nx = dx / (rect.width / 2 + HALO)
        const ny = dy / (rect.height / 2 + HALO)
        const near = nx * nx + ny * ny < 1
        xTo(near ? clampX(nx * SHIFT) : 0)
        yTo(near ? ny * SHIFT : 0)
      }
      window.addEventListener('mousemove', onMove, { passive: true })
      handlers.set(el, onMove)
    },
    unmounted(el) {
      const onMove = handlers.get(el)
      if (onMove) window.removeEventListener('mousemove', onMove)
      handlers.delete(el)
    },
  })
})
