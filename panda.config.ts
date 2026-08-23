import { defineConfig } from '@pandacss/dev'
import { colors } from './app/theme/colors'
import { fonts } from './app/theme/tokens'

export default defineConfig({
  preflight: true,
  include: ['./app/**/*.{ts,vue}'],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: { colors, fonts },
      keyframes: {
        draw: { to: { transform: 'scaleX(1)' } },
      },
    },
  },
  globalCss: {
    'html, body, #__nuxt': { height: '100%' },
    body: {
      bg: 'bg',
      color: 'fg',
      fontFamily: 'sans',
      WebkitFontSmoothing: 'antialiased',
    },
    a: {
      color: 'accent',
      textDecoration: 'none',
      _hover: { textDecoration: 'underline' },
      _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '3px' },
    },
  },
})
