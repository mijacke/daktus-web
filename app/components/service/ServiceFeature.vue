<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'
import type { ServiceDeviceName } from '~/components/service/ServiceCard.vue'

/**
 * Veľký blok služby na podstránke — rozvinutá verzia mini kariet z homepage.
 * Zariadenie stojí na vlastnom javisku, obsah vedľa hovorí, pre koho služba
 * je, čo obsahuje a čo klient dostane v prvom týždni. Hover bloku oživí
 * zariadenie rovnako ako na homepage (data-svc). Tmavý pás rieši rodič
 * cez data-dark, blok si prepne len detail glyfu.
 */
withDefaults(defineProps<{
  glyph: ClayGlyphName
  device: ServiceDeviceName
  title: string
  description: string
  audience: string
  features: string[]
  firstWeek: string
  chips: string[]
  /** Zariadenie na ľavej strane riadku. */
  flip?: boolean
  /** Blok žije v tmavom páse — glyf prepne ink detail na svetlú hmotu. */
  dark?: boolean
}>(), { flip: false, dark: false })

const rootEl = ref<HTMLElement | null>(null)
const inView = useInView(rootEl)

const block = cva({
  base: {
    display: 'grid',
    alignItems: 'center',
    gap: 'clamp(36px, 5vw, 90px)',
    paddingBlock: 'clamp(56px, 8vh, 92px)',
    '& + &': { borderTop: '1px solid {colors.hairline}' },
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr !important',
      '& > [data-stage]': { order: -1 },
    },
  },
  variants: {
    flip: {
      false: { gridTemplateColumns: '1.05fr 0.95fr' },
      true: {
        gridTemplateColumns: '0.95fr 1.05fr',
        '& > [data-stage]': { order: -1 },
      },
    },
  },
})

const glyphBox = css({
  width: '56px',
  height: '56px',
  borderRadius: '15px',
  background: 'accent/13',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(30px, 3.2vw, 52px)',
  letterSpacing: '-0.015em',
  textTransform: 'uppercase',
  lineHeight: 1.05,
  margin: '22px 0 0',
  '[data-dark] &': { color: 'dark.fg' },
})

const desc = css({
  fontSize: 'clamp(15.5px, 1.1vw, 17px)',
  color: 'dim',
  maxWidth: '56ch',
  margin: '18px 0 0',
  '[data-dark] &': { color: 'dark.dim' },
})

const metaGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'clamp(24px, 2.5vw, 44px)',
  marginTop: 'clamp(28px, 3vh, 40px)',
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
})

const metaCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
})

/** Blueprint štítok podsekcie — čiarka a verzálky ako sekčné eyebrow. */
const tag = css({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '10.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'accent.deep',
  _before: { content: '""', width: '18px', height: '2px', background: 'accent' },
  '[data-dark] &': { color: 'accent' },
})

const tagText = css({
  fontSize: '15px',
  margin: '10px 0 0',
  maxWidth: '44ch',
  '[data-dark] &': { color: 'dark.fg/88' },
})

const featureList = css({
  listStyle: 'none',
  padding: 0,
  margin: '12px 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '11px',
})

const featureItem = css({
  display: 'flex',
  gap: '11px',
  alignItems: 'flex-start',
  fontSize: '15px',
  '[data-dark] &': { color: 'dark.fg/88' },
})

const featureIcon = css({
  display: 'inline-flex',
  flexShrink: 0,
  marginTop: '4px',
  color: 'accent.deep',
  '[data-dark] &': { color: 'accent' },
})

const chipRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: 'clamp(26px, 3vh, 36px)',
})

/** Javisko zariadenia — panel, na ktorom mini zariadenie stojí zväčšené. */
const stage = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  minHeight: 'clamp(270px, 30vw, 430px)',
  borderRadius: '20px',
  background: 'paper2',
  border: '1px solid',
  borderColor: 'hairline.soft',
  '[data-dark] &': { background: 'dark.panel', borderColor: 'dark.fg/8' },
  '@media (max-width: 640px)': { minHeight: '240px' },
})

/**
 * Zariadenia z homepage majú fixné vnútorné rozmery — zväčšujú sa transformom
 * nad menším základom, nech si držia proporcie. Interné hover animácie
 * (načítanie stránky, riadok terminálu, push notifikácia) spúšťa data-svc
 * na koreni bloku.
 */
const deviceBox = cva({
  base: { display: 'flex', justifyContent: 'center' },
  variants: {
    device: {
      browser: {
        // shell MacBooku má bočný padding 15 % — širší základ a väčšia škála ho dorovnajú
        width: '390px',
        maxWidth: '88%',
        transform: 'scale(1.55)',
        '& > *': { width: '100%' },
        '@media (max-width: 640px)': { transform: 'scale(1.1)' },
      },
      code: {
        width: '340px',
        maxWidth: '88%',
        flexDirection: 'column',
        background: 'dark.bg',
        border: '1px solid',
        borderColor: 'dark.fg/10',
        borderRadius: '14px',
        boxShadow: 'window',
        paddingBottom: '10px',
        transform: 'scale(1.3)',
        '& > *': { width: '100%' },
        '@media (max-width: 640px)': { transform: 'none' },
      },
      desktop: {
        width: '100%',
        transform: 'scale(1.7)',
        '@media (max-width: 640px)': { transform: 'scale(1.25)' },
      },
      phone: {
        alignSelf: 'flex-end',
        transformOrigin: '50% 100%',
        transform: 'scale(1.5) translateY(9%)',
        '@media (max-width: 640px)': { transform: 'scale(1.15) translateY(9%)' },
      },
    },
  },
})
</script>

<template>
  <article ref="rootEl" :class="[block({ flip }), { in: inView }]" data-svc>
    <div :class="fadeIn()">
      <div :class="glyphBox"><ClayGlyph :name="glyph" :size="34" :on-dark="dark" /></div>
      <h2 :class="heading">{{ title }}</h2>
      <p :class="desc">{{ description }}</p>

      <div :class="metaGrid">
        <div :class="metaCol">
          <div>
            <div :class="tag">Pre koho</div>
            <p :class="tagText">{{ audience }}</p>
          </div>
          <div>
            <div :class="tag">Prvý týždeň</div>
            <p :class="tagText">{{ firstWeek }}</p>
          </div>
        </div>
        <div>
          <div :class="tag">Čo obsahuje</div>
          <ul :class="featureList">
            <li v-for="feature in features" :key="feature" :class="featureItem">
              <span :class="featureIcon"><IconCheck /></span>{{ feature }}
            </li>
          </ul>
        </div>
      </div>

      <div :class="chipRow">
        <AppChip v-for="chip in chips" :key="chip">{{ chip }}</AppChip>
      </div>
    </div>

    <div :class="[stage, fadeIn({ delay: 1 })]" data-stage aria-hidden="true">
      <div :class="deviceBox({ device })">
        <ServiceDeviceBrowser v-if="device === 'browser'" />
        <ServiceDeviceCode v-else-if="device === 'code'" />
        <ServiceDeviceDesktop v-else-if="device === 'desktop'" />
        <ServiceDevicePhone v-else />
      </div>
    </div>
  </article>
</template>
