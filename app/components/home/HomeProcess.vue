<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

const STEPS: { no: string, title: string, text: string, glyph: ClayGlyphName }[] = [
  { no: '01', title: 'Analýza', text: 'Ciele, používatelia a obsah. Ujasníme si, čo staviame a prečo.', glyph: 'lupa' },
  { no: '02', title: 'Dizajn', text: 'Zo skice a wireframu vznikne vizuál, ktorý si odsúhlasíte.', glyph: 'ceruzka' },
  { no: '03', title: 'Vývoj', text: 'Čistý kód a pravidelné ukážky. Progres vidíte každý týždeň.', glyph: 'zatvorky' },
  { no: '04', title: 'Testovanie', text: 'Rýchlosť, mobily, formuláre. Doladíme každý detail.', glyph: 'stit' },
  { no: '05', title: 'Nasadenie', text: 'Spustenie, meranie a dlhodobá starostlivosť.', glyph: 'raketa' },
]

/** Sekciu ovláda scroll: na širokej obrazovke sa javisko prilepí a kroky listuje koliesko. */
const PIN_QUERY = '(min-width: 1001px) and (prefers-reduced-motion: no-preference)'

const sectionEl = ref<HTMLElement | null>(null)
const stageEl = ref<HTMLElement | null>(null)
const stageIn = useInView(stageEl)

/** Pin, tempo (celé 01 → 05 aspoň 5 s) aj zámok kolieska drží useStoryPin. */
const { pinned, active, fillFor, select } = useStoryPin(sectionEl, {
  pinQuery: PIN_QUERY,
  steps: STEPS.length,
  minSeconds: 5,
})

/** Desktop má vždy MacBook, mobil iPhone — rovnaké rámy ako Vybraná práca. */
const wide = useMediaQuery('(min-width: 1001px)', { initial: true })
const device = computed(() => (wide.value ? 'mac' : 'iphone'))

/** Mimo pinu (mobil, tablet, reduced motion) listuje kroky časovač ako autoplay. */
const STEP_DURATION = 3800
const demoEl = ref<HTMLElement | null>(null)
const demoIn = useInView(demoEl, { threshold: 0.25, once: false })
const reduced = useReducedMotion()
let timer = 0

function scheduleAutoplay() {
  clearTimeout(timer)
  if (pinned.value || reduced.value || !demoIn.value) return
  timer = window.setTimeout(() => {
    select((active.value + 1) % STEPS.length)
    scheduleAutoplay()
  }, STEP_DURATION)
}

/** Ručný výber kroku reštartuje tempo autoplayu. */
function pick(index: number) {
  select(index)
  scheduleAutoplay()
}

watch([demoIn, pinned, reduced], scheduleAutoplay)
onBeforeUnmount(() => clearTimeout(timer))

const section = css({
  background: 'dark.bg',
  color: 'dark.fg',
  marginTop: 'clamp(90px, 12vh, 150px)',
  padding: 'clamp(88px, 11vh, 140px) 0 clamp(80px, 10vh, 120px)',
  [`@media ${PIN_QUERY}`]: {
    // ≈ desať posunov kolieska na každý z piatich krokov (1 posun ≈ 100 px)
    height: 'calc(100svh + 5000px)',
    padding: 0,
  },
})

// nadpis sekcie začína vľavo hore ako v ostatných sekciách; žiadny flex,
// nech wrap vnútri drží plnú šírku sekcie
const sticky = css({
  [`@media ${PIN_QUERY}`]: {
    position: 'sticky',
    top: 0,
    minHeight: '100svh',
    paddingTop: 'clamp(56px, 8vh, 104px)',
    paddingBottom: '30px',
  },
})

/** Nadpis aktívneho kroku — „01 Analýza" v strede, kroky sa v ňom prelínajú. */
const stepHead = css({
  position: 'relative',
  height: 'clamp(92px, 10vh, 116px)',
  marginTop: 'clamp(16px, 2.4vh, 32px)',
})

const stepItem = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '9px',
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(14px)',
  transition: 'opacity 0.45s ease, transform 0.55s {easings.out}',
  pointerEvents: 'none',
  '&.on': { opacity: 1, transform: 'none' },
  _motionReduce: { transition: 'none' },
})

const stepTitleRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
})

const stepNo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(15px, 1.4vw, 20px)',
  color: 'accent',
})

const stepTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: 'clamp(26px, 2.6vw, 42px)',
  lineHeight: 1,
  letterSpacing: '-0.015em',
})

