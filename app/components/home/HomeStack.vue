<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const TECHS = [
  'Java', 'C#', '.NET', 'WordPress', 'HTML',
  'React', 'Angular', 'Vue', 'Next.js', 'Node.js',
  'Bootstrap', 'Prisma', 'Redux', 'GraphQL', 'REST API',
  'Express', 'PostgreSQL', 'MySQL', 'MongoDB', 'MariaDB',
  'AWS', 'Azure', 'DigitalOcean', 'Render', 'Websupport',
]

/** Kľudová priesvitnosť názvov — šošovka ich pri prechode rozsvieti naplno. */
const DIM = 0.34

const sectionEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
useStarfield(sectionEl, canvasEl)

const gridEl = ref<HTMLElement | null>(null)
const gridIn = useInView(gridEl)
const gridLive = useInView(gridEl, { once: false, threshold: 0 })
const lensWrapEl = ref<HTMLElement | null>(null)
const lensEl = ref<HTMLElement | null>(null)

let lensTl: gsap.core.Timeline | null = null
let tick: (() => void) | null = null
let observer: ResizeObserver | null = null

onMounted(() => {
  const lensWrap = lensWrapEl.value
  const lens = lensEl.value
  const gridBox = gridEl.value
  if (!lensWrap || !lens || !gridBox) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let spots: { el: HTMLElement, x: number, y: number }[] = []

  function measure() {
    spots = Array.from(gridBox!.querySelectorAll<HTMLElement>('[data-tech]')).map(el => ({
      el,
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
    }))
  }

  /** Pomalá slučka šošovky naprieč gridom — diagonálne zľava doprava, zhora nadol a späť. */
  function buildPath() {
    lensTl?.kill()
    const maxX = Math.max(0, lensWrap!.clientWidth - lens!.offsetWidth)
    const maxY = Math.max(0, lensWrap!.clientHeight - lens!.offsetHeight)
    lensTl = gsap.timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } })
      .set(lens, { x: maxX * 0.05, y: maxY * 0.2, rotation: -6 })
      .to(lens, { x: maxX * 0.95, y: maxY * 0.6, rotation: 5, duration: 9 })
      .to(lens, { x: maxX * 0.3, y: maxY * 0.95, rotation: -4, duration: 8 })
      .to(lens, { x: maxX * 0.75, y: maxY * 0.05, rotation: 6, duration: 9 })
      .to(lens, { x: maxX * 0.05, y: maxY * 0.2, rotation: -6, duration: 8 })
    if (!gridLive.value) lensTl.pause()
  }

  measure()
  buildPath()
  gsap.to(lens, { autoAlpha: 1, duration: 1.2, delay: 0.4 })

  observer = new ResizeObserver(() => {
    measure()
    buildPath()
  })
  observer.observe(lensWrap)

  tick = () => {
    if (!gridLive.value) return
    const lensX = Number(gsap.getProperty(lens, 'x')) + lens!.offsetWidth / 2
    const lensY = Number(gsap.getProperty(lens, 'y')) + lens!.offsetHeight / 2
    const radius = lens!.offsetWidth * 0.75
    for (const spot of spots) {
      const t = Math.max(0, 1 - Math.hypot(spot.x - lensX, spot.y - lensY) / radius)
      const eased = t * t * (3 - 2 * t)
      gsap.set(spot.el, { opacity: DIM + (1 - DIM) * eased })
    }
  }
  gsap.ticker.add(tick)

  watch(gridLive, visible => (visible ? lensTl?.play() : lensTl?.pause()))
})

onBeforeUnmount(() => {
  lensTl?.kill()
  if (tick) gsap.ticker.remove(tick)
  observer?.disconnect()
})

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

const gridWrap = css({
  position: 'relative',
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
  color: 'dark.fg',
  opacity: 0.34,
  cursor: 'default',
  whiteSpace: 'nowrap',
  transition: 'text-shadow 0.4s ease',
  _hover: {
    opacity: 1,
    textShadow: '0 0 24px color-mix(in srgb, token(colors.accent) 60%, transparent)',
  },
  '@media (max-width: 640px)': { whiteSpace: 'normal' },
})

/** „Liquid glass" šošovka plávajúca ponad grid technológií. */
const lensPane = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 'clamp(220px, 24vw, 380px)',
  height: 'clamp(130px, 12vw, 200px)',
  borderRadius: '48px',
  pointerEvents: 'none',
  opacity: 0,
  backdropFilter: 'blur(5px) saturate(160%) brightness(1.3)',
  background: 'linear-gradient(115deg, color-mix(in srgb, token(colors.dark.fg) 9%, transparent), color-mix(in srgb, token(colors.dark.fg) 2%, transparent) 45%, color-mix(in srgb, token(colors.accent) 9%, transparent))',
  border: '1px solid',
  borderColor: 'dark.fg/18',
  boxShadow: 'inset 0 1px 0 color-mix(in srgb, token(colors.dark.fg) 24%, transparent), 0 24px 60px color-mix(in srgb, token(colors.dark.bg) 55%, transparent)',
  willChange: 'transform',
  _motionReduce: { display: 'none' },
})
</script>

<template>
  <section id="technologie" ref="sectionEl" :class="section" data-dark>
    <canvas ref="canvasEl" :class="stars" aria-hidden="true" />
    <div :class="[wrap, content]">
      <SectionHead eyebrow="Technológie" title="Náš stack">
        <span :class="sectionNote">Vyberáme technológiu podľa projektu, nie naopak.</span>
      </SectionHead>
      <div ref="lensWrapEl" :class="gridWrap">
        <div ref="gridEl" :class="[grid, fadeIn(), { in: gridIn }]">
          <span v-for="name in TECHS" :key="name" :class="tech" data-tech>{{ name }}</span>
        </div>
        <span ref="lensEl" :class="lensPane" aria-hidden="true" />
      </div>
    </div>
  </section>
</template>
