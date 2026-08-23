<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Mini iPhone so strieborným prstencom — hover karty doručí push notifikáciu. */
const phone = css({
  position: 'relative',
  width: '66px',
  height: '112px',
  borderRadius: '15px',
  border: '1.5px solid',
  borderColor: 'device.silver2',
  background: 'paper',
  padding: '15px 7px 8px',
  overflow: 'hidden',
  boxShadow: 'inset 0 0 0 2px token(colors.device.silver), 0 10px 22px rgba(16, 19, 21, 0.10)',
  // bočné tlačidlá — hlasitosť vľavo, zapínanie vpravo
  _before: {
    content: '""',
    position: 'absolute',
    left: '-3px',
    top: '30%',
    width: '2px',
    height: '12px',
    borderRadius: '1px',
    background: 'device.silver2',
    boxShadow: '0 16px 0 token(colors.device.silver2)',
  },
})

/** Dynamic island. */
const island = css({
  position: 'absolute',
  top: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '20px',
  height: '5.5px',
  borderRadius: 'full',
  background: 'device.island',
})

/** Push notifikácia — na hover sa spustí spoza horného okraja displeja. */
const push = css({
  position: 'absolute',
  top: '4px',
  left: '5px',
  right: '5px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  height: '15px',
  paddingInline: '4px',
  borderRadius: '5px',
  background: 'card',
  border: '1px solid',
  borderColor: 'accent/45',
  boxShadow: 'card',
  transform: 'translateY(-24px)',
  transition: 'transform 0.5s {easings.out} 0.15s',
  zIndex: 2,
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
  width: '68%',
  height: '7px',
  borderRadius: '4px',
  background: 'ink/14',
})

const block = css({
  height: '34px',
  borderRadius: '7px',
  marginTop: '7px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 28%, transparent), color-mix(in srgb, token(colors.accent) 8%, transparent))',
})

const tabs = css({
  position: 'absolute',
  left: '8px',
  right: '8px',
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
  <div :class="phone" aria-hidden="true">
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
</template>
