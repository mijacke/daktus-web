<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'
import type { ServiceDeviceName } from '~/components/service/ServiceCard.vue'

useSeoMeta({
  title: 'Služby — Daktus',
  description: 'Od jednostránkového webu po systém, na ktorom stojí celá firma. Weby, softvér na mieru, desktopové a mobilné aplikácie — dizajn aj vývoj pod jednou strechou.',
})

interface Service {
  glyph: ClayGlyphName
  device: ServiceDeviceName
  title: string
  description: string
  audience: string
  features: string[]
  firstWeek: string
}

const WEBY: Service = {
  glyph: 'globus',
  device: 'browser',
  title: 'Tvorba webstránok',
  description: 'Prezentačné weby, landing pages a e‑shopy stavané na mieru vašej značke. Rýchle, prístupné a pripravené predávať od prvého dňa.',
  audience: 'Pre firmy a živnostníkov, ktorí chcú, aby web zákazky nosil a nie len existoval.',
  features: ['Dizajn na mieru, žiadna šablóna', 'Rýchlosť a SEO základ v cene', 'Jednoduchá správa obsahu', 'Meranie návštevnosti od spustenia'],
  firstWeek: 'Prvá skica domovskej stránky a jasný plán, čo bude kedy hotové.',
}

const SOFTVER: Service = {
  glyph: 'zatvorky',
  device: 'code',
  title: 'Vývoj softvéru',
  description: 'CRM, rezervačné systémy, interné nástroje a automatizácia presne podľa vašich procesov. Pre firmy, ktorým tabuľky už nestačia.',
  audience: 'Pre tímy, ktoré strácajú hodiny ručným prepisovaním a hľadaním v tabuľkách.',
  features: ['Analýza procesov pred vývojom', 'API a integrácie na vaše nástroje', 'Bezpečnosť a zálohovanie', 'Zaškolenie tímu v cene'],
  firstWeek: 'Zmapované procesy a návrh riešenia, ktorému rozumie šéf aj účtovníčka.',
}

const DESKTOP: Service = {
  glyph: 'monitor',
  device: 'desktop',
  title: 'Desktopové aplikácie',
  description: 'Aplikácie pre Windows a macOS, ktoré zvládnu aj prácu offline. Pre prevádzky, sklady a všade tam, kde prehliadač nestačí.',
  audience: 'Pre prevádzky a dielne, kde sa pracuje aj bez internetu a na jednom stroji celé roky.',
  features: ['Windows aj macOS', 'Práca offline so synchronizáciou', 'Automatické aktualizácie', 'Napojenie na tlačiarne a čítačky'],
  firstWeek: 'Klikateľný návrh obrazoviek a zoznam funkcií zoradený podľa priorít.',
}

const MOBIL: Service = {
  glyph: 'telefon',
  device: 'phone',
  title: 'Mobilné aplikácie',
  description: 'iOS a Android appky od prvého wireframu po publikovanie v App Store a Google Play. Jeden tím, žiadne odovzdávanie medzi agentúrami.',
  audience: 'Pre značky a služby, ktoré chcú byť zákazníkovi na dosah priamo vo vrecku.',
  features: ['Návrh, vývoj aj publikovanie', 'Push notifikácie a analytika', 'Aktualizácie a dlhodobá podpora'],
  firstWeek: 'Wireframe hlavných obrazoviek a odhad, kedy bude appka v obchodoch.',
}

const noteAccent = css({
  color: 'accent.deep',
  fontWeight: 600,
})
</script>

<template>
  <main>
    <div :class="wrap">
      <PageHead
        eyebrow="Služby"
        title="Čo staviame"
        note="Od jednostránkového webu po systém, na ktorom stojí celá firma. Dizajn aj vývoj pod jednou strechou."
      />
      <ServiceFeature v-bind="WEBY" />
    </div>

    <ServiceDarkBand>
      <div :class="wrap">
        <ServiceFeature v-bind="SOFTVER" flip dark />
      </div>
    </ServiceDarkBand>

    <div :class="wrap">
      <ServiceFeature v-bind="DESKTOP" />
      <ServiceFeature v-bind="MOBIL" flip />
      <ServiceExtras />
      <div :class="pageBottom">
        <CtaBand title="Koľko to stojí?" cta-label="Pozrieť cenník" cta-href="/cennik">
          Orientačné ceny máme zverejnené. Na všetky balíky teraz <span :class="noteAccent">úvodná zľava 25&nbsp;%</span>.
        </CtaBand>
      </div>
    </div>
  </main>
</template>
