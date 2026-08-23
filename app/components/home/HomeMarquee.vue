<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const ITEMS = [
  'Webdizajn',
  'Vývoj na mieru',
  'E‑shopy',
  'Mobilné aplikácie',
  'Desktopové aplikácie',
  'Softvérové riešenia',
]

/** Rýchlosť posunu v px/s — pri ~1500 px obsahu zodpovedá tempu prototypu (42 s na cyklus). */
const SPEED = 36

const trackEl = ref<HTMLElement | null>(null)
const copies = ref(2)

let tween: gsap.core.Tween | null = null
let lastWidth = 0

/**
 * Nekonečná slučka: odmeria jednu kópiu obsahu, vyrenderuje ich toľko,
 * aby pokryli viewport aj počas posunu, a posúva pás o presne jednu kópiu.
 */
function rebuild() {
  const track = trackEl.value
  const group = track?.children[0] as HTMLElement | undefined
  if (!track || !group) return
  const width = group.offsetWidth
  if (!width) return

  const needed = Math.max(2, Math.ceil(window.innerWidth / width) + 1)
  if (tween && needed === copies.value && width === lastWidth) return
  copies.value = needed
  lastWidth = width

  tween?.kill()
  gsap.set(track, { x: 0 })
  tween = gsap.to(track, { x: -width, duration: width / SPEED, ease: 'none', repeat: -1 })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  rebuild()
  // šírka obsahu sa mení po donačítaní fontov a pri zmene okna
  document.fonts?.ready.then(rebuild)
  window.addEventListener('resize', rebuild)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', rebuild)
  tween?.kill()
})

const marquee = css({
  borderBlock: '1px solid',
  borderColor: 'hairline.soft',
  overflow: 'hidden',
})

const track = css({
  display: 'flex',
  width: 'max-content',
  willChange: 'transform',
})

const group = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  height: '76px',
  paddingInline: '16px',
})

const item = css({
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
})

const spark = css({
  display: 'inline-flex',
  color: 'accent',
})
</script>

<template>
  <div :class="marquee" aria-hidden="true">
    <div ref="trackEl" :class="track">
      <div v-for="copy in copies" :key="copy" :class="group">
        <template v-for="(label, index) in ITEMS" :key="index">
          <span :class="item">{{ label }}</span>
          <span :class="spark"><IconSpark /></span>
        </template>
      </div>
    </div>
  </div>
</template>
