<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

/** Riadky bežia striedavo doľava/doprava ako marquee v hero. */
const ROWS = [
  ['TypeScript', 'JavaScript', 'Java', 'C#', '.NET', 'Python', 'Node.js'],
  ['React', 'Next.js', 'Vue', 'Nuxt', 'Angular', 'Svelte', 'Astro'],
  ['Tailwind CSS', 'GSAP', 'Vite', 'WordPress', 'Bootstrap', 'Redux', 'Prisma'],
  ['PostgreSQL', 'MySQL', 'MongoDB', 'MariaDB', 'Redis', 'GraphQL', 'REST API'],
  ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DigitalOcean', 'Vercel', 'Netlify', 'Websupport'],
]

/** Kľudová priesvitnosť názvov — sklo ich pri prechode rozsvieti naplno. */
const DIM = 0.34
/** Šírka neutrálneho stredu mapy (podiel menšej strany) — refrakcia žije len v okrajovom páse. */
const EDGE_INSET = 0.07
/** Zmäkčenie prechodu medzi stredom a okrajovým pásom (px v mape). */
const MAP_BLUR = 12
/** Blur skla nad pozadím (px) — nízky, nech stred ostáva číry ako pri Apple Liquid Glass. */
const GLASS_BLUR = 1.5
/** Rýchlosť marquee riadkov v px/s. */
const ROW_SPEED = 30

const sectionEl = ref<HTMLElement | null>(null)
const rowsEl = ref<HTMLElement | null>(null)
const rowsIn = useInView(rowsEl)
const rowsLive = useInView(rowsEl, { once: false, threshold: 0 })
const lensEl = ref<HTMLElement | null>(null)
const feImageEl = ref<SVGElement | null>(null)
const copies = ref<number[]>(ROWS.map(() => 2))

const rowTweens: (gsap.core.Tween | null)[] = ROWS.map(() => null)
const rowWidths: number[] = ROWS.map(() => 0)
let wobble: gsap.core.Tween | null = null
let spin: gsap.core.Tween | null = null
let wander: gsap.core.Tween | null = null
let shear: gsap.core.Tween | null = null
let morphTweens: gsap.core.Tween[] = []
let tick: (() => void) | null = null
let observer: ResizeObserver | null = null
let cleanupFollow: (() => void) | null = null

