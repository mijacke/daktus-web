import type { Ref } from 'vue'

interface UseStoryPinOptions {
  /** Media query, pri ktorej sa javisko prilepí a kroky listuje scroll. */
  pinQuery: string
  /** Počet krokov príbehu. */
  steps: number
  /** Minimálne trvanie celého prechodu 0 → 1 v sekundách. */
  minSeconds?: number
}

/** Koliesko smie predbehnúť príbeh najviac o tento podiel pinu. */
const WHEEL_LEAD = 0.06

/**
 * Scroll pin príbehu: sekcia vyššia než viewport, sticky javisko, kroky
 * listuje koliesko. Viditeľný priebeh drží useCappedProgress a koliesko je
 * v pine uzamknuté na tempo príbehu — prebytok scrollu sa zahadzuje.
 */
export function useStoryPin(host: Ref<HTMLElement | null>, options: UseStoryPinOptions) {
  const { pinQuery, steps, minSeconds = 5 } = options
  const pinned = useMediaQuery(pinQuery)
  const active = ref(0)
  const { target, progress, start, stop, snap } = useCappedProgress(minSeconds)
  const { $lenis } = useNuxtApp()
  let lastWheelAt = 0

  function stepFor(value: number) {
    return Math.min(steps - 1, Math.floor(value * steps))
  }

  function onWheel() {
    lastWheelAt = performance.now()
  }

  function measure() {
    const el = host.value
    if (!el || !pinned.value) return
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return
    const raw = -el.getBoundingClientRect().top / scrollable

    // mimo pinu drží priebeh scroll okamžite — sticky tam stojí na kraji,
    // takže snap nie je vidieť a po návrate nič „nedobieha"
    if (raw <= 0 || raw >= 1) {
      snap(Math.min(0.999, Math.max(0, raw)))
      return
    }

    // zámok tempa: koliesko (vrátane dojazdu Lenisu) nesmie v pine utiecť
    // pred príbeh — prebytok sa zahodí a stránka sa vnútri pinu neviditeľne
    // zarovná späť; anchor navigácii a scrollbaru sa do cesty nestavia
    if (performance.now() - lastWheelAt < 700 && Math.abs(raw - progress.value) > WHEEL_LEAD) {
      const corrected = progress.value + Math.sign(raw - progress.value) * WHEEL_LEAD
      const top = window.scrollY + el.getBoundingClientRect().top + corrected * scrollable
      if ($lenis) $lenis.scrollTo(top, { immediate: true })
      else window.scrollTo(0, top)
      target.value = Math.min(0.999, Math.max(0, corrected))
      return
    }

    target.value = Math.min(0.999, Math.max(0, raw))
  }

  watch(progress, (value) => {
    if (pinned.value) active.value = stepFor(value)
  })

  /** Zapnutie/vypnutie pinu — aj pri resize: nové rozmery, priebeh bez naháňania. */
  function engage() {
    if (pinned.value) {
      measure()
      snap(target.value)
      active.value = stepFor(target.value)
      start()
    }
    else {
      stop()
    }
  }

  watch(pinned, engage)

  onMounted(() => {
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('resize', engage, { passive: true })
    engage()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', measure)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('resize', engage)
  })

  /** Naplnenie pruhu kroku — pri pine podľa scrollu, inak plný aktívny. */
  function fillFor(index: number) {
    if (!pinned.value) return index === active.value ? 100 : 0
    const part = progress.value * steps - index
    return Math.round(Math.min(1, Math.max(0, part)) * 100)
  }

  /** Klik na krok: pri pine odscrolluje stránku do jeho úseku, inak prepne rovno. */
  function select(index: number) {
    const el = host.value
    if (pinned.value && el) {
      const scrollable = el.offsetHeight - window.innerHeight
      const top = window.scrollY + el.getBoundingClientRect().top
      window.scrollTo({ top: top + ((index + 0.5) / steps) * scrollable, behavior: 'smooth' })
    }
    else {
      active.value = index
    }
  }

  return { pinned, active, progress, fillFor, select }
}
