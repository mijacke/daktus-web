<script setup lang="ts">
import { css } from '~~/styled-system/css'

const active = ref<number | null>(null)
const gridEl = ref<HTMLElement | null>(null)

const stateFor = (index: number) =>
  active.value === null ? 'idle' : active.value === index ? 'active' : 'dimmed'

const select = (index: number) => {
  active.value = active.value === index ? null : index
}

const onDocClick = (event: MouseEvent) => {
  if (active.value === null) return
  if (event.target instanceof Element && !gridEl.value?.contains(event.target)) active.value = null
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

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
      <div ref="gridEl" :class="grid">
        <ProjectCard
          name="Pauli Fotografka"
          description="Portfólio a rezervácie pre rodinnú fotografku"
          tone="blush"
          :chips="[{ label: 'Webstránka' }, { label: 'Naživo', accent: true }]"
          :state="stateFor(0)"
          @select="select(0)"
        >
          <MockupPauli />
        </ProjectCard>
        <ProjectCard
          name="Aditrade"
          description="Web pre špecialistov na nadrozmernú prepravu"
          tone="steel"
          :chips="[{ label: 'Webstránka' }, { label: 'Pred spustením', accent: true }]"
          :state="stateFor(1)"
          @select="select(1)"
        >
          <MockupAditrade />
        </ProjectCard>
      </div>
    </div>
  </section>
</template>
