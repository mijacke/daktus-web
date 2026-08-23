<script setup lang="ts">
import { css } from '~~/styled-system/css'

withDefaults(defineProps<{ size?: number }>(), { size: 26 })

// driek dedí farbu textu (preklápa sa nad tmavými sekciami), bruško drží akcent
const bowl = css({ fill: 'accent' })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
    <path d="M12 6 H19.5 A2.5 2.5 0 0 1 22 8.5 V55.5 A2.5 2.5 0 0 1 19.5 58 H12 A5 5 0 0 1 7 53 V11 A5 5 0 0 1 12 6 Z" />
    <path :class="bowl" d="M28 8.5 A2.5 2.5 0 0 1 30.5 6 H32.5 A24.5 26 0 0 1 32.5 58 H30.5 A2.5 2.5 0 0 1 28 55.5 V45.5 H32.5 A12 13.5 0 0 0 32.5 18.5 H28 Z" />
  </svg>
</template>
