<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'
import type { ServiceIconName } from '~/components/icons/ServiceIcon.vue'

const props = defineProps<{
  icon: ServiceIconName
  title: string
  text: string
  /** Poradie karty — vykresľuje sa v rohu a určuje odstup postupného odkrytia. */
  index: 1 | 2 | 3 | 4
}>()

const numeral = computed(() => String(props.index).padStart(2, '0'))

/**
 * Karta rastie pod kurzorom cez `flex-grow` (nie šírku), aby súčet stĺpcov
 * ostal presne 100 % riadku. Pevná výška drží riadok pri preliatí textu.
 */
const card = cva({
  base: {
    flex: '1 1 0',
    minWidth: 0,
    height: '296px',
    display: 'flex',
    flexDirection: 'column',
    background: 'card',
    border: '1px solid',
    borderColor: 'hairline',
    borderRadius: '20px',
    padding: '28px 28px 26px',
    opacity: 0,
    transition: 'flex-grow 0.5s {easings.out}, background 0.3s {easings.out}, border-color 0.3s {easings.out}, box-shadow 0.3s {easings.out}',
    _hover: {
      background: 'card.lift',
      borderColor: 'accent/50',
      boxShadow: 'lift',
    },
    // expanzia len na presnom pointeri a v jednoriadkovej mriežke
    '@media (hover: hover) and (min-width: 1101px)': {
      _hover: { flexGrow: 1.65 },
    },
    '.in &': { animation: 'riseIn 0.7s {easings.out} forwards' },
    '@media (max-width: 1100px)': { flexBasis: 'calc(50% - 8px)' },
    '@media (max-width: 760px)': { flexBasis: '100%', height: 'auto', minHeight: '250px' },
    _motionReduce: { opacity: 1, animation: 'none', transition: 'none' },
  },
  variants: {
    index: {
      1: {},
      2: { animationDelay: '0.08s' },
      3: { animationDelay: '0.16s' },
      4: { animationDelay: '0.24s' },
    },
  },
})

const topRow = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
})

const iconBox = css({
  width: '42px',
  height: '42px',
  flex: 'none',
  borderRadius: '12px',
  background: 'accent/13',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'accent.deep',
})

const ordinal = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '44px',
  lineHeight: 1,
  letterSpacing: '-0.04em',
  color: 'paper2',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '20px',
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
  lineHeight: 1.15,
  // margin-top: auto tlačí nadpis aj popis k spodnej hrane karty
  margin: 'auto 0 10px',
})

const note = css({
  fontSize: '15px',
  lineHeight: 1.6,
  color: 'dim',
  margin: 0,
  textWrap: 'pretty',
})
</script>

<template>
  <article :class="card({ index })">
    <div :class="topRow">
      <div :class="iconBox">
        <ServiceIcon :name="icon" :size="20" />
      </div>
      <span :class="ordinal">{{ numeral }}</span>
    </div>
    <h3 :class="heading">{{ title }}</h3>
    <p :class="note">{{ text }}</p>
  </article>
</template>
