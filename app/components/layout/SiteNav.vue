<script setup lang="ts">
import { css } from '~~/styled-system/css'

const scrollTopOnHome = useScrollTopLink()

const scrolled = ref(false)
const overDark = ref(false)
const menuOpen = ref(false)
let frame = 0

// nad mobilným zlomom menu neexistuje — po rozšírení okna ho zavri
const isMobile = useMediaQuery('(max-width: 860px)')
watch(isMobile, (mobile) => {
  if (!mobile) menuOpen.value = false
})

/** Stred hlavičky — v jej zvislej osi, nech sa meria plocha priamo pod textom. */
function update() {
  scrolled.value = window.scrollY > 30
  overDark.value = !menuOpen.value && isDarkUnder(window.innerWidth / 2, 40)
  // Safari na iOS tónuje svoje lišty farbou body — nech idú s hlavičkou.
  document.body.toggleAttribute('data-chrome-dark', overDark.value)
}

// meranie je čítanie layoutu, tak ho drž na jednom snímku
function onScroll() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    update()
  })
}

watch(menuOpen, () => update())

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

// nová stránka má pod hlavičkou inú plochu — premeraj ju, až keď je vykreslená
useNuxtApp().hook('page:finish', () => {
  menuOpen.value = false
  nextTick(update)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
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
  /**
   * Žiadny backdrop-filter: Safari na iOS tónuje hornú lištu podľa fixného
   * prvku na hornej hrane a blur ju pripne na farbu navzorkovanú pri prvom
   * renderi — pri scrolle na tmavú sekciu potom ostala svetlá. Bez neho
   * priesvitné pozadie preskočí a lištu si vezme z body, ktoré prepíname
   * nižšie (data-chrome-dark) a ktoré Safari sleduje živo. Priesvitnosť
   * musí ostať: pri nepriehľadnom pozadí by si lištu vzalo z hlavičky
   * a zamrzlo by to znova.
   */
  '&.scrolled': {
    background: 'paper/90',
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

/** Logomark je z plastelíny — hover ho stlačí a pružne vráti. */
const logoMark = css({
  display: 'inline-flex',
  transformOrigin: '50% 100%',
  '[data-logo]:hover &': { animation: 'claySquish 0.6s {easings.out}' },
  _motionReduce: { animation: 'none' },
})

const links = css({
  display: 'flex',
  alignItems: 'center',
  gap: '36px',
  '@media (max-width: 860px)': { display: 'none' },
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
})
</script>

<template>
  <nav :class="[nav, { 'scrolled': scrolled && !menuOpen, 'over-dark': overDark }]">
    <NuxtLink :class="logo" to="/" data-logo @click="scrollTopOnHome">
      <span :class="logoMark"><LogoMark :size="24" /></span>
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
    <NavBurger :open="menuOpen" @click="menuOpen = !menuOpen" />
  </nav>
  <NavDrawer :open="menuOpen" @close="menuOpen = false" />
</template>
