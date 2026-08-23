<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  title?: string
  /** Doplnkový údaj vpravo v hlavičke panela, napr. počet podstránok. */
  meta?: string
}>()

const panel = css({
  border: '1px solid',
  borderColor: 'dark.fg/10',
  borderRadius: '12px',
  background: 'dark.panel2',
  padding: '18px',
})

const heading = css({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: '12px',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.dim',
  marginBottom: '14px',
})

const metaText = css({
  fontWeight: 400,
  letterSpacing: '0.04em',
  textTransform: 'none',
  opacity: 0.7,
})
</script>

<template>
  <div :class="panel">
    <div v-if="title" :class="heading">
      <span>{{ title }}</span>
      <span v-if="meta" :class="metaText">{{ meta }}</span>
    </div>
    <slot />
  </div>
</template>
