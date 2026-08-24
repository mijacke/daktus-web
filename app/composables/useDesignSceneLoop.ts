import { gsap } from 'gsap'

import type { Ref } from 'vue'

interface DesignSceneLoopElements {
  /** Koreň scény — voči nemu sa merajú polohy kurzora. */
  root: Ref<HTMLElement | null>
  /** Artboard s transform-origin top-left, ktorý kurzor zmenšuje a zväčšuje. */
  board: Ref<HTMLElement | null>
  /** Obal kurzora — polohu aj stlačenie mu píše výhradne GSAP. */
  cursor: Ref<HTMLElement | null>
  /** Prstenec klik efektu vnútri obalu kurzora. */
  ring: Ref<HTMLElement | null>
  /** Biely a mintový swatch v palete. */
  paper: Ref<HTMLElement | null>
  mint: Ref<HTMLElement | null>
}

const SCALE_MIN = 0.92

/**
 * Slučka scény Dizajn ako GSAP timeline (repeat -1): kurzor klikne na roh
 * artboardu, ťahom ho zmenší, pustí, ťahom vráti, odletí do palety, klikom
 * (s prstencom) prepne rám výberu na bielu, ďalšie kolo späť na mint.
 * Polohy sa merajú pri štarte, takže sedia na každom breakpointe.
 */
export function useDesignSceneLoop(running: Ref<boolean>, els: DesignSceneLoopElements) {
  const reduced = useReducedMotion()
  const linePaper = ref(false)
  let tl: gsap.core.Timeline | null = null
  let delayTimer = 0

  /** Roh artboardu pri cieľovej mierke — origin top-left, ľavý horný roh stojí. */
  function cornerPoint(target: number) {
    const root = els.root.value
    const board = els.board.value
    if (!root || !board) return null
    const rootRect = root.getBoundingClientRect()
    const boardRect = board.getBoundingClientRect()
    return {
      x: boardRect.left - rootRect.left + board.offsetWidth * target - 3,
      y: boardRect.top - rootRect.top + board.offsetHeight * target - 2,
    }
  }

  function swatchCenter(swatch: HTMLElement) {
    const root = els.root.value
    if (!root) return null
    const rootRect = root.getBoundingClientRect()
    const rect = swatch.getBoundingClientRect()
    return { x: rect.left - rootRect.left + rect.width / 2 - 2, y: rect.top - rootRect.top + rect.height / 2 - 2 }
  }

  /** Klik: prstenec sa rozpŕskne od hrotu, prípadný swatch pruží. */
  function clickFx(swatch?: HTMLElement | null) {
    const ring = els.ring.value
    if (ring) gsap.fromTo(ring, { scale: 0.4, opacity: 0.9 }, { scale: 2.1, opacity: 0, duration: 0.55, ease: 'power2.out' })
    if (swatch) gsap.fromTo(swatch, { scale: 0.72 }, { scale: 1, duration: 0.45, ease: 'back.out(3)' })
  }

  function build() {
    const cursor = els.cursor.value
    const board = els.board.value
    const corner = cornerPoint(1)
    const cornerSmall = cornerPoint(SCALE_MIN)
    const paperAt = els.paper.value && swatchCenter(els.paper.value)
    const mintAt = els.mint.value && swatchCenter(els.mint.value)
    if (!cursor || !board || !corner || !cornerSmall || !paperAt || !mintAt) return

    // kurzor sa odkryje až tu — priamo na rohu, nikdy nie vľavo hore
    gsap.set(cursor, { x: corner.x, y: corner.y, autoAlpha: 1 })
    tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } })

    /** Klik na roh a ťah — artboard nasleduje kurzor na cieľovú mierku. */
    const drag = (to: { x: number, y: number }, scale: number) => {
      tl!.to(cursor, { scale: 0.82, duration: 0.12 })
      tl!.add(() => clickFx())
      tl!.to(cursor, { x: to.x, y: to.y, duration: 1.5 }, '+=0.05')
      tl!.to(board, { scale, duration: 1.5 }, '<')
      tl!.to(cursor, { scale: 1, duration: 0.18 })
      tl!.to({}, { duration: 0.45 })
    }

    /** Výlet hore doprava do palety, klik na swatch, návrat k rohu. */
    const paletteClick = (at: { x: number, y: number }, swatch: HTMLElement | null, toPaper: boolean) => {
      tl!.to(cursor, { x: at.x, y: at.y, duration: 0.9, ease: 'power3.out' })
      tl!.to(cursor, { scale: 0.82, duration: 0.1 })
      tl!.add(() => {
        clickFx(swatch)
        linePaper.value = toPaper
      })
      tl!.to(cursor, { scale: 1, duration: 0.16 }, '+=0.1')
      tl!.to({}, { duration: 0.4 })
      tl!.to(cursor, { x: corner.x, y: corner.y, duration: 0.9, ease: 'power3.out' })
      tl!.to({}, { duration: 0.35 })
    }

    drag(cornerSmall, SCALE_MIN)
    drag(corner, 1)
    paletteClick(paperAt, els.paper.value, true)
    drag(cornerSmall, SCALE_MIN)
    drag(corner, 1)
    paletteClick(mintAt, els.mint.value, false)
  }

  function stop() {
    clearTimeout(delayTimer)
    tl?.kill()
    tl = null
    // žiadny zamrznutý stav do ďalšieho otvorenia — mierka aj kurzor načisto
    if (els.board.value) gsap.set(els.board.value, { scale: 1 })
    if (els.cursor.value) gsap.set(els.cursor.value, { scale: 1, autoAlpha: 0 })
  }

  function start() {
    stop()
    // meraj až po dorolovaní karty (~1,05 s) — počas rozbaľovania je geometria v pohybe
    delayTimer = window.setTimeout(() => {
      if (reduced.value) {
        const corner = cornerPoint(1)
        const cursor = els.cursor.value
        if (corner && cursor) gsap.set(cursor, { x: corner.x, y: corner.y, autoAlpha: 1 })
        return
      }
      build()
    }, 1150)
  }

  // bez immediate — meranie polôh patrí až klientovi po otvorení karty
  watch(running, on => (on ? start() : stop()))

  onBeforeUnmount(stop)

  return { linePaper }
}
