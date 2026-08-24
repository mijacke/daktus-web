/**
 * Klik na logo (header aj footer): na homepage plynulo odscrolluje úplne hore
 * — procesný pin scroll nebrzdí, stránka ním preletí. Inde beží bežná navigácia.
 */
export function useScrollTopLink() {
  const route = useRoute()
  const { $lenis } = useNuxtApp()

  return function scrollTopOnHome() {
    if (route.path !== '/') return
    if ($lenis) $lenis.scrollTo(0)
    else window.scrollTo(0, 0)
  }
}
