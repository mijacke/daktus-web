<script setup lang="ts">
import { css } from '~~/styled-system/css'

const grid = css({
  display: 'grid',
  gridTemplateColumns: '1.15fr 0.85fr',
  gap: '34px',
  marginTop: '60px',
  '@media (max-width: 860px)': { gridTemplateColumns: '1fr' },
})
</script>

<template>
  <section id="projekty" :class="sectionBlock">
    <div :class="wrap">
      <SectionHead eyebrow="Projekty" title="Vybraná práca">
        <NuxtLink :class="sectionLink" to="/projekty">
          Všetky projekty
          <span :class="sectionLinkIcon"><IconArrow /></span>
        </NuxtLink>
      </SectionHead>
      <div :class="grid">
        <ProjectCard
          name="Pauli Fotografka"
          description="Portfólio a rezervácie pre rodinnú fotografku"
          tone="blush"
          :chips="[{ label: 'Webstránka' }, { label: 'Naživo', accent: true }]"
        >
          <MockupPauli />
        </ProjectCard>
        <ProjectCard
          name="Aditrade"
          description="Web pre špecialistov na nadrozmernú prepravu"
          tone="steel"
          :chips="[{ label: 'Webstránka' }, { label: 'Pred spustením', accent: true }]"
        >
          <MockupAditrade />
        </ProjectCard>
      </div>
    </div>
  </section>
</template>
