<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ServiceIconName } from '~/components/icons/ServiceIcon.vue'

defineProps<{
  icon: ServiceIconName
  title: string
  text: string
}>()

const card = css({
  height: '100%',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: '18px',
  background: 'card',
  padding: '30px 28px 32px',
  transitionProperty: 'transform, box-shadow, border-color',
  transitionDuration: '0.5s',
  transitionTimingFunction: 'out',
  _hover: {
    transform: 'translateY(-6px)',
    boxShadow: 'card',
    borderColor: 'accent/50',
  },
})

const iconBox = css({
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  background: 'accent/13',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'accent.deep',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '21px',
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
  margin: '22px 0 0',
  lineHeight: 1.15,
})

const note = css({
  fontSize: '14.5px',
  color: 'dim',
  margin: '12px 0 0',
})
</script>

<template>
  <div :class="card">
    <div :class="iconBox">
      <ServiceIcon :name="icon" />
    </div>
    <h3 :class="heading">{{ title }}</h3>
    <p :class="note">{{ text }}</p>
  </div>
</template>
