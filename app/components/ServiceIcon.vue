<script lang="ts">
export type ServiceIconName = 'web' | 'software' | 'desktop' | 'mobile'
</script>

<script setup lang="ts">
withDefaults(defineProps<{ name: ServiceIconName, size?: number }>(), { size: 24 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'web'">
      <rect x="2.5" y="4" width="19" height="15" rx="2.5" />
      <path d="M2.5 9h19M6 6.6h.01M8.6 6.6h.01" />
    </template>
    <template v-else-if="name === 'software'">
      <path d="M8.5 8 5 12l3.5 4M15.5 8 19 12l-3.5 4M13 5.5 11 18.5" />
    </template>
    <template v-else-if="name === 'desktop'">
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M9 21h6M12 17v4" />
    </template>
    <template v-else>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </template>
  </svg>
</template>
