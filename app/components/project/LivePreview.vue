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
  /** Tmavá edícia zariadení (space gray / čierny iPhone) — svetlé weby nechávajú striebornú. */
  dark?: boolean
  /** Farba stavového pruhu iPhonu — má splývať s hlavičkou mobilného webu. */
  phoneBar?: 'card' | 'blush'
}>(), { device: 'mac', mobileSrc: undefined, dark: false, phoneBar: 'card' })

defineEmits<{ close: [] }>()

/** Logické šírky viewportu — desktop a iPhone. */
const DESKTOP_WIDTH = 1440
const MOBILE_WIDTH = 390

const screenEl = ref<HTMLElement | null>(null)
const { width: screenW, height: screenH } = useElementSize(screenEl)

const isPhone = computed(() => props.device === 'iphone')
const currentSrc = computed(() => (isPhone.value && props.mobileSrc ? props.mobileSrc : props.src))

/**
 * Viewport beží na pevnej logickej šírke a na displej sa lepí meranou mierkou.
 * Pevná šírka znamená, že web sa počas morfovania okna nepreskladáva (mení sa
 * len lacný transform) a mierne presiahnutie (+2px) zakrýva subpixelové
 * škáry, ktoré pri tmavom webe svietili na hranách displeja.
 */
const frameStyle = computed(() => {
  if (screenW.value === 0) return { visibility: 'hidden' as const }
  const logicalWidth = isPhone.value ? MOBILE_WIDTH : DESKTOP_WIDTH
  const scale = (screenW.value + 2) / logicalWidth
  return {
    width: `${logicalWidth}px`,
    height: `${Math.ceil(screenH.value / scale) + 2}px`,
    transform: `scale(${scale})`,
  }
})

/**
 * Plášť náhľadu. Variant tone nastavuje farebné premenné celej edície —
 * rám, brada, prstenec telefónu aj stojan ich len čítajú cez var().
 */
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
      iphone: { bottom: '-8%', height: '104%', width: 'min(64%, 245px)' },
    },
    tone: {
      light: {
        '--dev-bezel': 'token(colors.device.aluminum)',
        '--dev-edge': 'token(colors.device.aluminum2)',
        '--dev-chin': 'token(colors.device.aluminum2)',
        '--dev-phone': 'token(colors.device.silver)',
        '--dev-ring': 'token(colors.device.silver2)',
        '--dev-hi': 'rgba(255, 255, 255, 0.6)',
        '--dev-foot1': 'token(colors.device.silver)',
        '--dev-foot2': 'token(colors.device.silver2)',
        '--dev-foot3': 'token(colors.device.aluminum4)',
        '--dev-neck-a': 'token(colors.device.aluminum4)',
        '--dev-neck-b': 'token(colors.device.aluminum3)',
        '--dev-neck-hi': 'token(colors.white)',
        '--dev-base-a': 'token(colors.device.aluminum2)',
        '--dev-base-b': 'token(colors.device.aluminum4)',
        '--dev-screen': 'token(colors.card)',
      },
      dark: {
        '--dev-bezel': 'token(colors.device.dark)',
        '--dev-edge': 'token(colors.device.dark2)',
        '--dev-chin': 'token(colors.device.dark3)',
        '--dev-phone': 'token(colors.device.island)',
        '--dev-ring': 'token(colors.device.dark2)',
        '--dev-hi': 'rgba(255, 255, 255, 0.14)',
        '--dev-foot1': 'token(colors.device.dark4)',
        '--dev-foot2': 'token(colors.device.island)',
        '--dev-foot3': 'token(colors.device.island)',
        '--dev-neck-a': 'token(colors.device.island)',
        '--dev-neck-b': 'token(colors.device.dark4)',
        '--dev-neck-hi': 'token(colors.device.dark5)',
        '--dev-base-a': 'token(colors.device.dark3)',
        '--dev-base-b': 'token(colors.device.island)',
        '--dev-screen': 'token(colors.device.island)',
      },
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
      background: 'var(--dev-chin)',
      borderRadius: '0 0 23px 23px',
      boxShadow: 'inset 0 0 18px 0 rgba(0, 0, 0, 0.08)',
      transitionProperty: 'height, opacity',
      transitionDuration: '0.7s',
      transitionTimingFunction: 'out',
    },
  },
  variants: {
    device: {
      mac: {
        background: 'var(--dev-bezel)',
        borderColor: 'var(--dev-edge)',
        borderRadius: '14px',
        padding: '8px 8px 16px',
        boxShadow: '{shadows.window}, inset 0 0 0 1px var(--dev-edge)',
      },
      imac: {
        background: 'var(--dev-bezel)',
        borderColor: 'var(--dev-edge)',
        borderRadius: '24px',
        padding: '12px 12px 56px',
        boxShadow: '{shadows.window}, inset 0 0 0 1px var(--dev-edge)',
        '&::after': { height: '44px', opacity: 1 },
      },
      iphone: {
        background: 'var(--dev-phone)',
        borderColor: 'var(--dev-ring)',
        borderRadius: '38px',
        padding: '9px',
        boxShadow: '{shadows.window}, inset 0 0 4px 2px var(--dev-hi), inset 0 0 0 6px var(--dev-ring)',
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
    background: 'var(--dev-screen)',
    transitionProperty: 'border-radius',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { borderRadius: '6px' },
      imac: { borderRadius: '9px' },
      iphone: { borderRadius: '29px' },
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
      background: 'var(--dev-ring)',
    },
    '&::before': { left: '-2px', top: '26%', height: '30px', boxShadow: '0 38px 0 var(--dev-ring)' },
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
  background: 'var(--dev-screen)',
})

