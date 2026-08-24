import { gsap } from 'gsap'

import type { Ref } from 'vue'

interface SceneRunOptions {
  /** Trvanie jedného prebehu 0 → 100 v sekundách. */
  duration: number
  /** true = yoyo slučka donekonečna (100 → 0 → 100…), inak jeden prebeh. */
  loop?: boolean
  /** Oneskorenie štartu po otvorení karty (s) — nech najprv dorolluje. */
  delay?: number
}

/**
 * Samočinný priebeh scény 0 – 100: štartuje s otvorením karty, zavretie ho
 * zruší. Nahrádza scrollom riadené testT/deployT/editT z čias pinu.
 * Pri reduced motion drží slučka pokojový stav (0) a jednorazový beh cieľ (100).
 */
export function useSceneRun(running: Ref<boolean>, options: SceneRunOptions) {
  const { duration, loop = false, delay = 1.1 } = options
  const reduced = useReducedMotion()
  const progress = ref(0)
  let tween: gsap.core.Tween | null = null

  function stop() {
    tween?.kill()
    tween = null
  }

  function start() {
    stop()
    if (reduced.value) {
      progress.value = loop ? 0 : 100
      return
    }
    progress.value = 0
    const proxy = { t: 0 }
    tween = gsap.to(proxy, {
      t: 100,
      duration,
      delay,
      ease: loop ? 'power1.inOut' : 'none',
      repeat: loop ? -1 : 0,
      yoyo: loop,
      onUpdate: () => (progress.value = proxy.t),
    })
  }

  watch(running, on => (on ? start() : stop()))
  onBeforeUnmount(stop)

  return progress
}
