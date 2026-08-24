<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

/**
 * Karta kroku procesu — zbalený riadok s číslom a nadpisom, ktorý sa pri
 * scrolle rozbalí na text a živú scénu v ráme zariadenia (slot). Otváranie
 * riadi rodič cez `open`, výška sa animuje gridom 0fr → 1fr.
 */
defineProps<{
  no: string
  title: string
  text: string
  glyph: ClayGlyphName
  open: boolean
}>()

const card = cva({
  base: {
    borderRadius: '18px',
    border: '1px solid transparent',
    // vysoké riadky ako na cuberte — scroll cez sekciu má mať tempo, nie šprint
    padding: 'clamp(56px, 9vh, 96px) clamp(24px, 3vw, 48px)',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.5s',
    background: 'dark.fg/4',
  },
  variants: {
    open: {
      true: { background: 'dark.panel', borderColor: 'dark.fg/10' },
    },
  },
})

const head = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(12px, 1.6vw, 22px)',
})

const stepNo = cva({
  base: {
    fontFamily: 'display',
    fontWeight: 800,
    fontSize: 'clamp(15px, 1.5vw, 22px)',
    color: 'dark.dim',
    transition: 'color 0.4s ease',
  },
  variants: {
    open: {
      true: { color: 'accent' },
    },
  },
})

const stepTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: 'clamp(28px, 3.4vw, 56px)',
  lineHeight: 1.05,
  letterSpacing: '-0.015em',
  margin: 0,
})

/** Rozbaľovacie telo — grid 0fr/1fr animuje výšku bez merania obsahu. */
const body = cva({
  base: {
    display: 'grid',
    gridTemplateRows: '0fr',
    // pomalé „odrolovanie" — obsah sa odkrýva plynulo, nie skokom
    transition: 'grid-template-rows 1.05s {easings.out}',
    _motionReduce: { transition: 'none' },
  },
  variants: {
    open: {
      true: { gridTemplateRows: '1fr' },
    },
  },
})

const bodyClip = css({
  overflow: 'hidden',
  minHeight: 0,
})

const stepText = css({
  fontSize: '15px',
  color: 'dark.dim',
  maxWidth: '560px',
  margin: 'clamp(18px, 3vh, 30px) 0 0',
})
</script>

<template>
  <article :class="card({ open })">
    <div :class="head">
      <ClayGlyph :name="glyph" :size="44" on-dark />
      <span :class="stepNo({ open })">{{ no }}</span>
      <h3 :class="stepTitle">{{ title }}</h3>
    </div>
    <div :class="body({ open })" :aria-hidden="!open">
      <div :class="bodyClip">
        <p :class="stepText">{{ text }}</p>
        <slot />
      </div>
    </div>
  </article>
</template>
