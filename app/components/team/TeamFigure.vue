<script setup lang="ts">
import { cva } from '~~/styled-system/css'

import { figureParts } from '~/utils/figure'
import type { TeamFigureName } from '~/utils/team'

/**
 * Pastelová figúrka člena tímu. Obrys tela a rekvizít ide cez rovnakú
 * turbulenciu ako plastelínové glyfy (ClayGlyph), tvár ostáva ostrá,
 * aby sa oči a úsmev pri malých veľkostiach nerozpadli.
 */
const props = defineProps<{
  name: TeamFigureName
  /** Popis pre čítačky — meno a rola. */
  label: string
}>()

const uid = useId()
const edgeId = `fe-${uid}`
const edge = `url(#${edgeId})`

const palette = cva({
  base: {
    display: 'block',
    height: '100%',
    width: 'auto',
    aspectRatio: '1',
  },
  variants: {
    name: {
      mario: {
        '--fig-body': 'token(colors.figure.mario.body)',
        '--fig-shade': 'token(colors.figure.mario.shade)',
        '--fig-hair': 'token(colors.figure.mario.hair)',
        '--fig-brow': 'token(colors.figure.mario.brow)',
        '--fig-prop': 'token(colors.figure.mario.prop)',
        '--fig-prop-line': 'token(colors.figure.mario.propLine)',
        '--fig-detail': 'token(colors.figure.mario.detail)',
        '--fig-soft': 'token(colors.figure.mario.soft)',
      },
      viktor: {
        '--fig-body': 'token(colors.figure.viktor.body)',
        '--fig-shade': 'token(colors.figure.viktor.shade)',
        '--fig-hair': 'token(colors.figure.viktor.hair)',
        '--fig-brow': 'token(colors.figure.viktor.brow)',
        '--fig-prop': 'token(colors.figure.viktor.prop)',
        '--fig-prop-line': 'token(colors.figure.viktor.propLine)',
        '--fig-detail': 'token(colors.figure.viktor.detail)',
        '--fig-soft': 'token(colors.figure.viktor.soft)',
      },
      boris: {
        '--fig-body': 'token(colors.figure.boris.body)',
        '--fig-shade': 'token(colors.figure.boris.shade)',
        '--fig-hair': 'token(colors.figure.boris.hair)',
        '--fig-brow': 'token(colors.figure.boris.brow)',
        '--fig-prop': 'token(colors.figure.boris.prop)',
        '--fig-prop-line': 'token(colors.figure.boris.propLine)',
        '--fig-detail': 'token(colors.figure.boris.detail)',
        '--fig-soft': 'token(colors.figure.boris.soft)',
      },
    },
  },
})
</script>

<template>
  <svg :class="palette({ name: props.name })" viewBox="0 0 200 200" role="img" :aria-label="label">
    <defs>
      <filter :id="edgeId" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <ellipse :class="figureParts.shadow" cx="100" cy="190" rx="54" ry="7" />
    <TeamFigureMario v-if="name === 'mario'" :edge="edge" />
    <TeamFigureViktor v-else-if="name === 'viktor'" :edge="edge" />
    <TeamFigureBoris v-else :edge="edge" />
  </svg>
</template>
