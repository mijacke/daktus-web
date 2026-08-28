<script setup lang="ts">
import { css } from '~~/styled-system/css'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { $lenis } = useNuxtApp()

/**
 * Kým je menu otvorené, stránka pod ním stojí. Zámok drží atribút na <html>
 * (globalCss v panda.config.ts); Lenis sa popri ňom uspí, aby si po zavretí
 * nedoháňal pozíciu, ktorú medzitým nemohol nastaviť.
 */
watch(() => props.open, (open) => {
  document.documentElement.toggleAttribute('data-scroll-lock', open)
  if (open) $lenis?.stop()
  else $lenis?.start()
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.removeAttribute('data-scroll-lock')
})

/** Papierový panel sa zvezie spod hlavičky — tá ostáva nad ním (vyšší zIndex). */
const panel = css({
  position: 'fixed',
  inset: 0,
  zIndex: 190,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 'clamp(28px, 5vh, 56px)',
  background: 'paper',
  paddingTop: '100px',
  paddingBottom: 'clamp(28px, 6vh, 56px)',
  paddingInline: 'clamp(20px, 3.5vw, 72px)',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  visibility: 'hidden',
  transform: 'translateY(-100%)',
  transitionProperty: 'transform, visibility',
  transitionDuration: '0.55s',
  transitionTimingFunction: 'out',
  '&.open': { visibility: 'visible', transform: 'none' },
  '@media (min-width: 861px)': { display: 'none' },
  _motionReduce: { transition: 'none' },
})

const list = css({ display: 'flex', flexDirection: 'column' })

const row = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '16px',
  paddingBlock: 'clamp(12px, 2.2vh, 20px)',
  borderTop: '1px solid',
  borderColor: 'hairline.soft',
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(32px, 9vw, 52px)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  opacity: 0,
  transform: 'translateY(22px)',
  transitionProperty: 'opacity, transform, color',
  transitionDuration: '0.55s',
  transitionTimingFunction: 'out',
  '&:last-child': { borderBottom: '1px solid', borderColor: 'hairline.soft' },
  '&.cur': { color: 'accent.deep' },
  // odkazy nabiehajú po sebe; zavretie ide naraz, preto sú oneskorenia až v .open
  '.open &': {
    opacity: 1,
    transform: 'none',
    '&:nth-child(1)': { transitionDelay: '0.1s' },
    '&:nth-child(2)': { transitionDelay: '0.16s' },
    '&:nth-child(3)': { transitionDelay: '0.22s' },
    '&:nth-child(4)': { transitionDelay: '0.28s' },
    '&:nth-child(5)': { transitionDelay: '0.34s' },
  },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
})

const rowIndex = css({
  fontFamily: 'mono',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.1em',
  color: 'dim',
  flexShrink: 0,
})

const foot = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '18px',
  opacity: 0,
  transform: 'translateY(22px)',
  transitionProperty: 'opacity, transform',
  transitionDuration: '0.55s',
  transitionTimingFunction: 'out',
  '.open &': { opacity: 1, transform: 'none', transitionDelay: '0.4s' },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
})

const footMail = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(20px, 5.4vw, 28px)',
  letterSpacing: '-0.01em',
  color: 'accent.deep',
})
</script>

<template>
  <div id="nav-drawer" :class="[panel, { open }]" data-lenis-prevent>
    <nav :class="list" @click="emit('close')">
      <NuxtLink
        v-for="(item, index) in MENU"
        :key="item.href"
        :class="row"
        :to="item.href"
        exact-active-class="cur"
      >
        <span :class="rowIndex">{{ String(index + 1).padStart(2, '0') }}</span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
    <div :class="foot" @click="emit('close')">
      <a :class="footMail" href="mailto:napiste@daktus.sk">napiste@daktus.sk</a>
      <AppButton href="/kontakt" arrow>
        Napíšme si
      </AppButton>
    </div>
  </div>
</template>
