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
        <a :class="sectionLink" href="/projekty">
          Všetky projekty
          <span :class="sectionLinkIcon"><IconArrow /></span>
        </a>
      </SectionHead>
      <div :class="grid">
        <ProjectCard :project="PAULI">
          <MockupPauli />
        </ProjectCard>
        <ProjectCard :project="ADITRADE">
          <MockupAditrade />
        </ProjectCard>
      </div>
    </div>
  </section>
</template>