/**
 * Stavový pruh iPhonu — web začína až pod ním ako v Safari a pruh farebne
 * splýva s hlavičkou webu. Čas a ikony sedia po stranách dynamic islandu.
 */
const statusBar = cva({
  base: {
    position: 'relative',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transitionProperty: 'height, opacity',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'out',
  },
  variants: {
    device: {
      mac: { height: '0px', opacity: 0 },
      imac: { height: '0px', opacity: 0 },
      iphone: { height: '32px', opacity: 1 },
    },
    tint: {
      card: { background: 'card' },
      blush: { background: 'cover.blush' },
    },
  },
})

const statusTime = css({
  position: 'absolute',
  left: '15px',
  fontSize: '9.5px',
  fontWeight: 600,
  letterSpacing: '0.02em',
  color: 'ink',
})

const statusIcons = css({
  position: 'absolute',
  right: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  color: 'ink',
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

const frame = css({
  border: 'none',
  transformOrigin: 'top left',
  // živý náhľad, nie prehliadač: žiadny scroll ani prekliky na podstránky
  pointerEvents: 'none',
})
</script>

<template>
  <div :class="shell({ device, tone: dark ? 'dark' : 'light' })">
    <div :class="phoneButtons({ device })" aria-hidden="true" />
    <div :class="body({ device })">
      <div :class="camera({ device })" aria-hidden="true" />
      <div :class="screenArea({ device })">
        <div :class="barWrap({ device })">
          <BrowserBar :url="domain" mac-controls :dark="dark" @close="$emit('close')" />
        </div>
        <div :class="statusBar({ device, tint: phoneBar })" aria-hidden="true">
          <span :class="statusTime">9:41</span>
          <div :class="island" />
          <span :class="statusIcons">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor"><rect x="0" y="5" width="2" height="3" rx="0.6" /><rect x="3.3" y="3.5" width="2" height="4.5" rx="0.6" /><rect x="6.6" y="2" width="2" height="6" rx="0.6" /><rect x="9.9" y="0.5" width="2" height="7.5" rx="0.6" /></svg>
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" stroke="currentColor" stroke-linecap="round"><path d="M1 2.6a6.4 6.4 0 0 1 9 0" stroke-width="1.4" /><path d="M2.7 4.6a4 4 0 0 1 5.6 0" stroke-width="1.4" /><circle cx="5.5" cy="6.7" r="0.9" fill="currentColor" stroke="none" /></svg>
            <svg width="17" height="9" viewBox="0 0 17 9"><rect x="0.5" y="0.5" width="13.5" height="8" rx="2.2" fill="none" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="10.5" height="5" rx="1.1" fill="currentColor" /><path d="M15.7 3.2v2.6" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity="0.4" /></svg>
          </span>
        </div>
        <div ref="screenEl" :class="screen">
          <iframe
            :src="currentSrc"
            :class="frame"
            :style="frameStyle"
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
