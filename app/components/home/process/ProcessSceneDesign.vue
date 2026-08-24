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
const cursorEl = ref<HTMLElement | null>(null)
const ringEl = ref<HTMLElement | null>(null)
const paperEl = ref<HTMLElement | null>(null)
const mintEl = ref<HTMLElement | null>(null)

const { tone } = useDesignSceneLoop(
  toRef(props, 'running'),
  { root: rootEl, board: boardEl, cursor: cursorEl, ring: ringEl, paper: paperEl, mint: mintEl },
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
  outlineColor: 'paper',
  outlineOffset: '6px',
  // origin vľavo hore = pravý dolný roh (s kurzorom) sa hýbe najviac;
  // transform píše výhradne GSAP — CSS transition by mu ťahy rozmazávala
  transformOrigin: 'top left',
  transition: 'outline-color 0.4s ease',
  '&.line-mint': { outlineColor: 'accent' },
})

/** Mini stránka v artboarde — reálny obsah v Archivo 800, žiadny skeleton. */
const nav = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const miniLogo = css({
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: '8px',
  letterSpacing: '0.03em',
  color: 'ink',
})

const miniMenu = css({
  display: 'flex',
  gap: '8px',
  fontSize: '6.5px',
  fontWeight: 500,
  color: 'ink/55',
  transition: 'color 0.4s ease',
  // klik na mint v palete prefarbí práve tieto tri položky menu
  '&.menu-mint': { color: 'accent.deep', fontWeight: 700 },
})

const miniTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: '17px',
  lineHeight: 1.04,
  letterSpacing: '-0.01em',
  color: 'ink',
  marginTop: '13px',
})

const miniNote = css({
  fontSize: '7.5px',
  color: 'ink/60',
  maxWidth: '75%',
  margin: '5px 0 0',
})

const img = css({
  height: 'clamp(44px, 5vw, 66px)',
  borderRadius: '7px',
  marginTop: '11px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 45%, transparent), color-mix(in srgb, token(colors.accent) 15%, transparent))',
})

const miniCta = css({
  display: 'inline-block',
  fontSize: '7px',
  fontWeight: 700,
  color: 'paper',
  background: 'ink',
  borderRadius: 'full',
  padding: '4px 10px',
  marginTop: '10px',
})

/**
 * Putujúci kurzor — roh artboardu ↔ paleta. Hýbe ho výhradne GSAP a aj
 * ho odkrýva (autoAlpha) až po zmeraní polohy, takže sa nikdy neukáže
 * vľavo hore pred prvým umiestnením.
 */
const cursorHolder = css({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 3,
  opacity: 0,
  pointerEvents: 'none',
  willChange: 'transform',
})

/** Prstenec klik efektu — rozpŕskne ho GSAP od hrotu kurzora. */
const clickRing = css({
  position: 'absolute',
  left: '-7px',
  top: '-7px',
  width: '18px',
  height: '18px',
  borderRadius: 'full',
  border: '1.5px solid',
  borderColor: 'accent',
  opacity: 0,
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
        <div ref="boardEl" :class="[board, { 'line-mint': tone === 'mint' }]">
          <div :class="[nav, sceneItem({ delay: 25 })]">
            <span :class="miniLogo">Daktus</span>
            <span :class="[miniMenu, { 'menu-mint': tone === 'mint' }]"><span>Domov</span><span>Služby</span><span>Kontakt</span></span>
          </div>
          <div :class="[miniTitle, sceneItem({ delay: 45 })]">Váš nový web</div>
          <p :class="[miniNote, sceneItem({ delay: 50 })]">Jasný obsah, vzdušný spacing a typografia Archivo 800.</p>
          <div :class="[img, sceneItem({ delay: 75 })]" />
          <span :class="[miniCta, sceneItem({ delay: 100 })]">Napíšte nám</span>
        </div>
      </div>
    </div>
    <div :class="rail">
      <span :class="[railLabel, sceneItem({ delay: 130 })]">Paleta</span>
      <div :class="[swatches, sceneItem({ delay: 130 })]">
        <i :class="swatch({ tone: 'ink' })" />
        <i ref="mintEl" :class="swatch({ tone: 'mint' })" />
        <i ref="paperEl" :class="swatch({ tone: 'paper' })" />
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
    <div ref="cursorEl" :class="cursorHolder" aria-hidden="true">
      <span ref="ringEl" :class="clickRing" />
      <svg width="17" height="19" viewBox="0 0 14 16">
        <path :class="cursorPath" d="M 1 1 L 12 9 L 7 10 L 9.5 15 L 7 16 L 4.5 11 L 1 14 Z" stroke-width="1.2" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>
