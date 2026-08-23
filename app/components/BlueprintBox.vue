<script setup lang="ts">
import { sva } from '~~/styled-system/css'

const props = defineProps<{
  /** Popisok drôtenej kostry, napr. „nadpis / h1". */
  label: string
  /** Keď je true, kostra zmizne a obsah sa vykreslí. */
  built: boolean
}>()

const blueprint = sva({
  slots: ['box', 'tag', 'content'],
  base: {
    box: {
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        inset: '-10px',
        border: '1.5px dashed',
        borderColor: 'blueprintLine',
        borderRadius: '10px',
        background: 'blueprintFill',
        opacity: 1,
        transition: 'opacity 0.6s ease 0.15s',
        pointerEvents: 'none',
        _motionReduce: { opacity: 0, transition: 'none' },
      },
    },
    tag: {
      position: 'absolute',
      top: '-19px',
      left: '2px',
      zIndex: 3,
      paddingInline: '7px',
      background: 'paper',
      color: 'dim',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      opacity: 1,
      transition: 'opacity 0.4s ease',
      pointerEvents: 'none',
      _motionReduce: { opacity: 0, transition: 'none' },
    },
    content: {
      opacity: 0,
      transform: 'translateY(12px)',
      transitionProperty: 'opacity, transform',
      transitionDuration: '0.8s',
      transitionTimingFunction: 'smooth',
      _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
    },
  },
  variants: {
    built: {
      true: {
        box: { _after: { opacity: 0 } },
        tag: { opacity: 0 },
        content: { opacity: 1, transform: 'none' },
      },
    },
  },
})

const styles = computed(() => blueprint({ built: props.built }))
</script>

<template>
  <div :class="styles.box">
    <span :class="styles.tag" aria-hidden="true">{{ label }}</span>
    <div :class="styles.content">
      <slot />
    </div>
  </div>
</template>
