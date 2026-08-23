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
        riseIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        fillBar: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-11px)' },
        },
        floatShadow: {
          '0%, 100%': { transform: 'translateX(-50%) scaleX(1)', opacity: '1' },
          '50%': { transform: 'translateX(-50%) scaleX(0.86)', opacity: '0.65' },
        },
        pulse: {
          from: { transform: 'scale(0.6)', opacity: '1' },
          to: { transform: 'scale(1.6)', opacity: '0' },
        },
        caretBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
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
    // prechod medzi stránkami (app.pageTransition v nuxt.config.ts)
    '.page-enter-active, .page-leave-active': {
      transition: 'opacity 0.4s ease, transform 0.55s token(easings.out)',
    },
    '.page-enter-from': { opacity: 0, transform: 'translateY(20px)' },
    '.page-leave-to': { opacity: 0 },
    '@media (prefers-reduced-motion: reduce)': {
      '.page-enter-active, .page-leave-active': { transition: 'none' },
    },
  },
})
