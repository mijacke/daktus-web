<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/**
 * Referencie — dve karty položené na stole medzi O nás a CTA: vety klientov,
 * meno a odkaz na živý projekt. Rovnaké svetlé pozadie ako okolité sekcie,
 * sekciu odlišujú karty. Plastelína vstupuje mieseným glyfom úvodzoviek,
 * karty ležia mierne pootočené a hover ich vyrovná.
 * POZOR: citáty sú zatiaľ ilustračné — pred nasadením na produkciu ich
 * musia nahradiť skutočné vety so súhlasom klientov.
 */
const REFERENCES = [
  {
    quote: 'Web je presne taký, aký sme chceli a rezervácie chodia samé. Komunikácia bola rýchla a bez zbytočností.',
    name: 'Pavlína D.',
    role: 'fotografka, Galanta',
    device: 'iphone',
    site: 'paulifotografka.sk',
    href: 'https://paulifotografka.sk',
    tilt: 'left',
    delay: 1,
    markDelay: 1,
  },
  {
    quote: 'Od prvej skice bolo vidieť, že rozumejú, čo naša firma potrebuje. Nový web pôsobí dôveryhodne aj pre veľkých partnerov.',
    name: 'ADI Trade',
    role: 'nadrozmerná preprava',
    device: 'mac',
    site: 'aditrade.sk',
    href: 'https://aditrade.sk',
    tilt: 'right',
    delay: 2,
    markDelay: 2,
  },
] as const

const gridEl = ref<HTMLElement | null>(null)
const gridIn = useInView(gridEl)

const grid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 'clamp(18px, 2.4vw, 28px)',
  marginTop: 'clamp(36px, 5vh, 56px)',
  '@media (max-width: 760px)': { gridTemplateColumns: '1fr' },
})

/** Karta leží mierne pootočená ako lístok z Analýzy; hover ju vyrovná. */
const card = cva({
  base: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'card',
    border: '1px solid',
    borderColor: 'hairline',
    borderRadius: '18px',
    padding: 'clamp(24px, 2.6vw, 34px)',
    transitionProperty: 'transform, box-shadow',
    transitionDuration: '0.45s',
    transitionTimingFunction: 'out',
    _hover: { transform: 'rotate(0deg) translateY(-4px)', boxShadow: '0 18px 44px rgba(16, 19, 21, 0.09)' },
    _motionReduce: { transform: 'none', transition: 'none' },
  },
  variants: {
    tilt: {
      left: { transform: 'rotate(-0.8deg)' },
      right: { transform: 'rotate(0.7deg)' },
    },
  },
})

/** Miesené úvodzovky — vstupujú s prekmitom, keď sekcia nabehne. */
const mark = cva({
  base: {
    display: 'inline-flex',
    opacity: 0,
    '.in &': {
      animation: 'clayPop 0.7s {easings.out} forwards',
      _motionReduce: { animation: 'none' },
    },
    _motionReduce: { opacity: 1 },
  },
  variants: {
    markDelay: {
      1: { animationDelay: '0.35s' },
      2: { animationDelay: '0.5s' },
    },
  },
})

/**
 * Výskok s drnčaním ako hmota v hero — beží na vlastnom obale, nech sa
 * nehryzie so vstupným prekmitom. Záporné delaye rozhodia fázy, takže
 * v každom okamihu skáče najviac jedna úvodzovka.
 */
const buzz = cva({
  base: {
    display: 'inline-flex',
    animation: 'clayBuzz 4s linear infinite',
    _motionReduce: { animation: 'none' },
  },
  variants: {
    phase: {
      1: { animationDelay: '0s' },
      2: { animationDelay: '-2.1s' },
    },
  },
})

/** Jedna veľká otváracia úvodzovka nad citátom. */
const markOpen = css({ marginBottom: '14px' })

const quote = css({
  fontSize: 'clamp(15.5px, 1.2vw, 17px)',
  lineHeight: 1.65,
})

/** Pätka sedí na dne karty — voľný priestor ostáva medzi citátom a čiarou. */
const foot = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap',
  marginTop: 'auto',
  paddingTop: '16px',
  borderTop: '1px solid',
  borderColor: 'hairline.soft',
})

const clientName = css({
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: '13px',
})

const clientRole = css({
  display: 'block',
  fontFamily: 'sans',
  fontWeight: 400,
  textTransform: 'none',
  letterSpacing: 0,
  fontSize: '12px',
  color: 'dim',
  marginTop: '3px',
})

/** Odkaz na živý projekt — silueta zariadenia + mono doména. */
const projLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'mono',
  fontSize: '11.5px',
  color: 'accent.deep',
  transition: 'color 0.3s ease',
  _hover: { color: 'ink' },
})
</script>

<template>
  <section id="referencie" :class="sectionBlock">
    <div :class="wrap">
      <SectionHead eyebrow="Referencie" title="Slovami klientov">
        <p :class="sectionNote">Dve vety od ľudí, ktorým sme web postavili. Nič viac k tomu netreba.</p>
      </SectionHead>

      <div ref="gridEl" :class="[grid, { in: gridIn }]">
        <div v-for="item in REFERENCES" :key="item.site" :class="fadeIn({ delay: item.delay })">
          <article :class="card({ tilt: item.tilt })">
            <span :class="[markOpen, mark({ markDelay: item.markDelay })]" aria-hidden="true">
              <span :class="buzz({ phase: item.markDelay })">
                <ClayGlyph name="uvodzovky" :size="42" />
              </span>
            </span>
            <p :class="quote">{{ item.quote }}</p>
            <div :class="foot">
              <div :class="clientName">
                {{ item.name }}
                <span :class="clientRole">{{ item.role }}</span>
              </div>
              <a :class="projLink" :href="item.href" target="_blank" rel="noopener">
                <svg v-if="item.device === 'iphone'" width="11" height="17" viewBox="0 0 11 17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                  <rect x="0.9" y="0.9" width="9.2" height="15.2" rx="2.6" />
                </svg>
                <svg v-else width="19" height="14" viewBox="0 0 19 14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                  <rect x="2.3" y="0.9" width="14.4" height="9.6" rx="1.6" />
                  <path d="M 0.8 12.9 H 18.2" />
                </svg>
                {{ item.site }} ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
