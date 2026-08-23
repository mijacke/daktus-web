<script setup lang="ts">
import { css } from '~~/styled-system/css'

const TECHS = [
  'Java', 'C#', '.NET', 'WordPress', 'HTML',
  'React', 'Angular', 'Vue', 'Next.js', 'Node.js',
  'Bootstrap', 'Prisma', 'Redux', 'GraphQL', 'REST API',
  'Express', 'PostgreSQL', 'MySQL', 'MongoDB', 'MariaDB',
  'AWS', 'Azure', 'DigitalOcean', 'Render', 'Websupport',
]

const sectionEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
useStarfield(sectionEl, canvasEl)

const gridEl = ref<HTMLElement | null>(null)
const gridIn = useInView(gridEl)

const section = css({
  position: 'relative',
  padding: 'clamp(96px, 12vh, 160px) 0 clamp(100px, 13vh, 170px)',
  borderTop: '1px solid',
  borderColor: 'dark.fg/7',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, token(colors.dark.bg), token(colors.dark.bg2) 55%, token(colors.dark.bg))',
  color: 'dark.fg',
})

const stars = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
})

const content = css({
  position: 'relative',
  zIndex: 2,
})

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 'clamp(48px, 6vh, 84px) 30px',
  marginTop: 'clamp(60px, 8vh, 100px)',
  '@media (max-width: 1100px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
  '@media (max-width: 640px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
})

const tech = css({
  textAlign: 'center',
  fontSize: 'clamp(15px, 1.3vw, 23px)',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.fg/34',
  transitionProperty: 'color, text-shadow',
  transitionDuration: '0.4s',
  cursor: 'default',
  whiteSpace: 'nowrap',
  _hover: {
    color: 'dark.fg',
    textShadow: '0 0 24px color-mix(in srgb, token(colors.accent) 60%, transparent)',
  },
  '@media (max-width: 640px)': { whiteSpace: 'normal' },
})
</script>

<template>
  <section id="technologie" ref="sectionEl" :class="section" data-dark>
    <canvas ref="canvasEl" :class="stars" aria-hidden="true" />
    <div :class="[wrap, content]">
      <SectionHead eyebrow="Technológie" title="Náš stack">
        <span :class="sectionNote">Vyberáme technológiu podľa projektu, nie naopak.</span>
      </SectionHead>
      <div ref="gridEl" :class="[grid, fadeIn(), { in: gridIn }]">
        <span v-for="name in TECHS" :key="name" :class="tech">{{ name }}</span>
      </div>
    </div>
  </section>
</template>
