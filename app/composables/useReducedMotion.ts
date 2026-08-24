/** prefers-reduced-motion ako reaktívny stav (SSR-safe, na serveri false). */
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
