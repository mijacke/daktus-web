<script setup lang="ts">
import { css } from '~~/styled-system/css'

const position = css({
  bottom: '-34px',
  width: 'min(600px, 90%)',
})

const body = css({ padding: '18px 18px 22px' })

const topRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
})

const logo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '16px',
  letterSpacing: '0.01em',
  color: 'ink',
})

const menu = css({
  display: 'flex',
  gap: '14px',
  fontSize: '11px',
  color: 'dim',
})

const menuActive = css({
  color: 'accent.deep',
  fontWeight: 600,
})

const tagline = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '19px',
  color: 'ink',
  marginTop: '14px',
})

const gallery = css({
  display: 'grid',
  gridTemplateColumns: '1.3fr 1fr 1fr',
  gap: '8px',
  marginTop: '12px',
  '& > div': { height: '92px', borderRadius: '8px' },
})

const tilePeach = css({ background: 'linear-gradient(160deg, token(colors.mockup.peach), token(colors.mockup.peach2))' })
const tileCream = css({ background: 'linear-gradient(160deg, token(colors.mockup.cream), token(colors.mockup.cream2))' })
const tileClay = css({ background: 'linear-gradient(160deg, token(colors.mockup.clay), token(colors.mockup.clay2))' })

const chips = css({
  display: 'flex',
  gap: '8px',
  marginTop: '12px',
})

const chipSoft = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '26px',
  paddingInline: '12px',
  borderRadius: 'full',
  background: 'ink/6',
  fontSize: '10.5px',
  color: 'dim',
})

const chipCta = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '26px',
  paddingInline: '14px',
  borderRadius: 'full',
  background: 'ink',
  color: 'paper',
  fontSize: '10.5px',
  fontWeight: 600,
  marginLeft: 'auto',
})
</script>

<template>
  <MiniBrowser :class="position" url="paulifotografka.sk">
    <div :class="body">
      <div :class="topRow">
        <span :class="logo">PAULI</span>
        <span :class="menu">
          <span>Portfólio</span>
          <span>O mne</span>
          <span :class="menuActive">Rezervácia</span>
        </span>
      </div>
      <div :class="tagline">Prirodzené momenty s emóciou</div>
      <div :class="gallery">
        <div :class="tilePeach" />
        <div :class="tileCream" />
        <div :class="tileClay" />
      </div>
      <div :class="chips">
        <span :class="chipSoft">Rodinné</span>
        <span :class="chipSoft">Tehotenské</span>
        <span :class="chipCta">Rezervovať fotenie</span>
      </div>
    </div>
  </MiniBrowser>
</template>
