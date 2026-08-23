<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Náhľadové okno projektu — vizuálne pripomína natívne okno prehliadača v macOS. */
defineProps<{
  /** Doména projektu vykreslená v adresnom riadku. */
  url: string
}>()

const mini = css({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'card',
  border: '1px solid',
  borderColor: 'ink/12',
  borderRadius: '12px 12px 0 0',
  boxShadow: 'window',
  // drží tónovanú hlavičku vo vnútri zaoblených rohov
  overflow: 'hidden',
})

const bar = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '38px',
  paddingInline: '14px',
  background: 'ink/4',
  borderBottom: '1px solid',
  borderColor: 'ink/8',
})

const dots = css({
  display: 'inline-flex',
  gap: '7px',
  '& i': {
    width: '10px',
    height: '10px',
    borderRadius: 'full',
  },
})

const dotRed = css({ background: 'traffic.red' })
const dotAmber = css({ background: 'traffic.amber' })
const dotGreen = css({ background: 'traffic.green' })

/** Absolútne stredovanie — adresný riadok sedí v strede okna, nie v strede zvyšku po semafore. */
const urlPill = css({
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
  background: 'card',
  border: '1px solid',
  borderColor: 'ink/8',
  fontSize: '10.5px',
  color: 'dim',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
})
</script>

<template>
  <div :class="mini">
    <div :class="bar">
      <span :class="dots" aria-hidden="true">
        <i :class="dotRed" /><i :class="dotAmber" /><i :class="dotGreen" />
      </span>
      <span :class="urlPill">
        <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="7" width="10" height="7.5" rx="2" />
          <path d="M5.5 7V4.75a2.5 2.5 0 0 1 5 0V7" />
        </svg>
        {{ url }}
      </span>
    </div>
    <slot />
  </div>
</template>
