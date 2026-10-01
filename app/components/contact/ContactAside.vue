<script setup lang="ts">
import { css } from '~~/styled-system/css'
import { TEAM_MEMBERS } from '~/utils/team'

const STEPS = [
  'Ozveme sa do 24 hodín a dohodneme krátky úvodný hovor.',
  'Do 24 hodín dostanete návrh riešenia s cenou a termínom.',
  'Keď si plesneme, púšťame sa do návrhu a vývoja.',
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/mijacke' },
]

/** Panel z mint hmoty — plastelína priamo v ploche, protiváha karty formulára. */
const aside = css({
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(165deg, token(colors.cover.mint), token(colors.cover.mint2))',
  border: '1px solid',
  borderColor: 'ink/7',
  borderRadius: '20px',
  padding: 'clamp(24px, 2.6vw, 40px)',
})

const box = css({
  borderTop: '1px solid',
  borderColor: 'ink/14',
  paddingBlock: '26px',
  '&:first-child': { borderTop: 'none', paddingTop: '6px' },
  '&:last-child': { paddingBottom: '6px' },
})

const label = css({
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'ink/55',
})

const mailRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginTop: '14px',
})

const mail = css({
  display: 'inline-block',
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: 'clamp(24px, 2vw, 32px)',
  letterSpacing: '-0.01em',
  color: 'ink',
  borderBottom: '2px solid',
  borderColor: 'accent/50',
  paddingBottom: '6px',
})

const phoneList = css({ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' })
const phoneRow = css({ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' })
const phoneLink = css({ color: 'ink', fontWeight: 600, textDecoration: 'underline', textDecorationColor: 'accent/50' })

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
  color: 'ink',
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
  borderColor: 'ink/20',
  background: 'white/45',
  fontSize: '14px',
  fontWeight: 500,
  transitionProperty: 'border-color, background',
  transitionDuration: '0.3s',
  _hover: { borderColor: 'ink' },
})
</script>

<template>
  <div :class="aside">
    <div :class="box">
      <div :class="label">Radšej priamo e‑mailom?</div>
      <div :class="mailRow">
        <ClayGlyph name="obalka" :size="40" />
        <a :class="mail" href="mailto:napiste@daktus.sk">napiste@daktus.sk</a>
      </div>
    </div>
    <div :class="box">
      <div :class="label">Alebo nám zavolajte</div>
      <div :class="phoneList">
        <div v-for="member in TEAM_MEMBERS" :key="member.name" :class="phoneRow">
          <span>{{ member.name }} · {{ member.role }}</span>
          <a :class="phoneLink" :href="member.phoneHref">{{ member.phone }}</a>
        </div>
      </div>
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
        <a
          v-for="social in SOCIALS"
          :key="social.label"
          :class="socialChip"
          :href="social.href"
          :target="social.href.startsWith('http') ? '_blank' : undefined"
          :rel="social.href.startsWith('http') ? 'noopener' : undefined"
        >{{ social.label }}</a>
      </div>
    </div>
  </div>
</template>
