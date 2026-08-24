<script setup lang="ts">
import { gsap } from 'gsap'
import { css } from '~~/styled-system/css'

const ballEl = ref<HTMLElement | null>(null)
const innerEl = ref<HTMLElement | null>(null)
const isLink = ref(false)
const isView = ref(false)
const isMega = ref(false)
const isSolid = ref(false)
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
  // cubertovský pohyb: každý pohyb myši spustí expo.out dojazd z aktuálnej pozície
  const DURATION = 550
  let startX = x
  let startY = y
  let elapsed = DURATION
  let stretch = 0
  let angle = 0

  gsap.set(ball, { xPercent: -50, yPercent: -50, x, y })
  const setBall = gsap.quickSetter(ball, 'css') as (vars: gsap.TweenVars) => void
  const setInner = gsap.quickSetter(inner, 'css') as (vars: gsap.TweenVars) => void

  const onMove = (event: MouseEvent) => {
    targetX = event.clientX
    targetY = event.clientY
    startX = x
    startY = y
    elapsed = 0
  }
  const evalTarget = (target: Element | null) => {
    const view = target?.closest('[data-cursor="view"]')
    isView.value = !!view
    // nad veľkými nadpismi narastie guľa na maximum a invertuje ich farby
    isMega.value = !view && !!target?.closest('[data-cursor="mega"]')
    // svetlé kryty si vyžiadajú pevnú čiernu guľu — difference by tam pôsobil sivo
    isSolid.value = !!view && view.hasAttribute('data-cursor-solid')
    isLink.value = !view && !isMega.value && !!target?.closest('a, button')
    // rozbalený náhľad je na pozeranie, nie na klikanie — guľka ustúpi natívnemu kurzoru
    isHidden.value = !!target?.closest('[data-cursor="none"]')
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
    elapsed += Math.min(deltaTime, 34)
    const p = Math.min(elapsed / DURATION, 1)
    const eased = p === 1 ? 1 : 1 - 2 ** (-10 * p) // expo.out ako cuberto
    const nx = startX + (targetX - startX) * eased
    const ny = startY + (targetY - startY) * eased
    const dx = nx - x
    const dy = ny - y
    x = nx
    y = ny
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
    startX = x
    startY = y
    elapsed = DURATION
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
  transitionProperty: 'width, height, opacity',
  // pomalý mäkký rast/zmenšovanie na hranách kariet; fade guľky ostáva svižný
  transitionDuration: '0.8s, 0.8s, 0.35s',
  transitionTimingFunction: 'out',
  '@media (pointer: coarse)': { display: 'none' },
  '&.is-link': { width: '48px', height: '48px' },
  // veľká guľa je tá istá sklenená invertujúca ako malá, len väčšia —
  // žiadne prepínanie blendu, prechod je čisto veľkostný
  '&.is-view': { width: '86px', height: '86px' },
  // najväčšia guľa — nad veľkými nadpismi obracia farby celých glyfov
  '&.is-mega': { width: '160px', height: '160px' },
  // solid: nad svetlým krytom neinvertuje — priesvitné tmavé sklo
  '&.is-view.is-solid': { mixBlendMode: 'normal', background: 'ink/35', backdropFilter: 'blur(3px)' },
  '&.is-hidden': { opacity: 0 },
})

const innerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'ink',
  opacity: 0,
  // odchod z karty: šípka zmizne hneď, nezmenšuje sa spolu s guľou
  transition: 'opacity 0.15s ease',
  // príchod: objaví sa jemne, až keď guľa už rastie; tmavá šípka sa v
  // invertujúcej guli vykreslí ako svetlá voči jej obsahu
  '.is-view &': { opacity: 1, transitionDuration: '0.3s', transitionDelay: '0.12s' },
  // v plnej čiernej guli sa šípka neinvertuje — potrebuje svetlú farbu priamo
  '.is-view.is-solid &': { color: 'paper' },
})
</script>

<template>
  <div
    ref="ballEl"
    :class="[ballStyle, { 'is-link': isLink, 'is-view': isView, 'is-mega': isMega, 'is-solid': isSolid, 'is-hidden': isHidden || isAway || isOut }]"
    aria-hidden="true"
  >
    <span ref="innerEl" :class="innerStyle"><IconArrow :size="30" /></span>
  </div>
</template>
