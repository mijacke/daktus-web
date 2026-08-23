import type { Ref } from 'vue'

/** Živé rozmery elementu cez ResizeObserver — 0 × 0, kým element nie je pripojený. */
export const useElementSize = (el: Ref<HTMLElement | null>) => {
  const width = ref(0)
  const height = ref(0)
  let observer: ResizeObserver | null = null

  watch(el, (node) => {
    observer?.disconnect()
    if (!node) return
    observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (!rect) return
      width.value = rect.width
      height.value = rect.height
    })
    observer.observe(node)
  }, { immediate: true })

  onBeforeUnmount(() => observer?.disconnect())

  return { width, height }
}
