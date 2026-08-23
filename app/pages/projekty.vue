<script setup lang="ts">
useSeoMeta({
  title: 'Projekty — Daktus',
  description: 'Vybraná práca štúdia Daktus. Radšej menej projektov do hĺbky než stena náhľadov — každý staviame, ako keby bol náš vlastný.',
})
</script>

<template>
  <main :class="wrap">
    <PageHead
      eyebrow="Projekty"
      title="Vybraná práca"
      note="Radšej menej projektov do hĺbky než stena náhľadov. Každý staviame, ako keby bol náš vlastný."
    />

    <div>
      <ProjectFeature
        name="Pauli Fotografka"
        tagline="Rodinná a lifestyle fotografka, Galanta"
        brief="Portfólio, ktoré pôsobí rovnako jemne ako jej fotografie, a rezervácie fotenia bez dlhého písania správ."
        solution="Elegantný web s galériami podľa kategórií a jednoduchou rezerváciou termínu. Klientky si vyberú fotenie za pár minút."
        tone="blush"
        :chips="[{ label: 'Webstránka' }, { label: 'Galérie a rezervácie' }, { label: 'Naživo', accent: true }]"
      >
        <MockupPauli />
      </ProjectFeature>

      <ProjectFeature
        name="Aditrade"
        tagline="Špecialisti na nadrozmernú prepravu v EÚ"
        brief="Web, ktorý pôsobí dôveryhodne pre veľkých partnerov a jasne vysvetlí služby sprievodov nadrozmerných nákladov."
        solution="Prehľadná prezentácia služieb, referencie a rýchly dopytový formulár. Nový web štartuje v týchto dňoch."
        tone="steel"
        flip
        :chips="[{ label: 'Webstránka' }, { label: 'Firemná prezentácia' }, { label: 'Pred spustením', accent: true }]"
      >
        <MockupAditrade />
      </ProjectFeature>

      <ProjectFeature
        name="Daktus"
        tagline="Vlastný web štúdia"
        brief="Vizitka štúdia, ktorá nepredáva cudzie logá, ale remeslo samotné."
        solution="Web, ktorý sa návštevníkovi postaví pred očami. Presne tak, ako staviame projekty klientom."
        tone="paper"
        :chips="[{ label: 'Webstránka' }, { label: 'Vlastný projekt', accent: true }]"
      >
        <MockupDaktus />
      </ProjectFeature>
    </div>

    <div :class="pageBottom">
      <CtaBand title="Váš projekt môže byť ďalší" cta-label="Napíšme si" cta-href="/kontakt">
        Napíšte nám o svojom zámere. Ozveme sa do 24 hodín.
      </CtaBand>
    </div>
  </main>
</template>
