<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Hlavička prehliadačového okna — semafor a adresný riadok v macOS štýle. */
withDefaults(defineProps<{
  /** Doména projektu vykreslená v adresnom riadku. */
  url: string
  /** Semafor sa správa ako na Macu: glyfy na hover, červené × zatvára. */
  macControls?: boolean
  /** Tmavý Safari vzhľad — pre tmavú edíciu zariadení. */
  dark?: boolean
}>(), { macControls: false, dark: false })

defineEmits<{ close: [] }>()

const bar = cva({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '38px',
    paddingInline: '14px',
    borderBottom: '1px solid',
  },
  variants: {
    dark: {
      false: { background: 'ink/4', borderColor: 'ink/8' },
      // svetlejší grafit než tmavé weby — hranica okna ostáva čitateľná
      true: { background: 'device.dark4', borderColor: 'white/12' },
    },
  },
})

const dots = css({
  display: 'inline-flex',
  gap: '7px',
  '& i, & button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '10px',
    height: '10px',
    borderRadius: 'full',
    border: 'none',
    padding: 0,
  },
})

/** Ako na Macu: SVG glyfy presne v strede, objavia sa pri hoveri nad semaforom. */
const macDots = css({
  '& svg': {
    display: 'block',
    color: 'ink/65',
    opacity: 0,
    transition: 'opacity 0.15s ease',
  },
  _hover: { '& svg': { opacity: 1 } },
})

const dotRed = css({ background: 'traffic.red', cursor: 'pointer' })
const dotAmber = css({ background: 'traffic.amber' })
const dotGreen = css({ background: 'traffic.green' })

/** Absolútne stredovanie — adresný riadok sedí v strede okna, nie v strede zvyšku po semafore. */
const urlPill = cva({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    width: 'min(58%, 260px)',
    // strop drží adresný riadok mimo semaforu aj na najužších mobiloch
    maxWidth: 'calc(100% - 140px)',
    height: '22px',
    borderRadius: 'full',
    border: '1px solid',
    fontSize: '10.5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  variants: {
    dark: {
      false: { background: 'card', borderColor: 'ink/8', color: 'dim' },
      true: { background: 'device.island', borderColor: 'white/10', color: 'dark.fg' },
    },
  },
})
</script>

<template>
  <div :class="bar({ dark })">
    <span v-if="macControls" :class="[dots, macDots]">
      <button :class="dotRed" type="button" aria-label="Zavrieť náhľad" @click.stop="$emit('close')">
        <svg width="6" height="6" viewBox="0 0 8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" aria-hidden="true"><path d="M1.6 1.6l4.8 4.8M6.4 1.6 1.6 6.4" /></svg>
      </button>
      <i :class="dotAmber" aria-hidden="true">
        <svg width="6" height="6" viewBox="0 0 8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M1.4 4h5.2" /></svg>
      </i>
      <i :class="dotGreen" aria-hidden="true">
        <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor"><path d="M4.3 1.1h2.6v2.6Z" /><path d="M3.7 6.9H1.1V4.3Z" /></svg>
      </i>
    </span>
    <span v-else :class="dots" aria-hidden="true">
      <i :class="dotRed" /><i :class="dotAmber" /><i :class="dotGreen" />
    </span>
    <span :class="urlPill({ dark })">
      <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="10" height="7.5" rx="2" />
        <path d="M5.5 7V4.75a2.5 2.5 0 0 1 5 0V7" />
      </svg>
      {{ url }}
    </span>
  </div>
</template>
