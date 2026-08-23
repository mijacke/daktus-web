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

/** Kľudová priesvitnosť názvov — bublina ich pri prechode rozsvieti naplno. */
const DIM = 0.34
/** Sila lupy: sample = c · edge^(BETA − 1); vyššia hodnota = väčšie zväčšenie v strede. */
const BETA = 1.52
/** Rozlíšenie displacement mapy (škáluje sa na veľkosť bubliny, netreba viac). */
const MAP_SIZE = 256

const sectionEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
useStarfield(sectionEl, canvasEl)

const gridEl = ref<HTMLElement | null>(null)
const gridIn = useInView(gridEl)
const gridLive = useInView(gridEl, { once: false, threshold: 0 })
const lensWrapEl = ref<HTMLElement | null>(null)
const lensEl = ref<HTMLElement | null>(null)
const feImageEl = ref<SVGElement | null>(null)
const feDispEl = ref<SVGElement | null>(null)

let wobble: gsap.core.Tween | null = null
let tick: (() => void) | null = null
let observer: ResizeObserver | null = null
let cleanupFollow: (() => void) | null = null

/**
 * Vygeneruje kruhovú displacement mapu (fisheye lupa) pre feDisplacementMap —
 * rovnaká technika ako známe liquid-glass knižnice, len bez závislosti.
 */
function buildRefraction(lens: HTMLElement) {
  const feImage = feImageEl.value
  const feDisp = feDispEl.value
  if (!feImage || !feDisp || !('chrome' in window)) return

  const size = lens.offsetWidth
  if (!size) return
  const canvas = document.createElement('canvas')
  canvas.width = MAP_SIZE
  canvas.height = MAP_SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const raw = new Float32Array(MAP_SIZE * MAP_SIZE * 2)
  let maxShift = 0
  for (let y = 0; y < MAP_SIZE; y++) {
    for (let x = 0; x < MAP_SIZE; x++) {
      const u = x / MAP_SIZE
      const v = y / MAP_SIZE
      const cx = u - 0.5
      const cy = v - 0.5
      const edge = Math.hypot(cx, cy) * 2
      let dx = 0
      let dy = 0
      if (edge < 1 && edge > 0) {
        const factor = edge ** (BETA - 1)
        dx = cx * (factor - 1) * size
        dy = cy * (factor - 1) * size
      }
      const i = (y * MAP_SIZE + x) * 2
      raw[i] = dx
      raw[i + 1] = dy
      maxShift = Math.max(maxShift, Math.abs(dx), Math.abs(dy))
    }
  }
  if (!maxShift) return

  const image = ctx.createImageData(MAP_SIZE, MAP_SIZE)
  for (let p = 0; p < MAP_SIZE * MAP_SIZE; p++) {
    image.data[p * 4] = ((raw[p * 2]! / maxShift) * 0.5 + 0.5) * 255
    image.data[p * 4 + 1] = ((raw[p * 2 + 1]! / maxShift) * 0.5 + 0.5) * 255
    image.data[p * 4 + 2] = 128
    image.data[p * 4 + 3] = 255
  }
  ctx.putImageData(image, 0, 0)

  feImage.setAttribute('href', canvas.toDataURL())
  feImage.setAttribute('width', String(size))
  feImage.setAttribute('height', String(size))
  feDisp.setAttribute('scale', String(maxShift))
  lens.style.backdropFilter = 'url(#daktus-lens-filter) blur(0.8px) saturate(175%) brightness(1.2)'
}

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

  /** Kľudová pozícia bubliny v gride. */
  function restPosition() {
    return {
      x: Math.max(0, lensWrap!.clientWidth - lens!.offsetWidth) * 0.62,
      y: Math.max(0, lensWrap!.clientHeight - lens!.offsetHeight) * 0.3,
    }
  }

  measure()
  buildRefraction(lens)
  gsap.set(lens, restPosition())
  gsap.to(lens, { autoAlpha: 1, duration: 1.2, delay: 0.4 })
  // jemné „želé" dýchanie, nech pôsobí tekuto
  wobble = gsap.to(lens, { scaleX: 1.035, scaleY: 0.965, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 2.6 })

  // bublina stojí a fluidne nasleduje myš; po odídení sa vráti na svoje miesto
  if (window.matchMedia('(pointer: fine)').matches) {
    const xTo = gsap.quickTo(lens, 'x', { duration: 1, ease: 'power3' })
    const yTo = gsap.quickTo(lens, 'y', { duration: 1, ease: 'power3' })
    const onMove = (event: MouseEvent) => {
      const rect = lensWrap!.getBoundingClientRect()
      const half = lens!.offsetWidth / 2
      xTo(gsap.utils.clamp(-half * 0.5, lensWrap!.clientWidth - half * 1.5, event.clientX - rect.left - half))
      yTo(gsap.utils.clamp(-half * 0.6, lensWrap!.clientHeight - half * 1.4, event.clientY - rect.top - half))
    }
    const onLeave = () => {
      const rest = restPosition()
      xTo(rest.x)
      yTo(rest.y)
    }
    const host = sectionEl.value ?? lensWrap
    host.addEventListener('mousemove', onMove, { passive: true })
    host.addEventListener('mouseleave', onLeave)
    cleanupFollow = () => {
      host.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseleave', onLeave)
    }
  }

  observer = new ResizeObserver(() => {
    measure()
    buildRefraction(lens)
    gsap.set(lens, restPosition())
  })
  observer.observe(lensWrap)

  tick = () => {
    if (!gridLive.value) return
    const lensX = Number(gsap.getProperty(lens, 'x')) + lens!.offsetWidth / 2
    const lensY = Number(gsap.getProperty(lens, 'y')) + lens!.offsetHeight / 2
    const radius = lens!.offsetWidth * 0.62
    for (const spot of spots) {
      const t = Math.max(0, 1 - Math.hypot(spot.x - lensX, spot.y - lensY) / radius)
      const eased = t * t * (3 - 2 * t)
      gsap.set(spot.el, { opacity: DIM + (1 - DIM) * eased })
    }
  }
  gsap.ticker.add(tick)
})

