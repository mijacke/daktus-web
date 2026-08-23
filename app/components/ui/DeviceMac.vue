<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Statický MacBook — rovnaký rám ako živé náhľady projektov (LivePreview,
 * variant mac), len bez morfovania: bezel, kamera, adresný riadok, displej
 * so slotom a základňa. Veľkosť určuje rodič.
 */
withDefaults(defineProps<{
  /** Doména zobrazená v adresnom riadku okna. */
  url: string
  /** Tmavá edícia (space gray) — svetlé sekcie nechávajú striebornú. */
  dark?: boolean
}>(), { dark: false })

const shell = css({
  display: 'flex',
  flexDirection: 'column',
})

const body = css({
  position: 'relative',
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'var(--dev-edge)',
  overflow: 'hidden',
  background: 'var(--dev-bezel)',
  borderRadius: '14px',
  padding: '8px 8px 16px',
  boxShadow: '{shadows.window}, inset 0 0 0 1px var(--dev-edge)',
})

const camera = css({
  position: 'absolute',
  top: '2px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  background: 'device.panel',
  zIndex: 3,
})

const screenArea = css({
  position: 'relative',
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  background: 'var(--dev-screen)',
  borderRadius: '6px',
})

const screen = css({
  position: 'relative',
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
})
</script>

<template>
  <div :class="[shell, deviceTone({ tone: dark ? 'dark' : 'light' })]">
    <div :class="body">
      <span :class="camera" aria-hidden="true" />
      <div :class="screenArea">
        <BrowserBar :url="url" :dark="dark" />
        <div :class="screen">
          <slot />
        </div>
      </div>
    </div>
    <DeviceFoot device="mac" />
  </div>
</template>
