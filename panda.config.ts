import { defineConfig } from '@pandacss/dev'
import { colors } from './app/theme/colors'
import { easings, fonts } from './app/theme/tokens'

export default defineConfig({
  preflight: true,
  include: ['./app/**/*.{ts,vue}'],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: { colors, fonts, easings },
    },
  },
  globalCss: {
    body: {
      bg: 'paper',
      color: 'ink',
      fontFamily: 'sans',
      lineHeight: 1.6,
      WebkitFontSmoothing: 'antialiased',
      overflowX: 'hidden',
    },
    a: { color: 'inherit', textDecoration: 'none' },
    '::selection': { background: 'accentSelection' },
    ':focus-visible': {
      outline: '2px solid',
      outlineColor: 'accent',
      outlineOffset: '3px',
      borderRadius: '4px',
    },
  },
})
