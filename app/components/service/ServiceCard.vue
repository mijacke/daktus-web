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

/** Javisko zariadenia — rovnaká výška, iné kotvenie: stred, full-bleed, polička, stred. */
const stage = cva({
  base: {
    display: 'flex',
    minHeight: '132px',
    '& > *': { minWidth: 0 },
  },
  variants: {
    device: {
      browser: { alignItems: 'center', '& > *': { width: '100%' } },
      code: { margin: '-22px -22px 0', alignItems: 'stretch', '& > *': { width: '100%' } },
      desktop: { justifyContent: 'center', alignItems: 'flex-end', borderBottom: '1px solid', borderColor: 'hairline.soft' },
      phone: { justifyContent: 'center', alignItems: 'center' },
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
