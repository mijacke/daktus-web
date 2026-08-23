<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const ballEl = ref<HTMLElement | null>(null)
const innerEl = ref<HTMLElement | null>(null)
const isLink = ref(false)
const isView = ref(false)
const isHidden = ref(false)
const isAway = ref(false)
const isOut = ref(false)

let cleanup: (() => void) | null = null

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return
  const ball = ballEl.value
  const inner = innerEl.value
  if (!ball || !inner) return

  // Pohyb rieši lerp v tickeri namiesto tweenov — tween stav sa po suspendnutí
  // rAF (skryté/prekryté okno) rozbíja a guľka potom skáče namiesto animácie.
  let x = window.innerWidth / 2
  let y = window.innerHeight / 2
  let targetX = x
  let targetY = y
  let stretch = 0
  let angle = 0

  gsap.set(ball, { xPercent: -50, yPercent: -50, x, y })
  const setBall = gsap.quickSetter(ball, 'css') as (vars: gsap.TweenVars) => void
  const setInner = gsap.quickSetter(inner, 'css') as (vars: gsap.TweenVars) => void

  const onMove = (event: MouseEvent) => {
    targetX = event.clientX
    targetY = event.clientY
  }
  const evalTarget = (target: Element | null) => {
    const view = target?.closest('[data-cursor="view"]')
    isView.value = !!view
    isLink.value = !view && !!target?.closest('a, button')
    // vnútri iframe sa mousemove nešíri — guľka by zamrzla na okraji, radšej zmizne
    isHidden.value = !!target?.closest('iframe')
  }
  const onOver = (event: MouseEvent) => {
    evalTarget(event.target instanceof Element ? event.target : null)
  }
  const onClick = (event: MouseEvent) => {
    // klik môže zmeniť data-cursor pod kurzorom (aktívna karta) — prehodnoť po re-renderi
    const target = event.target instanceof Element ? event.target : null
    nextTick(() => evalTarget(target))
  }

  const onTick = (_time: number, deltaTime: number) => {
    // clamp: po dlhom spánku tickeru guľka dobehne plynulo, žiadny skok
    const frames = Math.min(deltaTime / (1000 / 60), 2)
    const ease = 1 - (1 - 0.22) ** frames
    const dx = (targetX - x) * ease
    const dy = (targetY - y) * ease
    x += dx
    y += dy
    const dist = Math.hypot(dx, dy)
    if (dist > 0.1) angle = (Math.atan2(dy, dx) * 180) / Math.PI
    const speed = dist / Math.max(deltaTime, 1)
    const target = Math.min(speed * 0.35, 0.4)
    stretch += (target - stretch) * 0.2
    setBall({ x, y, rotation: angle, scaleX: 1 + stretch, scaleY: 1 - stretch * 0.6 })
    setInner({ rotation: -angle })
  }

  // pri strate fokusu okna (druhý monitor, iná appka) guľka zmizne
  // a vráti sa až s fokusom — nezostáva visieť opustená na stránke
  isAway.value = !document.hasFocus()
  // pri návrate zo skrytého stavu sa guľka objaví priamo pri kurzore,
  // nie letom cez obrazovku zo starej pozície
  const snapToCursor = () => {
    x = targetX
    y = targetY
    stretch = 0
    setBall({ x, y, rotation: angle, scaleX: 1, scaleY: 1 })
    setInner({ rotation: -angle })
  }
  const onBlur = () => (isAway.value = true)
  const onFocus = () => {
    snapToCursor()
    isAway.value = false
  }
  // plynulé zmiznutie aj pri odchode kurzora za okraj viewportu (ako cuberto.com)
  const onLeave = () => (isOut.value = true)
  const onEnter = (event: MouseEvent) => {
    targetX = event.clientX
    targetY = event.clientY
    snapToCursor()
    isOut.value = false
  }

  document.addEventListener('mousemove', onMove, { passive: true })
  // mousedown chodí pred focusom — klik z inej obrazovky dodá súradnice pre snap
  document.addEventListener('mousedown', onMove, { passive: true })
  document.addEventListener('mouseover', onOver)
  document.addEventListener('click', onClick)
  document.addEventListener('mouseleave', onLeave)
  document.addEventListener('mouseenter', onEnter)
  window.addEventListener('blur', onBlur)
  window.addEventListener('focus', onFocus)
  gsap.ticker.add(onTick)
  cleanup = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mousedown', onMove)
    document.removeEventListener('mouseover', onOver)
    document.removeEventListener('click', onClick)
    document.removeEventListener('mouseleave', onLeave)
    document.removeEventListener('mouseenter', onEnter)
    window.removeEventListener('blur', onBlur)
    window.removeEventListener('focus', onFocus)
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
  // podklad sa najprv odfarbí, difference potom invertuje len svetlosť —
  // nad fotkami žiadne farebné negatívy, len čierno-biely efekt
  backdropFilter: 'grayscale(1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transitionProperty: 'width, height, background, opacity',
  transitionDuration: '0.35s',
  transitionTimingFunction: 'out',
  '@media (pointer: coarse)': { display: 'none' },
  '&.is-link': { width: '48px', height: '48px' },
  '&.is-view': {
    width: '86px',
    height: '86px',
    // nad projektmi otáča len svetlosť (čierna↔biela), odtiene fotiek ostávajú
    background: 'transparent',
    mixBlendMode: 'normal',
    backdropFilter: 'invert(1) hue-rotate(180deg)',
  },
  '&.is-hidden': { opacity: 0 },
})

const innerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'ink',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  // šípka sa v „lens" guli invertuje voči jej obsahu, aby bola vždy čitateľná
  '.is-view &': { opacity: 1, color: 'white', mixBlendMode: 'difference' },
})
</script>

<template>
  <div
    ref="ballEl"
    :class="[ballStyle, { 'is-link': isLink, 'is-view': isView, 'is-hidden': isHidden || isAway || isOut }]"
    aria-hidden="true"
  >
    <span ref="innerEl" :class="innerStyle"><IconArrow :size="30" /></span>
  </div>
</template>
