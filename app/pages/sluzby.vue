<script setup lang="ts">
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'
import type { FeatureDeviceName } from '~/components/service/ServiceFeature.vue'

useSeoMeta({
  title: 'Služby — Daktus',
  description: 'Od jednostránkového webu po B2B systém, na ktorom stojí celá firma. Weby, softvér na mieru, desktopové a mobilné aplikácie. Automatizácia a AI, dizajn aj vývoj pod jednou strechou.',
})

interface Service {
  glyph: ClayGlyphName
  device: FeatureDeviceName
  title: string
  description: string
  audience: string
  features: string[]
  firstWeek: string
}

const WEBY: Service = {
  glyph: 'okno',
  device: 'browser',
  title: 'Tvorba webstránok',
  description: 'Prezentačné weby, landing pages a e‑shopy stavané na mieru vašej značke. Rýchle, prístupné a pripravené predávať od prvého dňa.',
  audience: 'Pre firmy a živnostníkov, ktorí chcú, aby web zákazky nosil a nie len existoval.',
  features: ['Dizajn na mieru, žiadna šablóna', 'Rýchlosť a SEO základ v cene', 'Jednoduchá správa obsahu', 'Meranie návštevnosti od spustenia'],
  firstWeek: 'Prvá skica domovskej stránky a jasný plán, čo bude kedy hotové.',
}

const SOFTVER: Service = {
  glyph: 'vrstvy',
  device: 'code',
  title: 'Vývoj softvéru',
  description: 'B2B riešenia na mieru: CRM, rezervačné systémy, interné nástroje a automatizácia podľa vašich procesov. Kde to dáva zmysel, zapriahneme aj AI.',
  audience: 'Pre tímy, ktoré strácajú hodiny ručným prepisovaním a hľadaním v tabuľkách.',
  features: ['Analýza procesov pred vývojom', 'API a integrácie na vaše nástroje', 'AI tam, kde reálne šetrí čas', 'Bezpečnosť a zálohovanie', 'Zaškolenie tímu v cene'],
  firstWeek: 'Zmapované procesy a návrh riešenia, ktorému rozumie šéf aj účtovníčka.',
}

const AI: Service = {
  glyph: 'blesk',
  device: 'chat',
  title: 'AI a automatizácia',
  description: 'AI agenti, chatboty a automatizácia rutiny: dopyty, faktúry, dokumenty aj zákaznícka podpora. Prepojené na systémy, ktoré už používate.',
  audience: 'Pre firmy, kde rutina žerie hodiny a ľudia majú robiť prácu s hodnotou.',
  features: ['Audit procesov a návrh využitia AI', 'Chatboty a AI agenti na mieru', 'Automatické spracovanie dopytov a faktúr', 'Prepojenie na vaše nástroje a dáta'],
  firstWeek: 'Zoznam automatizácií zoradený podľa návratnosti a ponuka do 24 hodín.',
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

</script>

<template>
  <main>
    <div :class="wrap">
      <PageHead
        eyebrow="Služby"
        title="Čo staviame"
        note="Od jednostránkového webu po B2B systém, na ktorom stojí celá firma. Zľahčujeme firmám prácu, aj s pomocou AI."
      />
      <ServiceFeature v-bind="WEBY" flip />
    </div>

    <ServiceDarkBand>
      <div :class="wrap">
        <ServiceFeature v-bind="SOFTVER" dark />
      </div>
    </ServiceDarkBand>

    <div :class="wrap">
      <ServiceFeature v-bind="AI" flip />
    </div>

    <ServiceDarkBand>
      <div :class="wrap">
        <ServiceFeature v-bind="MOBIL" dark />
      </div>
    </ServiceDarkBand>

    <div :class="wrap">
      <ServiceFeature v-bind="DESKTOP" flip />
      <ServiceExtras />
      <div :class="pageBottom">
        <CtaBand title="Koľko to stojí?" cta-label="Pozrieť cenník" cta-href="/cennik">
          Orientačné ceny máme zverejnené a na všetky balíky teraz platí <span :class="clayBadge">úvodná zľava 25&nbsp;%</span>
        </CtaBand>
      </div>
    </div>
  </main>
</template>
