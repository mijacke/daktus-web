<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const barEl = ref<HTMLElement | null>(null)

function update() {
  if (!barEl.value) return
  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
  gsap.set(barEl.value, { scaleX: progress })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})

const bar = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '2px',
  background: 'accent',
  zIndex: 250,
  transformOrigin: 'left',
  transform: 'scaleX(0)',
})
</script>

<template>
  <div ref="barEl" :class="bar" aria-hidden="true" />
</template>
