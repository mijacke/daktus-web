<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * MacBook rám okolo demo okna procesu — odtiene adaptované z devices.css
 * (MIT, picturepan2), rovnako ako rámy živých náhľadov projektov.
 */
const shell = css({ position: 'relative' })

const screen = css({
  background: 'device.dark',
  borderRadius: '20px 20px 10px 10px',
  padding: '13px 13px 15px',
  position: 'relative',
  border: '1px solid',
  borderColor: 'device.dark2',
  boxShadow: 'window',
})

const camera = css({
  position: 'absolute',
  top: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '4px',
  height: '4px',
  borderRadius: 'full',
  background: 'device.dark3',
})

const display = css({
  borderRadius: '7px',
  overflow: 'hidden',
})

const deck = css({
  position: 'relative',
  height: '15px',
  marginInline: 'clamp(-34px, -3.2vw, -16px)',
  background: 'linear-gradient(180deg, token(colors.device.aluminum), token(colors.device.aluminum2) 62%, token(colors.device.aluminum4))',
  borderRadius: '2px 2px 14px 14px',
  _before: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '92px',
    height: '7px',
    borderRadius: '0 0 9px 9px',
    background: 'device.aluminum3',
  },
})
</script>

<template>
  <div :class="shell">
    <div :class="screen">
      <span :class="camera" />
      <div :class="display">
        <slot />
      </div>
    </div>
    <div :class="deck" />
  </div>
</template>
