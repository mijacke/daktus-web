<script setup lang="ts">
useSeoMeta({
  title: 'Projekty — Daktus',
  description: 'Vybraná práca štúdia Daktus. Menej projektov, viac remesla. Každý staviame do hĺbky, ako keby bol náš vlastný.',
})

const listEl = ref<HTMLElement | null>(null)
const { active, select, clear } = useCardFocus(listEl)

const stateFor = (index: number) => (active.value === index ? 'active' : 'idle')

/** Pokoj = MacBook, rozbalený projekt = iMac. Mobilná verzia sa tu nepoužíva. */
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
        tagline="Špecialisti na nadrozmernú prepravu v EÚ"
        brief="Web, ktorý pôsobí dôveryhodne pre veľkých partnerov a jasne vysvetlí služby sprievodov nadrozmerných nákladov."
        solution="Prehľadná prezentácia služieb, referencie a rýchly dopytový formulár. Nový web štartuje v týchto dňoch."
        tone="navy"
        flip
        :state="stateFor(1)"
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
