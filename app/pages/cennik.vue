<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

useSeoMeta({
  title: 'Cenník — Daktus',
  description: 'Ceny na rovinu. Orientačné sumy hneď, presná ponuka do 48 hodín — jednostránkový web, webstránky, e‑shopy aj softvér na mieru.',
})

const HEAD_NOTE = 'Žiadne „cena na vyžiadanie“. Orientačné sumy hneď, presná ponuka do 48 hodín.'

interface Package {
  glyph: ClayGlyphName
  tag: string
  title: string
  price: string
  was: string
  note: string
  features: string[]
  ctaLabel: string
}

const PACKAGES: Package[] = [
  {
    glyph: 'stranka',
    tag: 'balík / onepage',
    title: 'Jednostránkový web',
    price: '450 €',
    was: '600 €',
    note: 'Dodanie 1 až 2 týždne',
    features: [
      'Jedna stránka so všetkým podstatným',
      'Dizajn na mieru, žiadna šablóna',
      'Kontaktný formulár a mapa v cene',
      'Dlhodobá spolupráca aj po spustení',
    ],
    ctaLabel: 'Chcem onepage',
  },
  {
    glyph: 'kurzor',
    tag: 'balík / web',
    title: 'Webstránka',
    price: '900 €',
    was: '1 200 €',
    note: 'Dodanie 3 až 4 týždne',
    features: [
      'Dizajn na mieru, žiadna šablóna',
      'Rýchlosť a SEO základ v cene',
      'Texty doladíme spolu',
      'Dlhodobá spolupráca aj po spustení',
    ],
    ctaLabel: 'Chcem web',
  },
  {
    glyph: 'kosik',
    tag: 'balík / e-shop',
    title: 'E‑shop',
    price: '1 800 €',
    was: '2 400 €',
    note: 'Dodanie 4 až 6 týždňov',
    features: [
      'Katalóg, košík a platby (Stripe / GoPay)',
      'Správa produktov bez programátora',
      'Napojenie na dopravu a faktúry',
      'Dlhodobá spolupráca aj po spustení',
    ],
    ctaLabel: 'Chcem e‑shop',
  },
  {
    glyph: 'kocka',
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

/** Jedna clay nálepka nad mriežkou namiesto zľavového pilu na každej karte. */
const badgeLine = css({
  fontSize: '15px',
  color: 'dim',
  margin: '0 0 26px',
})

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  marginTop: '20px',
  '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr' },
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

    <p :class="badgeLine">
      Pre projekty potvrdené v roku 2026 teraz platia <span :class="clayBadge">uvádzacie ceny</span>
    </p>

    <div :class="grid">
      <PriceCard
        v-for="pkg in PACKAGES"
        :key="pkg.title"
        :glyph="pkg.glyph"
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
      Ceny sú orientačné a závisia od rozsahu. Po krátkom hovore pošleme presnú ponuku do 48 hodín.
    </p>

    <PriceExtras />

    <div :class="pageBottom">
      <CtaBand title="Neviete, ktorý balík je váš?" cta-label="Napíšme si" cta-href="/kontakt">
        Napíšte nám pár viet o projekte a poradíme vám zadarmo.
      </CtaBand>
    </div>
  </main>
</template>
