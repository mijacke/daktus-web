<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Mini MacBook — služba „Tvorba webstránok". Hover karty stránku „načíta". */
const shell = css({
  display: 'flex',
  flexDirection: 'column',
  paddingInline: '15%',
})

const bezel = css({
  position: 'relative',
  background: 'device.aluminum',
  border: '1px solid',
  borderColor: 'device.aluminum2',
  borderRadius: '9px 9px 3px 3px',
  padding: '6px 5px 8px',
})

const camera = css({
  position: 'absolute',
  top: '2px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '3px',
  height: '3px',
  borderRadius: 'full',
  background: 'device.panel',
})

const screen = css({
  background: 'paper',
  borderRadius: '4px',
  overflow: 'hidden',
})

const head = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  height: '19px',
  paddingInline: '8px',
  background: 'paper2',
  borderBottom: '1px solid',
  borderColor: 'hairline.soft',
})

const dot = css({
  width: '4px',
  height: '4px',
  borderRadius: 'full',
  '&:nth-child(1)': { background: 'traffic.red' },
  '&:nth-child(2)': { background: 'traffic.amber' },
  '&:nth-child(3)': { background: 'traffic.green' },
})

const url = css({
  flex: 1,
  maxWidth: '78px',
  height: '8px',
  marginInline: 'auto',
  borderRadius: 'full',
  background: 'ink/7',
})

const progress = css({
  position: 'absolute',
  left: 0,
  bottom: '-1px',
  height: '2px',
  width: 0,
  background: 'accent',
  transition: 'width 0.9s {easings.out}',
  '[data-svc]:hover &': { width: '100%' },
  _motionReduce: { transition: 'none' },
})

const body = css({ padding: '8px 10px 10px' })

/** Anatómia stránky — logo a menu, veľký titulok, tlačidlá, obrázok. */
const nav = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const navLogo = css({
  width: '22px',
  height: '5px',
  borderRadius: '2px',
  background: 'ink/75',
})

const navMenu = css({
  display: 'flex',
  gap: '4px',
  '& i': { width: '9px', height: '3px', borderRadius: 'full', background: 'ink/22' },
})

const headline = css({
  width: '76%',
  height: '8px',
  borderRadius: '3px',
  background: 'ink/55',
  marginTop: '8px',
})

const headline2 = css({
  width: '52%',
  height: '8px',
  borderRadius: '3px',
  background: 'ink/55',
  marginTop: '4px',
})

const ctaRow = css({
  display: 'flex',
  gap: '5px',
  marginTop: '7px',
})

const ctaFill = css({
  width: '30px',
  height: '9px',
  borderRadius: 'full',
  background: 'ink/80',
})

const ctaGhost = css({
  width: '26px',
  height: '9px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'ink/25',
})

const hero = css({
  height: '26px',
  borderRadius: '6px',
  marginTop: '8px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 42%, transparent), color-mix(in srgb, token(colors.accent) 14%, transparent))',
  opacity: 0.55,
  transform: 'scale(0.985)',
  transition: 'opacity 0.6s ease 0.35s, transform 0.6s {easings.out} 0.35s',
  '[data-svc]:hover &': { opacity: 1, transform: 'none' },
  _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
})

/** Základňa MacBooku — širšia než displej, s výrezom na otváranie veka. */
const deck = css({
  position: 'relative',
  height: '9px',
  marginInline: '-7%',
  borderRadius: '2px 2px 8px 8px',
  background: 'radial-gradient(circle at center, token(colors.device.silver) 82%, token(colors.device.silver2) 100%)',
  boxShadow: 'inset 0 -2px 4px 0 token(colors.device.aluminum4)',
  _after: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '40px',
    height: '3.5px',
    borderRadius: '0 0 5px 5px',
    background: 'device.silver2',
  },
})
</script>

<template>
  <div :class="shell" aria-hidden="true">
    <div :class="bezel">
      <span :class="camera" />
      <div :class="screen">
        <div :class="head">
          <i :class="dot" /><i :class="dot" /><i :class="dot" />
          <span :class="url" />
          <span :class="progress" />
        </div>
        <div :class="body">
          <div :class="nav">
            <span :class="navLogo" />
            <span :class="navMenu"><i /><i /><i /></span>
          </div>
          <div :class="headline" />
          <div :class="headline2" />
          <div :class="ctaRow">
            <span :class="ctaFill" />
            <span :class="ctaGhost" />
          </div>
          <div :class="hero" />
        </div>
      </div>
    </div>
    <div :class="deck" />
  </div>
</template>
