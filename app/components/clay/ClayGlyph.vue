<script setup lang="ts">
import { css } from '~~/styled-system/css'

export type ClayGlyphName
  = | 'lupa' | 'ceruzka' | 'zatvorky' | 'stit' | 'raketa'
    | 'globus' | 'monitor' | 'telefon' | 'fajka' | 'uvodzovky' | 'bodka' | 'kosik'
    | 'okno' | 'vrstvy' | 'koleso' | 'bublina' | 'obnova' | 'stranka' | 'kurzor' | 'kocka' | 'obalka'

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

      <template v-else-if="name === 'uvodzovky'">
        <path d="M 19 14 C 20 21 17 27 12 31" :stroke="sageUrl" stroke-width="8.5" />
        <path :class="detailStroke" d="M 34 14 C 35 21 32 27 27 31" stroke-width="8.5" />
      </template>

      <template v-else-if="name === 'bodka'">
        <circle cx="24" cy="24" r="16" :fill="sageUrl" />
      </template>

      <template v-else-if="name === 'kosik'">
        <path d="M 12 16 H 36 L 32.5 32 H 15.5 Z" :stroke="sageUrl" stroke-width="6.5" />
        <circle :class="detailFill" cx="18.5" cy="40" r="2.8" />
        <circle :class="detailFill" cx="29.5" cy="40" r="2.8" />
      </template>

      <template v-else-if="name === 'okno'">
        <rect x="10" y="12" width="28" height="24" rx="4.5" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 11 19.5 H 37" stroke-width="4" />
        <circle :class="detailFill" cx="15.5" cy="16" r="1.9" />
      </template>

      <template v-else-if="name === 'vrstvy'">
        <path d="M 24 7 L 38 15 L 24 23 L 10 15 Z" :stroke="sageUrl" stroke-width="6" />
        <path :class="detailStroke" d="M 10 24 L 24 32 L 38 24" stroke-width="5" />
        <path :class="detailStroke" d="M 10 32 L 24 40 L 38 32" stroke-width="5" />
      </template>

      <template v-else-if="name === 'koleso'">
        <circle cx="24" cy="24" r="10" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 24 6.5 V 11 M 24 37 V 41.5 M 6.5 24 H 11 M 37 24 H 41.5" stroke-width="5" />
      </template>

      <template v-else-if="name === 'bublina'">
        <rect x="10" y="10" width="28" height="21" rx="8" :stroke="sageUrl" stroke-width="6.5" />
        <path :class="detailStroke" d="M 17 33 L 15 40 L 23 34" stroke-width="4.5" />
        <circle :class="detailFill" cx="19" cy="20.5" r="2" />
        <circle :class="detailFill" cx="28" cy="20.5" r="2" />
      </template>

      <template v-else-if="name === 'obnova'">
        <path d="M 35.5 15.5 A 14 14 0 1 0 38 27" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 36 7 L 36.5 16.5 L 27 16" stroke-width="5" />
      </template>

      <template v-else-if="name === 'stranka'">
        <rect x="14" y="7.5" width="20" height="33" rx="4" :stroke="sageUrl" stroke-width="6.5" />
        <path :class="detailStroke" d="M 20 19 H 28 M 20 26 H 28" stroke-width="4" />
      </template>

      <template v-else-if="name === 'kurzor'">
        <path d="M 18 10 L 18 36 L 24.5 30.5 L 28.5 40 L 33 38 L 29 28.5 L 37 28 Z" :fill="sageUrl" />
        <path :class="detailStroke" d="M 13 14 H 7 M 15 8 L 10.5 3.5" stroke-width="4" />
      </template>

      <template v-else-if="name === 'kocka'">
        <path d="M 24 7 L 38.5 15.5 V 32.5 L 24 41 L 9.5 32.5 V 15.5 Z" :stroke="sageUrl" stroke-width="6" />
        <path :class="detailStroke" d="M 10.5 16 L 24 24 L 37.5 16 M 24 24 V 40" stroke-width="4" />
      </template>

      <template v-else-if="name === 'obalka'">
        <rect x="9" y="13" width="30" height="22" rx="4" :stroke="sageUrl" stroke-width="6.5" />
        <path :class="detailStroke" d="M 10.5 15.5 L 24 26 L 37.5 15.5" stroke-width="4" />
      </template>

      <template v-else>
        <circle cx="24" cy="24" r="13" :stroke="sageUrl" stroke-width="7" />
        <path :class="detailStroke" d="M 17.5 24 L 23 29.5 L 32 18" stroke-width="6" />
      </template>
    </g>
  </svg>
</template>
