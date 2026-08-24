<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

export type ShellDevice = 'mac' | 'imac' | 'iphone'

/**
 * Statický rám zariadenia — rovnaké telá ako živé náhľady projektov
 * (LivePreview), len bez morfovania a iframu: iMac pre najväčšie obrazovky,
 * MacBook pre bežné, iPhone pre mobil. Veľkosť určuje rodič.
 */
withDefaults(defineProps<{
  /** Doména zobrazená v adresnom riadku okna (iPhone lištu nemá). */
  url: string
  device?: ShellDevice
  /** Tmavá edícia (space gray / čierny iPhone). */
  dark?: boolean
}>(), { device: 'mac', dark: false })

const shell = css({
  display: 'flex',
  flexDirection: 'column',
})

/** Rám podľa devices.css: bezel je rovnomerný padding, brada iMacu v spodku. */
const body = cva({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid',
    overflow: 'hidden',
  },
  variants: {
    device: {
      mac: {
        background: 'var(--dev-bezel)',
        borderColor: 'var(--dev-edge)',
        borderRadius: '14px',
        padding: '8px 8px 16px',
        boxShadow: '{shadows.window}, inset 0 0 0 1px var(--dev-edge)',
      },
      imac: {
        background: 'var(--dev-bezel)',
        borderColor: 'var(--dev-edge)',
        borderRadius: '24px',
        padding: '12px 12px 56px',
        boxShadow: '{shadows.window}, inset 0 0 0 1px var(--dev-edge)',
        _after: {
          content: '""',
          position: 'absolute',
          left: '1px',
          right: '1px',
          bottom: '1px',
          height: '44px',
          background: 'var(--dev-chin)',
          borderRadius: '0 0 23px 23px',
          boxShadow: 'inset 0 0 18px 0 rgba(0, 0, 0, 0.08)',
        },
      },
      iphone: {
        background: 'var(--dev-phone)',
        borderColor: 'var(--dev-ring)',
        borderRadius: '38px',
        padding: '9px',
        boxShadow: '{shadows.window}, inset 0 0 4px 2px var(--dev-hi), inset 0 0 0 6px var(--dev-ring)',
      },
    },
  },
})

const camera = cva({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '5px',
    height: '5px',
    borderRadius: 'full',
    background: 'device.panel',
    zIndex: 3,
  },
  variants: {
    device: {
      mac: { top: '2px' },
      imac: { top: '4px' },
      iphone: { display: 'none' },
    },
  },
})

/** Bočné tlačidlá iPhonu — hlasitosť vľavo, zapínanie vpravo. */
const phoneButtons = css({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '3px',
    borderRadius: '2px',
    background: 'var(--dev-ring)',
  },
  _before: { left: '-2px', top: '26%', height: '30px', boxShadow: '0 38px 0 var(--dev-ring)' },
  _after: { right: '-2px', top: '32%', height: '46px' },
})

const screenArea = cva({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: 'var(--dev-screen)',
  },
  variants: {
    device: {
      mac: { borderRadius: '6px' },
      imac: { borderRadius: '9px' },
      iphone: { borderRadius: '29px' },
    },
  },
})

const barWrap = cva({
  base: { flexShrink: 0, overflow: 'hidden' },
  variants: {
    device: {
      mac: { height: '38px' },
      imac: { height: '38px' },
      iphone: { display: 'none' },
    },
  },
})

/** Dynamic island so šošovkou — namiesto adresného riadku na iPhone. */
const island = css({
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '34%',
  maxWidth: '110px',
  height: '15px',
  borderRadius: 'full',
  background: 'device.island',
  zIndex: 3,
  _after: {
    content: '""',
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '6px',
    height: '6px',
    borderRadius: 'full',
    background: 'radial-gradient(farthest-corner at 30% 30%, token(colors.device.lens), transparent 75%)',
  },
})

const screen = cva({
  base: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
  },
  variants: {
    device: {
      mac: {},
      imac: {},
      iphone: { paddingTop: '30px' },
    },
  },
})
</script>

<template>
  <div :class="[shell, deviceTone({ tone: dark ? 'dark' : 'light' })]">
    <div :class="body({ device })">
      <span :class="camera({ device })" aria-hidden="true" />
      <div v-if="device === 'iphone'" :class="phoneButtons" aria-hidden="true" />
      <div :class="screenArea({ device })">
        <div :class="barWrap({ device })">
          <BrowserBar :url="url" :dark="dark" />
        </div>
        <span v-if="device === 'iphone'" :class="island" aria-hidden="true" />
        <div :class="screen({ device })">
          <slot />
        </div>
      </div>
    </div>
    <DeviceFoot :device="device" />
  </div>
</template>
