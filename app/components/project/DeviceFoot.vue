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
    background: 'radial-gradient(circle at center, var(--dev-foot1) 82%, var(--dev-foot2) 100%)',
    boxShadow: 'inset 0 -2px 6px 0 var(--dev-foot3)',
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
      background: 'var(--dev-foot2)',
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
        var(--dev-neck-a) 0%,
        var(--dev-neck-b) 40%,
        var(--dev-neck-b) 85%,
        var(--dev-neck-hi) 90%,
        var(--dev-neck-a) 100%
      )`,
    },
    '& > b': {
      display: 'block',
      width: '150px',
      height: '6px',
      margin: '0 auto',
      background: 'radial-gradient(circle at center, var(--dev-base-a) 80%, var(--dev-base-b) 100%)',
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
