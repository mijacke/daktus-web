<script setup lang="ts">
import { cva } from '~~/styled-system/css'

const props = withDefaults(defineProps<{
  /** Interná routa — bez nej sa vyrenderuje <button> (napr. submit formulára). */
  href?: string
  type?: 'button' | 'submit'
  variant?: 'main' | 'ghost' | 'accent' | 'pill'
  arrow?: boolean
}>(), { href: undefined, type: 'button', variant: 'main', arrow: false })

const button = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '11px',
    borderRadius: 'full',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionProperty: 'background, color, border-color, box-shadow',
    transitionDuration: '0.3s',
  },
  variants: {
    variant: {
      main: {
        height: '56px',
        paddingInline: '32px',
        background: 'ink',
        color: 'paper',
        fontSize: '16px',
        _hover: { background: 'accent', color: 'dark.bg' },
      },
      ghost: {
        height: '56px',
        paddingInline: '32px',
        border: '1px solid',
        borderColor: 'hairline',
        color: 'ink',
        fontSize: '16px',
        _hover: { borderColor: 'accent', background: 'accent/8' },
      },
      accent: {
        height: '60px',
        paddingInline: '36px',
        gap: '12px',
        background: 'accent',
        color: 'dark.bg',
        fontSize: '16.5px',
        _hover: { boxShadow: 'glow' },
      },
      pill: {
        height: '46px',
        paddingInline: '24px',
        gap: '9px',
        background: 'ink',
        color: 'paper',
        fontSize: '15px',
        _hover: { background: 'accent', color: 'dark.bg' },
        // v navigácii nad tmavou sekciou sa pill inverzne prefarbí
        '.over-dark &': {
          background: 'dark.fg',
          color: 'dark.bg',
          _hover: { background: 'accent' },
        },
      },
    },
  },
})

const arrowSize = { main: 15, ghost: 15, accent: 16, pill: 14 }[props.variant]
</script>

<template>
  <NuxtLink v-if="href" :class="button({ variant })" :to="href">
    <slot />
    <IconArrow v-if="arrow" :size="arrowSize" />
  </NuxtLink>
  <button v-else :class="button({ variant })" :type="type">
    <slot />
    <IconArrow v-if="arrow" :size="arrowSize" />
  </button>
</template>
