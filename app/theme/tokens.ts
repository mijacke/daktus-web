import { defineTokens } from '@pandacss/dev'

/** Ostatné design tokeny (mimo farieb — tie sú v colors.ts). */
export const fonts = defineTokens.fonts({
  display: { value: 'Archivo, "Arial Narrow", Arial, sans-serif' },
  sans: { value: '"Instrument Sans", -apple-system, "Segoe UI", sans-serif' },
})

export const easings = defineTokens.easings({
  smooth: { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
})
