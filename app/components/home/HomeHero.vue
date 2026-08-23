<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Sekvencia „stavania" hera podľa prototypu (ms od mountnutia). */
const BUILD_SEQUENCE = [
  ['eyebrow', 500],
  ['h1', 850],
  ['lead', 1300],
  ['ctas', 1550],
] as const

const built = reactive({ eyebrow: false, h1: false, lead: false, ctas: false })
const done = ref(false)
let timers: number[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    BUILD_SEQUENCE.forEach(([key]) => (built[key] = true))
    done.value = true
    return
  }
  BUILD_SEQUENCE.forEach(([key, delay]) => {
    timers.push(window.setTimeout(() => (built[key] = true), delay))
  })
  timers.push(window.setTimeout(() => (done.value = true), 2200))
})

onBeforeUnmount(() => {
  timers.forEach(timer => clearTimeout(timer))
  timers = []
})

const hero = css({
  position: 'relative',
  padding: 'clamp(150px, 19vh, 220px) 0 clamp(70px, 9vh, 120px)',
  overflow: 'hidden',
})

const gridBg = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  opacity: 1,
  transition: 'opacity 1.2s ease',
  backgroundImage: `
    linear-gradient(color-mix(in srgb, token(colors.ink) 4.5%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, token(colors.ink) 4.5%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: '56px 56px',
  '.done &': { opacity: 0 },
  _motionReduce: { opacity: 0 },
})

const content = css({ position: 'relative', zIndex: 2 })

const eyebrowFrame = css({ display: 'inline-block' })

const eyebrow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
})

const eyebrowDot = css({
  width: '8px',
  height: '8px',
  borderRadius: 'full',
  background: 'accent',
  flexShrink: 0,
})

const eyebrowLabel = css({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'dim',
})

const headingFrame = css({ marginTop: '30px' })

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(58px, 10.4vw, 186px)',
  lineHeight: 0.94,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  margin: 0,
})

const line = css({ display: 'block', overflow: 'hidden' })

const lineInner = cva({
  base: {
    display: 'block',
    transform: 'translateY(118%)',
    transition: 'transform 1s {easings.out}',
    '.in &': { transform: 'translateY(0)' },
    _motionReduce: { transform: 'none', transition: 'none' },
  },
  variants: {
    delay: {
      1: { transitionDelay: '0.05s' },
      2: { transitionDelay: '0.16s' },
      3: { transitionDelay: '0.27s' },
    },
  },
})

const outline = css({
  color: 'transparent',
  WebkitTextStroke: '1.5px token(colors.ink)',
})

const indent = css({ marginLeft: 'clamp(40px, 8vw, 150px)' })

const amp = css({ color: 'accent.deep' })

const below = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: '48px',
  marginTop: 'clamp(38px, 5vh, 70px)',
  '@media (max-width: 900px)': { flexDirection: 'column', alignItems: 'flex-start' },
})

const leadFrame = css({ maxWidth: '580px' })

const lead = css({
  fontSize: 'clamp(15.5px, 1.1vw, 19px)',
  color: 'dim',
  margin: 0,
})

const ctas = css({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  flexShrink: 0,
  flexWrap: 'wrap',
})
</script>

<template>
  <header :class="[hero, { done }]">
    <div :class="gridBg" />
    <div :class="[wrap, content]">
      <BlueprintFrame :class="eyebrowFrame" tag="značka" :built="built.eyebrow">
        <div :class="eyebrow">
          <span :class="eyebrowDot" />
          <span :class="eyebrowLabel">Digitálne štúdio · Prijímame nové projekty</span>
        </div>
      </BlueprintFrame>

      <BlueprintFrame :class="headingFrame" tag="nadpis / h1" :built="built.h1">
        <h1 :class="[heading, { in: built.h1 }]">
          <span :class="line"><span :class="lineInner({ delay: 1 })">Weby,</span></span>
          <span :class="[line, indent]"><span :class="[lineInner({ delay: 2 }), outline]">softvér</span></span>
          <span :class="line"><span :class="lineInner({ delay: 3 })"><span :class="amp">&amp;</span> appky.</span></span>
        </h1>
      </BlueprintFrame>

      <div :class="below">
        <BlueprintFrame :class="leadFrame" tag="text" :built="built.lead">
          <p :class="lead">
            Daktus je štúdio pre dizajn a vývoj. Navrhujeme a staviame digitálne produkty,
            ktoré vyzerajú presne tak dobre, ako fungujú. Od prvej skice až po ostrú prevádzku.
          </p>
        </BlueprintFrame>
        <BlueprintFrame tag="tlačidlá" :built="built.ctas">
          <div :class="ctas">
            <AppButton v-magnet href="/kontakt" arrow>Prebrať projekt</AppButton>
            <AppButton v-magnet href="/projekty" variant="ghost">Pozrieť prácu</AppButton>
          </div>
        </BlueprintFrame>
      </div>
    </div>
  </header>
</template>
