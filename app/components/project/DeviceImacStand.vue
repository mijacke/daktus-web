<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Hliníkový stojan iMacu pod displejom — vysunie sa len v rozbalenom režime. */
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
      true: { height: '58px', opacity: 1 },
    },
  },
})

const neck = css({
  width: '78px',
  height: '46px',
  margin: '0 auto',
  background: 'linear-gradient(180deg, token(colors.device.aluminum2), token(colors.device.aluminum))',
  clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)',
})

const base = css({
  width: '200px',
  height: '12px',
  margin: '0 auto',
  borderRadius: '6px 6px 0 0',
  background: 'linear-gradient(180deg, token(colors.device.aluminum), token(colors.device.aluminum2))',
})
</script>

<template>
  <div :class="wrap({ visible })" aria-hidden="true">
    <div :class="neck" />
    <div :class="base" />
  </div>
</template>
