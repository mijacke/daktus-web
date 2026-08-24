import type { Ref } from 'vue'

/**
 * Výber jednej karty naraz — druhý klik na tú istú kartu ju zloží,
 * klik mimo sledovaného obalu výber zruší.
 */
export function useCardFocus(scope: Ref<HTMLElement | null>) {
  const active = ref<number | null>(null)

  const select = (index: number) => {
    active.value = active.value === index ? null : index
  }

  const clear = () => {
    active.value = null
  }

  const onDocClick = (event: MouseEvent) => {
    if (active.value === null) return
    // composedPath namiesto contains(target): pri reálnom kliku Vue stihne
    // prerenderovať uprostred bublania a target (štít karty) je už odpojený z DOM
    if (scope.value && !event.composedPath().includes(scope.value)) clear()
  }

  onMounted(() => document.addEventListener('click', onDocClick))
  onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

  return { active, select, clear }
}
