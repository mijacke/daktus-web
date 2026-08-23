<script setup lang="ts">
import { css } from '~~/styled-system/css'

const ASSURANCES = [
  'Fixná cena dohodnutá pred štartom',
  'Žiadne skryté poplatky ani dodatky',
  'Nezáväzná kalkulácia do 48 hodín',
]

const root = ref<HTMLElement | null>(null)
const inView = useInView(root)

const band = css({
  display: 'grid',
  gridTemplateColumns: '1.15fr 0.85fr',
  gap: 'clamp(30px, 4vw, 56px)',
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'hairline',
  borderRadius: '24px',
  background: 'card',
  padding: 'clamp(36px, 4vw, 52px) clamp(28px, 4vw, 56px)',
  marginTop: '28px',
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
})

const badge = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  background: 'accent/10',
  border: '1px solid',
  borderColor: 'accent/50',
  borderRadius: 'full',
  padding: '8px 14px',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'accent.deep',
  marginBottom: '22px',
})

const dot = css({
  width: '6px',
  height: '6px',
  borderRadius: 'full',
  background: 'accent',
})

const title = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(28px, 3.2vw, 44px)',
  lineHeight: 1.02,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  margin: '0 0 16px',
})

const note = css({
  fontSize: 'clamp(15px, 1.1vw, 17px)',
  lineHeight: 1.6,
  color: 'dim',
  maxWidth: '44ch',
  margin: 0,
  textWrap: 'pretty',
})

const aside = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '26px',
})

const list = css({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
})

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '15.5px',
  color: 'ink/80',
})

const itemIcon = css({
  display: 'inline-flex',
  flexShrink: 0,
  color: 'accent.deep',
})

const actions = css({
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
  flexWrap: 'wrap',
})

const secondary = css({ color: 'dim' })
</script>

<template>
  <div ref="root" :class="[band, fadeIn(), { in: inView }]">
    <div>
      <span :class="badge">
        <span :class="dot" />
        Úvodná zľava 25 % na všetky balíky
      </span>
      <h3 :class="title">Cenník bez hviezdičiek</h3>
      <p :class="note">
        Orientačné ceny máme zverejnené vopred. Presnú sumu dostanete po krátkom hovore — a tá potom platí.
      </p>
    </div>

    <div :class="aside">
      <ul :class="list">
        <li v-for="assurance in ASSURANCES" :key="assurance" :class="item">
          <span :class="itemIcon"><IconCheck :size="15" /></span>{{ assurance }}
        </li>
      </ul>
      <div :class="actions">
        <AppButton v-magnet href="/cennik" arrow>Pozrieť cenník</AppButton>
        <NuxtLink :class="[sectionLink, secondary]" to="/kontakt">Nezáväzná konzultácia</NuxtLink>
      </div>
    </div>
  </div>
</template>