onBeforeUnmount(() => {
  wobble?.kill()
  if (tick) gsap.ticker.remove(tick)
  observer?.disconnect()
  cleanupFollow?.()
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

/** Veľká okrúhla liquid-glass bublina — lupa s reálnou refrakciou (feDisplacementMap). */
const lensPane = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 'clamp(260px, 26vw, 430px)',
  aspectRatio: '1',
  borderRadius: 'full',
  pointerEvents: 'none',
  opacity: 0,
  // fallback pre prehliadače bez SVG backdrop filtrov — Chrome dostane refrakciu cez JS
  backdropFilter: 'blur(6px) saturate(160%) brightness(1.15)',
  background: 'radial-gradient(120% 120% at 28% 22%, color-mix(in srgb, token(colors.dark.fg) 14%, transparent), transparent 48%), radial-gradient(140% 140% at 75% 88%, color-mix(in srgb, token(colors.accent) 12%, transparent), transparent 58%)',
  boxShadow: `
    inset 0 0 0 1px color-mix(in srgb, token(colors.dark.fg) 38%, transparent),
    inset 0 0 0 2.5px color-mix(in srgb, token(colors.dark.fg) 10%, transparent),
    inset 4px 8px 24px color-mix(in srgb, token(colors.dark.fg) 24%, transparent),
    inset 0 -18px 34px color-mix(in srgb, token(colors.accent) 14%, transparent),
    inset -10px -16px 38px color-mix(in srgb, token(colors.dark.bg) 60%, transparent),
    0 34px 90px color-mix(in srgb, token(colors.dark.bg) 65%, transparent)
  `,
  willChange: 'transform',
  _before: {
    content: '""',
    position: 'absolute',
    top: '6%',
    left: '14%',
    width: '42%',
    height: '26%',
    borderRadius: 'full',
    background: 'radial-gradient(closest-side, color-mix(in srgb, token(colors.dark.fg) 48%, transparent), transparent 72%)',
    transform: 'rotate(-24deg)',
    filter: 'blur(5px)',
  },
  _after: {
    content: '""',
    position: 'absolute',
    top: '12%',
    left: '20%',
    width: '14%',
    height: '7%',
    borderRadius: 'full',
    background: 'color-mix(in srgb, token(colors.dark.fg) 75%, transparent)',
    transform: 'rotate(-26deg)',
    filter: 'blur(2px)',
  },
  _motionReduce: { display: 'none' },
})

const filterDefs = css({
  position: 'absolute',
  width: 0,
  height: 0,
  overflow: 'hidden',
})
</script>

<template>
  <section id="technologie" ref="sectionEl" :class="section" data-dark>
    <canvas ref="canvasEl" :class="stars" aria-hidden="true" />
    <svg :class="filterDefs" aria-hidden="true">
      <filter id="daktus-lens-filter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feImage ref="feImageEl" result="map" preserveAspectRatio="none" />
        <feDisplacementMap ref="feDispEl" in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
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
