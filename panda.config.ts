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
        // občasný zákmit do strán — krátke rozhojdanie doprava-doľava, potom pokoj
        claySway: {
          '0%, 54%, 74%, 100%': { transform: 'rotate(0deg)' },
          '58%': { transform: 'rotate(3.1deg)' },
          '63%': { transform: 'rotate(-2.7deg)' },
          '67%': { transform: 'rotate(1.7deg)' },
          '71%': { transform: 'rotate(-0.8deg)' },
        },
        // občasný pružný poskok plastelíny — squash pred výskokom, stretch vo vzduchu
        clayJump: {
          '0%, 86%, 100%': { transform: 'none' },
          '88%': { transform: 'scale(1.09, 0.86) translateY(3.5%)' },
          '91%': { transform: 'scale(0.93, 1.1) translateY(-11%)' },
          '94%': { transform: 'scale(1.07, 0.9) translateY(2.5%)' },
          '96.5%': { transform: 'scale(0.98, 1.04) translateY(-2.5%)' },
          '98.5%': { transform: 'scale(1.02, 0.98)' },
        },
        pulse: {
          from: { transform: 'scale(0.6)', opacity: '1' },
          to: { transform: 'scale(1.6)', opacity: '0' },
        },
        caretBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        // stlačenie hmoty pri hoveri — squash a pružný návrat
        claySquish: {
          '0%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(1.14, 0.8)' },
          '65%': { transform: 'scale(0.92, 1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        // dopad rozpučeného déčka na 404 — pád, pľasnutie, dokmitanie
        claySplat: {
          '0%': { transform: 'translateY(-46%) scale(0.94, 1.08)', opacity: '0' },
          '30%': { transform: 'translateY(-12%) scale(0.94, 1.08)', opacity: '1' },
          '46%': { transform: 'translateY(0) scale(1.14, 0.8)' },
          '64%': { transform: 'scale(0.95, 1.06)' },
          '82%': { transform: 'scale(1.05, 0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        // vstup plastelínového prvku — prekmit cez cieľ a mäkké sadnutie
        clayPop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.06)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
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
