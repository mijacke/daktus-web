<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Testovanie — beh testov: tabuľka reálnych kontrol s hodnotami, ktoré
 * scroll odškrtáva jednu po druhej, vpravo sa napočíta celkové skóre.
 * Hovorí presne to, čo krok sľubuje: rýchlosť, mobily, formuláre.
 */
const props = withDefaults(defineProps<{
  /** Scéna je práve aktívna — spustí beh testov aj napočítanie skóre. */
  running?: boolean
}>(), { running: false })

/** Samočinný beh testov po otvorení karty — riadky odškrtáva vlastný priebeh. */
const t = useSceneRun(toRef(props, 'running'), { duration: 4.5 })

const CHECKS = [
  { name: 'výkon', value: 'LCP 0,9 s', at: 14 },
  { name: 'mobil', value: '360 px bez zlomov', at: 36 },
  { name: 'formuláre', value: 'odoslanie aj chyby', at: 58 },
  { name: 'prístupnosť', value: 'kontrast AA', at: 80 },
] as const

/** Riadok testu sa odkryje, keď beh prejde jeho prahom. */
function reveal(at: number) {
  return [sceneReveal, { on: t.value >= at }]
}

/** Cieľové skóre — drží sa ho aj animácia oblúka nižšie. */
const TARGET = 98
const COUNT_DURATION = 1200

const score = ref(TARGET)
const reduced = useReducedMotion()
let raf = 0

// bez immediate — beží až na klientovi pri prvej aktivácii scény (SSR nemá rAF)
watch(() => props.running, (on) => {
  cancelAnimationFrame(raf)
  if (!on) return
  if (reduced.value) {
    score.value = TARGET
    return
  }
  const start = performance.now()
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / COUNT_DURATION)
    // rovnaký dobeh ako easing oblúka — rýchly nábeh, pomalý záver
    score.value = Math.round(TARGET * (1 - (1 - progress) ** 3))
    if (progress < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => cancelAnimationFrame(raf))

const root = css({
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1.5fr auto',
  gap: 'clamp(24px, 3.4vw, 56px)',
  alignItems: 'center',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr', justifyItems: 'center', gap: '26px' },
})

const cmdLine = css({
  fontFamily: 'mono',
  fontSize: '12.5px',
  color: 'dark.fg/85',
  marginBottom: '4px',
})

const checkRow = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '10px',
  fontFamily: 'mono',
  fontSize: '12px',
  paddingBlock: '9px',
  borderBottom: '1px solid',
  borderColor: 'dark.fg/6',
  '&:last-child': { borderBottom: 'none' },
})

const checkOk = css({ color: 'accent', flexShrink: 0 })

const checkName = css({ color: 'dark.fg' })

/** Bodkovaný vodiaci riadok medzi názvom testu a nameranou hodnotou. */
const checkDots = css({
  flex: 1,
  borderBottom: '1px dotted',
  borderColor: 'dark.fg/18',
  transform: 'translateY(-3px)',
})

const checkValue = css({ color: 'dark.dim' })

const passChip = css({
  fontSize: '9.5px',
  letterSpacing: '0.1em',
  color: 'accent',
  border: '1px solid',
  borderColor: 'accent/40',
  borderRadius: '4px',
  padding: '1px 6px',
  flexShrink: 0,
})

const scorePanel = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
})

const scoreTrack = css({ stroke: 'dark.fg/10' })

const scoreArc = css({
  stroke: 'accent',
  strokeDashoffset: '314',
  transition: 'stroke-dashoffset 1.2s ease 0.4s',
  '.scene-on &': { strokeDashoffset: '20' },
  _motionReduce: { strokeDashoffset: '20', transition: 'none' },
})

const scoreText = css({
  fill: 'dark.fg',
  fontFamily: 'display',
  fontWeight: 800,
})

const scoreCaption = css({
  fontSize: '12px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.dim',
})
</script>

<template>
  <div :class="root">
    <ProcessPanel title="Beh testov">
      <div :class="[cmdLine, reveal(4)]">$ daktus test --ostro</div>
      <div v-for="item in CHECKS" :key="item.name" :class="[checkRow, reveal(item.at)]">
        <span :class="checkOk">✓</span>
        <span :class="checkName">{{ item.name }}</span>
        <span :class="checkDots" />
        <span :class="checkValue">{{ item.value }}</span>
        <span :class="passChip">PASS</span>
      </div>
    </ProcessPanel>
    <div :class="scorePanel">
      <svg width="150" height="150" viewBox="0 0 120 120" aria-hidden="true">
        <circle :class="scoreTrack" cx="60" cy="60" r="50" fill="none" stroke-width="7" />
        <circle
          :class="scoreArc"
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke-width="7"
          stroke-linecap="round"
          stroke-dasharray="314"
          transform="rotate(-90 60 60)"
        />
        <text :class="scoreText" x="60" y="66" text-anchor="middle" font-size="26">{{ score }}</text>
      </svg>
      <div :class="scoreCaption">Celkové skóre</div>
    </div>
  </div>
</template>
