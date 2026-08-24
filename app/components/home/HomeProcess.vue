<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

import ProcessSceneBrief from '~/components/home/process/ProcessSceneBrief.vue'
import ProcessSceneCode from '~/components/home/process/ProcessSceneCode.vue'
import ProcessSceneDesign from '~/components/home/process/ProcessSceneDesign.vue'
import ProcessSceneLive from '~/components/home/process/ProcessSceneLive.vue'
import ProcessSceneTest from '~/components/home/process/ProcessSceneTest.vue'

import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

const STEPS: { no: string, title: string, text: string, glyph: ClayGlyphName }[] = [
  { no: '01', title: 'Analýza', text: 'Ciele, používatelia a obsah. Ujasníme si, čo staviame a prečo.', glyph: 'lupa' },
  { no: '02', title: 'Dizajn', text: 'Zo skice a wireframu vznikne vizuál, ktorý si odsúhlasíte.', glyph: 'ceruzka' },
  { no: '03', title: 'Vývoj', text: 'Čistý kód a pravidelné ukážky. Progres vidíte každý týždeň.', glyph: 'zatvorky' },
  { no: '04', title: 'Testovanie', text: 'Rýchlosť, mobily, formuláre. Doladíme každý detail.', glyph: 'stit' },
  { no: '05', title: 'Nasadenie', text: 'Spustenie, meranie a dlhodobá starostlivosť.', glyph: 'raketa' },
]

const SCENES = [ProcessSceneBrief, ProcessSceneDesign, ProcessSceneCode, ProcessSceneTest, ProcessSceneLive]

const stageEl = ref<HTMLElement | null>(null)
const stageIn = useInView(stageEl)

/** Desktop má vždy MacBook, mobil iPhone — rovnaké rámy ako Vybraná práca. */
const wide = useMediaQuery('(min-width: 1001px)', { initial: true })
const device = computed(() => (wide.value ? 'mac' : 'iphone'))

/**
 * Kroky otvára scroll, žiadny pin: aktívna je posledná karta, ktorá vošla do
 * stredného pásma viewportu (60 % výšky) — široké pásmo prepína o kus skôr,
 * než karta dôjde do stredu, dopredu aj dozadu. Tempo si určuje čitateľ.
 */
const active = ref(0)
const cardEls: (HTMLElement | null)[] = []
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const index = cardEls.indexOf(entry.target as HTMLElement)
      if (index !== -1) active.value = index
    }
  }, { rootMargin: '-20% 0px -20% 0px' })
  cardEls.forEach(el => el && observer?.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())

const section = css({
  background: 'dark.bg',
  color: 'dark.fg',
  marginTop: 'clamp(90px, 12vh, 150px)',
  padding: 'clamp(88px, 11vh, 140px) 0 clamp(80px, 10vh, 120px)',
})

const list = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: 'clamp(28px, 4vh, 48px)',
})

/** Rámy v natívnych proporciách, centrované — nenaťahujú sa na šírku karty. */
const shellWrap = cva({
  base: {
    marginTop: 'clamp(28px, 4.5vh, 52px)',
    marginBottom: 'clamp(10px, 2vh, 24px)',
    marginInline: 'auto',
  },
  variants: {
    device: {
      mac: { width: 'min(900px, 100%)' },
      iphone: { width: 'min(340px, 92%)' },
    },
  },
})

/**
 * Výška displeja podľa devices.css MacBook Pro (2022): displej 600 × 386,
 * pomer 1,554. Pri šírke shellu 900 px (displej 882) je natívna výška
 * obrazovky 568 px vrátane 38 px lišty → demo 530 px; kratšie viewporty
 * to stiahnu cez 100svh klauzulu.
 */
const demo = cva({
  base: {
    position: 'relative',
    background: 'dark.panel',
    overflow: 'hidden',
  },
  variants: {
    device: {
      mac: { height: 'clamp(300px, calc(100svh - 460px), 530px)' },
      iphone: { minHeight: '480px' },
    },
  },
})

const scene = css({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  transform: 'scale(0.985)',
  transition: 'opacity 0.5s ease 0.15s, transform 0.6s {easings.out} 0.15s',
  pointerEvents: 'none',
  padding: 'clamp(20px, 2.2vw, 36px)',
  '&.scene-on': { opacity: 1, transform: 'none' },
})
</script>

<template>
  <section id="proces" :class="section" data-dark>
    <div :class="wrap">
      <SectionHead eyebrow="Proces" title="Ako vzniká produkt" />

      <div ref="stageEl" :class="[list, fadeIn(), { in: stageIn }]">
        <div
          v-for="(step, index) in STEPS"
          :key="step.no"
          :ref="(el) => { cardEls[index] = el as HTMLElement | null }"
        >
          <ProcessStepCard v-bind="step" :open="active === index">
            <div :class="shellWrap({ device })">
              <DeviceShell :device="device" url="vas-projekt.sk" dark>
                <div :class="demo({ device })">
                  <div :class="[scene, { 'scene-on': active === index }]">
                    <component :is="SCENES[index]" :running="index === 3 ? active === 3 : undefined" />
                  </div>
                </div>
              </DeviceShell>
            </div>
          </ProcessStepCard>
        </div>
      </div>
    </div>
  </section>
</template>
