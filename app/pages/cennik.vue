<script setup lang="ts">
import { css } from '~~/styled-system/css'

useSeoMeta({
  title: 'Cenník — Daktus',
  description: 'Ceny na rovinu. Orientačné sumy hneď, presná ponuka do 48 hodín — webstránky, e‑shopy aj softvér na mieru.',
})

const HEAD_NOTE = 'Žiadne „cena na vyžiadanie“. Orientačné sumy hneď, presná ponuka do 48 hodín.'

const PACKAGES = [
  {
    tag: 'balík / web',
    title: 'Webstránka',
    price: '900 €',
    was: '1 200 €',
    note: 'Dodanie 3 až 4 týždne',
    features: [
      'Dizajn na mieru, žiadna šablóna',
      'Rýchlosť a SEO základ v cene',
      'Texty doladíme spolu',
      'Mesiac podpory po spustení',
    ],
    ctaLabel: 'Chcem web',
  },
  {
    tag: 'balík / e-shop',
    title: 'E‑shop',
    price: '1 800 €',
    was: '2 400 €',
    note: 'Dodanie 4 až 6 týždňov',
    features: [
      'Katalóg, košík a platby (Stripe / GoPay)',
      'Správa produktov bez programátora',
      'Napojenie na dopravu a faktúry',
      'Mesiac podpory po spustení',
    ],
    ctaLabel: 'Chcem e‑shop',
  },
  {
    tag: 'balík / softvér',
    title: 'Softvér & appky',
    price: '3 675 €',
    was: '4 900 €',
    note: 'Podľa rozsahu, odhad vopred',
    features: [
      'CRM systémy, rezervácie a interné nástroje',
      'Mobilné a desktopové aplikácie',
      'Klikateľný prototyp pred vývojom',
      'Dlhodobý rozvoj a podpora',
    ],
    ctaLabel: 'Chcem konzultáciu',
  },
]

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  marginTop: '20px',
  '@media (max-width: 960px)': { gridTemplateColumns: '1fr', maxWidth: '620px' },
})

const priceNote = css({
  fontSize: '14px',
  color: 'dim',
  marginTop: '28px',
})
</script>

<template>
  <main :class="wrap">
    <PageHead
      eyebrow="Cenník"
      title="Férovo a na rovinu"
      :note="HEAD_NOTE"
    />

    <div :class="grid">
      <PriceCard
        v-for="pkg in PACKAGES"
        :key="pkg.title"
        :tag="pkg.tag"
        :title="pkg.title"
        :price="pkg.price"
        :was="pkg.was"
        :note="pkg.note"
        :features="pkg.features"
        :cta-label="pkg.ctaLabel"
      />
    </div>

    <p :class="priceNote">
      Ceny sú orientačné a závisia od rozsahu. Po krátkom hovore pošleme presnú ponuku do 48 hodín,
      bez skrytých položiek. Úvodná zľava 25&nbsp;% platí pre projekty potvrdené v roku 2026.
    </p>

    <div :class="pageBottom">
      <CtaBand title="Neviete, ktorý balík je váš?" cta-label="Napíšme si" cta-href="/kontakt">
        Napíšte nám pár viet o projekte a poradíme vám zadarmo.
      </CtaBand>
    </div>
  </main>
</template>
