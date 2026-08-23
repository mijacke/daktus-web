<script setup lang="ts">
import { gsap } from 'gsap'
import WebGLFluidEnhanced from 'webgl-fluid-enhanced'
import { css } from '~~/styled-system/css'
import { token } from '~~/styled-system/tokens'

/** Riadky bežia striedavo doľava/doprava ako marquee v hero. */
const ROWS = [
  ['TypeScript', 'JavaScript', 'Java', 'C#', '.NET', 'Python', 'Node.js'],
  ['React', 'Next.js', 'Vue', 'Nuxt', 'Angular', 'Svelte', 'Astro'],
  ['Tailwind CSS', 'GSAP', 'Vite', 'WordPress', 'Bootstrap', 'Redux', 'Prisma'],
  ['PostgreSQL', 'MySQL', 'MongoDB', 'MariaDB', 'Redis', 'GraphQL', 'REST API'],
  ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DigitalOcean', 'Vercel', 'Netlify', 'Websupport'],
]

/** Kľudová priesvitnosť názvov — kurzor ich pri prechode rozsvieti naplno. */
const DIM = 0.34
/** Rýchlosť marquee riadkov v px/s. */
const ROW_SPEED = 30
/** Dosah rozsvecovania okolo kurzora (px). */
const GLOW_RADIUS = 340

const sectionEl = ref<HTMLElement | null>(null)
const rowsEl = ref<HTMLElement | null>(null)
const rowsIn = useInView(rowsEl)
const rowsLive = useInView(rowsEl, { once: false, threshold: 0 })
const fluidEl = ref<HTMLElement | null>(null)
const copies = ref<number[]>(ROWS.map(() => 2))

const rowTweens: (gsap.core.Tween | null)[] = ROWS.map(() => null)
const rowWidths: number[] = ROWS.map(() => 0)
let tick: (() => void) | null = null
let observer: ResizeObserver | null = null
let cleanupMouse: (() => void) | null = null
let fluidSim: WebGLFluidEnhanced | null = null

onMounted(() => {
  const host = sectionEl.value
  const rowsBox = rowsEl.value
  const fluidBox = fluidEl.value
  if (!host || !rowsBox || !fluidBox) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let spans: HTMLElement[] = []
  let mouseX = -10000
  let mouseY = -10000

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
  document.fonts?.ready.then(buildRows)

  observer = new ResizeObserver(buildRows)
  observer.observe(host)

  // fluid simulácia v štýle lusion.co — myš zanecháva tekutú stopu (len presný pointer)
  const finePointer = window.matchMedia('(pointer: fine)').matches
  if (finePointer) {
    fluidSim = new WebGLFluidEnhanced(fluidBox)
    fluidSim.setConfig({
      colorPalette: [token('colors.accent'), token('colors.accent.deep')],
      colorful: false,
      transparent: true,
      brightness: 0.35,
      simResolution: 96,
      dyeResolution: 512,
      densityDissipation: 3.2,
      velocityDissipation: 0.5,
      curl: 26,
      splatRadius: 0.12,
      splatForce: 3800,
      hover: true,
      bloom: false,
      sunrays: false,
    })
    fluidSim.start()
    fluidSim.multipleSplats(2)

    const onMove = (event: MouseEvent) => {
      const rect = host!.getBoundingClientRect()
      mouseX = event.clientX - rect.left
      mouseY = event.clientY - rect.top
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    cleanupMouse = () => window.removeEventListener('mousemove', onMove)
  }

  // rozsvecovanie názvov v okolí kurzora — číta živé pozície aj počas behu marquee
  tick = () => {
    if (!rowsLive.value) return
    const hostRect = host!.getBoundingClientRect()
    for (const el of spans) {
      const rect = el.getBoundingClientRect()
      const dx = rect.left - hostRect.left + rect.width / 2 - mouseX
      const dy = rect.top - hostRect.top + rect.height / 2 - mouseY
      const t = Math.max(0, 1 - Math.hypot(dx, dy) / GLOW_RADIUS)
      const eased = t * t * (3 - 2 * t)
      gsap.set(el, { opacity: DIM + (1 - DIM) * eased })
    }
  }
  gsap.ticker.add(tick)
})

onBeforeUnmount(() => {
  rowTweens.forEach(tween => tween?.kill())
  if (tick) gsap.ticker.remove(tick)
  observer?.disconnect()
  cleanupMouse?.()
  fluidSim?.stop()
  fluidSim = null
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

/**
 * Fluid stopa za kurzorom — WebGL simulácia cez celú sekciu. Vonkajší shell drží
 * absolútnu pozíciu (knižnica si vnútorný kontajner prepisuje na position: relative).
 */
const fluidShell = css({
  position: 'absolute',
  inset: 0,
  zIndex: 3,
  mixBlendMode: 'screen',
  '@media (pointer: coarse)': { display: 'none' },
  _motionReduce: { display: 'none' },
})

const fluidInner = css({
  width: '100%',
  height: '100%',
})
</script>

<template>
  <section id="technologie" ref="sectionEl" :class="section" data-dark>
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
    <div :class="fluidShell" aria-hidden="true">
      <div ref="fluidEl" :class="fluidInner" />
    </div>
  </section>
</template>
