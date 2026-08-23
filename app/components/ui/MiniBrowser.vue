<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Náhľadové okno projektu — vizuálne pripomína natívne okno prehliadača v macOS. */
withDefaults(defineProps<{
  /** Doména projektu vykreslená v adresnom riadku. */
  url: string
  /** Semafor sa správa ako na Macu: glyfy na hover, červené × zatvára. */
  macControls?: boolean
}>(), { macControls: false })

defineEmits<{ close: [] }>()

const mini = css({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'card',
  border: '1px solid',
  borderColor: 'ink/12',
  borderRadius: '12px 12px 0 0',
  boxShadow: 'window',
  // drží tónovanú hlavičku vo vnútri zaoblených rohov
  overflow: 'hidden',
})
</script>

<template>
  <div :class="mini">
    <BrowserBar :url="url" :mac-controls="macControls" @close="$emit('close')" />
    <slot />
  </div>
</template>
