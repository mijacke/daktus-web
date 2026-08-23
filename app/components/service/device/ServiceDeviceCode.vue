<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Terminál na celú kartu — služba „Vývoj softvéru". Karta sama je tmavá
 * dlaždica; hover dopíše ďalší riadok behu.
 */
const root = css({
  padding: '16px 22px 6px',
  display: 'flex',
  flexDirection: 'column',
})

const head = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  paddingBottom: '10px',
  borderBottom: '1px solid',
  borderColor: 'dark.fg/8',
})

const dot = css({
  width: '6px',
  height: '6px',
  borderRadius: 'full',
  '&:nth-child(1)': { background: 'traffic.red' },
  '&:nth-child(2)': { background: 'traffic.amber' },
  '&:nth-child(3)': { background: 'traffic.green' },
})

const headTitle = css({
  marginInline: 'auto',
  fontFamily: 'mono',
  fontSize: '9px',
  letterSpacing: '0.05em',
  color: 'dark.dim',
})

const lines = css({ paddingTop: '9px' })

const line = css({
  fontFamily: 'mono',
  fontSize: '11.5px',
  lineHeight: 1.9,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'dark.fg/60',
  '&[data-tone="cmd"]': { color: 'dark.fg/88' },
  '&[data-tone="ok"]': { _firstLetter: { color: 'accent' } },
})

/** Posledný riadok behu — dopíše sa až na hover karty. */
const lineNew = css({
  overflow: 'hidden',
  maxHeight: 0,
  opacity: 0,
  transition: 'max-height 0.45s {easings.out}, opacity 0.35s ease 0.1s',
  '[data-svc]:hover &': { maxHeight: '24px', opacity: 1 },
  _motionReduce: { transition: 'none' },
})

const caretRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '22px',
})

const prompt = css({
  fontFamily: 'mono',
  fontSize: '11.5px',
  color: 'dark.dim',
})

const caret = css({
  width: '6px',
  height: '12px',
  background: 'accent',
  animation: 'caretBlink 1.1s steps(1) infinite',
  _motionReduce: { animation: 'none' },
})
</script>

<template>
  <div :class="root" aria-hidden="true">
    <div :class="head">
      <i :class="dot" /><i :class="dot" /><i :class="dot" />
      <span :class="headTitle">daktus — zsh</span>
    </div>
    <div :class="lines">
      <div :class="line" data-tone="cmd">$ daktus init crm</div>
      <div :class="line" data-tone="ok">✓ moduly: rezervácie, faktúry</div>
      <div :class="line" data-tone="ok">✓ prepojenie na váš proces</div>
      <div :class="lineNew">
        <div :class="line" data-tone="ok">✓ pripravené na nasadenie</div>
      </div>
      <div :class="caretRow">
        <span :class="prompt">$</span>
        <span :class="caret" />
      </div>
    </div>
  </div>
</template>
