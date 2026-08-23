<script setup lang="ts">
import { cva } from '~~/styled-system/css'

withDefaults(defineProps<{ accent?: boolean }>(), { accent: false })

const chip = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '30px',
    paddingInline: '14px',
    borderRadius: 'full',
    border: '1px solid',
    borderColor: 'hairline',
    fontSize: '13px',
    fontWeight: 500,
    color: 'dim',
    whiteSpace: 'nowrap',
  },
  variants: {
    accent: {
      true: {
        borderColor: 'accent/55',
        color: 'accent.deep',
        background: 'accent/8',
      },
    },
  },
})
</script>

<template>
  <span :class="chip({ accent })"><slot /></span>
</template>
