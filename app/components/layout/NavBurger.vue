<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{ open: boolean }>()

const burger = css({
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  width: '44px',
  height: '44px',
  marginRight: '-11px',
  background: 'transparent',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  '@media (max-width: 860px)': { display: 'inline-flex' },
})

/** Pevná plocha pre prúžky — kríž sa skladá z absolútnych pozícií. */
const bars = css({
  position: 'relative',
  width: '24px',
  height: '16px',
})

const bar = css({
  position: 'absolute',
  left: 0,
  width: '100%',
  height: '2px',
  borderRadius: 'full',
  background: 'currentColor',
  transitionProperty: 'transform, opacity',
  transitionDuration: '0.4s',
  transitionTimingFunction: 'out',
  '&:nth-child(1)': { top: 0 },
  '&:nth-child(2)': { top: '7px' },
  '&:nth-child(3)': { top: '14px' },
  // otvorené menu: krajné prúžky sa zídu do kríža, stredný sa stiahne a zmizne
  '.open &': {
    '&:nth-child(1)': { transform: 'translateY(7px) rotate(45deg)' },
    '&:nth-child(2)': { opacity: 0, transform: 'scaleX(0.3)' },
    '&:nth-child(3)': { transform: 'translateY(-7px) rotate(-45deg)' },
  },
  _motionReduce: { transition: 'none' },
})
</script>

<template>
  <button
    :class="[burger, { open }]"
    type="button"
    aria-controls="nav-drawer"
    :aria-expanded="open"
    :aria-label="open ? 'Zavrieť menu' : 'Otvoriť menu'"
  >
    <span :class="bars">
      <span :class="bar" />
      <span :class="bar" />
      <span :class="bar" />
    </span>
  </button>
</template>
