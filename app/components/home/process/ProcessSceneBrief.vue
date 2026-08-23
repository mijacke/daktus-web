<script setup lang="ts">
import { css } from '~~/styled-system/css'

const CHECKS = [
  { label: 'Ciele a metriky', delay: 15 },
  { label: 'Cieľová skupina', delay: 45 },
  { label: 'Obsah a štruktúra', delay: 75 },
  { label: 'Konkurencia a trh', delay: 105 },
] as const

const check = css({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  paddingBlock: '9px',
  fontSize: '14px',
  color: 'dark.fg',
})

const checkCircle = css({
  width: '20px',
  height: '20px',
  borderRadius: 'full',
  background: 'accent/16',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: 'accent',
})

/** Panel mapy webu je stĺpec, aby sa súhrn dole prilepil na spodok. */
const mapPanel = css({
  display: 'flex',
  flexDirection: 'column',
})
</script>

<template>
  <div :class="sceneGrid">
    <ProcessPanel title="Zadanie">
      <div v-for="item in CHECKS" :key="item.label" :class="[check, sceneItem({ delay: item.delay })]">
        <span :class="checkCircle"><IconCheck :size="10" /></span>{{ item.label }}
      </div>
    </ProcessPanel>
    <ProcessPanel :class="mapPanel" title="Mapa webu" meta="12 podstránok">
      <ProcessSitemap />
    </ProcessPanel>
  </div>
</template>
