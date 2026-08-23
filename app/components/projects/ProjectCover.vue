<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'
import type { Project } from '~/utils/projects'

withDefaults(defineProps<{
  tone: Project['tone']
  /** card = mriežka na domovskej stránke, page = veľká obálka na stránke Projekty. */
  size?: 'card' | 'page'
}>(), { size: 'card' })

const root = ref<HTMLElement | null>(null)
const built = useBuildIn(root)

const cover = cva({
  base: {
    borderRadius: '18px',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'ink/7',
  },
  variants: {
    tone: {
      blush: { background: 'linear-gradient(165deg, token(colors.cover.blush), token(colors.cover.blush2))' },
      steel: { background: 'linear-gradient(165deg, token(colors.cover.steel), token(colors.cover.steel2))' },
    },
    size: {
      card: { height: 'clamp(300px, 30vw, 500px)' },
      page: { height: 'clamp(320px, 34vw, 580px)' },
    },
  },
})

const coverFill = css({
  position: 'absolute',
  inset: 0,
})

const coverScale = css({
  position: 'absolute',
  inset: 0,
  transition: 'transform 0.9s {easings.out}',
  _groupHover: { transform: 'scale(1.03)' },
})
</script>

<template>
  <div ref="root" class="group">
    <BlueprintFrame
      :class="cover({ tone, size })"
      tag="projekt"
      :built="built"
      :content-class="coverFill"
      data-cursor="view"
    >
      <div :class="coverScale">
        <slot />
      </div>
    </BlueprintFrame>
  </div>
</template>
