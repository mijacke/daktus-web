<script setup lang="ts">
import { css } from '~~/styled-system/css'

export type ServiceDeviceName = 'browser' | 'code' | 'desktop' | 'phone'

defineProps<{
  /** Mini zariadenie v hlave karty — každá služba ukáže svoj typ produktu. */
  device: ServiceDeviceName
  title: string
  text: string
}>()

const card = css({
  height: '100%',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: '18px',
  background: 'card',
  padding: '22px 22px 30px',
  transitionProperty: 'transform, box-shadow, border-color',
  transitionDuration: '0.5s',
  transitionTimingFunction: 'out',
  _hover: {
    transform: 'translateY(-6px)',
    boxShadow: 'card',
    borderColor: 'accent/50',
  },
})

/** Jednotná výška pre všetky zariadenia — okná sa natiahnu, telefón centrovaný. */
const deviceStage = css({
  display: 'grid',
  alignItems: 'stretch',
  minHeight: '112px',
  '& > *': { minWidth: 0 },
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '21px',
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
  margin: '20px 0 0',
  lineHeight: 1.15,
})

const note = css({
  fontSize: '14.5px',
  color: 'dim',
  margin: '12px 0 0',
})
</script>

<template>
  <div :class="card" data-svc>
    <div :class="deviceStage">
      <ServiceDeviceBrowser v-if="device === 'browser'" />
      <ServiceDeviceCode v-else-if="device === 'code'" />
      <ServiceDeviceDesktop v-else-if="device === 'desktop'" />
      <ServiceDevicePhone v-else />
    </div>
    <h3 :class="heading">{{ title }}</h3>
    <p :class="note">{{ text }}</p>
  </div>
</template>
