<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'
import type { Project } from '~/utils/projects'

const props = withDefaults(defineProps<{
  project: Project
  /** Poradie v zozname — vykresľuje sa ako 01, 02, … */
  index: number
  /** true = obálka vpravo (striedanie strán v zozname). */
  reverse?: boolean
}>(), { reverse: false })

const root = ref<HTMLElement | null>(null)
const inView = useInView(root)

const number = computed(() => String(props.index).padStart(2, '0'))

const entry = css({
  display: 'grid',
  gridTemplateColumns: '1.05fr 0.95fr',
  alignItems: 'center',
  gap: 'clamp(30px, 4.5vw, 80px)',
  '@media (max-width: 980px)': { gridTemplateColumns: '1fr' },
})

const coverCol = cva({
  base: {},
  variants: {
    reverse: {
      true: {
        order: 2,
        '@media (max-width: 980px)': { order: 0 },
      },
    },
  },
})

const numberRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
  fontFamily: 'mono',
  fontSize: '13px',
  letterSpacing: '0.14em',
  color: 'dim',
})

const dash = css({
  width: '26px',
  height: '2px',
  background: 'accent',
  flexShrink: 0,
})

const name = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(32px, 3.4vw, 54px)',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  lineHeight: 1.04,
  margin: '18px 0 0',
})

const summary = css({
  fontSize: 'clamp(15px, 1.05vw, 17.5px)',
  color: 'dim',
  margin: '20px 0 0',
  maxWidth: '560px',
})

const spec = css({
  display: 'flex',
  gap: '18px',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  marginTop: '30px',
  paddingTop: '22px',
  borderTop: '1px solid',
  borderColor: 'hairline.soft',
})

const specLabel = css({
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'dim',
  minWidth: '86px',
})

const specValue = css({
  fontSize: '15.5px',
  fontWeight: 500,
})

const chipRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: '26px',
})

const link = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '30px',
  fontSize: '15px',
  fontWeight: 600,
  borderBottom: '1px solid',
  borderColor: 'hairline',
  paddingBottom: '6px',
  transition: 'color 0.3s ease',
  _hover: { color: 'accent.deep' },
})
</script>

<template>
  <article ref="root" :class="[entry, { in: inView }]">
    <div :class="coverCol({ reverse })">
      <ProjectCover :tone="project.tone" size="page">
        <slot />
      </ProjectCover>
    </div>

    <div>
      <div :class="[numberRow, fadeIn()]">
        <span :class="dash" />
        <span>{{ number }}</span>
      </div>
      <h2 :class="[name, fadeIn()]">{{ project.name }}</h2>
      <p :class="[summary, fadeIn({ delay: 1 })]">{{ project.summary }}</p>

      <div :class="[spec, fadeIn({ delay: 2 })]">
        <span :class="specLabel">Rozsah</span>
        <span :class="specValue">{{ project.scope.join(' · ') }}</span>
      </div>

      <div :class="[chipRow, fadeIn({ delay: 2 })]">
        <AppChip v-for="chip in project.chips" :key="chip.label" :accent="chip.accent">
          {{ chip.label }}
        </AppChip>
      </div>

      <a
        v-if="project.domain"
        :class="[link, fadeIn({ delay: 3 })]"
        :href="`https://${project.domain}`"
        target="_blank"
        rel="noopener"
      >
        {{ project.domain }}
        <span :class="sectionLinkIcon"><IconArrow /></span>
      </a>
    </div>
  </article>
</template>
