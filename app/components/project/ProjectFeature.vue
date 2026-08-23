<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

interface FeatureChip {
  label: string
  accent?: boolean
}

withDefaults(defineProps<{
  name: string
  tagline: string
  brief: string
  solution: string
  tone: 'blush' | 'steel' | 'paper' | 'navy'
  chips: FeatureChip[]
  flip?: boolean
}>(), { flip: false })

const block = css({
  display: 'grid',
  gridTemplateColumns: '1.1fr 0.9fr',
  gap: 'clamp(30px, 4vw, 70px)',
  alignItems: 'center',
  paddingBlock: 'clamp(48px, 7vh, 84px)',
  borderTop: '1px solid',
  borderColor: 'hairline',
  '&:first-child': { borderTop: 'none' },
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
})

const cover = cva({
  base: {
    position: 'relative',
    height: 'clamp(300px, 26vw, 440px)',
    borderRadius: '18px',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'ink/7',
  },
  variants: {
    tone: {
      blush: { background: 'linear-gradient(165deg, token(colors.cover.blush), token(colors.cover.blush2))' },
      steel: { background: 'linear-gradient(165deg, token(colors.cover.steel), token(colors.cover.steel2))' },
      paper: { background: 'linear-gradient(165deg, token(colors.cover.paper), token(colors.cover.paper2))' },
      navy: { background: 'linear-gradient(165deg, token(colors.cover.navy), token(colors.cover.navy2))' },
    },
    flip: {
      true: {
        order: 2,
        '@media (max-width: 900px)': { order: 0 },
      },
    },
  },
})

const coverInner = css({
  position: 'absolute',
  inset: 0,
  transition: 'transform 0.9s {easings.out}',
  _groupHover: { transform: 'scale(1.03)' },
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(28px, 2.6vw, 42px)',
  letterSpacing: '-0.015em',
  textTransform: 'uppercase',
})

const tag = css({
  fontSize: '15.5px',
  color: 'dim',
  marginTop: '8px',
})

const qa = css({ marginTop: '26px' })

const qaLabel = css({
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'accent.deep',
})

const qaText = css({
  fontSize: '15.5px',
  color: 'ink/90',
  margin: '8px 0 0',
  maxWidth: '56ch',
})

const chipRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: '26px',
})
</script>

<template>
  <article :class="[block, 'group']">
    <div :class="cover({ tone, flip })" data-cursor="view">
      <div :class="coverInner">
        <slot />
      </div>
    </div>
    <div>
      <div :class="heading">{{ name }}</div>
      <div :class="tag">{{ tagline }}</div>
      <div :class="qa">
        <div :class="qaLabel">Zadanie</div>
        <p :class="qaText">{{ brief }}</p>
      </div>
      <div :class="qa">
        <div :class="qaLabel">Riešenie</div>
        <p :class="qaText">{{ solution }}</p>
      </div>
      <div :class="chipRow">
        <AppChip v-for="chip in chips" :key="chip.label" :accent="chip.accent">{{ chip.label }}</AppChip>
      </div>
    </div>
  </article>
</template>
