<script setup lang="ts">
import { css } from '~~/styled-system/css'

const ITEMS = [
  'Webdizajn',
  'Vývoj na mieru',
  'E‑shopy',
  'Mobilné aplikácie',
  'Desktopové aplikácie',
  'Softvérové riešenia',
]

const marquee = css({
  borderBlock: '1px solid',
  borderColor: 'hairline.soft',
  overflow: 'hidden',
})

const track = css({
  display: 'flex',
  width: 'max-content',
  animation: 'marquee 42s linear infinite',
  _motionReduce: { animation: 'none' },
})

const group = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  height: '76px',
  paddingInline: '16px',
})

const item = css({
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
})

const spark = css({
  display: 'inline-flex',
  color: 'accent',
})
</script>

<template>
  <div :class="marquee" aria-hidden="true">
    <div :class="track">
      <div v-for="copy in 2" :key="copy" :class="group">
        <template v-for="(label, index) in ITEMS" :key="index">
          <span :class="item">{{ label }}</span>
          <span :class="spark"><IconSpark /></span>
        </template>
      </div>
    </div>
  </div>
</template>
