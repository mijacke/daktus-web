<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Živý náhľad projektu — reálny web v macOS okne. Iframe je inertný (bez scrollu a preklikov). */
defineProps<{
  /** Adresa webu načítaná do iframe. */
  src: string
  /** Doména zobrazená v adresnom riadku okna. */
  domain: string
  /** Rozbalená karta — okno aj obsah webu sa zväčšia. */
  expanded?: boolean
}>()

defineEmits<{ close: [] }>()

// V pokoji okno sedí ako pôvodný mockup (menšie, pri spodku karty),
// po rozbalení karty narastie takmer na celý cover.
const shell = cva({
  base: {
    bottom: '-2px',
    transitionProperty: 'top, width',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'out',
  },
  variants: {
    expanded: {
      false: { top: '26%', width: 'min(600px, 90%)' },
      true: { top: '5%', width: '96%' },
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
    // živý náhľad, nie prehliadač: žiadny scroll ani prekliky na podstránky
    pointerEvents: 'none',
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
  <MiniBrowser
    :class="shell({ expanded: !!expanded })"
    :url="domain"
    mac-controls
    @close="$emit('close')"
  >
    <div :class="viewport">
      <iframe
        :src="src"
        :class="frame({ expanded: !!expanded })"
        :title="`Náhľad ${domain}`"
        loading="lazy"
        scrolling="no"
        tabindex="-1"
      />
    </div>
  </MiniBrowser>
</template>