/**
 * Displacement mapa podľa liquid-glass knižníc: červený ramp kóduje posun X,
 * modrý posun Y (spojené cez „difference"), rozmazaný sivý vnútorný ovál
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
  ctx.beginPath()
  ctx.ellipse(width / 2, height / 2, width / 2 - inset, height / 2 - inset, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.filter = 'none'

  feImage.setAttribute('href', map.toDataURL())
  feImage.setAttribute('width', String(width))
  feImage.setAttribute('height', String(height))
  lens.style.backdropFilter = `url(#daktus-liquid-filter) blur(${GLASS_BLUR}px) saturate(160%) brightness(1.16)`
}

onMounted(() => {
  const host = sectionEl.value
  const rowsBox = rowsEl.value
  const lens = lensEl.value
  if (!host || !rowsBox || !lens) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let spans: HTMLElement[] = []

  function refreshSpots() {
    spans = Array.from(rowsBox!.querySelectorAll<HTMLElement>('[data-tech]'))
  }

  /** Nekonečné marquee riadky — párne doľava, nepárne doprava. */
  function buildRows() {
    const viewport = host!.clientWidth
    Array.from(rowsBox!.querySelectorAll<HTMLElement>('[data-track]')).forEach((track, index) => {
      const group = track.children[0] as HTMLElement | undefined
      const groupWidth = group?.offsetWidth
      if (!groupWidth) return
      const needed = Math.max(2, Math.ceil(viewport / groupWidth) + 1)
      const changed = needed !== copies.value[index] || groupWidth !== rowWidths[index]
      copies.value[index] = needed
      rowWidths[index] = groupWidth
      if (!rowTweens[index] || changed) {
        rowTweens[index]?.kill()
        const toLeft = index % 2 === 0
        rowTweens[index] = gsap.fromTo(
          track,
          { x: toLeft ? 0 : -groupWidth },
          { x: toLeft ? -groupWidth : 0, duration: groupWidth / ROW_SPEED, ease: 'none', repeat: -1 },
        )
      }
    })
    nextTick(refreshSpots)
  }

  refreshSpots()
  buildRows()
  buildRefraction(lens)
  document.fonts?.ready.then(buildRows)
  gsap.set(lens, {
    x: Math.max(0, host.clientWidth - lens.offsetWidth) * 0.68,
    y: Math.max(0, host.clientHeight - lens.offsetHeight) * 0.45,
  })
  gsap.to(lens, { autoAlpha: 1, duration: 1.2, delay: 0.4 })
  // náhodné želé škálovanie — pri každom opakovaní nový cieľ aj tempo
  wobble = gsap.to(lens, {
    scaleX: () => gsap.utils.random(0.96, 1.05),
    scaleY: () => gsap.utils.random(0.96, 1.05),
    duration: () => gsap.utils.random(2, 4),
    repeat: -1,
    repeatRefresh: true,
    yoyo: true,
    ease: 'sine.inOut',
  })
  // pomalé kývavé otáčanie
  spin = gsap.fromTo(lens, { rotation: -8 }, { rotation: 10, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  // autonómne blúdenie do strán — náhodný offset navrstvený na sledovanie myši
  wander = gsap.to(lens, {
    xPercent: () => gsap.utils.random(-45, 45),
    yPercent: () => gsap.utils.random(-22, 22),
    duration: () => gsap.utils.random(3, 6),
    repeat: -1,
    repeatRefresh: true,
    ease: 'sine.inOut',
  })
  // náhodné skosenie — organický shear, nech tvar nepôsobí geometricky
  shear = gsap.to(lens, {
    skewX: () => gsap.utils.random(-6, 6),
    skewY: () => gsap.utils.random(-4, 4),
    duration: () => gsap.utils.random(3, 5),
    repeat: -1,
    repeatRefresh: true,
    ease: 'sine.inOut',
  })
  // každý roh blobu sa naťahuje nezávisle — 8 náhodne desynchronizovaných polomerov
  const shape: Record<string, number> = { a: 58, b: 42, c: 55, d: 45, e: 48, f: 62, g: 40, h: 52 }
  const applyShape = () => {
    lens!.style.borderRadius = `${shape.a}% ${shape.b}% ${shape.c}% ${shape.d}% / ${shape.e}% ${shape.f}% ${shape.g}% ${shape.h}%`
  }
  morphTweens = Object.keys(shape).map((key, index) =>
    gsap.to(shape, {
      [key]: () => gsap.utils.random(28, 72),
      duration: () => gsap.utils.random(2.5, 5.5),
      delay: index * 0.4,
      repeat: -1,
      repeatRefresh: true,
      ease: 'sine.inOut',
      onUpdate: applyShape,
    }),
  )

  // blob sleduje myš globálne — mimo sekcie sa natlačí k najbližšiemu okraju či rohu
  if (window.matchMedia('(pointer: fine)').matches) {
    const xTo = gsap.quickTo(lens, 'x', { duration: 1, ease: 'power3' })
    const yTo = gsap.quickTo(lens, 'y', { duration: 1, ease: 'power3' })
    const onMove = (event: MouseEvent) => {
      const rect = host!.getBoundingClientRect()
      const halfW = lens!.offsetWidth / 2
      const halfH = lens!.offsetHeight / 2
      xTo(gsap.utils.clamp(-halfW, host!.clientWidth - halfW, event.clientX - rect.left - halfW))
      yTo(gsap.utils.clamp(-halfH, host!.clientHeight - halfH, event.clientY - rect.top - halfH))
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    cleanupFollow = () => window.removeEventListener('mousemove', onMove)
  }

  observer = new ResizeObserver(() => {
    buildRows()
    buildRefraction(lens)
  })
  observer.observe(host)

  tick = () => {
    if (!rowsLive.value) return
    const hostRect = host!.getBoundingClientRect()
    const lensX = Number(gsap.getProperty(lens, 'x')) + lens!.offsetWidth / 2
    const lensY = Number(gsap.getProperty(lens, 'y')) + lens!.offsetHeight / 2
    const radius = lens!.offsetWidth * 0.42
    for (const el of spans) {
      const rect = el.getBoundingClientRect()
      const dx = rect.left - hostRect.left + rect.width / 2 - lensX
      const dy = rect.top - hostRect.top + rect.height / 2 - lensY
      const t = Math.max(0, 1 - Math.hypot(dx, dy) / radius)
      const eased = t * t * (3 - 2 * t)
      gsap.set(el, { opacity: DIM + (1 - DIM) * eased })
    }
  }
  gsap.ticker.add(tick)
})

onBeforeUnmount(() => {
  rowTweens.forEach(tween => tween?.kill())
  morphTweens.forEach(tween => tween.kill())
  wobble?.kill()
  spin?.kill()
  wander?.kill()
  shear?.kill()
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
  background: 'dark.bg',
  color: 'dark.fg',
})

const content = css({
  position: 'relative',
  zIndex: 2,
})

const rows = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(52px, 7.5vh, 92px)',
  marginTop: 'clamp(70px, 9vh, 120px)',
})

const rowClip = css({
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
  gap: 'clamp(40px, 4vw, 80px)',
  paddingInline: 'clamp(20px, 2vw, 40px)',
})

const tech = css({
  fontSize: 'clamp(15px, 1.4vw, 25px)',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'dark.fg',
  opacity: 0.34,
  cursor: 'default',
  whiteSpace: 'nowrap',
})

/** Oddeľovač v blueprint štýle — obrysový diamant namiesto hviezdičky. */
const separator = css({
  width: '7px',
  height: '7px',
  flexShrink: 0,
  border: '1.5px solid',
  borderColor: 'accent',
  transform: 'rotate(45deg)',
  opacity: 0.45,
})

/** Liquid glass blob — materiál podľa referenčných liquid-glass knižníc, v našich tokenoch. */
const lensPane = css({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 3,
  width: 'clamp(460px, 46vw, 780px)',
  aspectRatio: '1.5 / 1',
  borderRadius: '58% 42% 55% 45% / 48% 62% 40% 52%',
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
    </div>
    <div ref="rowsEl" :class="[rows, fadeIn(), { in: rowsIn }]">
      <div v-for="(row, rowIndex) in ROWS" :key="rowIndex" :class="rowClip">
        <div :class="track" data-track>
          <div v-for="copy in (copies[rowIndex] ?? 2)" :key="copy" :class="group">
            <template v-for="(name, index) in row" :key="index">
              <span :class="tech" data-tech>{{ name }}</span>
              <span :class="separator" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <span ref="lensEl" :class="lensPane" aria-hidden="true" />
  </section>
</template>
