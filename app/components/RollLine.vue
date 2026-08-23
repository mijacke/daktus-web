<script setup lang="ts">
import { sva } from '~~/styled-system/css'

const props = defineProps<{
  /** Poradie riadku — určuje oneskorenie nábehu. */
  step: 'first' | 'second' | 'third'
  /** Spustí vysunutie riadku zdola. */
  show: boolean
  /** Odsadenie riadku doprava. */
  indent?: boolean
  /** Text len obrysom, bez výplne. */
  outline?: boolean
}>()

const roll = sva({
  slots: ['mask', 'line'],
  base: {
    mask: { display: 'block', overflow: 'hidden' },
    line: {
      display: 'block',
      transform: 'translateY(118%)',
      transitionProperty: 'transform',
      transitionDuration: '1s',
      transitionTimingFunction: 'smooth',
      _motionReduce: { transform: 'none', transition: 'none' },
    },
  },
  variants: {
    step: {
      first: { line: { transitionDelay: '0.05s' } },
      second: { line: { transitionDelay: '0.16s' } },
      third: { line: { transitionDelay: '0.27s' } },
    },
    show: {
      true: { line: { transform: 'translateY(0)' } },
    },
    indent: {
      true: { mask: { marginLeft: 'clamp(40px, 8vw, 150px)' } },
    },
    outline: {
      true: { line: { color: 'transparent', WebkitTextStroke: '1.5px token(colors.ink)' } },
    },
  },
})

const styles = computed(() => roll({
  step: props.step,
  show: props.show,
  indent: props.indent,
  outline: props.outline,
}))
</script>

<template>
  <span :class="styles.mask">
    <span :class="styles.line"><slot /></span>
  </span>
</template>
