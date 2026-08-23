<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const dotEl = ref<HTMLElement | null>(null)
const ringEl = ref<HTMLElement | null>(null)
const isLink = ref(false)
const isView = ref(false)
const onDark = ref(false)

let cleanup: (() => void) | null = null

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return
  const dot = dotEl.value
  const ring = ringEl.value
  if (!dot || !ring) return

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const dotX = gsap.quickSetter(dot, 'x', 'px')
  const dotY = gsap.quickSetter(dot, 'y', 'px')
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

  const onMove = (event: MouseEvent) => {
    dotX(event.clientX)
    dotY(event.clientY)
    ringX(event.clientX)
    ringY(event.clientY)
  }
  const onOver = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target : null
    const view = target?.closest('[data-cursor="view"]')
    isView.value = !!view
    isLink.value = !view && !!target?.closest('a, button')
    onDark.value = !!target?.closest('[data-dark]')
  }
  document.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  cleanup = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseover', onOver)
  }
})

onBeforeUnmount(() => cleanup?.())

const root = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 300,
  pointerEvents: 'none',
  '@media (pointer: coarse)': { display: 'none' },
})

const dotStyle = css({
  position: 'absolute',
  width: '8px',
  height: '8px',
  borderRadius: 'full',
  background: 'ink',
  '.on-dark &': { background: 'dark.fg' },
})

const ringStyle = css({
  position: 'absolute',
  width: '38px',
  height: '38px',
  borderRadius: 'full',
  border: '1.5px solid',
  borderColor: 'ink/35',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transitionProperty: 'width, height, background, border-color',
  transitionDuration: '0.35s',
  transitionTimingFunction: 'out',
  '.is-link &': { width: '56px', height: '56px', borderColor: 'accent' },
  '.is-view &': { width: '86px', height: '86px', background: 'accent', borderColor: 'accent' },
  '.on-dark &': { borderColor: 'dark.fg/40' },
  '.on-dark.is-link &, .on-dark.is-view &': { borderColor: 'accent' },
})

const ringLabel = css({
  fontSize: '12px',
  fontWeight: 600,
  color: 'dark.bg',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  whiteSpace: 'nowrap',
  '.is-view &': { opacity: 1 },
})
</script>

<template>
  <div :class="[root, { 'is-link': isLink, 'is-view': isView, 'on-dark': onDark }]" aria-hidden="true">
    <div ref="ringEl" :class="ringStyle"><span :class="ringLabel">Pozrieť</span></div>
    <div ref="dotEl" :class="dotStyle" />
  </div>
</template>
