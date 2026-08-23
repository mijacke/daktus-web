<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

const { eyebrow, heading, lead, ctas, done } = useHeroBuild()

const hero = css({
  position: 'relative',
  paddingTop: 'clamp(150px, 19vh, 220px)',
  paddingBottom: 'clamp(70px, 9vh, 120px)',
  overflow: 'hidden',
})

const gridBg = cva({
  base: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage:
      'linear-gradient(token(colors.grid) 1px, transparent 1px), linear-gradient(90deg, token(colors.grid) 1px, transparent 1px)',
    backgroundSize: '56px 56px',
    opacity: 1,
    transition: 'opacity 1.2s ease',
    _motionReduce: { opacity: 0, transition: 'none' },
  },
  variants: {
    hidden: { true: { opacity: 0 } },
  },
})

const wrap = css({
  position: 'relative',
  zIndex: 2,
  maxWidth: '1760px',
  marginInline: 'auto',
  paddingInline: 'clamp(20px, 3.5vw, 72px)',
})

const eyebrowBox = css({ alignSelf: 'flex-start', display: 'inline-block' })
const eyebrowRow = css({ display: 'flex', alignItems: 'center', gap: '13px' })
const eyebrowDot = css({ width: '8px', height: '8px', borderRadius: '50%', background: 'accent', flexShrink: 0 })
const eyebrowLabel = css({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'dim',
})

const headingBox = css({ marginTop: '30px' })
const headingText = css({
  margin: 0,
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(58px, 10.4vw, 186px)',
  lineHeight: 0.94,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
})
const ampersand = css({ color: 'accentDeep' })

const below = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: '48px',
  marginTop: 'clamp(38px, 5vh, 70px)',
  '@media (max-width: 900px)': { flexDirection: 'column', alignItems: 'flex-start' },
})
const leadBox = css({ maxWidth: '580px' })
const leadText = css({ margin: 0, fontSize: 'clamp(15.5px, 1.1vw, 19px)', color: 'dim' })
const ctaRow = css({ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0, flexWrap: 'wrap' })
</script>

<template>
  <header :class="hero">
    <div :class="gridBg({ hidden: done })" aria-hidden="true" />

    <div :class="wrap">
      <BlueprintBox label="značka" :built="eyebrow" :class="eyebrowBox">
        <div :class="eyebrowRow">
          <span :class="eyebrowDot" />
          <span :class="eyebrowLabel">Digitálne štúdio · Prijímame nové projekty</span>
        </div>
      </BlueprintBox>

      <BlueprintBox label="nadpis / h1" :built="heading" :class="headingBox">
        <h1 :class="headingText">
          <RollLine step="first" :show="heading">Weby,</RollLine>
          <RollLine step="second" :show="heading" indent outline>softvér</RollLine>
          <RollLine step="third" :show="heading"><span :class="ampersand">&amp;</span> appky.</RollLine>
        </h1>
      </BlueprintBox>

      <div :class="below">
        <BlueprintBox label="text" :built="lead" :class="leadBox">
          <p :class="leadText">
            Daktus je štúdio pre dizajn a vývoj. Navrhujeme a staviame digitálne produkty,
            ktoré vyzerajú presne tak dobre, ako fungujú. Od prvej skice až po ostrú prevádzku.
          </p>
        </BlueprintBox>

        <BlueprintBox label="tlačidlá" :built="ctas">
          <div :class="ctaRow">
            <PillButton to="#" variant="solid" arrow>Prebrať projekt</PillButton>
            <PillButton to="#" variant="ghost">Pozrieť prácu</PillButton>
          </div>
        </BlueprintBox>
      </div>
    </div>
  </header>
</template>
