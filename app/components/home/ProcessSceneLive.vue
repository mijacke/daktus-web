<script setup lang="ts">
import { css } from '~~/styled-system/css'

const META = [
  { label: 'SSL aktívne', delay: 75 },
  { label: 'Zálohy zapnuté', delay: 90 },
  { label: 'Monitoring 24/7', delay: 105 },
] as const

const liveWrap = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '18px',
  textAlign: 'center',
})

const liveDot = css({
  position: 'relative',
  width: '16px',
  height: '16px',
  borderRadius: 'full',
  background: 'accent',
  _after: {
    content: '""',
    position: 'absolute',
    inset: '-8px',
    borderRadius: 'full',
    border: '2px solid',
    borderColor: 'accent/50',
    animation: 'pulse 1.8s ease-out infinite',
  },
  _motionReduce: { _after: { animation: 'none' } },
})

const liveTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(34px, 3vw, 48px)',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'dark.fg',
})

const livePill = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  height: '38px',
  paddingInline: '18px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'dark.fg/16',
  fontSize: '13.5px',
  color: 'dark.fg',
})

const pillIcon = css({
  display: 'inline-flex',
  color: 'accent',
})

const liveMeta = css({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  justifyContent: 'center',
})

const metaChip = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  height: '30px',
  paddingInline: '14px',
  borderRadius: 'full',
  background: 'accent/12',
  fontSize: '12px',
  fontWeight: 600,
  color: 'accent',
})
</script>

<template>
  <div :class="liveWrap">
    <span :class="[liveDot, sceneItem({ delay: 20 })]" />
    <div :class="[liveTitle, sceneItem({ delay: 35 })]">Naživo</div>
    <span :class="[livePill, sceneItem({ delay: 55 })]">
      <span :class="pillIcon">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M8 1.5v13M8 1.5 3.5 6M8 1.5 12.5 6" />
        </svg>
      </span>
      vas-projekt.sk je nasadený
    </span>
    <div :class="liveMeta">
      <span v-for="item in META" :key="item.label" :class="[metaChip, sceneItem({ delay: item.delay })]">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>
