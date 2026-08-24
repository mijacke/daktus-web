<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ServiceDeviceName } from '~/components/service/ServiceCard.vue'

interface Service {
  device: ServiceDeviceName
  title: string
  text: string
  delay: 0 | 1 | 2 | 3
}

const SERVICES: Service[] = [
  {
    device: 'browser',
    title: 'Tvorba webstránok',
    text: 'Prezentačné weby, landing pages a e‑shopy. Rýchle, prístupné a stavané na mieru.',
    delay: 0,
  },
  {
    device: 'code',
    title: 'Vývoj softvéru',
    text: 'CRM, rezervačné systémy a interné nástroje presne podľa vašich procesov.',
    delay: 1,
  },
  {
    device: 'desktop',
    title: 'Desktopové aplikácie',
    text: 'Aplikácie pre Windows a macOS, ktoré zvládnu aj prácu offline.',
    delay: 2,
  },
  {
    device: 'phone',
    title: 'Mobilné aplikácie',
    text: 'iOS a Android appky od návrhu po publikovanie v obchodoch.',
    delay: 3,
  },
]

const gridEl = ref<HTMLElement | null>(null)
const gridIn = useInView(gridEl)
const bandEl = ref<HTMLElement | null>(null)
const bandIn = useInView(bandEl)

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '28px',
  marginTop: '60px',
  '@media (max-width: 1100px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
})

/** Uvádzacie ceny ako clay nálepka — jediný pootočený prvok vo vete. */
const clayBadge = css({
  display: 'inline-block',
  fontFamily: 'display',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
  fontSize: '13px',
  color: 'dark.bg',
  background: 'accent',
  borderRadius: '9px',
  padding: '5px 13px',
  transform: 'rotate(-2.5deg)',
  boxShadow: '0 4px 12px rgba(16, 19, 21, 0.18)',
  verticalAlign: 'middle',
  marginInline: '4px',
})
</script>

<template>
  <section id="sluzby" :class="sectionBlock">
    <div :class="wrap">
      <SectionHead eyebrow="Služby" title="Čo staviame">
        <NuxtLink :class="sectionLink" to="/sluzby">
          Viac o službách
          <span :class="sectionLinkIcon"><IconArrow /></span>
        </NuxtLink>
      </SectionHead>

      <div ref="gridEl" :class="[grid, { in: gridIn }]">
        <div v-for="service in SERVICES" :key="service.title" :class="fadeIn({ delay: service.delay })">
          <ServiceCard :device="service.device" :title="service.title" :text="service.text" />
        </div>
      </div>

      <div ref="bandEl" :class="[fadeIn(), { in: bandIn }]">
        <CtaBand title="Ceny na rovinu" cta-label="Pozrieť cenník" cta-href="/cennik">
          Orientačný cenník máme verejný a pre prvých klientov teraz platia <span :class="clayBadge">uvádzacie ceny</span>
        </CtaBand>
      </div>
    </div>
  </section>
</template>
