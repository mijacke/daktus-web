<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Mini okno prehliadača — služba „Tvorba webstránok". Hover karty stránku „načíta". */
const win = css({
  border: '1px solid',
  borderColor: 'hairline.soft',
  borderRadius: '10px',
  background: 'paper',
  overflow: 'hidden',
})

const head = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '24px',
  paddingInline: '9px',
  background: 'paper2',
  borderBottom: '1px solid',
  borderColor: 'hairline.soft',
})

const dot = css({
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  '&:nth-child(1)': { background: 'traffic.red' },
  '&:nth-child(2)': { background: 'traffic.amber' },
  '&:nth-child(3)': { background: 'traffic.green' },
})

const url = css({
  flex: 1,
  maxWidth: '92px',
  height: '9px',
  marginInline: 'auto',
  borderRadius: 'full',
  background: 'ink/7',
})

const progress = css({
  position: 'absolute',
  left: 0,
  bottom: '-1px',
  height: '2px',
  width: 0,
  background: 'accent',
  transition: 'width 0.9s {easings.out}',
  '[data-svc]:hover &': { width: '100%' },
  _motionReduce: { transition: 'none' },
})

const body = css({ padding: '10px 10px 12px' })

const eyebrow = css({
  width: '30px',
  height: '4px',
  borderRadius: 'full',
  background: 'accent',
})

const titleBar = css({
  width: '72%',
  height: '9px',
  borderRadius: '4px',
  background: 'ink/14',
  marginTop: '7px',
})

const textBar = css({
  width: '46%',
  height: '5px',
  borderRadius: '3px',
  background: 'ink/9',
  marginTop: '6px',
})

const hero = css({
  height: '42px',
  borderRadius: '7px',
  marginTop: '9px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 32%, transparent), color-mix(in srgb, token(colors.accent) 9%, transparent))',
  opacity: 0.55,
  transform: 'scale(0.985)',
  transition: 'opacity 0.6s ease 0.35s, transform 0.6s {easings.out} 0.35s',
  '[data-svc]:hover &': { opacity: 1, transform: 'none' },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
})
</script>

<template>
  <div :class="win" aria-hidden="true">
    <div :class="head">
      <i :class="dot" /><i :class="dot" /><i :class="dot" />
      <span :class="url" />
      <span :class="progress" />
    </div>
    <div :class="body">
      <div :class="eyebrow" />
      <div :class="titleBar" />
      <div :class="textBar" />
      <div :class="hero" />
    </div>
  </div>
</template>
