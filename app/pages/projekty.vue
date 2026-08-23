<script setup lang="ts">
import { css } from '~~/styled-system/css'

useSeoMeta({
  title: 'Projekty — Daktus',
  description: 'Výber z práce štúdia Daktus — weby a digitálne produkty, ktoré navrhujeme a staviame od prvej skice až po ostrú prevádzku.',
})

const bandEl = ref<HTMLElement | null>(null)
const bandIn = useInView(bandEl)

const list = css({
  display: 'grid',
  gap: 'clamp(80px, 11vh, 150px)',
})
</script>

<template>
  <main>
    <ProjectsHero />

    <section :class="sectionBlock">
      <div :class="wrap">
        <div :class="list">
          <ProjectEntry :project="PAULI" :index="1">
            <MockupPauli />
          </ProjectEntry>
          <ProjectEntry :project="ADITRADE" :index="2" reverse>
            <MockupAditrade />
          </ProjectEntry>
        </div>

        <div ref="bandEl" :class="[fadeIn(), { in: bandIn }]">
          <CtaBand title="Váš projekt môže byť ďalší" cta-label="Napíšme si" cta-href="/kontakt">
            Napíšte pár viet o tom, čo potrebujete. Ozveme sa do 24 hodín.
          </CtaBand>
        </div>
      </div>
    </section>
  </main>
</template>
