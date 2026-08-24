<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/**
 * Dizajn — pozeráte dizajnérovi cez plece: bodkované plátno, artboard
 * s mini stránkou vo výbere (čiarkovaný rám, úchyty, kurzor) a lišta
 * vlastností s našou paletou. Kým je scéna otvorená, kurzor za roh
 * artboard donekonečna zmenšuje a zväčšuje a sem-tam si odskočí do
 * palety prepnúť farbu rámu výberu.
 */
const props = withDefaults(defineProps<{
  /** Scéna je otvorená — beží slučka dýchania a výletov kurzora. */
  running?: boolean
}>(), { running: false })

const rootEl = ref<HTMLElement | null>(null)
const boardEl = ref<HTMLElement | null>(null)
const paperEl = ref<HTMLElement | null>(null)
const mintEl = ref<HTMLElement | null>(null)

const { scale, linePaper, pressed, cursorStyle } = useDesignSceneLoop(
  toRef(props, 'running'),
  { root: rootEl, board: boardEl, paper: paperEl, mint: mintEl },
)

const root = css({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr clamp(150px, 19%, 195px)',
  gap: '16px',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr', gridTemplateRows: '1fr auto' },
})

const canvas = css({
  position: 'relative',
  border: '1px solid',
  borderColor: 'dark.fg/8',
  borderRadius: '12px',
  display: 'grid',
  placeItems: 'center',
  padding: '22px',
  backgroundImage: 'radial-gradient(color-mix(in srgb, token(colors.dark.fg) 7%, transparent) 1px, transparent 1px)',
  backgroundSize: '16px 16px',
})

/** Obal drží šírku a vstupnú animáciu; mierka dýchania žije na artboarde. */
const boardWrap = css({ width: 'min(340px, 84%)' })

const board = css({
  position: 'relative',
  width: '100%',
  background: 'paper',
  borderRadius: '8px',
  padding: '15px',
  outline: '1.5px dashed',
  outlineColor: 'accent',
  outlineOffset: '6px',
  // origin vľavo hore = pravý dolný roh (s kurzorom) sa hýbe najviac
  transformOrigin: 'top left',
  transition: 'transform 2.6s ease-in-out, outline-color 0.4s ease',
  _motionReduce: { transition: 'none' },
  '&.line-paper': { outlineColor: 'paper' },
})

const handle = cva({
  base: {
    position: 'absolute',
    width: '7px',
    height: '7px',
    borderRadius: '2px',
    background: 'accent',
    transition: 'background 0.4s ease',
    '.line-paper &': { background: 'paper' },
  },
  variants: {
    corner: {
      tl: { top: '-10px', left: '-10px' },
      tr: { top: '-10px', right: '-10px' },
      bl: { bottom: '-10px', left: '-10px' },
      br: { bottom: '-10px', right: '-10px' },
    },
  },
})

const nav = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const navLogo = css({ width: '26px', height: '5px', borderRadius: '3px', background: 'ink/75' })

const navMenu = css({
  display: 'flex',
  gap: '5px',
  '& i': { width: '11px', height: '3.5px', borderRadius: 'full', background: 'ink/22' },
})

const hline = css({ width: '74%', height: '9px', borderRadius: '4px', background: 'ink/55', marginTop: '11px' })
const hline2 = css({ width: '50%', height: '9px', borderRadius: '4px', background: 'ink/55', marginTop: '5px' })

const img = css({
  height: 'clamp(44px, 5vw, 66px)',
  borderRadius: '7px',
  marginTop: '11px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 45%, transparent), color-mix(in srgb, token(colors.accent) 15%, transparent))',
})

const cta = css({ width: '44px', height: '11px', borderRadius: 'full', background: 'ink/80', marginTop: '10px' })

/** Putujúci kurzor — roh artboardu ↔ paleta; polohy sa merajú za behu. */
const cursor = css({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 3,
  pointerEvents: 'none',
  transitionProperty: 'transform',
  willChange: 'transform',
  _motionReduce: { transition: 'none' },
})

