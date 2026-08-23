import type { Ref } from 'vue'

interface UseInViewOptions extends IntersectionObserverInit {
  /** false = stav sa prepína pri každom vstupe/odchode z viewportu (default jednorazovo). */
  once?: boolean
}

/** Sleduje, či je element vo viewporte — základ scroll-reveal animácií. */
export function useInView(target: Ref<HTMLElement | null>, options: UseInViewOptions = {}) {
  // nízky threshold bez spodného odsadenia = reveal štartuje hneď, ako element vojde do viewportu
  const { once = true, threshold = 0.08, rootMargin = '0px', root } = options
  const inView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        if (once) {
          observer?.disconnect()
          observer = null
        }
      }
      else if (!once) {
        inView.value = false
      }
    }, { threshold, rootMargin, root })
    observer.observe(target.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return inView
}
