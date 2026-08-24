<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

const STEPS = [
  { no: '01', title: 'Analýza', text: 'Ciele, používatelia a obsah. Ujasníme si, čo staviame a prečo.' },
  { no: '02', title: 'Dizajn', text: 'Zo skice a wireframu vznikne vizuál, ktorý si odsúhlasíte.' },
  { no: '03', title: 'Vývoj', text: 'Čistý kód a pravidelné ukážky. Progres vidíte každý týždeň.' },
  { no: '04', title: 'Testovanie', text: 'Rýchlosť, mobily, formuláre. Doladíme každý detail.' },
  { no: '05', title: 'Nasadenie', text: 'Spustenie, meranie a dlhodobá starostlivosť.' },
]

/** Sekciu ovláda scroll: na širokej obrazovke sa javisko prilepí a kroky listuje koliesko. */
const PIN_QUERY = '(min-width: 1001px) and (prefers-reduced-motion: no-preference)'

const active = ref(0)
const progress = ref(0)
const pinned = ref(false)
/** Desktop má vždy MacBook, mobil iPhone — rovnaké rámy ako Vybraná práca. */
const device = ref<'mac' | 'iphone'>('mac')
const sectionEl = ref<HTMLElement | null>(null)
const stageEl = ref<HTMLElement | null>(null)
const stageIn = useInView(stageEl)
let media: MediaQueryList | null = null

function measure() {
  const host = sectionEl.value
  if (!host || !pinned.value) return
  const scrollable = host.offsetHeight - window.innerHeight
  if (scrollable <= 0) return
  const raw = -host.getBoundingClientRect().top / scrollable
  const clamped = Math.min(0.999, Math.max(0, raw))
  if (Math.abs(clamped - progress.value) < 0.002) return
  progress.value = clamped
  active.value = Math.min(STEPS.length - 1, Math.floor(clamped * STEPS.length))
}

function applyMode() {
  pinned.value = media?.matches ?? false
  device.value = window.matchMedia('(min-width: 1001px)').matches ? 'mac' : 'iphone'
  measure()
}

onMounted(() => {
  media = window.matchMedia(PIN_QUERY)
  media.addEventListener('change', applyMode)
  window.addEventListener('scroll', measure, { passive: true })
  window.addEventListener('resize', applyMode, { passive: true })
  applyMode()
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', applyMode)
  window.removeEventListener('scroll', measure)
  window.removeEventListener('resize', applyMode)
})

/** Naplnenie pruhu kroku — pri pine podľa scrollu, inak plný aktívny. */
function fillFor(index: number) {
  if (!pinned.value) return index === active.value ? 100 : 0
  const part = progress.value * STEPS.length - index
  return Math.round(Math.min(1, Math.max(0, part)) * 100)
}

/** Klik na krok: pri pine odscrolluje stránku do jeho úseku, inak prepne rovno. */
function select(index: number) {
  const host = sectionEl.value
  if (pinned.value && host) {
    const scrollable = host.offsetHeight - window.innerHeight
    const top = window.scrollY + host.getBoundingClientRect().top
    window.scrollTo({ top: top + ((index + 0.5) / STEPS.length) * scrollable, behavior: 'smooth' })
  }
  else {
    active.value = index
  }
}

const section = css({
  background: 'dark.bg',
  color: 'dark.fg',
  marginTop: 'clamp(90px, 12vh, 150px)',
  padding: 'clamp(88px, 11vh, 140px) 0 clamp(80px, 10vh, 120px)',
  [`@media ${PIN_QUERY}`]: {
    // dĺžka scrollu = päť krokov; javisko vnútri sa prilepí na viewport
    height: '380vh',
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
  alignItems: 'baseline',
  gap: '16px',
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

const dot = css({
  width: '36px',
  height: '3px',
  borderRadius: 'full',
  background: 'dark.fg/14',
  overflow: 'hidden',
  border: 0,
  padding: 0,
  cursor: 'pointer',
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
            <div v-for="(item, index) in STEPS" :key="item.no" :class="[stepItem, { on: index === active }]">
              <div :class="stepTitleRow">
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
              @click="select(index)"
            >
              <i :class="dotFill" :style="{ width: `${fillFor(index)}%` }" />
            </button>
          </div>

          <div :class="shellWrap({ device })">
            <DeviceShell :device="device" url="vas-projekt.sk" dark>
              <div :class="demo({ device })">
                <div :class="[scene, { 'scene-on': active === 0 }]"><ProcessSceneBrief /></div>
                <div :class="[scene, { 'scene-on': active === 1 }]"><ProcessSceneDesign /></div>
                <div :class="[scene, { 'scene-on': active === 2 }]"><ProcessSceneCode /></div>
                <div :class="[scene, { 'scene-on': active === 3 }]"><ProcessSceneTest :running="active === 3" /></div>
                <div :class="[scene, { 'scene-on': active === 4 }]"><ProcessSceneLive /></div>
              </div>
            </DeviceShell>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