const cursorPath = css({ fill: 'ink', stroke: 'paper' })

/** Lišta vlastností — paleta, typografia, spacing. Náš dizajn systém v kocke. */
const rail = css({
  border: '1px solid',
  borderColor: 'dark.fg/10',
  borderRadius: '12px',
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
  alignSelf: 'stretch',
})

const railLabel = css({
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.dim',
})

const swatches = css({
  display: 'flex',
  gap: '6px',
})

const swatch = cva({
  base: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    transition: 'transform 0.15s ease',
    '&.pressed': { transform: 'scale(0.8)' },
  },
  variants: {
    tone: {
      ink: { background: 'dark.bg', border: '1px solid', borderColor: 'dark.fg/20' },
      mint: { background: 'accent' },
      paper: { background: 'paper' },
    },
  },
})

const typo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '22px',
  lineHeight: 1,
  color: 'dark.fg',
})

const typoNote = css({
  fontFamily: 'mono',
  fontSize: '9px',
  letterSpacing: '0.08em',
  color: 'dark.dim',
  marginTop: '3px',
})

const slider = css({
  position: 'relative',
  height: '4px',
  borderRadius: 'full',
  background: 'dark.fg/12',
  _after: {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '62%',
    borderRadius: 'full',
    background: 'accent',
  },
})

const slider2 = css({
  position: 'relative',
  height: '4px',
  borderRadius: 'full',
  background: 'dark.fg/12',
  _after: {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '36%',
    borderRadius: 'full',
    background: 'accent',
  },
})
</script>

<template>
  <div ref="rootEl" :class="root">
    <div :class="canvas">
      <div :class="[boardWrap, sceneItem({ delay: 15 })]">
        <div ref="boardEl" :class="[board, { 'line-paper': linePaper }]" :style="{ transform: `scale(${scale})` }">
          <span :class="handle({ corner: 'tl' })" />
          <span :class="handle({ corner: 'tr' })" />
          <span :class="handle({ corner: 'bl' })" />
          <span :class="handle({ corner: 'br' })" />
          <div :class="[nav, sceneItem({ delay: 25 })]">
            <span :class="navLogo" /><span :class="navMenu"><i /><i /><i /></span>
          </div>
          <div :class="[hline, sceneItem({ delay: 45 })]" />
          <div :class="[hline2, sceneItem({ delay: 50 })]" />
          <div :class="[img, sceneItem({ delay: 75 })]" />
          <div :class="[cta, sceneItem({ delay: 100 })]" />
        </div>
      </div>
    </div>
    <div :class="rail">
      <span :class="[railLabel, sceneItem({ delay: 130 })]">Paleta</span>
      <div :class="[swatches, sceneItem({ delay: 130 })]">
        <i :class="swatch({ tone: 'ink' })" />
        <i ref="mintEl" :class="[swatch({ tone: 'mint' }), { pressed: pressed === 'mint' }]" />
        <i ref="paperEl" :class="[swatch({ tone: 'paper' }), { pressed: pressed === 'paper' }]" />
      </div>
      <span :class="[railLabel, sceneItem({ delay: 140 })]">Typografia</span>
      <div :class="sceneItem({ delay: 140 })">
        <div :class="typo">Aa</div>
        <div :class="typoNote">Archivo 800</div>
      </div>
      <span :class="[railLabel, sceneItem({ delay: 150 })]">Spacing</span>
      <div :class="[slider, sceneItem({ delay: 150 })]" />
      <div :class="[slider2, sceneItem({ delay: 160 })]" />
    </div>
    <svg :class="[cursor, sceneItem({ delay: 115 })]" :style="cursorStyle" width="17" height="19" viewBox="0 0 14 16" aria-hidden="true">
      <path :class="cursorPath" d="M 1 1 L 12 9 L 7 10 L 9.5 15 L 7 16 L 4.5 11 L 1 14 Z" stroke-width="1.2" stroke-linejoin="round" />
    </svg>
  </div>
</template>
