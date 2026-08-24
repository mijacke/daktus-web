<script setup lang="ts">
import WebGLFluidEnhanced from 'webgl-fluid-enhanced'
import { css } from '~~/styled-system/css'
import { token } from '~~/styled-system/tokens'

/**
 * Tmavý full-bleed pás pre blok služby — rovnaká atmosféra ako Stack na
 * homepage: kurzor zanecháva šalviovú dymovú stopu (WebGL fluid). Shell
 * simulácie leží nad obsahom so screen blendom, preto hover zariadenia
 * spúšťa data-svc na sekcii, nie na bloku. Coarse pointer a reduced
 * motion simuláciu vôbec nespustia.
 */
const fluidEl = ref<HTMLElement | null>(null)
let fluidSim: WebGLFluidEnhanced | null = null

onMounted(() => {
  const box = fluidEl.value
  if (!box) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  fluidSim = new WebGLFluidEnhanced(box)
  fluidSim.setConfig({
    colorPalette: [token('colors.accent'), token('colors.accent.deep')],
    colorful: false,
    transparent: true,
    brightness: 0.35,
    simResolution: 96,
    dyeResolution: 512,
    densityDissipation: 3.2,
    velocityDissipation: 0.5,
    curl: 26,
    splatRadius: 0.12,
    splatForce: 3800,
    hover: true,
    bloom: false,
    sunrays: false,
  })
  fluidSim.start()
  fluidSim.multipleSplats(2)
})

onBeforeUnmount(() => {
  fluidSim?.stop()
  fluidSim = null
})

const section = css({
  position: 'relative',
  background: 'dark.bg',
  color: 'dark.fg',
  borderBlock: '1px solid',
  borderColor: 'dark.fg/7',
  overflow: 'hidden',
})

const content = css({
  position: 'relative',
  zIndex: 2,
})

/** Vonkajší shell drží absolútnu pozíciu — knižnica si vnútro prepisuje. */
const fluidShell = css({
  position: 'absolute',
  inset: 0,
  zIndex: 3,
  mixBlendMode: 'screen',
  '@media (pointer: coarse)': { display: 'none' },
  _motionReduce: { display: 'none' },
})

const fluidInner = css({
  width: '100%',
  height: '100%',
})
</script>

<template>
  <section :class="section" data-dark data-svc>
    <div :class="content">
      <slot />
    </div>
    <div :class="fluidShell" aria-hidden="true">
      <div ref="fluidEl" :class="fluidInner" />
    </div>
  </section>
</template>
