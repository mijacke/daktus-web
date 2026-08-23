import type { Ref } from 'vue'

/**
 * Časovanie „blueprint" animácie hero sekcie — jednotlivé bloky sa postupne
 * dostavajú z drôtenej kostry do finálnej podoby, mriežka na pozadí nakoniec zmizne.
 */
export function useHeroBuild() {
  const eyebrow = ref(false)
  const heading = ref(false)
  const lead = ref(false)
  const ctas = ref(false)
  const done = ref(false)

  const timers: ReturnType<typeof setTimeout>[] = []

  onMounted(() => {
    const steps: [Ref<boolean>, number][] = [
      [eyebrow, 500],
      [heading, 850],
      [lead, 1300],
      [ctas, 1550],
      [done, 2200],
    ]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      steps.forEach(([flag]) => { flag.value = true })
      return
    }

    steps.forEach(([flag, delay]) => {
      timers.push(setTimeout(() => { flag.value = true }, delay))
    })
  })

  onUnmounted(() => { timers.forEach(clearTimeout) })

  return { eyebrow, heading, lead, ctas, done }
}
