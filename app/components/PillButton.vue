<script setup lang="ts">
import { cva } from '~~/styled-system/css'

const props = defineProps<{
  /** Cieľ odkazu. Dočasne „#", kým nepribudnú stránky Projekty a Kontakt. */
  to: string
  variant: 'solid' | 'ghost'
  /** Zobrazí šípku vpravo od textu. */
  arrow?: boolean
}>()

const pill = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '11px',
    height: '56px',
    paddingInline: '32px',
    borderRadius: '999px',
    fontSize: '16px',
    fontWeight: 600,
  },
  variants: {
    variant: {
      solid: {
        background: 'ink',
        color: 'paper',
        transition: 'background 0.3s ease, color 0.3s ease',
        _hover: { background: 'accent', color: 'darkBg' },
      },
      ghost: {
        border: '1px solid',
        borderColor: 'hair',
        color: 'ink',
        transition: 'border-color 0.3s ease, background 0.3s ease',
        _hover: { borderColor: 'accent', background: 'accentWash' },
      },
    },
  },
})
</script>

<template>
  <NuxtLink :to="to" :class="pill({ variant: props.variant })">
    <slot />
    <svg
      v-if="arrow"
      width="15"
      height="15"
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
  </NuxtLink>
</template>
