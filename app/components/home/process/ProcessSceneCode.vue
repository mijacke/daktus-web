<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Živé programovanie: scroll v kroku prepisuje hodnotu `velkost` zo 100
 * na 50 a tlačidlo v náhľade sa z celej šírky stĺpca (ako boxy nad ním)
 * stiahne na bežné CTA. Kód → produkt, naživo.
 */
const props = withDefaults(defineProps<{
  /** Priebeh kroku 0 – 100 zo scroll pinu; bez pinu ostáva pôvodná hodnota. */
  editT?: number
}>(), { editT: 0 })

const clampedT = computed(() => Math.min(100, Math.max(0, props.editT)))
/** Hodnota v kóde plynie spojito: 100 → 50 podľa scrollu. */
const size = computed(() => Math.round(100 - clampedT.value / 2))
/** Šírka tlačidla kopíruje hodnotu v kóde: velkost 100 = celá šírka, 50 = bežné CTA. */
const buttonWidth = computed(() => `${size.value}%`)
/** So šírkou sa mierne stiahne aj výška: 46 px → 34 px. */
const buttonHeight = computed(() => `${Math.round(34 + 12 * ((size.value - 50) / 50))}px`)
/** Kurzor pri hodnote svieti, kým sa prepisuje. */
const editing = computed(() => clampedT.value > 4 && clampedT.value < 96)

/** Kód dostáva širší stĺpec — displej MacBooku medzitým narástol. */
const grid = css({
  display: 'grid',
  gridTemplateColumns: '1.35fr 1fr',
  gap: '22px',
  height: '100%',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr' },
})

const codeLine = css({
  display: 'flex',
  gap: '12px',
  fontFamily: 'mono',
  fontSize: '12.5px',
  lineHeight: 2,
  whiteSpace: 'nowrap',
})

const lineNo = css({
  color: 'dark.fg/25',
  width: '14px',
  textAlign: 'right',
})

const lineText = css({
  color: 'dark.fg/85',
  '& b': { fontWeight: 400, color: 'accent' },
  '& i': { fontStyle: 'normal', color: 'mockup.codeString' },
})

const previewHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'dark.fg/12',
  borderRadius: '9px',
  padding: '9px 12px',
})

const previewLogo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '12px',
  textTransform: 'uppercase',
  color: 'dark.fg',
})

const previewMenu = css({
  display: 'flex',
  gap: '10px',
  fontSize: '10.5px',
  color: 'dark.dim',
})

const previewBox = css({
  border: '1px solid',
  borderColor: 'dark.fg/12',
  borderRadius: '9px',
  padding: '14px',
  marginTop: '10px',
})

const previewTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '18px',
  textTransform: 'uppercase',
  color: 'dark.fg',
})

const previewNote = css({
  fontSize: '11.5px',
  color: 'dark.dim',
  marginTop: '6px',
})

const buttonWrap = css({ display: 'block' })

/** Kurzor pri prepisovanej hodnote — v pokoji sa zbalí, nech pred čiarkou neostáva diera. */
const editCaret = css({
  display: 'inline-block',
  width: 0,
  height: '11px',
  background: 'accent',
  verticalAlign: '-1px',
  animation: 'caretBlink 1s steps(1) infinite',
  opacity: 0,
  transition: 'opacity 0.2s ease, width 0.2s ease, margin-left 0.2s ease',
  '&.editing': { opacity: 1, width: '6px', marginLeft: '2px' },
  _motionReduce: { animation: 'none' },
})

const editValue = css({
  color: 'accent',
  fontWeight: 700,
})

/** Naozaj funkčné — dá sa stlačiť, pekne pruží a nič sa nestane. Klasika. */
const previewButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  paddingInline: '18px',
  borderRadius: 'full',
  border: 'none',
  background: 'accent',
  color: 'dark.bg',
  fontFamily: 'sans',
  fontSize: '12.5px',
  fontWeight: 700,
  marginTop: '12px',
  cursor: 'pointer',
  // klikateľné len v aktívnej scéne — skryté scény nesmú chytať kliky
  pointerEvents: 'none',
  '.scene-on &': { pointerEvents: 'auto' },
  transitionProperty: 'transform, box-shadow, width, height',
  transitionDuration: '0.18s',
  transitionTimingFunction: 'out',
  _hover: { boxShadow: 'glow' },
  _active: { transform: 'scale(0.92)' },
  _motionReduce: { transition: 'none' },
})
</script>

<template>
  <div :class="grid">
    <ProcessPanel title="Kód">
      <div :class="[codeLine, sceneItem({ delay: 15 })]">
        <span :class="lineNo">1</span><span :class="lineText"><b>const</b> web = <b>await</b> daktus.<b>build</b>({</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 45 })]">
        <span :class="lineNo">2</span><span :class="lineText">&nbsp;&nbsp;dizajn: <i>'na mieru'</i>,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 75 })]">
        <span :class="lineNo">3</span><span :class="lineText">&nbsp;&nbsp;rychlost: <i>'100/100'</i>,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 105 })]">
        <span :class="lineNo">4</span><span :class="lineText">&nbsp;&nbsp;velkost: <span :class="editValue">{{ size }}</span><span :class="[editCaret, { editing }]" />,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 115 })]">
        <span :class="lineNo">5</span><span :class="lineText">&nbsp;&nbsp;seo: <b>true</b>,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 135 })]">
        <span :class="lineNo">6</span><span :class="lineText">})</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 160 })]">
        <span :class="lineNo">7</span><span :class="lineText">daktus.<b>ukazPriebeh</b>(web, <i>'každý týždeň'</i>)</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 175 })]">
        <span :class="lineNo">8</span><span :class="lineText"><b>export default</b> web</span>
      </div>
    </ProcessPanel>
    <ProcessPanel title="Náhľad">
      <div :class="[previewHeader, sceneItem({ delay: 50 })]">
        <span :class="previewLogo">Logo</span>
        <span :class="previewMenu"><span>Domov</span><span>Služby</span><span>Kontakt</span></span>
      </div>
      <div :class="[previewBox, sceneItem({ delay: 100 })]">
        <div :class="previewTitle">Nadpis sekcie</div>
        <div :class="previewNote">Obsah sa skladá presne podľa dizajnu.</div>
      </div>
      <!-- obal nesie scene animáciu (fill forwards drží transform), rozmer zo scrollu žije na tlačidle -->
      <span :class="[buttonWrap, sceneItem({ delay: 160 })]">
        <button :class="previewButton" type="button" :style="{ width: buttonWidth, height: buttonHeight }">Funkčné tlačidlo</button>
      </span>
    </ProcessPanel>
  </div>
</template>
