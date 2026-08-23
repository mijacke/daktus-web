<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ServiceIconName } from '~/components/icons/ServiceIcon.vue'

defineProps<{
  icon: ServiceIconName
  title: string
  description: string
  chips: string[]
  features: string[]
}>()

const row = css({
  display: 'grid',
  gridTemplateColumns: '72px 1.1fr 1fr',
  gap: 'clamp(24px, 3vw, 56px)',
  paddingBlock: 'clamp(40px, 6vh, 64px)',
  borderTop: '1px solid',
  borderColor: 'hairline',
  alignItems: 'start',
  '&:last-child': { borderBottom: '1px solid {colors.hairline}' },
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
})

const iconBox = css({
  width: '56px',
  height: '56px',
  borderRadius: '15px',
  background: 'accent/13',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'accent.deep',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(26px, 2.4vw, 38px)',
  letterSpacing: '-0.015em',
  textTransform: 'uppercase',
  margin: 0,
  lineHeight: 1.08,
})

const descText = css({
  fontSize: '15.5px',
  color: 'dim',
  margin: '14px 0 0',
  maxWidth: '54ch',
})

const chipRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: '22px',
})

const featureList = css({
  listStyle: 'none',
  padding: 0,
  margin: '6px 0 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

const featureItem = css({
  display: 'flex',
  gap: '11px',
  alignItems: 'flex-start',
  fontSize: '15px',
})

const featureIcon = css({
  display: 'inline-flex',
  flexShrink: 0,
  marginTop: '4px',
  color: 'accent.deep',
})
</script>

<template>
  <div :class="row">
    <div :class="iconBox">
      <ServiceIcon :name="icon" :size="26" />
    </div>
    <div>
      <h3 :class="heading">{{ title }}</h3>
      <p :class="descText">{{ description }}</p>
      <div :class="chipRow">
        <AppChip v-for="chip in chips" :key="chip">{{ chip }}</AppChip>
      </div>
    </div>
    <ul :class="featureList">
      <li v-for="feature in features" :key="feature" :class="featureItem">
        <span :class="featureIcon"><IconCheck /></span>{{ feature }}
      </li>
    </ul>
  </div>
</template>
