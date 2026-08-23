<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Drôtený model sa po chvíli „vyfarbí" — z čiarkovaných obrysov plné tvary. */
const skeleton = cva({
  base: {
    border: '1.5px dashed',
    borderColor: 'dark.fg/25',
    borderRadius: '8px',
    background: 'dark.fg/3',
    transitionProperty: 'background-color, border-color',
    transitionDuration: '0.8s',
    transitionTimingFunction: 'ease',
    transitionDelay: '1.1s',
    _motionReduce: { transition: 'none' },
  },
  variants: {
    kind: {
      title: {
        height: '26px',
        width: '55%',
        '.scene-on &': { background: 'dark.fg/28', borderColor: 'transparent' },
      },
      line: {
        height: '12px',
        width: '85%',
        marginTop: '12px',
        '.scene-on &': { background: 'dark.fg/16', borderColor: 'transparent' },
      },
      lineShort: {
        height: '12px',
        width: '70%',
        marginTop: '8px',
        '.scene-on &': { background: 'dark.fg/16', borderColor: 'transparent' },
      },
      block: {
        height: '88px',
        marginTop: '16px',
        '.scene-on &': { background: 'accent/26', borderColor: 'transparent' },
      },
      pill: {
        height: '32px',
        width: '118px',
        borderRadius: 'full',
        '.scene-on &': { background: 'accent/60', borderColor: 'transparent' },
      },
    },
  },
})

const pillRow = css({
  display: 'flex',
  gap: '10px',
  marginTop: '16px',
})

const visualTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '24px',
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
  color: 'dark.fg',
})

const visualNote = css({
  fontSize: '12.5px',
  color: 'dark.dim',
  marginTop: '8px',
})

const visualHero = css({
  height: '74px',
  borderRadius: '10px',
  marginTop: '14px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 35%, transparent), color-mix(in srgb, token(colors.accent) 10%, transparent))',
})

const buttonRow = css({
  display: 'flex',
  gap: '10px',
  marginTop: '14px',
})

const buttonFill = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '32px',
  paddingInline: '16px',
  borderRadius: 'full',
  background: 'accent',
  color: 'dark.bg',
  fontSize: '12px',
  fontWeight: 700,
})

const buttonGhost = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '32px',
  paddingInline: '16px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'dark.fg/20',
  color: 'dark.fg',
  fontSize: '12px',
})

const swatchRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '16px',
})

const swatch = cva({
  base: { width: '26px', height: '26px', borderRadius: '7px' },
  variants: {
    tone: {
      ink: { background: 'dark.bg', border: '1px solid', borderColor: 'dark.fg/20' },
      accent: { background: 'accent' },
      paper: { background: 'paper' },
    },
  },
})

const swatchNote = css({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '11px',
  color: 'dark.dim',
  marginLeft: '6px',
})
</script>

<template>
  <div :class="sceneGrid">
    <ProcessPanel title="Wireframe">
      <div :class="skeleton({ kind: 'title' })" />
      <div :class="skeleton({ kind: 'line' })" />
      <div :class="skeleton({ kind: 'lineShort' })" />
      <div :class="skeleton({ kind: 'block' })" />
      <div :class="pillRow">
        <div :class="skeleton({ kind: 'pill' })" />
        <div :class="skeleton({ kind: 'pill' })" />
      </div>
    </ProcessPanel>
    <ProcessPanel title="Vizuál">
      <div :class="[visualTitle, sceneItem({ delay: 25 })]">Weby, ktoré predávajú</div>
      <div :class="[visualNote, sceneItem({ delay: 50 })]">Podnadpis a text, ktorý dáva zmysel vašim klientom.</div>
      <div :class="[visualHero, sceneItem({ delay: 75 })]" />
      <div :class="buttonRow">
        <span :class="[buttonFill, sceneItem({ delay: 100 })]">Objednať</span>
        <span :class="[buttonGhost, sceneItem({ delay: 115 })]">Viac info</span>
      </div>
      <div :class="swatchRow">
        <span :class="[swatch({ tone: 'ink' }), sceneItem({ delay: 130 })]" />
        <span :class="[swatch({ tone: 'accent' }), sceneItem({ delay: 140 })]" />
        <span :class="[swatch({ tone: 'paper' }), sceneItem({ delay: 150 })]" />
        <span :class="[swatchNote, sceneItem({ delay: 160 })]">Paleta a typografia Archivo</span>
      </div>
    </ProcessPanel>
  </div>
</template>
