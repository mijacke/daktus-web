<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  /** Popisok blueprint rámu, napr. „balík / web". */
  tag: string
  title: string
  price: string
  was: string
  note: string
  features: string[]
  ctaLabel: string
}>()

const root = ref<HTMLElement | null>(null)
const inView = useInView(root, { threshold: 0.15 })
const reduced = useReducedMotion()
const built = ref(false)
let timer = 0

watch(inView, (visible) => {
  if (!visible) return
  timer = window.setTimeout(() => (built.value = true), reduced.value ? 0 : 350)
})

onBeforeUnmount(() => clearTimeout(timer))

const card = css({
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: '18px',
  background: 'card',
  padding: '32px 30px 30px',
  transitionProperty: 'transform, box-shadow, border-color',
  transitionDuration: '0.5s',
  transitionTimingFunction: 'out',
  _hover: {
    transform: 'translateY(-6px)',
    boxShadow: 'card',
    borderColor: 'accent/50',
  },
})

const body = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '100%',
})

const badge = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '27px',
  paddingInline: '13px',
  borderRadius: 'full',
  background: 'accent/14',
  color: 'accent.deep',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '16px',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '25px',
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
  margin: 0,
})

const amount = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(36px, 2.6vw, 48px)',
  letterSpacing: '-0.02em',
  marginTop: '14px',
  '& small': {
    fontSize: '16px',
    fontWeight: 600,
    color: 'dim',
    letterSpacing: 0,
  },
})

const wasPrice = css({
  fontSize: '16px',
  fontWeight: 600,
  color: 'dim',
  textDecoration: 'line-through',
  letterSpacing: 0,
  marginLeft: '8px',
})

const noteText = css({
  fontSize: '14px',
  color: 'dim',
  marginTop: '4px',
})

const featureList = css({
  listStyle: 'none',
  padding: 0,
  margin: '24px 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const featureItem = css({
  display: 'flex',
  gap: '11px',
  alignItems: 'flex-start',
  fontSize: '15px',
  color: 'ink',
})

const featureIcon = css({
  display: 'inline-flex',
  flexShrink: 0,
  marginTop: '4px',
  color: 'accent.deep',
})

const cta = css({
  marginTop: '28px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '15px',
  fontWeight: 600,
  color: 'accent.deep',
})
</script>

<template>
  <div ref="root">
    <BlueprintFrame :class="card" :tag="tag" :built="built" :content-class="body">
      <span :class="badge">Úvodná zľava 25&nbsp;%</span>
      <h3 :class="heading">{{ title }}</h3>
      <div :class="amount"><small>od</small> {{ price }} <span :class="wasPrice">{{ was }}</span></div>
      <div :class="noteText">{{ note }}</div>
      <ul :class="featureList">
        <li v-for="feature in features" :key="feature" :class="featureItem">
          <span :class="featureIcon"><IconCheck /></span>{{ feature }}
        </li>
      </ul>
      <NuxtLink :class="cta" to="/kontakt">
        {{ ctaLabel }}
        <IconArrow :size="14" />
      </NuxtLink>
    </BlueprintFrame>
  </div>
</template>
