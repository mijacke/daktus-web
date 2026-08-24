<script setup lang="ts">
import { cva } from '~~/styled-system/css'

const gridEl = ref<HTMLElement | null>(null)
const { active, select, clear } = useCardFocus(gridEl)

const stateFor = (index: number) =>
  active.value === null ? 'idle' : active.value === index ? 'active' : 'dimmed'

/** Pokoj = Mac okno, rozbalená karta = iMac, odsunutá karta = iPhone s mobilnou verziou. */
const deviceFor = (index: number) =>
  active.value === null ? 'mac' : active.value === index ? 'imac' : 'iphone'

// Výber karty animuje priamo fr stĺpce gridu — aktívna výrazne narastie,
// druhá klesne na polovicu svojej šírky a uhne nabok.
const grid = cva({
  base: {
    display: 'grid',
    gap: '34px',
    marginTop: '60px',
    transition: 'grid-template-columns 0.7s {easings.out}',
    '@media (max-width: 860px)': { gridTemplateColumns: '1fr !important' },
  },
  variants: {
    focus: {
      none: { gridTemplateColumns: '1fr 1fr' },
      first: { gridTemplateColumns: '1.5fr 0.5fr' },
      second: { gridTemplateColumns: '0.5fr 1.5fr' },
    },
  },
})
</script>

<template>
  <section id="projekty" :class="sectionBlock">
    <div :class="wrap">
      <SectionHead eyebrow="Projekty" title="Vybraná práca">
        <NuxtLink :class="sectionLink" to="/projekty">
          Všetky projekty
          <span :class="sectionLinkIcon"><IconArrow /></span>
        </NuxtLink>
      </SectionHead>
      <div
        ref="gridEl"
        :class="grid({ focus: active === null ? 'none' : active === 0 ? 'first' : 'second' })"
      >
        <ProjectCard
          name="Pauli Fotografka"
          description="Portfólio a rezervácie pre rodinnú fotografku"
          tone="blush"
          :state="stateFor(0)"
          @select="select(0)"
        >
          <LivePreview
            src="https://www.paulifotografka.sk/"
            domain="paulifotografka.sk"
            phone-bar="blush"
            :device="deviceFor(0)"
            @close="clear"
          />
        </ProjectCard>
        <ProjectCard
          name="Aditrade"
          description="Web pre špecialistov na nadrozmernú prepravu"
          tone="navy"
          badge="Vo vývoji"
          :state="stateFor(1)"
          @select="select(1)"
        >
          <LivePreview
            src="/nahlad/aditrade/"
            domain="aditrade.sk"
            mobile-src="/nahlad/aditrade/mobil.html"
            :device="deviceFor(1)"
            dark
            @close="clear"
          />
        </ProjectCard>
      </div>
    </div>
  </section>
</template>
