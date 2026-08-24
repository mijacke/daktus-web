import type { Ref } from 'vue'

interface DesignSceneLoopElements {
  /** Koreň scény — voči nemu sa merajú polohy kurzora. */
  root: Ref<HTMLElement | null>
  /** Artboard s transform-origin top-left, ktorý dýcha mierkou. */
  board: Ref<HTMLElement | null>
  /** Biely swatch v palete. */
  paper: Ref<HTMLElement | null>
  /** Mintový swatch v palete. */
  mint: Ref<HTMLElement | null>
}

const SCALE_MIN = 0.92
const BREATH_MS = 2600

/**
 * Slučka scény Dizajn: kurzor drží pravý dolný roh artboardu a donekonečna
 * ho zmenšuje a zväčšuje; po troch cykloch si odskočí do palety, klikom
 * prepne farbu rámu výberu (mint ↔ biela) a vráti sa k rohu. Polohy sa
 * merajú za behu, takže sedia na každom breakpointe.
 */
export function useDesignSceneLoop(running: Ref<boolean>, els: DesignSceneLoopElements) {
  const reduced = useReducedMotion()
  const scale = ref(1)
  const linePaper = ref(false)
  const pressed = ref<'paper' | 'mint' | null>(null)
  const cursorStyle = ref<Record<string, string>>({})
  let timers: number[] = []

  function schedule(fn: () => void, ms: number) {
    timers.push(window.setTimeout(fn, ms))
  }

  function move(x: number, y: number, seconds: number, ease: string) {
    cursorStyle.value = {
      transform: `translate(${Math.round(x)}px, ${Math.round(y)}px)`,
      transitionDuration: `${seconds}s`,
      transitionTimingFunction: ease,
    }
  }

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

  function swatchPoint(swatch: HTMLElement) {
    const root = els.root.value
    if (!root) return null
    const rootRect = root.getBoundingClientRect()
    const rect = swatch.getBoundingClientRect()
    return { x: rect.left - rootRect.left + rect.width / 2 - 2, y: rect.top - rootRect.top + rect.height / 2 - 2 }
  }

  /** Dýchanie: mierka hore-dole s kurzorom na rohu; po troch cykloch výlet. */
  function breathe(step: number) {
    const target = step % 2 === 0 ? SCALE_MIN : 1
    scale.value = target
    const corner = cornerPoint(target)
    if (corner) move(corner.x, corner.y, BREATH_MS / 1000, 'ease-in-out')
    if (step >= 5) schedule(paletteTrip, BREATH_MS)
    else schedule(() => breathe(step + 1), BREATH_MS)
  }

  /** Výlet do palety: klik prepne rám výberu na bielu, nabudúce späť na mint. */
  function paletteTrip() {
    const toPaper = !linePaper.value
    const swatch = toPaper ? els.paper.value : els.mint.value
    const point = swatch && swatchPoint(swatch)
    if (!point) {
      breathe(0)
      return
    }
    move(point.x, point.y, 0.9, 'cubic-bezier(0.22, 1, 0.36, 1)')
    schedule(() => {
      pressed.value = toPaper ? 'paper' : 'mint'
      linePaper.value = toPaper
      schedule(() => (pressed.value = null), 260)
      schedule(() => {
        const corner = cornerPoint(1)
        if (corner) move(corner.x, corner.y, 0.9, 'cubic-bezier(0.22, 1, 0.36, 1)')
        schedule(() => breathe(0), 950)
      }, 700)
    }, 950)
  }

  function stop() {
    timers.forEach(timer => clearTimeout(timer))
    timers = []
  }

  function start() {
    stop()
    scale.value = 1
    // meraj až po dorolovaní karty (~1,05 s) — počas rozbaľovania je geometria v pohybe
    schedule(() => {
      const corner = cornerPoint(1)
      if (corner) move(corner.x, corner.y, 0, 'ease')
    }, 1150)
    if (!reduced.value) schedule(() => breathe(0), 1500)
  }

  // bez immediate — meranie polôh patrí až klientovi po otvorení karty
  watch(running, on => (on ? start() : stop()))

  onBeforeUnmount(stop)

  return { scale, linePaper, pressed, cursorStyle }
}
