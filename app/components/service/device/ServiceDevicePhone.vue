<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Mini telefón — hover karty doručí push notifikáciu. */
const stage = css({
  display: 'flex',
  justifyContent: 'center',
})

const phone = css({
  position: 'relative',
  width: '62px',
  height: '104px',
  borderRadius: '14px',
  border: '1.5px solid',
  borderColor: 'ink/30',
  background: 'paper',
  padding: '13px 7px 8px',
  overflow: 'hidden',
})

const island = css({
  position: 'absolute',
  top: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '18px',
  height: '4px',
  borderRadius: 'full',
  background: 'ink/28',
})

/** Push notifikácia — na hover sa spustí spoza horného okraja displeja. */
const push = css({
  position: 'absolute',
  top: '4px',
  left: '6px',
  right: '6px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '14px',
  paddingInline: '4px',
  borderRadius: '5px',
  background: 'card',
  border: '1px solid',
  borderColor: 'accent/45',
  boxShadow: 'card',
  transform: 'translateY(-22px)',
  transition: 'transform 0.5s {easings.out} 0.15s',
  '[data-svc]:hover &': { transform: 'none' },
  _motionReduce: { transition: 'none' },
})

const pushDot = css({
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  background: 'accent',
  flexShrink: 0,
})

const pushBar = css({
  flex: 1,
  height: '4px',
  borderRadius: 'full',
  background: 'ink/12',
})

const titleBar = css({
  width: '70%',
  height: '7px',
  borderRadius: '4px',
  background: 'ink/14',
})

const block = css({
  height: '30px',
  borderRadius: '6px',
  marginTop: '7px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 28%, transparent), color-mix(in srgb, token(colors.accent) 8%, transparent))',
})

const tabs = css({
  position: 'absolute',
  left: '7px',
  right: '7px',
  bottom: '6px',
  display: 'flex',
  justifyContent: 'space-around',
})

const tab = css({
  width: '6px',
  height: '6px',
  borderRadius: 'full',
  background: 'ink/14',
  '&:nth-child(2)': { background: 'accent' },
})
</script>

<template>
  <div :class="stage" aria-hidden="true">
    <div :class="phone">
      <span :class="island" />
      <div :class="push">
        <span :class="pushDot" />
        <span :class="pushBar" />
      </div>
      <div :class="titleBar" />
      <div :class="block" />
      <div :class="tabs">
        <i :class="tab" /><i :class="tab" /><i :class="tab" />
      </div>
    </div>
  </div>
</template>
