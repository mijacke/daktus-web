<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Zvýraznená ponuka v plnej šírke pod tehličkami — hlavný ťah štúdia.
 * Mint hmota podklad, veľký glyf blesku a dostupný vstup do B2B.
 */
const root = ref<HTMLElement | null>(null)
const inView = useInView(root)

const band = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(20px, 3vw, 44px)',
  flexWrap: 'wrap',
  background: 'linear-gradient(165deg, token(colors.cover.mint), token(colors.cover.mint2))',
  border: '1px solid',
  borderColor: 'ink/7',
  borderRadius: '20px',
  padding: 'clamp(26px, 3vw, 44px)',
  marginTop: '24px',
})

const glyphBox = css({
  flexShrink: 0,
  width: 'clamp(56px, 4.5vw, 76px)',
  height: 'clamp(56px, 4.5vw, 76px)',
  '& svg': { width: '100%', height: '100%' },
})

const content = css({
  flex: 1,
  minWidth: '260px',
})

const heading = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(22px, 2.2vw, 32px)',
  letterSpacing: '-0.015em',
  textTransform: 'uppercase',
  margin: 0,
})

const text = css({
  fontSize: '15px',
  color: 'ink/75',
  margin: '8px 0 0',
  maxWidth: '62ch',
})

const priceCol = css({
  textAlign: 'right',
  '@media (max-width: 640px)': { textAlign: 'left' },
})

const amount = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(30px, 2.4vw, 44px)',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
  '& small': {
    fontSize: '15px',
    fontWeight: 600,
    color: 'ink/60',
    letterSpacing: 0,
  },
})

const wasPrice = css({
  fontSize: '15px',
  fontWeight: 600,
  color: 'ink/55',
  textDecoration: 'line-through',
  letterSpacing: 0,
  marginLeft: '7px',
})

const cta = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '15px',
  fontWeight: 600,
  color: 'ink',
  marginTop: '10px',
})
</script>

<template>
  <div ref="root" :class="[band, fadeIn(), { in: inView }]">
    <span :class="glyphBox"><ClayGlyph name="blesk" :size="76" /></span>
    <div :class="content">
      <h3 :class="heading">AI a automatizácia</h3>
      <p :class="text">
        Audit procesov, prvý automatizovaný proces a zaškolenie tímu do 4 týždňov.
        Najrýchlejšia cesta, ako si B2B riešenie od nás vyskúšať v malom.
      </p>
    </div>
    <div :class="priceCol">
      <div :class="amount"><small>od</small> 1 500 €<span :class="wasPrice">2 000 €</span></div>
      <NuxtLink :class="cta" to="/kontakt">
        Chcem automatizáciu
        <IconArrow :size="14" />
      </NuxtLink>
    </div>
  </div>
</template>
