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
      mac: { bottom: '3%', height: '86%', width: 'min(560px, 84%)' },
      imac: { bottom: '3%', height: '94%', width: '88%' },
      iphone: { bottom: '-2px', height: '86%', width: 'min(60%, 220px)' },
    },
  },
})

/**
 * Rám zariadenia podľa štruktúry devices.css (MIT, picturepan2): bezel je
 * rovnomerný padding rámu, obsah je jediná zaoblená obrazovka. Brada iMacu
 * žije v spodnom paddingu ako pseudo-element.
 */
const body = cva({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    overflow: 'hidden',
    transitionProperty: 'border-radius, padding, background-color, border-color, box-shadow',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '1px',
      right: '1px',
      bottom: '1px',
      height: '0px',
      opacity: 0,
      background: 'device.aluminum2',
      borderRadius: '0 0 17px 17px',
      boxShadow: 'inset 0 0 18px 0 rgba(0, 0, 0, 0.08)',
      transitionProperty: 'height, opacity',
      transitionDuration: '0.7s',
      transitionTimingFunction: 'out',
    },
  },
  variants: {
    device: {
      mac: {
        background: 'device.aluminum',
        borderColor: 'device.aluminum2',
        borderRadius: '14px',
        padding: '8px 8px 16px',
        boxShadow: '{shadows.window}, inset 0 0 0 1px token(colors.device.aluminum2)',
      },
      imac: {
        background: 'device.aluminum',
        borderColor: 'device.aluminum2',
        borderRadius: '18px',
        padding: '12px 12px 56px',
        boxShadow: '{shadows.window}, inset 0 0 0 1px token(colors.device.aluminum2)',
        '&::after': { height: '44px', opacity: 1 },
      },
      iphone: {
        background: 'device.panel',
        borderColor: 'device.black2',
        borderRadius: '38px 38px 0 0',
        padding: '9px 9px 0',
        boxShadow: '{shadows.window}, inset 0 0 4px 2px rgba(255, 255, 255, 0.35), inset 0 0 0 6px token(colors.device.black)',
      },
    },
  },
})

/** Obrazovka v ráme — jediný zaoblený obdĺžnik, orezáva lištu aj web. */
const screenArea = cva({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: 'card',
    transitionProperty: 'border-radius',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { borderRadius: '6px' },
      imac: { borderRadius: '3px' },
      iphone: { borderRadius: '29px 29px 0 0' },
    },
  },
})

/** Kamera v hornom bezeli — majú ju MacBook aj iMac. */
const camera = cva({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '5px',
    height: '5px',
    borderRadius: 'full',
    background: 'device.panel',
    zIndex: 3,
    transitionProperty: 'opacity, top',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { top: '2px', opacity: 1 },
      imac: { top: '4px', opacity: 1 },
      iphone: { top: '2px', opacity: 0 },
    },
  },
})

/** Bočné tlačidlá iPhonu — hlasitosť vľavo, zapínanie vpravo. */
const phoneButtons = cva({
  base: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      width: '3px',
      borderRadius: '2px',
      background: 'device.black2',
    },
    '&::before': { left: '-2px', top: '26%', height: '30px', boxShadow: '0 38px 0 token(colors.device.black2)' },
    '&::after': { right: '-2px', top: '32%', height: '46px' },
  },
  variants: {
    device: {
      mac: { opacity: 0 },
      imac: { opacity: 0 },
      iphone: { opacity: 1 },
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

const screen = css({
  position: 'relative',
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
  containerType: 'size',
  background: 'card',
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
    transitionProperty: 'height, opacity',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { height: '0px', opacity: 0 },
      imac: { height: '0px', opacity: 0 },
      iphone: { height: '34px', opacity: 1 },
    },
  },
})

/** Dynamic island so šošovkou kamery pri pravom okraji. */
const island = css({
  position: 'relative',
  width: '34%',
  height: '15px',
  borderRadius: 'full',
  background: 'device.island',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '6px',
    height: '6px',
    borderRadius: 'full',
    background: 'radial-gradient(farthest-corner at 30% 30%, token(colors.device.lens), transparent 75%)',
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
    <div :class="phoneButtons({ device })" aria-hidden="true" />
    <div :class="body({ device })">
      <div :class="camera({ device })" aria-hidden="true" />
      <div :class="screenArea({ device })">
        <div :class="barWrap({ device })">
          <BrowserBar :url="domain" mac-controls @close="$emit('close')" />
        </div>
        <div :class="statusBar({ device })" aria-hidden="true">
          <div :class="island" />
        </div>
        <div ref="screenEl" :class="screen">
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
      </div>
    </div>
    <DeviceFoot :device="device" />
  </div>
</template>
