<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{ title?: string }>()

const panel = css({
  border: '1px solid',
  borderColor: 'dark.fg/10',
  borderRadius: '12px',
  background: 'dark.panel2',
  padding: '18px',
})

const heading = css({
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.dim',
  marginBottom: '14px',
})
</script>

<template>
  <div :class="panel">
    <div v-if="title" :class="heading">{{ title }}</div>
    <slot />
  </div>
</template>
