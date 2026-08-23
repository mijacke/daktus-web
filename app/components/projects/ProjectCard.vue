<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { Project } from '~/utils/projects'

defineProps<{ project: Project }>()

const card = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
})

const meta = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
})

const metaName = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '26px',
  letterSpacing: '-0.01em',
})

const metaNote = css({
  fontSize: '14.5px',
  color: 'dim',
  marginTop: '4px',
})

const chipRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
})
</script>

<template>
  <article :class="card">
    <ProjectCover :tone="project.tone">
      <slot />
    </ProjectCover>
    <div :class="meta">
      <div>
        <div :class="metaName">{{ project.name }}</div>
        <div :class="metaNote">{{ project.description }}</div>
      </div>
      <div :class="chipRow">
        <AppChip v-for="chip in project.chips" :key="chip.label" :accent="chip.accent">
          {{ chip.label }}
        </AppChip>
      </div>
    </div>
  </article>
</template>
