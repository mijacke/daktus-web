import type { Ref } from 'vue'

/**
 * Výber jednej karty naraz — druhý klik na tú istú kartu ju zloží,
 * klik mimo sledovaného obalu výber zruší.
 *
 * Rozbaľovanie žije len tam, kde má grid viac stĺpcov: v jednom stĺpci nie je
 * karta kam roztiahnuť, tak sa na mobile nedá rozkliknúť a náhľad ostáva
 * MacBook. `enableFrom` je preto media query stĺpcového zlomu daného gridu.
 */
export function useCardFocus(scope: Ref<HTMLElement | null>, enableFrom: string) {
  const enabled = useMediaQuery(enableFrom, { initial: true })
  const active = ref<number | null>(null)

  const select = (index: number) => {
    if (!enabled.value) return
    active.value = active.value === index ? null : index
  }

  const clear = () => {
    active.value = null
  }

  // zúženie okna pod zlom rozbalenú kartu zloží — inak by ostala otvorená bez
  // spôsobu, ako ju zavrieť
  watch(enabled, (on) => {
    if (!on) clear()
  })

  const onDocClick = (event: MouseEvent) => {
    if (active.value === null) return
    // composedPath namiesto contains(target): pri reálnom kliku Vue stihne
    // prerenderovať uprostred bublania a target (štít karty) je už odpojený z DOM
    if (scope.value && !event.composedPath().includes(scope.value)) clear()
  }

  onMounted(() => document.addEventListener('click', onDocClick))
  onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

  return { active, select, clear, enabled }
}