const stepText = css({
  fontSize: '14px',
  color: 'dark.dim',
  maxWidth: '560px',
})

/** Priebeh krokov — päť klikateľných pruhov, aktívny sa plní scrollom. */
const dotsRow = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '9px',
  marginTop: '4px',
})

/** Klikací cieľ kroku — vyšší než samotný pruh, nech sa dá pohodlne trafiť. */
const dot = css({
  display: 'inline-flex',
  alignItems: 'center',
  width: '36px',
  height: '18px',
  background: 'transparent',
  border: 0,
  padding: 0,
  cursor: 'pointer',
  _hover: { '& > span': { background: 'dark.fg/26' } },
})

const dotTrack = css({
  width: '100%',
  height: '3px',
  borderRadius: 'full',
  background: 'dark.fg/14',
  overflow: 'hidden',
  transition: 'background 0.3s ease',
})

const dotFill = css({
  display: 'block',
  height: '100%',
  background: 'accent',
  transition: 'width 0.15s linear',
  _motionReduce: { transition: 'none' },
})

/** Rámy v natívnych proporciách, centrované — nenaťahujú sa na šírku sekcie. */
const shellWrap = cva({
  base: { marginTop: 'clamp(20px, 3.2vh, 40px)', marginInline: 'auto' },
  variants: {
    device: {
      mac: { width: 'min(900px, 100%)' },
      iphone: { width: 'min(340px, 92%)' },
    },
  },
})

/**
 * Výška displeja podľa devices.css MacBook Pro (2022): displej 600 × 386,
 * pomer 1,554. Pri šírke shellu 900 px (displej 882) je natívna výška
 * obrazovky 568 px vrátane 38 px lišty → demo 530 px; kratšie viewporty
 * to stiahne pin.
 */
const demo = cva({
  base: {
    position: 'relative',
    background: 'dark.panel',
    overflow: 'hidden',
  },
  variants: {
    device: {
      mac: { height: 'clamp(300px, calc(100svh - 460px), 530px)' },
      iphone: { minHeight: '480px' },
    },
  },
})

const scene = css({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  transform: 'scale(0.985)',
  transition: 'opacity 0.5s ease, transform 0.6s {easings.out}',
  pointerEvents: 'none',
  padding: 'clamp(20px, 2.2vw, 36px)',
  '&.scene-on': { opacity: 1, transform: 'none' },
})
</script>

<template>
  <section id="proces" ref="sectionEl" :class="section" data-dark>
    <div :class="sticky">
      <div :class="wrap">
        <SectionHead eyebrow="Proces" title="Ako vzniká produkt" />

        <div ref="stageEl" :class="[fadeIn(), { in: stageIn }]">
          <div :class="stepHead" aria-live="polite">
            <div
              v-for="(item, index) in STEPS"
              :key="item.no"
              :class="[stepItem, { on: index === active }]"
              :aria-hidden="index !== active"
            >
              <div :class="stepTitleRow">
                <ClayGlyph :name="item.glyph" :size="38" on-dark />
                <span :class="stepNo">{{ item.no }}</span>
                <span :class="stepTitle">{{ item.title }}</span>
              </div>
              <span :class="stepText">{{ item.text }}</span>
            </div>
          </div>

          <div :class="dotsRow">
            <button
              v-for="(item, index) in STEPS"
              :key="item.no"
              type="button"
              :class="dot"
              :aria-label="`Krok ${item.no}: ${item.title}`"
              @click="pick(index)"
            >
              <span :class="dotTrack"><i :class="dotFill" :style="{ width: `${fillFor(index)}%` }" /></span>
            </button>
          </div>

          <div ref="demoEl" :class="shellWrap({ device })">
            <DeviceShell :device="device" url="vas-projekt.sk" dark>
              <div :class="demo({ device })">
                <div :class="[scene, { 'scene-on': active === 0 }]"><ProcessSceneBrief /></div>
                <div :class="[scene, { 'scene-on': active === 1 }]"><ProcessSceneDesign :resize-t="pinned ? fillFor(1) : 0" /></div>
                <div :class="[scene, { 'scene-on': active === 2 }]"><ProcessSceneCode :edit-t="pinned ? fillFor(2) : 0" /></div>
                <div :class="[scene, { 'scene-on': active === 3 }]"><ProcessSceneTest :running="active === 3" :test-t="pinned ? fillFor(3) : -1" /></div>
                <div :class="[scene, { 'scene-on': active === 4 }]"><ProcessSceneLive :deploy-t="pinned ? fillFor(4) : -1" /></div>
              </div>
            </DeviceShell>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
