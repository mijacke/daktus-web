<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const ballEl = ref<HTMLElement | null>(null)
const labelEl = ref<HTMLElement | null>(null)
const isLink = ref(false)
const isView = ref(false)

let cleanup: (() => void) | null = null

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return
  const ball = ballEl.value
  const label = labelEl.value
  if (!ball || !label) return

  gsap.set(ball, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ballX = gsap.quickTo(ball, 'x', { duration: 0.55, ease: 'expo' })
  const ballY = gsap.quickTo(ball, 'y', { duration: 0.55, ease: 'expo' })
  const setRotate = gsap.quickSetter(ball, 'rotation', 'deg')
  const setScaleX = gsap.quickSetter(ball, 'scaleX')
  const setScaleY = gsap.quickSetter(ball, 'scaleY')
  const setLabelRotate = gsap.quickSetter(label, 'rotation', 'deg')

  const onMove = (event: MouseEvent) => {
    ballX(event.clientX)
    ballY(event.clientY)
  }
  const onOver = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target : null
    const view = target?.closest('[data-cursor="view"]')
    isView.value = !!view
    isLink.value = !view && !!target?.closest('a, button')
  }

  // Elastický stretch podľa rýchlosti guľky (nie myši) — guľka je už vyhladená cez quickTo
  let prevX = window.innerWidth / 2
  let prevY = window.innerHeight / 2
  let stretch = 0
  let angle = 0
  const onTick = (_time: number, deltaTime: number) => {
    const x = Number(gsap.getProperty(ball, 'x'))
    const y = Number(gsap.getProperty(ball, 'y'))
    const dx = x - prevX
    const dy = y - prevY
    prevX = x
    prevY = y
    if (Math.hypot(dx, dy) > 0.1) angle = (Math.atan2(dy, dx) * 180) / Math.PI
    const speed = Math.hypot(dx, dy) / Math.max(deltaTime, 1)
    const target = isView.value ? 0 : Math.min(speed * 0.35, 0.4)
    stretch += (target - stretch) * 0.2
    setRotate(angle)
    setScaleX(1 + stretch)
    setScaleY(1 - stretch * 0.6)
    setLabelRotate(-angle)
  }

  document.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  gsap.ticker.add(onTick)
  cleanup = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseover', onOver)
    gsap.ticker.remove(onTick)
  }
})

onBeforeUnmount(() => cleanup?.())

const ballStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 300,
  pointerEvents: 'none',
  width: '12px',
  height: '12px',
  borderRadius: 'full',
  background: 'white',
  mixBlendMode: 'difference',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transitionProperty: 'width, height, background',
  transitionDuration: '0.35s',
  transitionTimingFunction: 'out',
  '@media (pointer: coarse)': { display: 'none' },
  '&.is-link': { width: '48px', height: '48px' },
  '&.is-view': { width: '86px', height: '86px', background: 'accent', mixBlendMode: 'normal' },
})

const labelStyle = css({
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
  <div ref="ballEl" :class="[ballStyle, { 'is-link': isLink, 'is-view': isView }]" aria-hidden="true">
    <span ref="labelEl" :class="labelStyle">Pozrieť</span>
  </div>
</template>
