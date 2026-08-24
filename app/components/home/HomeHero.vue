<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Sekvencia „stavania" hera podľa prototypu (ms od mountnutia). */
const BUILD_SEQUENCE = [
  ['h1', 500],
  ['lead', 950],
  ['ctas', 1200],
] as const

const built = reactive({ h1: false, lead: false, ctas: false })
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
  timers.push(window.setTimeout(() => (done.value = true), 1850))
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

const outline = css({
  color: 'transparent',
  WebkitTextStroke: '1.5px token(colors.ink)',
  // pri selekcii Chrome vypĺňa glyfy pôvodnou (transparentnou) farbou — dolej plnú výplň
  _selection: { color: 'ink', WebkitTextFillColor: 'ink' },
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
    <HeroClayMark />
    <div :class="[wrap, content]" data-cursor="mega">
      <BlueprintFrame :class="headingFrame" tag="nadpis / h1" :built="built.h1">
        <h1 :class="[heading, { in: built.h1 }]" data-cursor="mega">
          <span :class="revealLine"><span :class="revealInner({ delay: 1 })">Weby,</span></span>
          <span :class="[revealLine, indent]"><span :class="[revealInner({ delay: 2 }), outline]">softvér</span></span>
          <span :class="revealLine"><span :class="revealInner({ delay: 3 })"><span :class="amp">&amp;</span> appky.</span></span>
        </h1>
      </BlueprintFrame>

      <div :class="below">
        <BlueprintFrame :class="leadFrame" tag="text" :built="built.lead">
          <p :class="lead">
            Sme malý tím dizajnérov a vývojárov. Navrhujeme a staviame weby, softvér a appky,
            ktoré vyzerajú presne tak dobre, ako fungujú. Od prvej skice až po ostrú prevádzku.
          </p>
        </BlueprintFrame>
        <BlueprintFrame tag="tlačidlá" :built="built.ctas">
          <div :class="ctas">
            <!-- Ťah smerom von z dvojice: kurzor v medzere ich rozostúpi, nikdy nezlepí. -->
            <AppButton v-magnet.left href="/kontakt" arrow>Prebrať projekt</AppButton>
            <AppButton v-magnet.right href="/projekty" variant="ghost">Pozrieť prácu</AppButton>
          </div>
        </BlueprintFrame>
      </div>
    </div>
  </header>
</template>
