<script setup lang="ts">
useSeoMeta({
  title: 'Projekty — Daktus',
  description: 'Vybraná práca štúdia Daktus. Menej projektov, viac remesla. Každý staviame do hĺbky, ako keby bol náš vlastný.',
})

const listEl = ref<HTMLElement | null>(null)
// rozbaľovanie až od dvoch stĺpcov — pod 900px je riadok jednostĺpcový (ProjectFeature)
const { active, select, clear, enabled } = useCardFocus(listEl, '(min-width: 901px)')

const stateFor = (index: number) => (active.value === index ? 'active' : 'idle')

/**
 * Pokoj = MacBook, rozbalený projekt = iMac. Na mobile sa karta nerozbaľuje,
 * takže tam ostáva vždy MacBook.
 */
const deviceFor = (index: number) => (active.value === index ? 'imac' : 'mac')
</script>

<template>
  <main :class="wrap">
    <PageHead
      eyebrow="Projekty"
      title="Vybraná práca"
      note="Menej projektov, viac remesla. Každý staviame do hĺbky, ako keby bol náš vlastný."
    />

    <div ref="listEl">
      <ProjectFeature
        name="Pauli Fotografka"
        tagline="Rodinná a lifestyle fotografka, Galanta"
        brief="Portfólio, ktoré pôsobí rovnako jemne ako jej fotografie, a rezervácie fotenia bez dlhého písania správ."
        solution="Elegantný web s galériami podľa kategórií a jednoduchou rezerváciou termínu. Klientky si vyberú fotenie za pár minút."
        tone="blush"
        :state="stateFor(0)"
        :selectable="enabled"
        @select="select(0)"
      >
        <LivePreview
          src="https://www.paulifotografka.sk/"
          domain="paulifotografka.sk"
          :device="deviceFor(0)"
          @close="clear"
        />
      </ProjectFeature>

      <ProjectFeature
        name="Aditrade"
        badge="Koncept"
        tagline="Návrh webu pre špecialistov na nadrozmernú prepravu"
        brief="Ukázať, ako by mohol vyzerať web firmy, ktorá sprevádza nadrozmerné náklady po Európe a potrebuje pôsobiť dôveryhodne aj pre veľkých partnerov."
        solution="Koncept, ktorý sme pripravili z vlastnej iniciatívy. Prehľadná prezentácia služieb, referencie a rýchly dopytový formulár. Zatiaľ nie je nasadený."
        tone="navy"
        flip
        :state="stateFor(1)"
        :selectable="enabled"
        @select="select(1)"
      >
        <LivePreview
          src="/nahlad/aditrade/"
          domain="aditrade.sk"
          :device="deviceFor(1)"
          dark
          @close="clear"
        />
      </ProjectFeature>

      <ProjectFeature
        name="Daktus"
        tagline="Vlastný web štúdia"
        brief="Vizitka štúdia, ktorá nepredáva cudzie logá, ale remeslo samotné."
        solution="Web, ktorý sa návštevníkovi postaví pred očami. Presne tak, ako staviame projekty klientom."
        tone="mint"
        :state="stateFor(2)"
        :selectable="enabled"
        @select="select(2)"
      >
        <LivePreview
          src="/"
          domain="daktus.sk"
          :device="deviceFor(2)"
          @close="clear"
        />
      </ProjectFeature>
    </div>

    <div :class="pageBottom">
      <CtaBand title="Váš projekt môže byť ďalší" cta-label="Napíšme si" cta-href="/kontakt">
        Napíšte nám o svojom zámere. Ozveme sa do 24 hodín.
      </CtaBand>
    </div>
  </main>
</template>
