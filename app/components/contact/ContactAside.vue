<script setup lang="ts">
import { css } from '~~/styled-system/css'

const STEPS = [
  'Ozveme sa do 24 hodín a dohodneme krátky úvodný hovor.',
  'Do 48 hodín dostanete návrh riešenia s cenou a termínom.',
  'Keď si plesneme, púšťame sa do návrhu a vývoja.',
]

const SOCIALS = ['Instagram', 'LinkedIn', 'GitHub']

const aside = css({
  display: 'flex',
  flexDirection: 'column',
})

const box = css({
  borderTop: '1px solid',
  borderColor: 'hairline',
  paddingBlock: '26px',
  '&:last-child': { borderBottom: '1px solid {colors.hairline}' },
})

const label = css({
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'dim',
})

const mail = css({
  display: 'inline-block',
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: 'clamp(24px, 2vw, 32px)',
  letterSpacing: '-0.01em',
  color: 'accent.deep',
  borderBottom: '2px solid',
  borderColor: 'accent/50',
  paddingBottom: '6px',
  marginTop: '14px',
})

const step = css({
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
  marginTop: '16px',
})

const stepNo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '13px',
  color: 'accent.deep',
  marginTop: '3px',
})

const stepText = css({
  fontSize: '15px',
  margin: 0,
})

const socials = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '16px',
})

const socialChip = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '40px',
  paddingInline: '22px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'hairline',
  fontSize: '14px',
  fontWeight: 500,
  transitionProperty: 'border-color, background',
  transitionDuration: '0.3s',
  _hover: { borderColor: 'accent' },
})
</script>

<template>
  <div :class="aside">
    <div :class="box">
      <div :class="label">Radšej priamo e‑mailom?</div>
      <a :class="mail" href="mailto:napiste@daktus.sk">napiste@daktus.sk</a>
    </div>
    <div :class="box">
      <div :class="label">Ako to prebieha</div>
      <div v-for="(text, index) in STEPS" :key="index" :class="step">
        <span :class="stepNo">{{ String(index + 1).padStart(2, '0') }}</span>
        <p :class="stepText">{{ text }}</p>
      </div>
    </div>
    <div :class="box">
      <div :class="label">Sledujte nás</div>
      <div :class="socials">
        <a v-for="social in SOCIALS" :key="social" :class="socialChip" href="#">{{ social }}</a>
      </div>
    </div>
  </div>
</template>
