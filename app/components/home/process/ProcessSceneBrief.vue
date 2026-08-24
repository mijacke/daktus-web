<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Analýza — z rozhovoru zadanie: klientove slová padajú ako lístky,
 * prelejú sa do usporiadaného zadania a dole z neho vyrastie mapa webu.
 */
const NOTES = [
  { text: '„potrebujeme rezervácie"', delay: 15 },
  { text: '„väčšina ľudí príde z mobilu"', delay: 25 },
  { text: '„spustiť do jari"', delay: 35 },
  { text: '„čisté, veľa vzduchu"', delay: 45 },
  { text: '„fotky sú základ"', delay: 55 },
] as const

const SPEC = [
  { text: 'Rezervačný modul s kalendárom', delay: 75 },
  { text: 'Mobil first, galérie v plnej šírke', delay: 85 },
  { text: 'Míľnik: ostrá prevádzka v marci', delay: 100 },
  { text: 'Štýl: minimal, vzdušná typografia', delay: 110 },
] as const

const MAP_NODES = [
  { label: 'Galérie', delay: 130 },
  { label: 'Cenník', delay: 135 },
  { label: 'Rezervácia', delay: 140 },
] as const

const root = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})

const main = css({
  flex: 1,
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: '1fr 44px 1.15fr',
  gap: '10px',
  // stĺpce aj šípka sedia na jednej vodorovnej osi
  alignItems: 'center',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr', gap: '18px' },
})

const colLabel = css({
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.dim',
})

const notes = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '9px',
  alignContent: 'flex-start',
})

/** Lístky z callu — naklonené, ako na stole po rozhovore. */
const note = css({
  fontSize: '13px',
  color: 'dark.fg',
  background: 'dark.fg/7',
  border: '1px solid',
  borderColor: 'dark.fg/14',
  borderRadius: '9px',
  padding: '7px 11px',
  '&:nth-child(odd)': { transform: 'rotate(-2deg)' },
  '&:nth-child(even)': { transform: 'rotate(1.6deg)' },
})

const arrow = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'accent',
  '@media (max-width: 1000px)': { transform: 'rotate(90deg)' },
})

const specRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '11px',
  paddingBlock: '11px',
  fontSize: '13.5px',
  color: 'dark.fg',
  borderBottom: '1px solid',
  borderColor: 'dark.fg/6',
  '&:last-child': { borderBottom: 'none' },
})

const specCheck = css({
  width: '18px',
  height: '18px',
  borderRadius: 'full',
  background: 'accent/16',
  color: 'accent',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
})

/** Zo zadania vyrastie mapa — pás uzlov namiesto mŕtveho stromu. */
const mapRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  flexWrap: 'wrap',
})

const mapNode = css({
  fontSize: '12px',
  color: 'dark.fg',
  background: 'dark.fg/8',
  borderRadius: 'full',
  padding: '5px 13px',
})

const mapRoot = css({
  fontSize: '12px',
  fontWeight: 600,
  color: 'accent',
  background: 'accent/18',
  borderRadius: 'full',
  padding: '5px 13px',
})

const mapLink = css({
  width: '18px',
  height: '1.5px',
  background: 'accent/50',
  flexShrink: 0,
})
</script>

<template>
  <div :class="root">
    <div :class="main">
      <ProcessPanel title="Z rozhovoru">
        <div :class="notes">
          <span v-for="item in NOTES" :key="item.text" :class="[note, sceneItem({ delay: item.delay })]">{{ item.text }}</span>
        </div>
      </ProcessPanel>
      <div :class="[arrow, sceneItem({ delay: 70 })]">
        <svg width="30" height="14" viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M 1 7 H 27 M 21 1.5 L 27 7 L 21 12.5" />
        </svg>
      </div>
      <ProcessPanel title="Zadanie">
        <div v-for="item in SPEC" :key="item.text" :class="[specRow, sceneItem({ delay: item.delay })]">
          <span :class="specCheck"><IconCheck :size="9" /></span>{{ item.text }}
        </div>
      </ProcessPanel>
    </div>
    <div :class="mapRow">
      <span :class="[colLabel, sceneItem({ delay: 120 })]">Mapa webu</span>
      <span :class="[mapRoot, sceneItem({ delay: 120 })]">Domov</span>
      <template v-for="item in MAP_NODES" :key="item.label">
        <span :class="[mapLink, sceneItem({ delay: item.delay })]" />
        <span :class="[mapNode, sceneItem({ delay: item.delay })]">{{ item.label }}</span>
      </template>
    </div>
  </div>
</template>
