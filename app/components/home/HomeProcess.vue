<script setup lang="ts">
import { css } from '~~/styled-system/css'

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
  measure()
}

onMounted(() => {
  media = window.matchMedia(PIN_QUERY)
  media.addEventListener('change', applyMode)
  window.addEventListener('scroll', measure, { passive: true })
  window.addEventListener('resize', measure, { passive: true })
  applyMode()
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', applyMode)
  window.removeEventListener('scroll', measure)
  window.removeEventListener('resize', measure)
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

const sticky = css({
  [`@media ${PIN_QUERY}`]: {
    position: 'sticky',
    top: 0,
    minHeight: '100svh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBlock: '40px',
  },
})

const stage = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 430px) 1fr',
  gap: 'clamp(36px, 4vw, 70px)',
  marginTop: '48px',
  alignItems: 'center',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr', alignItems: 'start' },
})

const rail = css({
  display: 'flex',
  flexDirection: 'column',
})

const step = css({
  textAlign: 'left',
  background: 'none',
  border: 0,
  borderTop: '1px solid',
  borderColor: 'dark.hairline',
  padding: '19px 6px 21px 0',
  display: 'grid',
  gridTemplateColumns: '46px 1fr',
  rowGap: '6px',
  cursor: 'pointer',
  color: 'inherit',
  '&:last-child': { borderBottom: '1px solid {colors.dark.hairline}' },
})

const stepNo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '15px',
  color: 'dark.dim',
  transition: 'color 0.3s ease',
  paddingTop: '2px',
  '.active &': { color: 'accent' },
})

const stepTitle = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '20px',
  color: 'dark.dim',
  transition: 'color 0.3s ease',
  '.active &': { color: 'dark.fg' },
})

const stepText = css({
  gridColumn: 2,
  fontSize: '13.5px',
  lineHeight: 1.55,
  color: 'dark.dim',
  transition: 'color 0.3s ease',
  '.active &': { color: 'dark.fg/72' },
})

const stepBar = css({
  gridColumn: 2,
  height: '2px',
  background: 'dark.fg/12',
  borderRadius: 'full',
  overflow: 'hidden',
  marginTop: '10px',
})

const stepBarFill = css({
  display: 'block',
  height: '100%',
  background: 'accent',
  transition: 'width 0.15s linear',
  _motionReduce: { transition: 'none' },
})

const demo = css({
  position: 'relative',
  background: 'dark.panel',
  overflow: 'hidden',
  height: 'min(clamp(440px, 34vw, 560px), calc(100svh - 320px))',
  '@media (max-width: 1000px)': { height: 'auto', minHeight: '560px' },
})

const scene = css({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  transform: 'scale(0.985)',
  transition: 'opacity 0.5s ease, transform 0.6s {easings.out}',
  pointerEvents: 'none',
  padding: 'clamp(22px, 2.4vw, 40px)',
  '&.scene-on': { opacity: 1, transform: 'none' },
})
</script>

<template>
  <section id="proces" ref="sectionEl" :class="section" data-dark>
    <div :class="sticky">
      <div :class="wrap">
        <SectionHead eyebrow="Proces" title="Ako vzniká produkt">
          <span :class="sectionNote">Scrollujte — každý úsek posunie váš projekt o krok ďalej.</span>
        </SectionHead>

        <div ref="stageEl" :class="[stage, fadeIn(), { in: stageIn }]">
          <div :class="rail">
            <button
              v-for="(item, index) in STEPS"
              :key="item.no"
              type="button"
              :class="[step, { active: index === active }]"
              @click="select(index)"
            >
              <span :class="stepNo">{{ item.no }}</span>
              <span :class="stepTitle">{{ item.title }}</span>
              <span :class="stepText">{{ item.text }}</span>
              <span :class="stepBar">
                <i :class="stepBarFill" :style="{ width: `${fillFor(index)}%` }" />
              </span>
            </button>
          </div>

          <DeviceMac url="vas-projekt.sk" dark>
            <div :class="demo">
              <div :class="[scene, { 'scene-on': active === 0 }]"><ProcessSceneBrief /></div>
              <div :class="[scene, { 'scene-on': active === 1 }]"><ProcessSceneDesign /></div>
              <div :class="[scene, { 'scene-on': active === 2 }]"><ProcessSceneCode /></div>
              <div :class="[scene, { 'scene-on': active === 3 }]"><ProcessSceneTest :running="active === 3" /></div>
              <div :class="[scene, { 'scene-on': active === 4 }]"><ProcessSceneLive /></div>
            </div>
          </DeviceMac>
        </div>
      </div>
    </div>
  </section>
</template>
