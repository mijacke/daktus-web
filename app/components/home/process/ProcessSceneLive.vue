<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Deploy log — riadky nabehnú postupne, posledný rozsvieti doménu naživo. */
const LOG = [
  { text: '$ npm run generate', tone: 'cmd', delay: 15 },
  { text: '✓ 5 stránok vygenerovaných', tone: 'ok', delay: 35 },
  { text: '→ nahrávam na produkciu…', tone: 'plain', delay: 55 },
  { text: '✓ DNS a SSL certifikát aktívne', tone: 'ok', delay: 75 },
  { text: '✓ vas-projekt.sk je naživo', tone: 'accent', delay: 100 },
] as const

const META = [
  { label: 'Zálohy zapnuté', delay: 130 },
  { label: 'Monitoring 24/7', delay: 140 },
] as const

const logLine = css({
  fontFamily: 'mono',
  fontSize: '12.5px',
  lineHeight: 2.1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'dark.fg/60',
  '&[data-tone="cmd"]': { color: 'dark.fg/85' },
  '&[data-tone="ok"]': { color: 'dark.fg/60', _firstLetter: { color: 'accent' } },
  '&[data-tone="accent"]': { color: 'accent', fontWeight: 700 },
})

const liveWrap = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
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

const liveNote = css({
  fontSize: '13px',
  color: 'dark.dim',
  maxWidth: '210px',
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
  <div :class="sceneGrid">
    <ProcessPanel title="Nasadenie">
      <div
        v-for="item in LOG"
        :key="item.text"
        :class="[logLine, sceneItem({ delay: item.delay })]"
        :data-tone="item.tone"
      >
        {{ item.text }}
      </div>
    </ProcessPanel>
    <div :class="liveWrap">
      <span :class="[liveDot, sceneItem({ delay: 110 })]" />
      <div :class="[liveTitle, sceneItem({ delay: 120 })]">Naživo</div>
      <div :class="[liveNote, sceneItem({ delay: 130 })]">Spustením sa staráme ďalej — meranie, zálohy a údržba.</div>
      <div :class="liveMeta">
        <span v-for="item in META" :key="item.label" :class="[metaChip, sceneItem({ delay: item.delay })]">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>
