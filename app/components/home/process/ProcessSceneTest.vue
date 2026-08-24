<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/**
 * Testovanie — tá istá stránka na troch viewportoch, pod každým naskočí
 * fajka a vpravo sa napočíta celkové skóre. Presne to, čo krok sľubuje:
 * rýchlosť, mobily, formuláre.
 */
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

const DEVICES = [
  { kind: 'desktop', label: 'desktop', frameDelay: 15, okDelay: 70 },
  { kind: 'tablet', label: 'tablet', frameDelay: 25, okDelay: 90 },
  { kind: 'mobil', label: 'mobil', frameDelay: 35, okDelay: 110 },
] as const

const root = css({
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: 'clamp(20px, 3vw, 48px)',
  alignItems: 'center',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr', justifyItems: 'center', gap: '26px' },
})

const devices = css({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 'clamp(14px, 2.2vw, 30px)',
  flexWrap: 'wrap',
})

const device = css({ textAlign: 'center' })

/** Tri rámy, jedna stránka — rovnaký obsah v troch pomeroch. */
const frame = cva({
  base: {
    border: '1.5px solid',
    borderColor: 'dark.fg/25',
    borderRadius: '9px',
    background: 'paper',
    padding: '9px',
    marginInline: 'auto',
  },
  variants: {
    kind: {
      desktop: { width: 'clamp(150px, 16vw, 214px)' },
      tablet: { width: 'clamp(96px, 10vw, 130px)', borderRadius: '11px' },
      mobil: { width: 'clamp(54px, 6vw, 74px)', borderRadius: '13px' },
    },
  },
})

const miniLine = css({
  width: '70%',
  height: '6px',
  borderRadius: '3px',
  background: 'ink/50',
})

const miniImg = cva({
  base: {
    borderRadius: '5px',
    marginTop: '7px',
    background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 45%, transparent), color-mix(in srgb, token(colors.accent) 15%, transparent))',
  },
  variants: {
    kind: {
      desktop: { height: 'clamp(58px, 6vw, 84px)' },
      tablet: { height: 'clamp(74px, 8vw, 104px)' },
      mobil: { height: 'clamp(88px, 9vw, 118px)' },
    },
  },
})

const ok = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  marginTop: '10px',
  fontSize: '12.5px',
  fontWeight: 600,
  color: 'accent',
})

const okIcon = css({
  width: '17px',
  height: '17px',
  borderRadius: 'full',
  background: 'accent/18',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
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
    <div :class="devices">
      <div v-for="item in DEVICES" :key="item.kind" :class="device">
        <div :class="[frame({ kind: item.kind }), sceneItem({ delay: item.frameDelay })]">
          <div :class="miniLine" />
          <div :class="miniImg({ kind: item.kind })" />
        </div>
        <span :class="[ok, sceneItem({ delay: item.okDelay })]">
          <span :class="okIcon"><IconCheck :size="9" /></span>{{ item.label }}
        </span>
      </div>
    </div>
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
