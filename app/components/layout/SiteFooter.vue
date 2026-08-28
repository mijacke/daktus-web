<script setup lang="ts">
import { css } from '~~/styled-system/css'

const scrollTopOnHome = useScrollTopLink()

// kým profily nie sú založené, odkazy vedú na homepage — potom doplniť URL
const SOCIALS = [
  { label: 'Instagram', href: '/' },
  { label: 'LinkedIn', href: '/' },
  { label: 'GitHub', href: 'https://github.com/mijacke' },
]

const footer = css({
  background: 'dark.bg',
  color: 'dark.fg',
  borderTop: '1px solid',
  borderColor: 'dark.hairline',
})

const cols = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '60px',
  flexWrap: 'wrap',
  paddingTop: '72px',
})

const brand = css({ maxWidth: '360px' })

const brandLogo = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '22px',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
})

/** Rovnaké správanie ako v headeri — plastelínové D hover stlačí. */
const brandLogoMark = css({
  display: 'inline-flex',
  transformOrigin: '50% 100%',
  '[data-logo]:hover &': { animation: 'claySquish 0.6s {easings.out}' },
  _motionReduce: { animation: 'none' },
})

const brandNote = css({
  fontSize: '15px',
  color: 'dark.dim',
  margin: '14px 0 0',
})

/** Posledná šanca na konverziu — mail ako veľké CTA, nie vizitka. */
const brandMail = css({
  display: 'inline-block',
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(24px, 2.6vw, 34px)',
  letterSpacing: '-0.01em',
  color: 'accent',
  marginTop: '26px',
  transition: 'color 0.3s ease',
  _hover: { color: 'dark.fg' },
})

const groups = css({
  display: 'flex',
  gap: 'clamp(40px, 6vw, 120px)',
  flexWrap: 'wrap',
})

const group = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
})

const groupLabel = css({
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'dark.dim',
  marginBottom: '6px',
})

const groupLink = css({
  fontSize: '15px',
  transition: 'color 0.3s ease',
  _hover: { color: 'accent' },
})

const groupLinkAccent = css({ color: 'accent' })

const bigWord = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 'clamp(60px, 9vh, 110px)',
  paddingInline: 'clamp(20px, 3.5vw, 72px)',
  fontFamily: 'display',
  fontWeight: 900,
  fontSize: 'clamp(64px, 13.4vw, 262px)',
  lineHeight: 0.78,
  letterSpacing: '-0.01em',
  textTransform: 'uppercase',
})

const bigLetter = css({
  display: 'inline-block',
  transition: 'transform 0.5s {easings.out}, color 0.4s ease',
  _hover: { transform: 'translateY(-10%)', color: 'accent' },
})

const legal = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  borderTop: '1px solid',
  borderColor: 'dark.hairline',
  marginTop: '48px',
  padding: '26px clamp(20px, 3.5vw, 72px) 32px',
  fontSize: '13.5px',
  color: 'dark.dim',
})
</script>

<template>
  <footer :class="footer" data-dark>
    <div :class="wrap">
      <div :class="cols">
        <div :class="brand">
          <NuxtLink :class="brandLogo" to="/" data-logo @click="scrollTopOnHome">
            <span :class="brandLogoMark"><LogoMark :size="24" /></span>
            <span>Daktus</span>
          </NuxtLink>
          <p :class="brandNote">Webdizajn a vývoj digitálnych produktov. Navrhujeme, kódujeme a staráme sa.</p>
          <a :class="brandMail" href="mailto:napiste@daktus.sk">napiste@daktus.sk</a>
        </div>
        <div :class="groups">
          <div :class="group">
            <span :class="groupLabel">Menu</span>
            <NuxtLink v-for="item in MENU" :key="item.href" :class="groupLink" :to="item.href">{{ item.label }}</NuxtLink>
          </div>
          <div :class="group">
            <span :class="groupLabel">Kontakt</span>
            <a :class="[groupLink, groupLinkAccent]" href="mailto:napiste@daktus.sk">napiste@daktus.sk</a>
            <NuxtLink :class="groupLink" to="/">daktus.sk</NuxtLink>
          </div>
          <div :class="group">
            <span :class="groupLabel">Sledujte nás</span>
            <NuxtLink
              v-for="item in SOCIALS"
              :key="item.label"
              :class="groupLink"
              :to="item.href"
              :target="item.href.startsWith('http') ? '_blank' : undefined"
            >{{ item.label }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div :class="bigWord" aria-hidden="true">
      <span v-for="letter in 'DAKTUS'" :key="letter" :class="bigLetter">{{ letter }}</span>
    </div>
    <div :class="legal">
      <span>© 2026 Daktus. Všetky práva vyhradené.</span>
      <span>daktus.sk</span>
    </div>
  </footer>
</template>
