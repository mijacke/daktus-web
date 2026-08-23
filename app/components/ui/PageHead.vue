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

const mark = css({ color: 'accent.deep' })

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
    <h1 :class="heading">{{ title }}<span :class="mark">.</span></h1>
    <p :class="noteText">{{ note }}</p>
  </div>
</template>
