<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Plastelínový otáznik — rovnaká technika ako hero logomark: miesené okraje
 * cez turbulenciu, matné zrno cez difúzne svetlo, občasné rozhojdanie.
 * Škáluje sa s písmom rodiča (šírka v em).
 */
const root = css({
  display: 'inline-block',
  width: '0.46em',
  verticalAlign: '-0.02em',
  transformOrigin: '50% 92%',
  animation: 'claySway 7.4s ease-in-out infinite 1.8s',
  _motionReduce: { animation: 'none' },
})

const mark = css({
  display: 'block',
  width: '100%',
  height: 'auto',
  filter: 'drop-shadow(0 0.06em 0.09em color-mix(in srgb, token(colors.ink) 30%, transparent))',
})

// stopColor nie je Panda vlastnosť — tokeny vždy cez explicitné token()
const stopSageLight = css({ stopColor: 'color-mix(in srgb, token(colors.accent) 55%, white)' })
const stopSage = css({ stopColor: 'token(colors.accent)' })
const stopSageDeep = css({ stopColor: 'token(colors.accent.deep)' })

/** Matné zrno hmoty — mieša sa soft-light do tvarov. */
const bumps = css({ mixBlendMode: 'soft-light', opacity: 0.55 })
</script>

<template>
  <span :class="root" aria-hidden="true">
    <svg :class="mark" viewBox="0 0 60 94" fill="none">
      <defs>
        <linearGradient id="cq-sage" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" :class="stopSageLight" />
          <stop offset="0.55" :class="stopSage" />
          <stop offset="1" :class="stopSageDeep" />
        </linearGradient>
        <filter id="cq-edge" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="cq-bumps">
          <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="4" seed="9" result="noise" />
          <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1.4">
            <feDistantLight azimuth="235" elevation="55" />
          </feDiffuseLighting>
        </filter>
        <mask id="cq-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="94">
          <path d="M 13 27 a 17.5 17.5 0 1 1 25 17 c -6.5 4 -7.5 7.5 -7.5 14" stroke="white" stroke-width="15" stroke-linecap="round" />
          <circle cx="30" cy="84" r="8.5" fill="white" />
        </mask>
      </defs>
      <g filter="url(#cq-edge)">
        <path d="M 13 27 a 17.5 17.5 0 1 1 25 17 c -6.5 4 -7.5 7.5 -7.5 14" stroke="url(#cq-sage)" stroke-width="15" stroke-linecap="round" />
        <circle cx="30" cy="84" r="8.5" fill="url(#cq-sage)" />
        <g :class="bumps" mask="url(#cq-mask)">
          <rect x="0" y="0" width="60" height="94" filter="url(#cq-bumps)" />
        </g>
      </g>
    </svg>
  </span>
</template>
