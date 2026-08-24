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
  right: 'clamp(44px, 9.5vw, 185px)',
  top: 'clamp(150px, 19vh, 245px)',
  zIndex: 1,
  width: 'clamp(285px, 23vw, 400px)',
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

/** Raz za deväť sekúnd si poskočí — pružne, so squash-and-stretch hmoty. */
const jump = css({
  transformOrigin: '50% 100%',
  animation: 'clayJump 9s ease-in-out infinite',
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

// plastelínové odtiene ako logomark: driek čierny (ink), bruško mint (accent)
// (stopColor nie je Panda vlastnosť, tokeny preto vždy cez explicitné token())
const stopSageLight = css({ stopColor: 'color-mix(in srgb, token(colors.accent) 55%, white)' })
const stopSage = css({ stopColor: 'token(colors.accent)' })
const stopSageDeep = css({ stopColor: 'token(colors.accent.deep)' })
const stopInkLight = css({ stopColor: 'color-mix(in srgb, token(colors.ink) 68%, white)' })
const stopInk = css({ stopColor: 'color-mix(in srgb, token(colors.ink) 90%, white)' })
const stopInkDeep = css({ stopColor: 'token(colors.ink)' })

const seam = css({ stroke: 'color-mix(in srgb, token(colors.accent.deep) 55%, black)' })

/** Matné zrno a jamky hmoty — difúzne svetlo cez šum, mieša sa soft-light do tvarov. */
const bumps = css({ mixBlendMode: 'soft-light', opacity: 0.55 })
</script>

<template>
  <div ref="rootEl" :class="stage" aria-hidden="true">
    <div :class="float">
      <div :class="jump">
        <svg :class="mark" viewBox="0 0 210 226" fill="none">
        <defs>
          <linearGradient id="clay-sage" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" :class="stopSageLight" />
            <stop offset="0.55" :class="stopSage" />
            <stop offset="1" :class="stopSageDeep" />
          </linearGradient>
          <linearGradient id="clay-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" :class="stopInkLight" />
            <stop offset="0.6" :class="stopInk" />
            <stop offset="1" :class="stopInkDeep" />
          </linearGradient>
          <!-- ručne miesený okraj: turbulencia jemne zvlní geometriu tvarov -->
          <filter id="clay-edge" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence type="turbulence" baseFrequency="0.028" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <!-- matný povrch: difúzne svetlo cez šum = jamky a odtlačky, žiadny lesk -->
          <filter id="clay-bumps">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="4" seed="11" result="noise" />
            <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1.5">
              <feDistantLight azimuth="235" elevation="55" />
            </feDiffuseLighting>
          </filter>
          <mask id="clay-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="210" height="226">
            <rect x="30" y="18" width="42" height="190" rx="21" fill="white" />
            <path d="M 100 39 a 74 74 0 0 1 0 148" stroke="white" stroke-width="44" stroke-linecap="round" />
          </mask>
        </defs>
        <g filter="url(#clay-edge)">
          <!-- drieková tehlička -->
          <rect x="30" y="18" width="42" height="190" rx="21" fill="url(#clay-body)" />
          <!-- bruško déčka — hrubý šalviový ťah so švom po obvode -->
          <path d="M 100 39 a 74 74 0 0 1 0 148" stroke="url(#clay-sage)" stroke-width="44" stroke-linecap="round" />
          <path :class="seam" d="M 143 152 l 23 -13" stroke-width="4" stroke-linecap="round" opacity="0.45" />
          <path :class="seam" d="M 147 161 l 19 -11" stroke-width="3" stroke-linecap="round" opacity="0.3" />
          <!-- textúra hmoty cez oba tvary -->
          <g :class="bumps" mask="url(#clay-mask)">
            <rect x="0" y="0" width="210" height="226" filter="url(#clay-bumps)" />
          </g>
        </g>
        </svg>
      </div>
    </div>
    <span :class="ground" />
  </div>
</template>
