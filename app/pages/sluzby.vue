<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

useSeoMeta({
  title: 'Služby — Daktus',
  description: 'Od jednostránkového webu po systém, na ktorom stojí celá firma. Weby, softvér na mieru, desktopové a mobilné aplikácie — dizajn aj vývoj pod jednou strechou.',
})

interface Service {
  glyph: ClayGlyphName
  title: string
  description: string
  chips: string[]
  features: string[]
}

const SERVICES: Service[] = [
  {
    glyph: 'globus',
    title: 'Tvorba webstránok',
    description: 'Prezentačné weby, landing pages a e‑shopy, ktoré predávajú. Rýchle, prístupné a stavané presne na mieru vašej značke.',
    chips: ['Next.js', 'React', 'WordPress'],
    features: ['Dizajn na mieru, žiadna šablóna', 'Rýchlosť a SEO základ v cene', 'Jednoduchá správa obsahu'],
  },
  {
    glyph: 'zatvorky',
    title: 'Vývoj softvéru',
    description: 'CRM, rezervačné systémy, interné nástroje a automatizácia presne podľa vašich procesov. Pre firmy, ktorým tabuľky už nestačia.',
    chips: ['Node.js', '.NET', 'Java', 'PostgreSQL'],
    features: ['Analýza procesov pred vývojom', 'API a integrácie na vaše nástroje', 'Bezpečnosť a zálohovanie'],
  },
  {
    glyph: 'monitor',
    title: 'Desktopové aplikácie',
    description: 'Aplikácie pre Windows a macOS, ktoré zvládnu aj prácu offline. Pre prevádzky, sklady a všade, kde prehliadač nestačí.',
    chips: ['C#', '.NET', 'Java'],
    features: ['Windows aj macOS', 'Práca offline so synchronizáciou', 'Automatické aktualizácie'],
  },
  {
    glyph: 'telefon',
    title: 'Mobilné aplikácie',
    description: 'iOS a Android appky od prvého wireframu po publikovanie v App Store a Google Play. Jeden tím, žiadne odovzdávanie.',
    chips: ['iOS', 'Android'],
    features: ['Návrh, vývoj aj publikovanie', 'Push notifikácie a analytika', 'Aktualizácie a dlhodobá podpora'],
  },
]

const noteAccent = css({
  color: 'accent.deep',
  fontWeight: 600,
})
</script>

<template>
  <main :class="wrap">
    <PageHead
      eyebrow="Služby"
      title="Čo staviame"
      note="Od jednostránkového webu po systém, na ktorom stojí celá firma. Dizajn aj vývoj pod jednou strechou."
    />

    <div>
      <ServiceRow
        v-for="service in SERVICES"
        :key="service.title"
        :glyph="service.glyph"
        :title="service.title"
        :description="service.description"
        :chips="service.chips"
        :features="service.features"
      />
    </div>

    <div :class="pageBottom">
      <CtaBand title="Koľko to stojí?" cta-label="Pozrieť cenník" cta-href="/cennik">
        Orientačné ceny máme zverejnené. Na všetky balíky teraz <span :class="noteAccent">úvodná zľava 25&nbsp;%</span>.
      </CtaBand>
    </div>
  </main>
</template>
