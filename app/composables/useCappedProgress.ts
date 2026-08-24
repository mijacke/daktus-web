/**
 * Scroll priebeh s rýchlostným stropom: cieľ nastavuje scroll okamžite,
 * viditeľná hodnota ho naháňa najviac 1/minSeconds za sekundu — ani extrémne
 * rýchle koliesko tak nepreskočí medzikroky (celý rozsah trvá ≥ minSeconds).
 */
export function useCappedProgress(minSeconds = 2) {
  const target = ref(0)
  const progress = ref(0)
  let raf = 0
  let last = 0

  function tick(now: number) {
    const dt = Math.min(0.1, (now - last) / 1000)
    last = now
    const diff = target.value - progress.value
    if (Math.abs(diff) > 0.0004) {
      // mäkký exponenciálny dojazd, tvrdý strop rýchlosti
      const step = Math.min(Math.abs(diff) * Math.min(1, dt * 8), dt / minSeconds)
      progress.value += Math.sign(diff) * step
    }
    raf = requestAnimationFrame(tick)
  }

  function start() {
    if (raf) return
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

  function stop() {
    if (!raf) return
    cancelAnimationFrame(raf)
    raf = 0
  }

  /** Okamžité zarovnanie bez naháňania — pri vstupe do pinu a pri resize. */
  function snap(value: number) {
    target.value = value
    progress.value = value
  }

  onBeforeUnmount(stop)

  return { target, progress, start, stop, snap }
}
