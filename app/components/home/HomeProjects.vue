<script setup lang="ts">
import { cva } from '~~/styled-system/css'

const active = ref<number | null>(null)
const gridEl = ref<HTMLElement | null>(null)

const stateFor = (index: number) =>
  active.value === null ? 'idle' : active.value === index ? 'active' : 'dimmed'

const select = (index: number) => {
  active.value = active.value === index ? null : index
}

const onDocClick = (event: MouseEvent) => {
  if (active.value === null) return
  // composedPath namiesto contains(target): pri reálnom kliku Vue stihne
  // prerenderovať uprostred bublania a target (štít karty) je už odpojený z DOM
  if (gridEl.value && !event.composedPath().includes(gridEl.value)) active.value = null
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

// Výber karty animuje priamo fr stĺpce gridu — aktívna výrazne narastie,
// druhá klesne na polovicu svojej šírky a uhne nabok.
const grid = cva({
  base: {
    display: 'grid',
    gap: '34px',
    marginTop: '60px',
    transition: 'grid-template-columns 0.7s {easings.out}',
    '@media (max-width: 860px)': { gridTemplateColumns: '1fr !important' },
  },
  variants: {
    focus: {
      none: { gridTemplateColumns: '1.15fr 0.85fr' },
      first: { gridTemplateColumns: '1.575fr 0.425fr' },
      second: { gridTemplateColumns: '0.575fr 1.425fr' },
    },
  },
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
      <div
        ref="gridEl"
        :class="grid({ focus: active === null ? 'none' : active === 0 ? 'first' : 'second' })"
      >
        <ProjectCard
          name="Pauli Fotografka"
          description="Portfólio a rezervácie pre rodinnú fotografku"
          tone="blush"
          :chips="[{ label: 'Webstránka' }, { label: 'Naživo', accent: true }]"
          :state="stateFor(0)"
          @select="select(0)"
        >
          <LivePreview
            src="https://www.paulifotografka.sk/"
            domain="paulifotografka.sk"
            :expanded="active === 0"
          />
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
