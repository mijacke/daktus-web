<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Živý náhľad projektu — reálny web v interaktívnom iframe vnútri macOS okna. */
defineProps<{
  /** Adresa webu načítaná do iframe. */
  src: string
  /** Doména zobrazená v adresnom riadku okna. */
  domain: string
  /** Rozbalená karta — okno aj obsah webu sa zväčšia. */
  expanded?: boolean
}>()

const shell = cva({
  base: {
    top: '10%',
    bottom: '-2px',
    width: '92%',
    transitionProperty: 'top, width',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    expanded: {
      true: { top: '5%', width: '96%' },
      false: {},
    },
  },
})

const viewport = css({
  position: 'absolute',
  top: '39px', // pod hlavičkou okna (38px + border)
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  containerType: 'size',
  background: 'card',
})

/**
 * Web beží v desktopovej šírke a škáluje sa presne na kontajner:
 * šírka iframe × mierka = 100cqw, takže footprint je vždy celé okno.
 */
const frame = cva({
  base: {
    border: 'none',
    transformOrigin: 'top left',
  },
  variants: {
    expanded: {
      false: { width: '238cqw', height: '238cqh', transform: 'scale(0.42)' },
      true: { width: '147cqw', height: '147cqh', transform: 'scale(0.68)' },
    },
  },
})
</script>

<template>
  <MiniBrowser :class="shell({ expanded: !!expanded })" :url="domain">
    <div :class="viewport">
      <iframe
        :src="src"
        :class="frame({ expanded: !!expanded })"
        :title="`Náhľad ${domain}`"
        loading="lazy"
      />
    </div>
  </MiniBrowser>
</template>
