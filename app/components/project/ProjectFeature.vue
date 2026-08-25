<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

const props = withDefaults(defineProps<{
  name: string
  tagline: string
  brief: string
  solution: string
  tone: 'blush' | 'navy' | 'mint'
  /** Plastelínová nálepka vedľa názvu, napr. „Koncept" pri nenasadenom návrhu. */
  badge?: string
  flip?: boolean
  /** Rozbalený stav — okno sa morfuje z MacBooku na iMac a obal narastie. */
  state?: 'idle' | 'active'
}>(), { badge: undefined, flip: false, state: 'idle' })

defineEmits<{ select: [] }>()

/** Rozbalené okno si berie väčšinu riadku — na ktorej strane, určuje flip. */
const focus = computed(() =>
  props.state === 'active' ? (props.flip ? 'right' : 'left') : 'none')

// Rozbalenie animuje priamo fr stĺpce riadku — okno narastie do šírky
// a text ustúpi do užšieho stĺpca, rovnako ako karty na homepage.
const block = cva({
  base: {
    display: 'grid',
    gap: 'clamp(30px, 4vw, 70px)',
    alignItems: 'center',
    paddingBlock: 'clamp(48px, 7vh, 84px)',
    borderTop: '1px solid',
    borderColor: 'hairline',
    transition: 'grid-template-columns 0.7s {easings.out}',
    '&:first-child': { borderTop: 'none' },
    '@media (max-width: 900px)': { gridTemplateColumns: '1fr !important' },
  },
  variants: {
    focus: {
      none: { gridTemplateColumns: '1.1fr 0.9fr' },
      left: { gridTemplateColumns: '1.5fr 0.5fr' },
      right: { gridTemplateColumns: '0.5fr 1.5fr' },
    },
  },
})

const cover = cva({
  base: {
    position: 'relative',
    height: 'clamp(300px, 26vw, 440px)',
    borderRadius: '18px',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'ink/7',
    transition: 'height 0.7s {easings.out}',
  },
  variants: {
    tone: {
      blush: { background: 'linear-gradient(165deg, token(colors.cover.blush), token(colors.cover.blush2))' },
      navy: { background: 'linear-gradient(165deg, token(colors.cover.navy), token(colors.cover.navy2))' },
      mint: { background: 'linear-gradient(165deg, token(colors.cover.mint), token(colors.cover.mint2))' },
    },
    state: {
      idle: {},
      // výška ide ruka v ruke so širším stĺpcom — iMac tak drží pomer 16:9
      active: { height: 'clamp(420px, 44vw, 660px)' },
    },
    flip: {
      true: {
        order: 2,
        '@media (max-width: 900px)': { order: 0 },
      },
    },
  },
})

/** Nerozbalený obal: priehľadný štít nad oknom — hover/klik patria karte, nie iframe. */
const shield = css({
  position: 'absolute',
  inset: 0,
  zIndex: 4,
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
  lineHeight: 1.04,
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
</script>

<template>
  <article :class="[block({ focus }), 'group']">
    <div
      :class="cover({ tone, state, flip })"
      :data-cursor="state === 'active' ? 'none' : 'view'"
      :data-cursor-solid="tone === 'navy' ? undefined : ''"
      @click="state !== 'active' && $emit('select')"
    >
      <div :class="coverInner">
        <slot />
      </div>
      <div v-if="state !== 'active'" :class="shield" aria-hidden="true" />
    </div>
    <div>
      <div :class="heading">
        {{ name }}<span v-if="badge" :class="clayBadge">{{ badge }}</span>
      </div>
      <div :class="tag">{{ tagline }}</div>
      <div :class="qa">
        <div :class="qaLabel">Zadanie</div>
        <p :class="qaText">{{ brief }}</p>
      </div>
      <div :class="qa">
        <div :class="qaLabel">Riešenie</div>
        <p :class="qaText">{{ solution }}</p>
      </div>
    </div>
  </article>
</template>
