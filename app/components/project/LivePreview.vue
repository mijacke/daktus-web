<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

type PreviewDevice = 'mac' | 'imac' | 'iphone'

/**
 * Živý náhľad projektu — web v okne, ktoré sa morfuje medzi Macom (pokoj),
 * iMacom (rozbalená karta) a iPhonom (odsunutá karta). Iframe je inertný
 * a nikdy sa nepresúva v DOMe — presun by web znovu načítal.
 */
const props = withDefaults(defineProps<{
  /** Adresa webu načítaná do iframe. */
  src: string
  /** Doména zobrazená v adresnom riadku okna. */
  domain: string
  /** Mobilná verzia webu pre iPhone — bez nej sa použije src (responzívny web sa preloží sám). */
  mobileSrc?: string
  /** Zariadenie podľa stavu karty. */
  device?: PreviewDevice
}>(), { device: 'mac', mobileSrc: undefined })

defineEmits<{ close: [] }>()

/** Logická šírka mobilného viewportu v iPhone režime. */
const MOBILE_WIDTH = 390

const screenEl = ref<HTMLElement | null>(null)
const { width: screenW, height: screenH } = useElementSize(screenEl)

const isPhone = computed(() => props.device === 'iphone')
const currentSrc = computed(() => (isPhone.value && props.mobileSrc ? props.mobileSrc : props.src))

/** Mobilná mierka sa počíta z reálnej šírky displeja telefónu — web beží na 390px. */
const phoneFrameStyle = computed(() => {
  if (!isPhone.value || screenW.value === 0) return undefined
  const scale = screenW.value / MOBILE_WIDTH
  return {
    width: `${MOBILE_WIDTH}px`,
    height: `${Math.round(screenH.value / scale)}px`,
    transform: `scale(${scale})`,
  }
})

const shell = cva({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    transitionProperty: 'height, width, bottom',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { bottom: '-2px', height: '87%', width: 'min(600px, 90%)' },
      imac: { bottom: '3%', height: '94%', width: '88%' },
      iphone: { bottom: '-2px', height: '86%', width: 'min(60%, 220px)' },
    },
  },
})

/** Telo okna/displeja — pozadie, rám a zaoblenie sa menia so zariadením. */
const body = cva({
  base: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    boxShadow: 'window',
    overflow: 'hidden',
    transitionProperty: 'border-radius, padding, background-color, border-color',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { background: 'card', borderColor: 'ink/12', borderRadius: '12px 12px 0 0', padding: '0' },
      imac: { background: 'card', borderColor: 'ink/12', borderRadius: '14px 14px 4px 4px', padding: '0' },
      iphone: { background: 'device.aluminum', borderColor: 'ink/18', borderRadius: '40px 40px 0 0', padding: '10px 10px 0' },
    },
  },
})

const barWrap = cva({
  base: {
    flexShrink: 0,
    overflow: 'hidden',
    transitionProperty: 'height, opacity',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { height: '38px', opacity: 1 },
      imac: { height: '38px', opacity: 1 },
      iphone: { height: '0px', opacity: 0 },
    },
  },
})

const screen = cva({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    containerType: 'size',
    background: 'card',
    transitionProperty: 'border-radius',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { borderRadius: '0' },
      imac: { borderRadius: '0' },
      iphone: { borderRadius: '0' },
    },
  },
})

/**
 * Stavový pruh iPhonu — web začína až pod ním ako v Safari,
 * dynamic island sedí v pruhu a neprekrýva hlavičku stránky.
 */
const statusBar = cva({
  base: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'card',
    transitionProperty: 'height, opacity, border-radius',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { height: '0px', opacity: 0, borderRadius: '0' },
      imac: { height: '0px', opacity: 0, borderRadius: '0' },
      iphone: { height: '34px', opacity: 1, borderRadius: '30px 30px 0 0' },
    },
  },
})

/** Dynamic island — jediný detail iPhonu, viac rám nepotrebuje. */
const island = css({
  width: '34%',
  height: '14px',
  borderRadius: 'full',
  background: 'device.island',
})

/** Brada iMacu — hliníkový pás pod displejom. */
const chin = cva({
  base: {
    flexShrink: 0,
    overflow: 'hidden',
    background: 'linear-gradient(180deg, token(colors.device.aluminum), token(colors.device.aluminum2))',
    borderTop: '1px solid',
    borderColor: 'ink/10',
    transitionProperty: 'height, opacity',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { height: '0px', opacity: 0, borderTopWidth: 0 },
      imac: { height: '38px', opacity: 1 },
      iphone: { height: '0px', opacity: 0, borderTopWidth: 0 },
    },
  },
})

/**
 * Desktopový web beží v plnej šírke a škáluje sa presne na kontajner:
 * šírka iframe × mierka = 100cqw, takže footprint je vždy celé okno.
 * V iPhone režime rozmery dodáva phoneFrameStyle z merania displeja.
 */
const frame = cva({
  base: {
    border: 'none',
    transformOrigin: 'top left',
    // živý náhľad, nie prehliadač: žiadny scroll ani prekliky na podstránky
    pointerEvents: 'none',
  },
  variants: {
    device: {
      mac: { width: '238cqw', height: '238cqh', transform: 'scale(0.42)' },
      imac: { width: '147cqw', height: '147cqh', transform: 'scale(0.68)' },
      iphone: {},
    },
  },
})
</script>

<template>
  <div :class="shell({ device })">
    <div :class="body({ device })">
      <div :class="barWrap({ device })">
        <BrowserBar :url="domain" mac-controls @close="$emit('close')" />
      </div>
      <div :class="statusBar({ device })" aria-hidden="true">
        <div :class="island" />
      </div>
      <div ref="screenEl" :class="screen({ device })">
        <iframe
          :src="currentSrc"
          :class="frame({ device })"
          :style="phoneFrameStyle"
          :title="`Náhľad ${domain}`"
          loading="lazy"
          scrolling="no"
          tabindex="-1"
        />
      </div>
      <div :class="chin({ device })" aria-hidden="true" />
    </div>
    <DeviceImacStand :visible="device === 'imac'" />
  </div>
</template>
