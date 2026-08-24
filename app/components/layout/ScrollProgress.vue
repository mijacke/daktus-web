<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const barEl = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
let toScale: ((value: number) => void) | null = null

function update() {
  if (!barEl.value) return
  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
  if (reduced.value) {
    gsap.set(barEl.value, { scaleX: progress })
    return
  }
  // krátky dojazd vyžehlí aj zákmity zámku procesného pinu (scroll tam pílkuje)
  toScale ??= gsap.quickTo(barEl.value, 'scaleX', { duration: 0.3, ease: 'power2.out' })
  toScale(progress)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

// nová stránka = nová výška dokumentu
useNuxtApp().hook('page:finish', () => nextTick(update))

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
