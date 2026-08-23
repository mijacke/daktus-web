<script setup lang="ts">
import { css } from '~~/styled-system/css'

const root = ref<HTMLElement | null>(null)
const inView = useInView(root)

const section = css({
  background: 'dark.bg',
  color: 'dark.fg',
  marginTop: 'clamp(90px, 12vh, 160px)',
  padding: 'clamp(96px, 13vh, 180px) 0 clamp(60px, 8vh, 100px)',
})

const inner = css({ textAlign: 'center' })

const big = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(52px, 8.6vw, 150px)',
  lineHeight: 0.96,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
})

const outline = css({
  color: 'transparent',
  WebkitTextStroke: '1.5px token(colors.dark.fg)',
})

const mark = css({ color: 'accent' })

const sub = css({
  fontSize: '18px',
  color: 'dark.dim',
  margin: '26px 0 0',
})

const buttonRow = css({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '42px',
})

const note = css({
  fontSize: '13.5px',
  color: 'dark.dim',
  margin: '18px 0 0',
})
</script>

<template>
  <section ref="root" :class="[section, { in: inView }]" data-dark>
    <div :class="[wrap, inner]">
      <div :class="big">
        <span :class="revealLine">
          <span :class="revealInner()"><span :class="outline">Máte</span> nápad<span :class="mark">?</span></span>
        </span>
      </div>
      <p :class="[sub, fadeIn()]">Poďme z neho spraviť hotový produkt.</p>
      <div :class="[buttonRow, fadeIn({ delay: 2 })]">
        <AppButton v-magnet href="/kontakt" variant="accent" arrow>Napíšme si</AppButton>
      </div>
      <p :class="[note, fadeIn({ delay: 3 })]">Ozveme sa do 24 hodín.</p>
    </div>
  </section>
</template>
