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
    width: '10px',
    height: '10px',
    borderRadius: 'full',
    position: 'relative',
    border: 'none',
    padding: 0,
  },
})

/** Ako na Macu: glyfy sa objavia pri hoveri nad semaforom. */
const macDots = css({
  '& > *::after': {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    lineHeight: 1,
    fontWeight: 700,
    color: 'ink/65',
    opacity: 0,
    transition: 'opacity 0.15s ease',
  },
  _hover: { '& > *::after': { opacity: 1 } },
  '& > *:nth-child(1)::after': { content: '"×"' },
  '& > *:nth-child(2)::after': { content: '"−"' },
  '& > *:nth-child(3)::after': { content: '"⤢"', fontSize: '7px' },
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
      <button :class="dotRed" type="button" aria-label="Zavrieť náhľad" @click.stop="$emit('close')" /><i
        :class="dotAmber"
        aria-hidden="true"
      /><i :class="dotGreen" aria-hidden="true" />
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
