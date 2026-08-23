<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ServiceIconName } from '~/components/icons/ServiceIcon.vue'

interface Service {
  icon: ServiceIconName
  title: string
  text: string
  delay: 0 | 1 | 2 | 3
}

const SERVICES: Service[] = [
  {
    icon: 'web',
    title: 'Tvorba webstránok',
    text: 'Prezentačné weby, landing pages a e‑shopy. Rýchle, prístupné a stavané na mieru.',
    delay: 0,
  },
  {
    icon: 'software',
    title: 'Vývoj softvéru',
    text: 'CRM, rezervačné systémy a interné nástroje presne podľa vašich procesov.',
    delay: 1,
  },
  {
    icon: 'desktop',
    title: 'Desktopové aplikácie',
    text: 'Aplikácie pre Windows a macOS, ktoré zvládnu aj prácu offline.',
    delay: 2,
  },
  {
    icon: 'mobile',
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

const noteAccent = css({
  color: 'accent.deep',
  fontWeight: 600,
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
          <ServiceCard :icon="service.icon" :title="service.title" :text="service.text" />
        </div>
      </div>

      <div ref="bandEl" :class="[fadeIn(), { in: bandIn }]">
        <CtaBand title="Férový cenník bez tajností" cta-label="Pozrieť cenník" cta-href="/cennik">
          Orientačné ceny zverejnené. Na všetky balíky teraz <span :class="noteAccent">úvodná zľava 25&nbsp;%</span>.
        </CtaBand>
      </div>
    </div>
  </section>
</template>
