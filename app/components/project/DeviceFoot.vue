<script setup lang="ts">
import { cva } from '~~/styled-system/css'

/**
 * Spodok zariadenia pod displejom — základňa MacBooku (mac) alebo stojan
 * iMacu 24" (imac). Tieňovanie adaptované z devices.css (MIT, picturepan2).
 */
defineProps<{ device: 'mac' | 'imac' | 'iphone' }>()

const wrap = cva({
  base: {
    position: 'relative',
    flexShrink: 0,
    alignSelf: 'center',
    width: '114%',
    overflow: 'hidden',
    transitionProperty: 'height, opacity',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { height: '14px', opacity: 1 },
      imac: { height: '52px', opacity: 1 },
      iphone: { height: '0px', opacity: 0 },
    },
  },
})

/** Základňa MacBooku — širšia než displej, s výrezom na otváranie veka. */
const deck = cva({
  base: {
    position: 'absolute',
    inset: '0 0 auto',
    height: '14px',
    borderRadius: '2px 2px 10px 10px',
    background: 'radial-gradient(circle at center, token(colors.device.silver) 82%, token(colors.device.silver2) 100%)',
    boxShadow: 'inset 0 -2px 6px 0 token(colors.device.aluminum4)',
    transitionProperty: 'opacity',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '68px',
      height: '5px',
      borderRadius: '0 0 8px 8px',
      background: 'device.silver2',
    },
  },
  variants: {
    device: {
      mac: { opacity: 1 },
      imac: { opacity: 0 },
      iphone: { opacity: 0 },
    },
  },
})

/** Stojan iMacu — plochý hliníkový plech s podstavou. */
const stand = cva({
  base: {
    transitionProperty: 'opacity',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
    '& > i': {
      display: 'block',
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
    },
    '& > b': {
      display: 'block',
      width: '150px',
      height: '6px',
      margin: '0 auto',
      background: 'radial-gradient(circle at center, token(colors.device.aluminum2) 80%, token(colors.device.aluminum4) 100%)',
    },
  },
  variants: {
    device: {
      mac: { opacity: 0 },
      imac: { opacity: 1 },
      iphone: { opacity: 0 },
    },
  },
})
</script>

<template>
  <div :class="wrap({ device })" aria-hidden="true">
    <div :class="deck({ device })" />
    <div :class="stand({ device })"><i /><b /></div>
  </div>
</template>
