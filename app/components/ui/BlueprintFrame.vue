<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  /** Popisok technického rámu (napr. „nadpis / h1"). */
  tag: string
  /** true = obsah sa „postavil" — rám aj popisok zmiznú, obsah sa objaví. */
  built: boolean
  /** Voliteľná trieda vnútorného obalu obsahu (napr. absolútne pozicovanie v cover karte). */
  contentClass?: string
}>()

const frame = css({
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    inset: '-10px',
    border: '1.5px dashed',
    borderColor: 'ink/32',
    borderRadius: '10px',
    background: 'ink/2',
    opacity: 1,
    transition: 'opacity 0.4s ease 0.1s',
    pointerEvents: 'none',
  },
  '&.built::after': { opacity: 0 },
  '[data-dark] &': { _after: { borderColor: 'dark.fg/30', background: 'dark.fg/3' } },
  _motionReduce: { _after: { display: 'none' } },
})

const tagLabel = css({
  position: 'absolute',
  top: '-19px',
  left: '2px',
  zIndex: 3,
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dim',
  background: 'paper',
  paddingInline: '7px',
  transition: 'opacity 0.4s ease',
  pointerEvents: 'none',
  '.built &': { opacity: 0 },
  '[data-dark] &': { color: 'dark.dim', background: 'dark.bg' },
  _motionReduce: { display: 'none' },
})

const content = css({
  opacity: 0,
  transform: 'translateY(12px)',
  transitionProperty: 'opacity, transform',
  transitionDuration: '0.55s',
  transitionTimingFunction: 'out',
  '.built &': { opacity: 1, transform: 'none' },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
})
</script>

<template>
  <div :class="[frame, { built }]">
    <span :class="tagLabel" aria-hidden="true">{{ tag }}</span>
    <div :class="[content, contentClass]">
      <slot />
    </div>
  </div>
</template>
