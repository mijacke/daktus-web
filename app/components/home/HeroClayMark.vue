<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

/**
 * Plastelínové „D so švom" — logomark vytvarovaný z hmoty, podpis štúdia
 * v pravej časti hera. Levituje, na scroll má jemný parallax a nakláňa sa
 * za kurzorom; pri prefers-reduced-motion stojí.
 */
const PARALLAX_SHIFT = 26
const TILT_MAX = 5

const rootEl = ref<HTMLElement | null>(null)
const reduced = useReducedMotion()
let cleanup: (() => void) | null = null

onMounted(() => {
  const host = rootEl.value
  if (!host || reduced.value) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  const toY = gsap.quickTo(host, 'y', { duration: 0.7, ease: 'power2.out' })
  const toRotate = gsap.quickTo(host, 'rotation', { duration: 0.9, ease: 'power2.out' })

  const onScroll = () => {
    toY(Math.min(window.scrollY / 14, PARALLAX_SHIFT))
  }
  const onMove = (event: MouseEvent) => {
    const ratio = event.clientX / window.innerWidth - 0.5
    toRotate(ratio * 2 * TILT_MAX)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMove, { passive: true })
  cleanup = () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('mousemove', onMove)
  }
})

onBeforeUnmount(() => cleanup?.())

const stage = css({
  position: 'absolute',
  right: 'clamp(30px, 6vw, 130px)',
  top: 'clamp(150px, 18vh, 230px)',
  zIndex: 1,
  width: 'clamp(190px, 15vw, 270px)',
  pointerEvents: 'none',
  // objaví sa až po dostavaní hera (sekvencia v HomeHero končí ~2,2 s)
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'opacity 0.9s ease 2s, transform 1s {easings.out} 2s',
  '.done &': { opacity: 1, transform: 'none' },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
  '@media (max-width: 1180px)': { display: 'none' },
})

const float = css({
  animation: 'floaty 6s ease-in-out infinite',
  _motionReduce: { animation: 'none' },
})

const mark = css({
  display: 'block',
  width: '100%',
  height: 'auto',
  filter: 'drop-shadow(0 18px 30px color-mix(in srgb, token(colors.ink) 24%, transparent))',
})

const ground = css({
  position: 'absolute',
  left: '50%',
  bottom: '-30px',
  transform: 'translateX(-50%)',
  width: '68%',
  height: '22px',
  borderRadius: 'full',
  background: 'radial-gradient(closest-side, color-mix(in srgb, token(colors.ink) 15%, transparent), transparent 72%)',
  animation: 'floatShadow 6s ease-in-out infinite',
  _motionReduce: { animation: 'none' },
})

// plastelínové odtiene — šalvia z akcentu, telo z clay tónov mockup paliet
// (stopColor nie je Panda vlastnosť, tokeny preto vždy cez explicitné token())
const stopSageLight = css({ stopColor: 'color-mix(in srgb, token(colors.accent) 52%, white)' })
const stopSage = css({ stopColor: 'token(colors.accent)' })
const stopSageDeep = css({ stopColor: 'token(colors.accent.deep)' })
const stopClayLight = css({ stopColor: 'token(colors.mockup.cream)' })
const stopClay = css({ stopColor: 'token(colors.mockup.clay)' })
const stopClayDeep = css({ stopColor: 'color-mix(in srgb, token(colors.mockup.clay2) 90%, black)' })

const barSheen = css({ fill: 'white/45' })
const bowlSheen = css({ stroke: 'white/40' })
const seam = css({ stroke: 'color-mix(in srgb, token(colors.accent.deep) 55%, black)' })
</script>

<template>
  <div ref="rootEl" :class="stage" aria-hidden="true">
    <div :class="float">
      <svg :class="mark" viewBox="0 0 210 226" fill="none">
        <defs>
          <linearGradient id="clay-sage" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" :class="stopSageLight" />
            <stop offset="0.55" :class="stopSage" />
            <stop offset="1" :class="stopSageDeep" />
          </linearGradient>
          <linearGradient id="clay-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" :class="stopClayLight" />
            <stop offset="0.6" :class="stopClay" />
            <stop offset="1" :class="stopClayDeep" />
          </linearGradient>
        </defs>
        <!-- drieková tehlička s jemným leskom vytlačeným do hmoty -->
        <rect x="30" y="18" width="42" height="190" rx="21" fill="url(#clay-body)" />
        <rect :class="barSheen" x="38" y="27" width="10" height="76" rx="5" opacity="0.55" />
        <!-- bruško déčka — hrubý šalviový ťah so švom po obvode -->
        <path d="M 100 39 a 74 74 0 0 1 0 148" stroke="url(#clay-sage)" stroke-width="44" stroke-linecap="round" />
        <path :class="bowlSheen" d="M 104 53 a 58 58 0 0 1 31 23" stroke-width="9" stroke-linecap="round" opacity="0.6" />
        <path :class="seam" d="M 143 152 l 23 -13" stroke-width="4" stroke-linecap="round" opacity="0.5" />
        <path :class="seam" d="M 147 161 l 19 -11" stroke-width="3" stroke-linecap="round" opacity="0.32" />
      </svg>
    </div>
    <span :class="ground" />
  </div>
</template>
