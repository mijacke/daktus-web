<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  eyebrow: string
  title: string
  note: string
}>()

const head = css({
  padding: 'clamp(140px, 17vh, 200px) 0 clamp(24px, 4vh, 56px)',
})

const eyebrowRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
})

const dash = css({
  width: '26px',
  height: '2px',
  background: 'accent',
  flexShrink: 0,
})

const label = css({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'dim',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(46px, 6.6vw, 110px)',
  lineHeight: 0.96,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  margin: '24px 0 0',
})

/**
 * Miesená guľôčka hmoty namiesto interpunkčnej bodky — clay podpis titulku.
 * Rozmer aj poloha v em, nech bodka rastie s fontom; záporný vertical-align
 * kompenzuje vnútorný odstup gule vo viewboxe, aby sadla na účiaru.
 */
const dot = css({
  display: 'inline-flex',
  width: '0.36em',
  height: '0.36em',
  marginLeft: '0.05em',
  verticalAlign: '-0.06em',
  '& svg': { width: '100%', height: '100%' },
})

const noteText = css({
  maxWidth: '560px',
  fontSize: 'clamp(15px, 1.1vw, 18px)',
  color: 'dim',
  margin: '26px 0 0',
})
</script>

<template>
  <div :class="head">
    <div :class="eyebrowRow">
      <span :class="dash" />
      <span :class="label">{{ eyebrow }}</span>
    </div>
    <h1 :class="heading">{{ title }}<span :class="dot" aria-hidden="true"><ClayGlyph name="bodka" /></span></h1>
    <p :class="noteText">{{ note }}</p>
  </div>
</template>
