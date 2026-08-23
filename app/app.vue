<script setup lang="ts">
import { css } from '~~/styled-system/css'

const wrap = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100svh',
  padding: '32px',
  textAlign: 'center',
})

const mark = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: 'clamp(52px, 14vw, 148px)',
  lineHeight: 0.92,
  letterSpacing: '-0.03em',
  margin: 0,
  textTransform: 'uppercase',
})

const line = css({
  width: 'min(320px, 64vw)',
  height: '2px',
  background: 'accent',
  marginTop: '26px',
  marginBottom: '24px',
  transformOrigin: 'center',
  transform: 'scaleX(0)',
  animation: 'draw 1.1s .25s cubic-bezier(.2, .8, .25, 1) forwards',
  _motionReduce: { animation: 'none', transform: 'scaleX(1)' },
})

const role = css({
  margin: 0,
  fontSize: 'clamp(14px, 2.4vw, 17px)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'fg',
})

const soon = css({
  marginTop: '14px',
  fontSize: '15.5px',
  color: 'dim',
})

const siteFooter = css({
  position: 'fixed',
  bottom: '26px',
  left: 0,
  right: 0,
  fontSize: '13px',
  color: 'dim',
  letterSpacing: '0.04em',
})
</script>

<template>
  <div :class="wrap">
    <h1 :class="mark">Daktus</h1>
    <div :class="line" aria-hidden="true" />
    <p :class="role">Webdizajn a vývoj</p>
    <p :class="soon">Na stránke sa pracuje.</p>
    <footer :class="siteFooter">daktus.sk</footer>
  </div>
</template>
