interface UseMediaQueryOptions {
  /** Hodnota pred mountom (SSR) — vyber podľa pravdepodobnejšieho stavu. */
  initial?: boolean
}

/** Reaktívny matchMedia — true, kým viewport spĺňa query. */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}) {
  const matches = ref(options.initial ?? false)
  let media: MediaQueryList | null = null

  function update() {
    matches.value = media?.matches ?? false
  }

  onMounted(() => {
    media = window.matchMedia(query)
    media.addEventListener('change', update)
    update()
  })

  onBeforeUnmount(() => media?.removeEventListener('change', update))

  return matches
}
