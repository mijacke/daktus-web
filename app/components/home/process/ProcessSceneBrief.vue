<script setup lang="ts">
import { css } from '~~/styled-system/css'

const CHECKS = [
  { label: 'Ciele a metriky', delay: 15 },
  { label: 'Cieľová skupina', delay: 45 },
  { label: 'Obsah a štruktúra', delay: 75 },
  { label: 'Konkurencia a trh', delay: 105 },
] as const

const NODES = [
  { label: 'Služby', x: 15, delay: 70 },
  { label: 'Projekty', x: 105, delay: 90 },
  { label: 'Kontakt', x: 195, delay: 110 },
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

const sitemap = css({
  width: '100%',
  fontFamily: 'sans',
})

const draw = css({
  strokeDashoffset: '320',
  transition: 'stroke-dashoffset 1.2s ease 0.4s',
  stroke: 'accent/60',
  '.scene-on &': { strokeDashoffset: '0' },
  _motionReduce: { strokeDashoffset: '0', transition: 'none' },
})

const rootRect = css({ fill: 'accent/16' })
const rootText = css({ fill: 'accent', fontWeight: 600 })
const nodeRect = css({ fill: 'dark.fg/8' })
const nodeText = css({ fill: 'dark.fg' })
</script>

<template>
  <div :class="sceneGrid">
    <ProcessPanel title="Zadanie">
      <div v-for="item in CHECKS" :key="item.label" :class="[check, sceneItem({ delay: item.delay })]">
        <span :class="checkCircle"><IconCheck :size="10" /></span>{{ item.label }}
      </div>
    </ProcessPanel>
    <ProcessPanel title="Mapa webu">
      <svg :class="sitemap" height="200" viewBox="0 0 300 200" fill="none" aria-hidden="true">
        <path
          :class="draw"
          d="M150 38 L150 78 M150 78 L60 118 M150 78 L150 118 M150 78 L240 118"
          stroke-width="1.6"
          stroke-dasharray="320"
        />
        <g :class="sceneItem({ delay: 20 })">
          <rect :class="rootRect" x="105" y="14" width="90" height="26" rx="13" />
          <text :class="rootText" x="150" y="31" text-anchor="middle" font-size="11">Domov</text>
        </g>
        <g v-for="node in NODES" :key="node.label" :class="sceneItem({ delay: node.delay })">
          <rect :class="nodeRect" :x="node.x" y="118" width="90" height="26" rx="13" />
          <text :class="nodeText" :x="node.x + 45" y="135" text-anchor="middle" font-size="11">{{ node.label }}</text>
        </g>
      </svg>
    </ProcessPanel>
  </div>
</template>
