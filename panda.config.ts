import { defineConfig } from '@pandacss/dev'
import { colors } from './app/theme/colors'
import { easings, fonts, shadows } from './app/theme/tokens'

export default defineConfig({
  preflight: true,
  include: ['./app/**/*.{ts,vue}'],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: { colors, easings, fonts, shadows },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        fillBar: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        pulse: {
          from: { transform: 'scale(0.6)', opacity: '1' },
          to: { transform: 'scale(1.6)', opacity: '0' },
        },
      },
    },
  },
  globalCss: {
    html: {
      scrollbarWidth: 'thin',
      scrollbarColor: 'color-mix(in srgb, token(colors.ink) 35%, transparent) token(colors.paper)',
    },
    body: {
      bg: 'paper',
      color: 'ink',
      fontFamily: 'sans',
      lineHeight: 1.6,
      WebkitFontSmoothing: 'antialiased',
      overflowX: 'hidden',
    },
    a: { color: 'inherit', textDecoration: 'none' },
    button: { fontFamily: 'sans' },
    ':focus-visible': {
      outline: '2px solid token(colors.accent)',
      outlineOffset: '3px',
      borderRadius: '4px',
    },
    '::selection': { background: 'accent/35' },
  },
})
