<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

export type ServiceDeviceName = 'browser' | 'code' | 'desktop' | 'phone'

const props = defineProps<{
  /** Mini zariadenie v hlave karty — každá služba má vlastnú siluetu produktu. */
  device: ServiceDeviceName
  title: string
  text: string
}>()

/** Karta softvéru je tmavý terminál — jediná tmavá dlaždica v rade (bento rytmus). */
const tone = computed(() => (props.device === 'code' ? 'dark' as const : 'light' as const))

const card = cva({
  base: {
    height: '100%',
    border: '1px solid',
    borderRadius: '18px',
    padding: '22px 22px 30px',
    overflow: 'hidden',
    transitionProperty: 'transform, box-shadow, border-color',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
    _hover: {
      transform: 'translateY(-6px)',
      boxShadow: 'card',
      borderColor: 'accent/50',
    },
  },
  variants: {
    tone: {
      light: { background: 'card', borderColor: 'hairline' },
      dark: { background: 'dark.panel', borderColor: 'dark.hairline', color: 'dark.fg' },
    },
  },
})

/**
 * Javisko zariadenia — rovnaká výška, iné kotvenie: stred, full-bleed, polička,
 * stred. Zariadenia stoja zmenšené a hover karty ich pritiahne na plnú veľkosť
 * (terminál nie — ten je celou kartou).
 */
const stage = cva({
  base: {
    display: 'flex',
    minHeight: '148px',
    '& > *': {
      minWidth: 0,
      transition: 'transform 0.55s {easings.out}',
      _motionReduce: { transition: 'none' },
    },
  },
  variants: {
    device: {
      browser: {
        alignItems: 'center',
        '& > *': { width: '100%', transformOrigin: '50% 100%' },
        '@media (prefers-reduced-motion: no-preference)': {
          '& > *': { transform: 'scale(0.84)' },
          '[data-svc]:hover & > *': { transform: 'scale(1)' },
        },
      },
      code: { margin: '-22px -22px 0', alignItems: 'stretch', '& > *': { width: '100%' } },
      desktop: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderBottom: '1px solid',
        borderColor: 'hairline.soft',
        '& > *': { transformOrigin: '50% 100%' },
        '@media (prefers-reduced-motion: no-preference)': {
          '& > *': { transform: 'scale(0.86)' },
          '[data-svc]:hover & > *': { transform: 'scale(1)' },
        },
      },
      phone: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '148px',
        minHeight: '148px',
        overflow: 'hidden',
        '& > *': { transformOrigin: '50% 0%' },
        '@media (prefers-reduced-motion: no-preference)': {
          '& > *': { transform: 'scale(0.88)' },
          '[data-svc]:hover & > *': { transform: 'scale(1)' },
        },
      },
    },
  },
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '21px',
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
  margin: '20px 0 0',
  lineHeight: 1.15,
})

const note = cva({
  base: { fontSize: '14.5px', margin: '12px 0 0' },
  variants: {
    tone: {
      light: { color: 'dim' },
      dark: { color: 'dark.dim' },
    },
  },
})
</script>

<template>
  <div :class="card({ tone })" data-svc>
    <div :class="stage({ device })">
      <ServiceDeviceBrowser v-if="device === 'browser'" />
      <ServiceDeviceCode v-else-if="device === 'code'" />
      <ServiceDeviceDesktop v-else-if="device === 'desktop'" />
      <ServiceDevicePhone v-else />
    </div>
    <h3 :class="heading">{{ title }}</h3>
    <p :class="note({ tone })">{{ text }}</p>
  </div>
</template>
