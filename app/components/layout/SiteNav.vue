<script setup lang="ts">
import { css } from '~~/styled-system/css'

const NAV_LINKS = [
  { label: 'Projekty', href: '/projekty' },
  { label: 'Služby', href: '/sluzby' },
  { label: 'Cenník', href: '/cennik' },
  { label: 'Kontakt', href: '/kontakt' },
]

const scrolled = ref(false)
const overDark = ref(false)
let darkSections: Element[] = []

function update() {
  scrolled.value = window.scrollY > 30
  overDark.value = darkSections.some((el) => {
    const rect = el.getBoundingClientRect()
    return rect.top < 56 && rect.bottom > 22
  })
}

function collect() {
  darkSections = Array.from(document.querySelectorAll('[data-dark]'))
  update()
}

onMounted(() => {
  collect()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

// po prepnutí stránky sa tmavé sekcie menia — pozbieraj ich nanovo
useNuxtApp().hook('page:finish', () => nextTick(collect))

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})

const nav = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '78px',
  paddingInline: 'clamp(20px, 3.5vw, 72px)',
  borderBottom: '1px solid transparent',
  transitionProperty: 'background, border-color, height, color',
  transitionDuration: '0.4s',
  '&.scrolled': {
    background: 'paper/90',
    backdropFilter: 'blur(14px)',
    borderColor: 'hairline.soft',
    height: '66px',
  },
  '&.over-dark': { color: 'dark.fg' },
  '&.over-dark.scrolled': { background: 'dark.bg/86', borderColor: 'dark.hairline' },
})

const logo = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '22px',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
})

const links = css({
  display: 'flex',
  alignItems: 'center',
  gap: '36px',
})

const navLink = css({
  position: 'relative',
  fontSize: '15px',
  fontWeight: 500,
  _after: {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: '-5px',
    height: '1.5px',
    width: '100%',
    background: 'accent',
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.4s {easings.out}',
  },
  _hover: { _after: { transform: 'scaleX(1)', transformOrigin: 'left' } },
  '&.cur': { _after: { transform: 'scaleX(1)', transformOrigin: 'left' } },
  '@media (max-width: 860px)': { display: 'none' },
})
</script>

<template>
  <nav :class="[nav, { 'scrolled': scrolled, 'over-dark': overDark }]">
    <NuxtLink :class="logo" to="/">
      <LogoMark :size="24" />
      <span>Daktus</span>
    </NuxtLink>
    <div :class="links">
      <NuxtLink v-for="link in NAV_LINKS" :key="link.href" :class="navLink" :to="link.href" active-class="cur">
        {{ link.label }}
      </NuxtLink>
      <AppButton v-magnet href="/kontakt" variant="pill" arrow>
        Napíšme si
      </AppButton>
    </div>
  </nav>
</template>
