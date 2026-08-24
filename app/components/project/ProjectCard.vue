<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

withDefaults(defineProps<{
  name: string
  description: string
  tone: 'blush' | 'navy'
  state?: 'idle' | 'active' | 'dimmed'
}>(), { state: 'idle' })

defineEmits<{ select: [] }>()

const root = ref<HTMLElement | null>(null)
const inView = useInView(root, { threshold: 0.05 })
const reduced = useReducedMotion()
const built = ref(false)
let timer = 0

watch(inView, (visible) => {
  if (!visible) return
  timer = window.setTimeout(() => (built.value = true), reduced.value ? 0 : 200)
})

onBeforeUnmount(() => clearTimeout(timer))

const card = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  minWidth: 0,
})

const cover = cva({
  base: {
    height: 'clamp(280px, 26vw, 420px)',
    borderRadius: '18px',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: 'ink/7',
    transition: 'height 0.7s {easings.out}',
  },
  variants: {
    tone: {
      blush: { background: 'linear-gradient(165deg, token(colors.cover.blush), token(colors.cover.blush2))' },
      navy: { background: 'linear-gradient(165deg, token(colors.cover.navy), token(colors.cover.navy2))' },
    },
    state: {
      idle: {},
      active: { height: 'clamp(380px, 40vw, 660px)' },
      dimmed: {},
    },
  },
})

/** Neaktívna karta: priehľadný štít nad obsahom — hover/klik patria karte, nie iframe. */
const shield = css({
  position: 'absolute',
  inset: 0,
  zIndex: 4,
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

const meta = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
})

const metaName = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '26px',
  letterSpacing: '-0.01em',
})

const metaNote = css({
  fontSize: '14.5px',
  color: 'dim',
  marginTop: '4px',
})
</script>

<template>
  <article ref="root" :class="[card, 'group']">
    <BlueprintFrame
      :class="cover({ tone, state })"
      tag="projekt"
      :built="built"
      :content-class="coverFill"
      :data-cursor="state === 'active' ? 'none' : 'view'"
      :data-cursor-solid="tone === 'navy' ? undefined : ''"
      @click="state !== 'active' && $emit('select')"
    >
      <div :class="coverScale">
        <slot />
      </div>
      <div v-if="state !== 'active'" :class="shield" aria-hidden="true" />
    </BlueprintFrame>
    <div :class="meta">
      <div>
        <div :class="metaName">{{ name }}</div>
        <div :class="metaNote">{{ description }}</div>
      </div>
    </div>
  </article>
</template>
