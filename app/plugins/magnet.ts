import { gsap } from 'gsap'

const handlers = new WeakMap<HTMLElement, (event: MouseEvent) => void>()

/** v-magnet — jemné priťahovanie prvku ku kurzoru (len presný pointer, bez reduced motion). */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement>('magnet', {
    getSSRProps: () => ({}),
    mounted(el) {
      if (import.meta.server) return
      if (!window.matchMedia('(pointer: fine)').matches) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const onMove = (event: MouseEvent) => {
        if (!el.offsetParent) return
        const rect = el.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        const near = Math.hypot(dx, dy) < Math.max(rect.width, 90)
        xTo(near ? dx * 0.28 : 0)
        yTo(near ? dy * 0.28 : 0)
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
