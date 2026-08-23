import type { Ref } from 'vue'

/** Blueprint build-in: keď element vojde do viewportu, po krátkej pauze sa „postaví“. */
export function useBuildIn(target: Ref<HTMLElement | null>, delay = 350) {
  const inView = useInView(target, { threshold: 0.25, rootMargin: '0px' })
  const reduced = useReducedMotion()
  const built = ref(false)
  let timer = 0

  watch(inView, (visible) => {
    if (!visible) return
    timer = window.setTimeout(() => (built.value = true), reduced.value ? 0 : delay)
  })

  onBeforeUnmount(() => clearTimeout(timer))

  return built
}
