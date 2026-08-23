import { gsap } from 'gsap'
import type { Ref } from 'vue'
import { token } from '~~/styled-system/tokens'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
}

interface Trace {
  points: [number, number][]
  sage: boolean
}

/** #rrggbb token → rgba() reťazec pre canvas API (tokeny nie sú v canvase dostupné inak). */
function alpha(hex: string, value: number) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${value})`
}

/** „Konštelácia" v sekcii technológií — hviezdy + naznačené vodivé dráhy plošného spoja. */
export function useStarfield(section: Ref<HTMLElement | null>, canvas: Ref<HTMLCanvasElement | null>) {
  onMounted(() => {
    const sectionEl = section.value
    const canvasEl = canvas.value
    const ctx = canvasEl?.getContext('2d')
    if (!sectionEl || !canvasEl || !ctx) return

    const fg = token('colors.dark.fg')
    const accent = token('colors.accent')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let stars: Star[] = []
    let traces: Trace[] = []

    function size() {
      if (!sectionEl || !canvasEl || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = sectionEl.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      canvasEl.width = width * dpr
      canvasEl.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stars = Array.from({ length: Math.round(width * height / 14000) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        phase: Math.random() * 6.28,
        speed: 0.4 + Math.random() * 0.8,
      }))

      traces = Array.from({ length: 11 }, () => {
        const points: [number, number][] = [[Math.random() * width, Math.random() * height]]
        const segments = 2 + Math.floor(Math.random() * 3)
        for (let s = 0; s < segments; s++) {
          const [lastX, lastY] = points[points.length - 1]!
          const length = 60 + Math.random() * 200
          points.push(s % 2 === 0
            ? [lastX + (Math.random() > 0.5 ? length : -length), lastY]
            : [lastX, lastY + (Math.random() > 0.5 ? length * 0.4 : -length * 0.4)])
        }
        return { points, sage: Math.random() > 0.75 }
      })
    }

    function draw(time: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, alpha(fg, 0))
      gradient.addColorStop(0.5, alpha(fg, 0.22))
      gradient.addColorStop(1, alpha(fg, 0))
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(width / 2, 0)
      ctx.lineTo(width / 2, height)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(width / 2, height * 0.35, 4, 0, 6.2832)
      ctx.strokeStyle = alpha(fg, 0.5)
      ctx.lineWidth = 1.4
      ctx.stroke()

      for (const trace of traces) {
        ctx.strokeStyle = trace.sage ? alpha(accent, 0.16) : alpha(fg, 0.08)
        ctx.lineWidth = 1
        ctx.beginPath()
        trace.points.forEach(([x, y], index) => (index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)))
        ctx.stroke()
        const [endX, endY] = trace.points[trace.points.length - 1]!
        ctx.strokeStyle = trace.sage ? alpha(accent, 0.3) : alpha(fg, 0.18)
        ctx.strokeRect(endX - 3.5, endY - 2.5, 7, 5)
      }

      for (const star of stars) {
        const opacity = 0.12 + 0.5 * Math.abs(Math.sin(time * 0.0005 * star.speed + star.phase))
        ctx.fillStyle = alpha(fg, Number(opacity.toFixed(3)))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, 6.2832)
        ctx.fill()
      }
    }

    size()
    const observer = new ResizeObserver(size)
    observer.observe(sectionEl)

    let tick: ((time: number) => void) | null = null
    if (reduced) {
      draw(0)
    }
    else {
      tick = (time) => {
        const rect = sectionEl.getBoundingClientRect()
        if (rect.bottom > -200 && rect.top < window.innerHeight + 200) draw(time * 1000)
      }
      gsap.ticker.add(tick)
    }

    onBeforeUnmount(() => {
      observer.disconnect()
      if (tick) gsap.ticker.remove(tick)
    })
  })
}
