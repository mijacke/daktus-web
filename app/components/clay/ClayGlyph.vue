<script lang="ts">
export type ClayGlyphName
  = | 'lupa' | 'ceruzka' | 'zatvorky' | 'stit' | 'raketa'
    | 'globus' | 'monitor' | 'telefon' | 'fajka'
</script>

<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Knižnica plastelínových glyfov — rovnaká kuchyňa ako hero logomark:
 * miesené okraje cez turbulenciu a dvojfarebnosť (mint telo + ink detail;
 * na tmavom podklade sa detail prepne na svetlú hmotu). Bez zrna — pri
 * malých veľkostiach by zašumilo kresbu. Statické zámerne.
 */
const props = withDefaults(defineProps<{
  name: ClayGlyphName
  /** Rozmer v px (glyfy sú štvorcové). */
  size?: number
  /** Tmavý podklad — ink detail by zanikol, prepne sa na svetlú hmotu. */
  onDark?: boolean
}>(), { size: 40, onDark: false })

// viac glyfov na stránke — filter a gradienty potrebujú unikátne id
const uid = useId()
const edgeId = `ce-${uid}`
const sageId = `cs-${uid}`
const inkId = `ci-${uid}`

const sageUrl = `url(#${sageId})`
// hodnota CSS premennej --clay-detail: na svetlom ink gradient, na tmavom svetlá hmota
const detailValue = computed(() => (props.onDark ? 'var(--colors-dark-fg)' : `url(#${inkId})`))

const glyph = css({ display: 'block' })

// stopColor nie je Panda vlastnosť — tokeny vždy cez explicitné token()
const stopSageLight = css({ stopColor: 'color-mix(in srgb, token(colors.accent) 55%, white)' })
const stopSage = css({ stopColor: 'token(colors.accent)' })
const stopSageDeep = css({ stopColor: 'token(colors.accent.deep)' })
const stopInkLight = css({ stopColor: 'color-mix(in srgb, token(colors.ink) 68%, white)' })
const stopInkDeep = css({ stopColor: 'token(colors.ink)' })

const detailStroke = css({ stroke: 'var(--clay-detail)' })
const detailFill = css({ fill: 'var(--clay-detail)' })
</script>

<template>
  <svg
    :class="glyph"
    :width="size"
    :height="size"
    :style="{ '--clay-detail': detailValue }"
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="sageId" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :class="stopSageLight" />
        <stop offset="0.55" :class="stopSage" />
        <stop offset="1" :class="stopSageDeep" />
      </linearGradient>
      <linearGradient :id="inkId" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :class="stopInkLight" />
        <stop offset="1" :class="stopInkDeep" />
      </linearGradient>
      <filter :id="edgeId" x="-15%" y="-15%" width="130%" height="130%">
        <feTurbulence type="turbulence" baseFrequency="0.07" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    <g :filter="`url(#${edgeId})`" stroke-linecap="round" stroke-linejoin="round">
      <template v-if="name === 'lupa'">
        <circle cx="20" cy="20" r="11" :stroke="sageUrl" stroke-width="8" />
        <path :class="detailStroke" d="M 29 29 L 38 38" stroke-width="8" />
      </template>

      <template v-else-if="name === 'ceruzka'">
        <path d="M 17 31 L 33 13" :stroke="sageUrl" stroke-width="9" />
        <path :class="detailStroke" d="M 12 38 L 14.5 34" stroke-width="7" />
      </template>

      <template v-else-if="name === 'zatvorky'">
        <path d="M 18 12 C 11 17 11 31 18 36" :stroke="sageUrl" stroke-width="7.5" />
        <path :class="detailStroke" d="M 30 12 C 37 17 37 31 30 36" stroke-width="7.5" />
      </template>

      <template v-else-if="name === 'stit'">
        <path d="M 24 8.5 L 35.5 13 V 22 C 35.5 30 31 34.5 24 38 C 17 34.5 12.5 30 12.5 22 V 13 Z" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 19 23.5 L 23 27.5 L 30 18.5" stroke-width="5.5" />
      </template>

      <template v-else-if="name === 'raketa'">
        <path d="M 24 7 C 30 12 31.5 22 28.5 31 H 19.5 C 16.5 22 18 12 24 7 Z" :stroke="sageUrl" stroke-width="6.5" />
        <circle :class="detailFill" cx="24" cy="19" r="2.6" />
        <path :class="detailStroke" d="M 21 37 L 21 40 M 27 37 L 27 40" stroke-width="5" />
      </template>

      <template v-else-if="name === 'globus'">
        <circle cx="24" cy="24" r="13" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 11 24 H 37 M 24 11 C 18 18 18 30 24 37" stroke-width="4.5" />
      </template>

      <template v-else-if="name === 'monitor'">
        <rect x="10" y="11" width="28" height="19" rx="4.5" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 24 32 V 38 M 17 40.5 H 31" stroke-width="5.5" />
      </template>

      <template v-else-if="name === 'telefon'">
        <rect x="15" y="8" width="18" height="32" rx="6.5" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 21 13.5 H 27" stroke-width="4.5" />
      </template>

      <template v-else>
        <circle cx="24" cy="24" r="13" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 17.5 24 L 23 29.5 L 32 18" stroke-width="6" />
      </template>
    </g>
  </svg>
</template>
