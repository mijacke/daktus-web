<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ServiceIconName } from '~/components/icons/ServiceIcon.vue'

interface Service {
  icon: ServiceIconName
  title: string
  text: string
  index: 1 | 2 | 3 | 4
}

const SERVICES: Service[] = [
  {
    icon: 'web',
    title: 'Webstránky a e‑shopy',
    text: 'Prezentačné weby, landing pages a e‑shopy. Rýchle, prehľadné a postavené presne na mieru.',
    index: 1,
  },
  {
    icon: 'software',
    title: 'Softvér na mieru',
    text: 'CRM, rezervačné systémy a interné nástroje, ktoré kopírujú vaše procesy — nie naopak.',
    index: 2,
  },
  {
    icon: 'desktop',
    title: 'Desktopové aplikácie',
    text: 'Riešenia pre Windows a macOS, ktoré spoľahlivo fungujú aj bez pripojenia na internet.',
    index: 3,
  },
  {
    icon: 'mobile',
    title: 'Mobilné aplikácie',
    text: 'iOS a Android — od návrhu cez vývoj až po vydanie v App Store a Google Play.',
    index: 4,
  },
]

const cardsEl = ref<HTMLElement | null>(null)
const cardsIn = useInView(cardsEl)

const cards = css({
  display: 'flex',
  alignItems: 'stretch',
  gap: '16px',
  marginTop: '56px',
  '@media (max-width: 1100px)': { flexWrap: 'wrap' },
})
</script>

<template>
  <section id="sluzby" :class="sectionBlock">
    <div :class="wrap">
      <SectionHead
        eyebrow="Služby"
        title="Čo staviame"
        note="Weby, e‑shopy aj softvér na mieru. Od prvého náčrtu po spustenie a údržbu — všetko pod jednou strechou."
      >
        <NuxtLink :class="sectionLink" to="/sluzby">
          Viac o službách
          <span :class="sectionLinkIcon"><IconArrow /></span>
        </NuxtLink>
      </SectionHead>

      <div ref="cardsEl" :class="[cards, { in: cardsIn }]">
        <ServiceCard
          v-for="service in SERVICES"
          :key="service.title"
          :icon="service.icon"
          :title="service.title"
          :text="service.text"
          :index="service.index"
        />
      </div>

      <PriceBand />
    </div>
  </section>
</template>
