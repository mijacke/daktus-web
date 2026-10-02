<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

import { MARIO_PHONE } from '~/utils/team'
import type { TeamFigureName } from '~/utils/team'

/** Karta člena tímu — pastelová scéna s figúrkou, pod ňou na stred meno s telefónom vedľa a rola. */
defineProps<{
  name: string
  role: string
  figure: TeamFigureName
  phone?: boolean
}>()

const card = css({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: '18px',
  background: 'card',
  overflow: 'hidden',
  // figúrka sa na hover karty jemne zdvihne ako glyfy pri princípoch
  '&:hover [data-figure]': { transform: 'translateY(-6px)' },
})

const stage = cva({
  base: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 'clamp(200px, 19vw, 280px)',
    paddingTop: '18px',
  },
  variants: {
    figure: {
      mario: { background: 'figure.mario.stage' },
      viktor: { background: 'figure.viktor.stage' },
      boris: { background: 'figure.boris.stage' },
    },
  },
})

const figureBox = css({
  height: '100%',
  transition: 'transform 0.5s {easings.out}',
  _motionReduce: { transition: 'none' },
})

// text na stred pod figúrkou — meno s telefónom nerozťahuje prázdne miesto medzi okraje karty
const info = css({ padding: '20px 24px 24px', textAlign: 'center' })

const head = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexWrap: 'wrap',
  columnGap: '14px',
  rowGap: '4px',
})

const nameText = css({ fontFamily: 'display', fontWeight: 800, fontSize: '24px', lineHeight: 1.15 })

const phoneLink = css({
  color: 'accent.deep',
  fontWeight: 600,
  fontSize: '15px',
  whiteSpace: 'nowrap',
  // väčšia dotyková plocha bez posunu layoutu
  paddingBlock: '8px',
  marginBlock: '-8px',
  transition: 'color 0.3s ease',
  _hover: { color: 'ink' },
})

const roleText = css({ color: 'dim', fontSize: '15px', marginTop: '6px' })
</script>

<template>
  <article :class="card">
    <div :class="stage({ figure })">
      <div :class="figureBox" data-figure>
        <TeamFigure :name="figure" :label="`${name}, ${role}`" />
      </div>
    </div>
    <div :class="info">
      <div :class="head">
        <h4 :class="nameText">{{ name }}</h4>
        <a v-if="phone" :class="phoneLink" :href="MARIO_PHONE.href">{{ MARIO_PHONE.label }}</a>
      </div>
      <p :class="roleText">{{ role }}</p>
    </div>
  </article>
</template>
