<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Reveal sa spúšťa po hydratácii — nadpis sa vyroluje, technická mriežka zmizne. */
const ready = ref(false)
onMounted(() => (ready.value = true))

const hero = css({
  position: 'relative',
  padding: 'clamp(140px, 17vh, 200px) 0 clamp(30px, 4vh, 60px)',
  overflow: 'hidden',
})

const gridBg = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  transition: 'opacity 1.2s ease',
  backgroundImage: `
    linear-gradient(color-mix(in srgb, token(colors.ink) 4.5%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, token(colors.ink) 4.5%, transparent) 1px, transparent 1px)
  `,
  backgroundSize: '56px 56px',
  '.in &': { opacity: 0 },
  _motionReduce: { opacity: 0 },
})

const content = css({ position: 'relative', zIndex: 2 })

const eyebrowRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
})

const dash = css({
  width: '26px',
  height: '2px',
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

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(52px, 8.6vw, 150px)',
  lineHeight: 0.96,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  margin: '26px 0 0',
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

const below = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: '48px',
  marginTop: 'clamp(38px, 5vh, 70px)',
  '@media (max-width: 900px)': { flexDirection: 'column', alignItems: 'flex-start' },
})

const lead = css({
  maxWidth: '620px',
  fontSize: 'clamp(15.5px, 1.1vw, 19px)',
  color: 'dim',
  margin: 0,
})
</script>

<template>
  <header :class="[hero, { in: ready }]">
    <div :class="gridBg" />
    <div :class="[wrap, content]">
      <div :class="[eyebrowRow, fadeIn()]">
        <span :class="dash" />
        <span :class="eyebrowLabel">Projekty</span>
      </div>

      <h1 :class="heading">
        <span :class="line"><span :class="lineInner({ delay: 1 })">Práca,</span></span>
        <span :class="[line, indent]"><span :class="[lineInner({ delay: 2 }), outline]">ktorá</span></span>
        <span :class="line"><span :class="lineInner({ delay: 3 })">funguje.</span></span>
      </h1>

      <div :class="below">
        <p :class="[lead, fadeIn({ delay: 2 })]">
          Nerobíme šablóny. Každý projekt navrhujeme aj staviame od nuly — podľa toho, čo má
          klientovi reálne priniesť. Toto je výber z toho, na čom sme pracovali.
        </p>
        <div :class="fadeIn({ delay: 3 })">
          <AppButton v-magnet href="/kontakt" arrow>Prebrať projekt</AppButton>
        </div>
      </div>
    </div>
  </header>
</template>
