import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/** Plynulé scrollovanie (Lenis) synchronizované s GSAP ScrollTriggerom. */
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { provide: { lenis: null } }
  }

  const lenis = new Lenis({ anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return { provide: { lenis: lenis as Lenis | null } }
})
