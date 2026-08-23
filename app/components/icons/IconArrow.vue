<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 15 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12 12 4M5.5 4H12v6.5" />
  </svg>
</template>
