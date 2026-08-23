<script setup lang="ts">
import { css } from '~~/styled-system/css'

const STEPS = [
  { no: '01', title: 'Analýza', text: 'Ciele, používatelia a obsah. Ujasníme si, čo staviame a prečo.' },
  { no: '02', title: 'Dizajn', text: 'Zo skice a wireframu vznikne vizuál, ktorý si odsúhlasíte.' },
  { no: '03', title: 'Vývoj', text: 'Čistý kód a pravidelné ukážky. Progres vidíte každý týždeň.' },
  { no: '04', title: 'Testovanie', text: 'Rýchlosť, mobily, formuláre. Doladíme každý detail.' },
  { no: '05', title: 'Nasadenie', text: 'Spustenie, meranie a dlhodobá starostlivosť.' },
]

/** Dĺžka jedného kroku autoplayu (drží sa jej aj fillBar animácia nižšie). */
const STEP_DURATION = 3800

const active = ref(0)
const runId = ref(0)
const stageEl = ref<HTMLElement | null>(null)
const stageIn = useInView(stageEl)
const demoEl = ref<HTMLElement | null>(null)
const running = useInView(demoEl, { threshold: 0.25, once: false })
const reduced = useReducedMotion()
let timer = 0

function schedule() {
  clearTimeout(timer)
  runId.value++
  if (reduced.value) return
  timer = window.setTimeout(() => {
    active.value = (active.value + 1) % STEPS.length
    schedule()
  }, STEP_DURATION)
}

watch(running, (visible) => {
  if (visible) {
    active.value = 0
    schedule()
  }
  else {
    clearTimeout(timer)
  }
})

function select(index: number) {
  active.value = index
  schedule()
}

onBeforeUnmount(() => clearTimeout(timer))

const section = css({
  background: 'dark.bg',
  color: 'dark.fg',
  marginTop: 'clamp(90px, 12vh, 150px)',
  padding: 'clamp(88px, 11vh, 140px) 0 clamp(80px, 10vh, 120px)',
})

const stage = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 430px) 1fr',
  gap: 'clamp(36px, 4vw, 70px)',
  marginTop: '60px',
  alignItems: 'start',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr' },
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
  opacity: 0.75,
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
  width: 0,
  background: 'accent',
  '.active &': { animation: 'fillBar 3800ms linear forwards' },
  _motionReduce: { animation: 'none' },
})

const demo = css({
  position: 'relative',
  border: '1px solid',
  borderColor: 'dark.hairline',
  borderRadius: '16px',
  background: 'dark.panel',
  overflow: 'hidden',
  minHeight: 'clamp(440px, 34vw, 560px)',
  '@media (max-width: 1000px)': { minHeight: '560px' },
})

const demoBar = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  height: '44px',
  paddingInline: '16px',
  borderBottom: '1px solid',
  borderColor: 'dark.fg/9',
  position: 'relative',
  zIndex: 2,
  background: 'dark.panel',
})

const demoDots = css({
  display: 'inline-flex',
  gap: '5px',
  '& i': { width: '9px', height: '9px', borderRadius: 'full', background: 'dark.fg/16' },
})

const demoUrl = css({
  flex: 1,
  maxWidth: '320px',
  marginInline: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  borderRadius: 'full',
  background: 'dark.fg/6',
  fontSize: '11px',
  color: 'dark.dim',
})

const demoSpacer = css({ width: '34px' })

const scene = css({
  position: 'absolute',
  inset: '44px 0 0 0',
  opacity: 0,
  transform: 'scale(0.985)',
  transition: 'opacity 0.5s ease, transform 0.6s {easings.out}',
  pointerEvents: 'none',
  padding: 'clamp(22px, 2.4vw, 40px)',
  '&.scene-on': { opacity: 1, transform: 'none' },
})
</script>

<template>
  <section id="proces" :class="section" data-dark>
    <div :class="wrap">
      <SectionHead eyebrow="Proces" title="Ako vzniká produkt">
        <span :class="sectionNote">Sledujte to naživo. Presne týmito krokmi prejde aj váš projekt.</span>
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
              <i :key="index === active ? runId : `idle-${index}`" :class="stepBarFill" />
            </span>
          </button>
        </div>

        <div ref="demoEl" :class="demo">
          <div :class="demoBar">
            <span :class="demoDots"><i /><i /><i /></span>
            <span :class="demoUrl">vas-projekt.sk</span>
            <span :class="demoSpacer" />
          </div>
          <div :class="[scene, { 'scene-on': active === 0 }]"><ProcessSceneBrief /></div>
          <div :class="[scene, { 'scene-on': active === 1 }]"><ProcessSceneDesign /></div>
          <div :class="[scene, { 'scene-on': active === 2 }]"><ProcessSceneCode /></div>
          <div :class="[scene, { 'scene-on': active === 3 }]"><ProcessSceneTest /></div>
          <div :class="[scene, { 'scene-on': active === 4 }]"><ProcessSceneLive /></div>
        </div>
      </div>
    </div>
  </section>
</template>
