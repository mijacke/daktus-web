<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

const props = defineProps<{
  /** Scéna je práve aktívna — spustí napočítanie skóre od nuly. */
  running?: boolean
}>()

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
    const t = Math.min(1, (now - start) / COUNT_DURATION)
    // rovnaký dobeh ako easing oblúka — rýchly nábeh, pomalý záver
    score.value = Math.round(TARGET * (1 - (1 - t) ** 3))
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => cancelAnimationFrame(raf))

const ROWS = [
  { label: 'Rýchlosť', value: '98/100', width: 'near' as const, delay: 15 },
  { label: 'Mobilná verzia', value: 'OK', width: 'full' as const, delay: 50 },
  { label: 'Formuláre a validácie', value: 'OK', width: 'full' as const, delay: 85 },
  { label: 'SEO základ', value: 'OK', width: 'full' as const, delay: 120 },
] as const

const row = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: '11px',
  borderBottom: '1px solid',
  borderColor: 'dark.fg/7',
  fontSize: '14px',
  color: 'dark.fg',
  '&:last-child': { borderBottom: 'none' },
})

const bar = css({
  flex: 1,
  height: '4px',
  borderRadius: 'full',
  background: 'dark.fg/10',
  marginInline: '16px',
  overflow: 'hidden',
})

const barFill = cva({
  base: {
    display: 'block',
    height: '100%',
    borderRadius: 'full',
    background: 'accent',
  },
  variants: {
    width: {
      near: { width: '98%' },
      full: { width: '100%' },
    },
  },
})

const rowValue = css({
  color: 'accent',
  fontWeight: 700,
})

const scorePanel = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  <div :class="sceneGrid">
    <ProcessPanel title="Kontroly">
      <div v-for="item in ROWS" :key="item.label" :class="[row, sceneItem({ delay: item.delay })]">
        <span>{{ item.label }}</span>
        <span :class="bar"><i :class="barFill({ width: item.width })" /></span>
        <span :class="rowValue">{{ item.value }}</span>
      </div>
    </ProcessPanel>
    <ProcessPanel :class="scorePanel">
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
    </ProcessPanel>
  </div>
</template>
