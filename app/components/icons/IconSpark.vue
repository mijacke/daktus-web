<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 12 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0c.6 4.4 3 6.9 8 8-5 1.1-7.4 3.6-8 8-.6-4.4-3-6.9-8-8 5-1.1 7.4-3.6 8-8z" />
  </svg>
</template>
