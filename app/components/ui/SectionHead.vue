<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  eyebrow: string
  title: string
}>()

const root = ref<HTMLElement | null>(null)
const inView = useInView(root)

const head = css({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: '30px',
  flexWrap: 'wrap',
  opacity: 0,
  transform: 'translateY(26px)',
  transition: 'opacity 0.9s ease, transform 0.9s {easings.out}',
  '&.in': { opacity: 1, transform: 'none' },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
})

const eyebrowRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
})

const dash = css({
  width: '26px',
  height: '2px',
  background: 'accent',
  flexShrink: 0,
})

const label = css({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'dim',
  '[data-dark] &': { color: 'dark.dim' },
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(38px, 4.4vw, 68px)',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  lineHeight: 1.02,
  margin: '18px 0 0',
  '[data-dark] &': { color: 'dark.fg' },
})

</script>

<template>
  <div ref="root" :class="[head, { in: inView }]">
    <div>
      <div :class="eyebrowRow">
        <span :class="dash" />
        <span :class="label">{{ eyebrow }}</span>
      </div>
      <h2 :class="heading">
        <span :class="revealLine"><span :class="revealInner()">{{ title }}</span></span>
      </h2>
    </div>
    <slot />
  </div>
</template>
