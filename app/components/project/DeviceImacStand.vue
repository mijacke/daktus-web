<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/**
 * Stojan iMacu 24" — plochý hliníkový plech s podstavou, tieňovanie
 * adaptované z devices.css (MIT, picturepan2). Vysunie sa len v imac režime.
 */
defineProps<{ visible: boolean }>()

const wrap = cva({
  base: {
    flexShrink: 0,
    overflow: 'hidden',
    transitionProperty: 'height, opacity',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    visible: {
      false: { height: '0px', opacity: 0 },
      true: { height: '52px', opacity: 1 },
    },
  },
})

const neck = css({
  width: '150px',
  height: '46px',
  margin: '0 auto',
  background: `linear-gradient(
    180deg,
    token(colors.device.aluminum4) 0%,
    token(colors.device.aluminum3) 40%,
    token(colors.device.aluminum3) 85%,
    token(colors.white) 90%,
    token(colors.device.aluminum4) 100%
  )`,
})

const base = css({
  width: '150px',
  height: '6px',
  margin: '0 auto',
  background: 'radial-gradient(circle at center, token(colors.device.aluminum2) 80%, token(colors.device.aluminum4) 100%)',
})
</script>

<template>
  <div :class="wrap({ visible })" aria-hidden="true">
    <div :class="neck" />
    <div :class="base" />
  </div>
</template>
