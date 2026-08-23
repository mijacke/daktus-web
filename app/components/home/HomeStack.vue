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

/** Kľudová priesvitnosť názvov — sklo ich pri prechode rozsvieti naplno. */
const DIM = 0.34
/** Šírka neutrálneho stredu mapy (podiel menšej strany) — refrakcia žije len v okrajovom páse. */
const EDGE_INSET = 0.07
/** Zmäkčenie prechodu medzi stredom a okrajovým pásom (px v mape). */
const MAP_BLUR = 12
/** Blur skla nad pozadím (px) — nízky, nech stred ostáva číry ako pri Apple Liquid Glass. */
const GLASS_BLUR = 1.5

const sectionEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
useStarfield(sectionEl, canvasEl)

const gridEl = ref<HTMLElement | null>(null)
const gridIn = useInView(gridEl)
const gridLive = useInView(gridEl, { once: false, threshold: 0 })
const lensWrapEl = ref<HTMLElement | null>(null)
const lensEl = ref<HTMLElement | null>(null)
const feImageEl = ref<SVGElement | null>(null)

let wobble: gsap.core.Tween | null = null
let tick: (() => void) | null = null
let observer: ResizeObserver | null = null
let cleanupFollow: (() => void) | null = null

/**
 * Displacement mapa podľa liquid-glass knižníc: červený ramp kóduje posun X,
 * modrý posun Y (spojené cez „difference"), rozmazaný sivý vnútorný obdĺžnik
 * neutralizuje stred — láme sa len okrajový pás, presne ako Apple Liquid Glass.
 */
function buildRefraction(lens: HTMLElement) {
  const feImage = feImageEl.value
  if (!feImage || !('chrome' in window)) return

  const width = Math.round(lens.offsetWidth)
  const height = Math.round(lens.offsetHeight)
  if (!width || !height) return
  const map = document.createElement('canvas')
  map.width = width
  map.height = height
  const ctx = map.getContext('2d')
  if (!ctx) return

  const rampX = ctx.createLinearGradient(0, 0, width, 0)
  rampX.addColorStop(0, 'rgb(0, 0, 0)')
  rampX.addColorStop(1, 'rgb(255, 0, 0)')
  ctx.fillStyle = rampX
  ctx.fillRect(0, 0, width, height)

  ctx.globalCompositeOperation = 'difference'
  const rampY = ctx.createLinearGradient(0, 0, 0, height)
  rampY.addColorStop(0, 'rgb(0, 0, 0)')
  rampY.addColorStop(1, 'rgb(0, 0, 255)')
  ctx.fillStyle = rampY
  ctx.fillRect(0, 0, width, height)

  ctx.globalCompositeOperation = 'source-over'
  ctx.filter = `blur(${MAP_BLUR}px)`
  ctx.fillStyle = 'rgb(128, 128, 128)'
  const inset = Math.min(width, height) * EDGE_INSET
  const radius = Math.max(0, Math.min(width, height) / 2 - inset)
  ctx.beginPath()
  ctx.roundRect(inset, inset, width - inset * 2, height - inset * 2, radius)
  ctx.fill()
  ctx.filter = 'none'

  feImage.setAttribute('href', map.toDataURL())
  feImage.setAttribute('width', String(width))
  feImage.setAttribute('height', String(height))
  lens.style.backdropFilter = `url(#daktus-liquid-filter) blur(${GLASS_BLUR}px) saturate(160%) brightness(1.16)`
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

  /** Kľudová pozícia skla v gride. */
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
  wobble = gsap.to(lens, { scaleX: 1.025, scaleY: 0.975, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 2.6 })

  // sklo stojí a fluidne nasleduje myš; po odídení sa vráti na svoje miesto
  if (window.matchMedia('(pointer: fine)').matches) {
    const xTo = gsap.quickTo(lens, 'x', { duration: 1, ease: 'power3' })
    const yTo = gsap.quickTo(lens, 'y', { duration: 1, ease: 'power3' })
    const onMove = (event: MouseEvent) => {
      const rect = lensWrap!.getBoundingClientRect()
      const halfW = lens!.offsetWidth / 2
      const halfH = lens!.offsetHeight / 2
      xTo(gsap.utils.clamp(-halfW * 0.5, lensWrap!.clientWidth - halfW * 1.5, event.clientX - rect.left - halfW))
      yTo(gsap.utils.clamp(-halfH * 0.8, lensWrap!.clientHeight - halfH * 1.2, event.clientY - rect.top - halfH))
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
    const radius = lens!.offsetWidth * 0.55
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

/** Liquid glass tabuľa — materiál podľa referenčných liquid-glass knižníc, v našich tokenoch. */
const lensPane = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 'clamp(340px, 34vw, 560px)',
  aspectRatio: '16 / 9',
  borderRadius: '40px',
  pointerEvents: 'none',
  opacity: 0,
  // fallback pre prehliadače bez SVG backdrop filtrov — Chrome dostane refrakciu cez JS
  backdropFilter: 'blur(6px) saturate(150%) brightness(1.08)',
  background: 'linear-gradient(180deg, color-mix(in srgb, token(colors.dark.bg) 8%, transparent), color-mix(in srgb, token(colors.dark.bg) 18%, transparent))',
  boxShadow: `
    0 24px 60px color-mix(in srgb, token(colors.dark.bg) 72%, transparent),
    inset 0 1px 1px color-mix(in srgb, token(colors.dark.fg) 50%, transparent),
    inset 0 -8px 20px color-mix(in srgb, token(colors.dark.fg) 6%, transparent),
    inset 0 0 0 1px color-mix(in srgb, token(colors.dark.fg) 13%, transparent)
  `,
  willChange: 'transform',
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
      <filter id="daktus-liquid-filter" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feImage ref="feImageEl" result="map" preserveAspectRatio="none" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-90" xChannelSelector="R" yChannelSelector="B" result="dispR" />
        <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="chanR" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-96" xChannelSelector="R" yChannelSelector="B" result="dispG" />
        <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="chanG" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-102" xChannelSelector="R" yChannelSelector="B" result="dispB" />
        <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="chanB" />
        <feBlend in="chanR" in2="chanG" mode="screen" result="blendRG" />
        <feBlend in="blendRG" in2="chanB" mode="screen" />
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
