<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * iPhone ako pri živých náhľadoch projektov — prstenec, dynamic island so
 * šošovkou, stavový pruh. Na svetlom podklade strieborná edícia, v tmavom
 * páse (data-dark) tmavá edícia s tokenmi z deviceTone. Spodok odsekáva
 * okraj javiska, hover karty doručí push notifikáciu.
 */
const phone = css({
  position: 'relative',
  width: '138px',
  height: '224px',
  // pomer zaoblenia presne podľa veľkého iPhonu v živých náhľadoch (38/245)
  borderRadius: '21px',
  border: '1px solid',
  borderColor: 'device.silver2',
  background: 'device.silver',
  padding: '7px',
  boxShadow: '{shadows.window}, inset 0 0 4px 2px rgba(255, 255, 255, 0.6), inset 0 0 0 5px token(colors.device.silver2)',
  // bočné tlačidlá — hlasitosť vľavo, zapínanie vpravo
  _before: {
    content: '""',
    position: 'absolute',
    left: '-3px',
    top: '24%',
    width: '3px',
    height: '18px',
    borderRadius: '2px',
    background: 'device.silver2',
    boxShadow: '0 24px 0 token(colors.device.silver2)',
  },
  _after: {
    content: '""',
    position: 'absolute',
    right: '-3px',
    top: '30%',
    width: '3px',
    height: '28px',
    borderRadius: '2px',
    background: 'device.silver2',
  },
  '[data-dark] &': {
    borderColor: 'device.dark2',
    background: 'device.island',
    boxShadow: '{shadows.window}, inset 0 0 4px 2px rgba(255, 255, 255, 0.14), inset 0 0 0 5px token(colors.device.dark2)',
    _before: { background: 'device.dark2', boxShadow: '0 24px 0 token(colors.device.dark2)' },
    _after: { background: 'device.dark2' },
  },
})

const screen = css({
  position: 'relative',
  height: '100%',
  borderRadius: '16px',
  background: 'card',
  overflow: 'hidden',
  padding: '28px 10px 0',
  '[data-dark] &': { background: 'device.dark' },
})

/** Stavový pruh — čas a dynamic island so šošovkou kamery. */
const statusTime = css({
  position: 'absolute',
  top: '8px',
  left: '14px',
  fontSize: '7px',
  fontWeight: 600,
  letterSpacing: '0.02em',
  color: 'ink',
  '[data-dark] &': { color: 'dark.fg' },
})

const island = css({
  position: 'absolute',
  top: '7px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '36px',
  height: '10px',
  borderRadius: 'full',
  background: 'device.island',
  _after: {
    content: '""',
    position: 'absolute',
    right: '3px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: 'full',
    background: 'radial-gradient(farthest-corner at 30% 30%, token(colors.device.lens), transparent 75%)',
  },
})

/** Push notifikácia — na hover sa spustí spoza ostrovčeka. */
const push = css({
  position: 'absolute',
  top: '5px',
  left: '7px',
  right: '7px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  height: '16px',
  paddingInline: '5px',
  borderRadius: '6px',
  background: 'card',
  border: '1px solid',
  borderColor: 'accent/45',
  boxShadow: 'card',
  transform: 'translateY(-26px)',
  transition: 'transform 0.5s {easings.out} 0.15s',
  zIndex: 2,
  '[data-svc]:hover &': { transform: 'none' },
  _motionReduce: { transition: 'none' },
  '[data-dark] &': { background: 'device.dark4', borderColor: 'accent/55' },
})

const pushDot = css({
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  background: 'accent',
  flexShrink: 0,
})

const pushBar = css({
  flex: 1,
  height: '4px',
  borderRadius: 'full',
  background: 'ink/12',
  '[data-dark] &': { background: 'dark.fg/30' },
})

/** Obsah appky — titulok, obrázok, riadky zoznamu. */
const titleBar = css({
  width: '64%',
  height: '8px',
  borderRadius: '4px',
  background: 'ink/55',
  '[data-dark] &': { background: 'dark.fg/70' },
})

const block = css({
  height: '44px',
  borderRadius: '9px',
  marginTop: '8px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 40%, transparent), color-mix(in srgb, token(colors.accent) 13%, transparent))',
})

const listRow = css({
  height: '10px',
  borderRadius: '5px',
  background: 'ink/9',
  marginTop: '7px',
  '[data-dark] &': { background: 'dark.fg/14' },
})
</script>

<template>
  <div :class="phone" aria-hidden="true">
    <div :class="screen">
      <span :class="statusTime">9:41</span>
      <span :class="island" />
      <div :class="push">
        <span :class="pushDot" />
        <span :class="pushBar" />
      </div>
      <div :class="titleBar" />
      <div :class="block" />
      <div :class="listRow" />
      <div :class="listRow" />
      <div :class="listRow" />
    </div>
  </div>
</template>
