<script setup lang="ts">
import { css } from '~~/styled-system/css'

const NODES = [
  { label: 'Služby', count: 4, subpages: ['Weby', 'E-shopy', 'Dizajn', 'Údržba'], delay: 70 },
  { label: 'Projekty', count: 6, subpages: ['Prehľad', 'Detail projektu'], delay: 90 },
  { label: 'O nás', count: 1, subpages: [], delay: 110 },
  { label: 'Kontakt', count: 1, subpages: [], delay: 130 },
] as const

const STATS = ['4 sekcie', '2 úrovne', 'SK / EN']

const root = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
})

const rootNode = css({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  padding: '8px 12px',
  border: '1px solid',
  borderColor: 'accent/35',
  background: 'accent/8',
  borderRadius: '10px',
})

const dot = css({
  width: '6px',
  height: '6px',
  borderRadius: 'full',
  background: 'accent',
  flexShrink: 0,
})

const rootLabel = css({
  fontSize: '13px',
  fontWeight: 500,
  color: 'dark.fg',
})

const rootTag = css({
  marginLeft: 'auto',
  fontSize: '10px',
  letterSpacing: '0.1em',
  color: 'accent',
})

const tree = css({
  display: 'flex',
  flexDirection: 'column',
})

/** Vetva stromu — zvislá spojnica vľavo, vodorovná odbočka k uzlu. */
const branch = css({
  position: 'relative',
  padding: '9px 0 0 28px',
  _before: {
    content: '""',
    position: 'absolute',
    left: '13px',
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'dark.fg/12',
  },
  _after: {
    content: '""',
    position: 'absolute',
    left: '13px',
    top: '25px',
    width: '15px',
    height: '1px',
    background: 'dark.fg/12',
  },
  // pri poslednej vetve spojnica končí pri odbočke
  '&:last-child::before': { bottom: 'auto', height: '25px' },
})

const node = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '7px 12px',
  border: '1px solid',
  borderColor: 'dark.fg/10',
  background: 'dark.fg/3',
  borderRadius: '9px',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  _hover: { borderColor: 'accent/40', background: 'accent/6' },
})

const nodeLabel = css({
  fontSize: '13px',
  color: 'dark.fg',
})

const nodeCount = css({
  marginLeft: 'auto',
  fontSize: '10.5px',
  color: 'dark.dim',
})

const chipRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  paddingTop: '7px',
  // v úzkych stĺpcoch by sa štítky zalomili cez pol panela — strom ostane bez nich
  '@media (max-width: 1200px)': { display: 'none' },
})

const chip = css({
  fontSize: '11px',
  color: 'dark.dim',
  border: '1px solid',
  borderColor: 'dark.fg/9',
  borderRadius: '7px',
  padding: '4px 8px',
})

const stats = css({
  marginTop: 'auto',
  paddingTop: '12px',
  display: 'flex',
  gap: '18px',
  fontSize: '10.5px',
  letterSpacing: '0.06em',
  color: 'dark.dim',
  opacity: 0.7,
})
</script>

<template>
  <div :class="root">
    <div :class="[rootNode, sceneItem({ delay: 20 })]">
      <span :class="dot" />
      <span :class="rootLabel">Domov</span>
      <span :class="rootTag">ROOT</span>
    </div>

    <div :class="tree">
      <div v-for="item in NODES" :key="item.label" :class="[branch, sceneItem({ delay: item.delay })]">
        <div :class="node">
          <span :class="nodeLabel">{{ item.label }}</span>
          <span :class="nodeCount">{{ item.count }}</span>
        </div>
        <div v-if="item.subpages.length" :class="chipRow">
          <span v-for="page in item.subpages" :key="page" :class="chip">{{ page }}</span>
        </div>
      </div>
    </div>

    <div :class="[stats, sceneItem({ delay: 150 })]">
      <span v-for="stat in STATS" :key="stat">{{ stat }}</span>
    </div>
  </div>
</template>
