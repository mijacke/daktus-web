<script setup lang="ts">
import { css } from '~~/styled-system/css'

useSeoMeta({
  title: 'Kontakt — Daktus',
  description: 'Popíšte nám v pár vetách, čo chystáte. Ozveme sa do 24 hodín s návrhom ďalších krokov — nezáväzne a zadarmo.',
})

const grid = css({
  display: 'grid',
  gridTemplateColumns: '1.4fr 1fr',
  gap: 'clamp(48px, 6vw, 120px)',
  paddingBottom: 'clamp(60px, 8vh, 100px)',
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
})
</script>

<template>
  <main :class="wrap">
    <PageHead
      eyebrow="Kontakt"
      title="Napíšme si"
      note="Popíšte nám v pár vetách, čo chystáte. Ozveme sa do 24 hodín s návrhom ďalších krokov, nezáväzne a zadarmo."
    />

    <div :class="grid">
      <ContactForm />
      <ContactAside />
    </div>
  </main>
</template>
