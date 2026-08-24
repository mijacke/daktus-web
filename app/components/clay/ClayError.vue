<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Chybová scéna — déčko dopadlo a rozpučilo sa. Rovnaká plastelínová technika
 * ako hero logomark, tvary nakreslené už po dopade. Akciu (návrat domov)
 * dodáva rodič cez slot — chybová obálka čistí error, statická 404 linkuje.
 */
withDefaults(defineProps<{ statusCode?: number | string }>(), { statusCode: 404 })

const page = css({
  minHeight: '100svh',
  display: 'grid',
  placeItems: 'center',
  background: 'paper',
  color: 'ink',
  fontFamily: 'sans',
  padding: '40px 20px',
  textAlign: 'center',
})

const stage = css({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 'clamp(18px, 4vw, 44px)',
  flexWrap: 'wrap',
})

const code = css({
  fontFamily: 'display',
  fontWeight: 900,
  fontSize: 'clamp(96px, 16vw, 190px)',
  lineHeight: 0.85,
  letterSpacing: '-0.02em',
  color: 'transparent',
  WebkitTextStroke: '2px token(colors.ink)',
  _selection: { color: 'ink', WebkitTextFillColor: 'ink' },
})

const splat = css({
  transformOrigin: '50% 100%',
  animation: 'claySplat 1.1s {easings.out} 0.15s backwards',
  _motionReduce: { animation: 'none' },
})

const mark = css({
  display: 'block',
  width: 'clamp(150px, 22vw, 230px)',
  height: 'auto',
  filter: 'drop-shadow(0 10px 18px color-mix(in srgb, token(colors.ink) 22%, transparent))',
})

const title = css({
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: 'clamp(22px, 3vw, 34px)',
  letterSpacing: '-0.01em',
  marginTop: '38px',
})

const note = css({
  fontSize: '15.5px',
  color: 'dim',
  marginTop: '10px',
  maxWidth: '440px',
  marginInline: 'auto',
})

const buttonRow = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
})

// stopColor nie je Panda vlastnosť — tokeny vždy cez explicitné token()
const stopSageLight = css({ stopColor: 'color-mix(in srgb, token(colors.accent) 55%, white)' })
const stopSage = css({ stopColor: 'token(colors.accent)' })
const stopSageDeep = css({ stopColor: 'token(colors.accent.deep)' })
const stopInkLight = css({ stopColor: 'color-mix(in srgb, token(colors.ink) 68%, white)' })
const stopInk = css({ stopColor: 'color-mix(in srgb, token(colors.ink) 90%, white)' })
const stopInkDeep = css({ stopColor: 'token(colors.ink)' })
const seam = css({ stroke: 'color-mix(in srgb, token(colors.accent.deep) 55%, black)' })
const ground = css({ fill: 'color-mix(in srgb, token(colors.ink) 13%, transparent)' })

/** Matné zrno hmoty — mieša sa soft-light do tvarov. */
const bumps = css({ mixBlendMode: 'soft-light', opacity: 0.55 })
</script>

<template>
  <div :class="page">
    <div>
      <div :class="stage">
        <span :class="code">{{ statusCode }}</span>
        <div :class="splat">
          <svg :class="mark" viewBox="0 0 214 178" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="c404-sage" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" :class="stopSageLight" />
                <stop offset="0.55" :class="stopSage" />
                <stop offset="1" :class="stopSageDeep" />
              </linearGradient>
              <linearGradient id="c404-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" :class="stopInkLight" />
                <stop offset="0.6" :class="stopInk" />
                <stop offset="1" :class="stopInkDeep" />
              </linearGradient>
              <filter id="c404-edge" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" seed="12" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="c404-bumps">
                <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="4" seed="5" result="noise" />
                <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1.5">
                  <feDistantLight azimuth="235" elevation="55" />
                </feDiffuseLighting>
              </filter>
              <mask id="c404-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="214" height="178">
                <rect x="22" y="84" width="58" height="80" rx="27" fill="white" />
                <path d="M 106 104 a 50 20 0 0 1 0 40" stroke="white" stroke-width="40" stroke-linecap="round" />
              </mask>
            </defs>
            <ellipse :class="ground" cx="106" cy="168" rx="90" ry="8" />
            <g filter="url(#c404-edge)">
              <!-- driek po dopade — nízky a rozliaty, sedí na zemi -->
              <rect x="22" y="84" width="58" height="80" rx="27" fill="url(#c404-body)" />
              <!-- bruško sploštené, vonkajšie hrany lícujú s driekom ako pri hero -->
              <path d="M 106 104 a 50 20 0 0 1 0 40" stroke="url(#c404-sage)" stroke-width="40" stroke-linecap="round" />
              <path :class="seam" d="M 148 134 l 19 -7" stroke-width="4" stroke-linecap="round" opacity="0.45" />
              <path :class="seam" d="M 150 141 l 15 -6" stroke-width="3" stroke-linecap="round" opacity="0.3" />
              <g :class="bumps" mask="url(#c404-mask)">
                <rect x="0" y="0" width="214" height="178" filter="url(#c404-bumps)" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <h1 :class="title"><slot name="title" /></h1>
      <p :class="note"><slot name="note" /></p>
      <div :class="buttonRow">
        <slot />
      </div>
    </div>
  </div>
</template>
