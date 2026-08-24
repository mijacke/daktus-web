<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

export type ServiceDeviceName = 'browser' | 'code' | 'desktop' | 'phone'

defineProps<{
  /** Mini zariadenie v hlave karty — každá služba má vlastnú siluetu produktu. */
  device: ServiceDeviceName
  title: string
  text: string
}>()

const card = css({
  height: '100%',
  background: 'card',
  border: '1px solid',
  borderColor: 'hairline',
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
})

/**
 * Javisko zariadenia — rovnaká výška, iné kotvenie: stred, okno, polička,
 * stred. Zariadenia stoja zmenšené a hover karty ich pritiahne na plnú veľkosť.
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
      code: {
        alignItems: 'center',
        '& > *': { width: '100%', transformOrigin: '50% 50%' },
        '@media (prefers-reduced-motion: no-preference)': {
          '& > *': { transform: 'scale(0.92)' },
          '[data-svc]:hover & > *': { transform: 'scale(1)' },
        },
      },
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

const note = css({
  fontSize: '14.5px',
  margin: '12px 0 0',
  color: 'dim',
})
</script>

<template>
  <div :class="card" data-svc>
    <div :class="stage({ device })">
      <ServiceDeviceBrowser v-if="device === 'browser'" />
      <ServiceDeviceCode v-else-if="device === 'code'" />
      <ServiceDeviceDesktop v-else-if="device === 'desktop'" />
      <ServiceDevicePhone v-else />
    </div>
    <h3 :class="heading">{{ title }}</h3>
    <p :class="note">{{ text }}</p>
  </div>
</template>
