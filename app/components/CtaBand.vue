<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  title: string
  ctaLabel: string
  ctaHref: string
}>()

const band = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '34px',
  flexWrap: 'wrap',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: '18px',
  background: 'card',
  padding: 'clamp(28px, 3.4vw, 48px) clamp(26px, 3vw, 52px)',
  marginTop: '54px',
})

const bandTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(22px, 2.2vw, 34px)',
  letterSpacing: '-0.015em',
  textTransform: 'uppercase',
  lineHeight: 1.12,
})

const bandNote = css({
  fontSize: '15px',
  color: 'dim',
  marginTop: '8px',
})
</script>

<template>
  <div :class="band">
    <div>
      <div :class="bandTitle">{{ title }}</div>
      <div :class="bandNote">
        <slot />
      </div>
    </div>
    <AppButton v-magnet :href="ctaHref" arrow>
      {{ ctaLabel }}
    </AppButton>
  </div>
</template>
