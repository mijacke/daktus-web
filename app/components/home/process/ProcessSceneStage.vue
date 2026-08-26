<script setup lang="ts">
import { cva } from '~~/styled-system/css'

/**
 * Displej kroku procesu. Scéna beží na logickej ploche a meranou mierkou sa
 * posadí na displej — rovnaký princíp ako živý náhľad projektu (LivePreview).
 * Bez neho sa scéna orezala všade, kde displej nedorástol na jej obsah: na
 * iPhone o šírku (riadky kódu), na nižších monitoroch o výšku.
 */
const props = defineProps<{
  device: 'mac' | 'iphone'
  /** Scéna je aktívna — spúšťa prelínačku aj animácie položiek. */
  on: boolean
}>()

/**
 * Najmenšia logická výška scény: MacBook potrebuje 376 px (najvyššia je
 * Nasadenie), iPhone 640 px na logické plátno 400 × 640. Nižší displej scénu
 * už len zmenší mierkou, neoreže ju. Šírku na telefóne drží pomer displeja.
 */
const MIN_HEIGHT = { mac: 380, iphone: 640 }

const boxEl = ref<HTMLElement | null>(null)
const { height } = useElementSize(boxEl)

/** Mierka scény; kým displej nie je zmeraný a kým sa zmestí, drží 1 : 1. */
const fit = computed(() => (height.value > 0 ? Math.min(1, height.value / MIN_HEIGHT[props.device]) : 1))

const box = cva({
  base: {
    position: 'relative',
    background: 'dark.panel',
    overflow: 'hidden',
  },
  variants: {
    device: {
      /**
       * Výška displeja podľa devices.css MacBook Pro (2022): displej 600 × 386,
       * pomer 1,554. Pri šírke shellu 900 px (displej 882) je natívna výška
       * obrazovky 568 px vrátane 38 px lišty → demo 530 px; kratšie viewporty
       * to stiahnu cez 100svh klauzulu.
       */
      mac: { height: 'clamp(300px, calc(100svh - 460px), 530px)' },
      /** Pomer logického plátna 400 × 640 — z neho vyjde aj mierka na šírku. */
      iphone: { aspectRatio: '400 / 640' },
    },
  },
})

/**
 * Scéna je o mierku väčšia, než je displej, a `scale` ju vráti presne na jeho
 * rozmer — pri mierke 1 sedí plocha na displej a nič sa nedeje.
 */
const scene = cva({
  base: {
    position: 'absolute',
    inset: 0,
    width: 'calc(100% / var(--fit))',
    height: 'calc(100% / var(--fit))',
    transformOrigin: 'top left',
    opacity: 0,
    transform: 'scale(calc(var(--fit) * 0.985))',
    transition: 'opacity 0.6s ease 0.3s, transform 0.7s {easings.out} 0.3s',
    pointerEvents: 'none',
    '&.scene-on': { opacity: 1, transform: 'scale(var(--fit))' },
  },
  variants: {
    device: {
      mac: { padding: 'clamp(20px, 2.2vw, 36px)' },
      /** Plátno telefónu je logické, odsadenie sa preto nedrží viewportu. */
      iphone: { padding: '20px' },
    },
  },
})
</script>

<template>
  <div ref="boxEl" :class="box({ device })">
    <div :class="[scene({ device }), { 'scene-on': on }]" :style="{ '--fit': fit }">
      <slot />
    </div>
  </div>
</template>
