import { defineTokens } from '@pandacss/dev'

/** Ostatné design tokeny (mimo farieb — tie sú v colors.ts). */
export const fonts = defineTokens.fonts({
  display: { value: '"Archivo", "Arial Narrow", Arial, sans-serif' },
  sans: { value: '"Instrument Sans", -apple-system, "Segoe UI", sans-serif' },
  mono: { value: '"SF Mono", ui-monospace, Consolas, monospace' },
})

export const easings = defineTokens.easings({
  /** Hlavný easing prototypu — rýchly nábeh, dlhý dobeh. */
  out: { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
})

/** Tiene sú composite tokeny — alfa odtiene ink/accent v nich nie sú samostatné farebné tokeny. */
export const shadows = defineTokens.shadows({
  card: { value: '0 24px 60px rgba(16, 19, 21, 0.10)' },
  overlay: { value: '0 24px 60px rgba(16, 19, 21, 0.18)' },
  glow: { value: '0 14px 44px rgba(111, 168, 162, 0.35)' },
})
