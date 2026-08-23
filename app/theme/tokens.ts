import { defineTokens } from '@pandacss/dev'

/** Ostatné design tokeny (mimo farieb — tie sú v colors.ts). */
export const fonts = defineTokens.fonts({
  display: { value: '"Archivo", "Helvetica Neue", Arial, sans-serif' },
  sans: { value: '"Instrument Sans", -apple-system, "Segoe UI", sans-serif' },
})
