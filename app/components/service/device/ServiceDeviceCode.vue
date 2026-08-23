<script setup lang="ts">
import { css, cva } from '~~/styled-system/css'

/** Mini editor kódu — služba „Vývoj softvéru". Hover karty „dopíše" posledný riadok. */
const LINES = [
  { tone: 'keyword', width: '52%', indent: false },
  { tone: 'plain', width: '74%', indent: true },
  { tone: 'string', width: '58%', indent: true },
  { tone: 'plain', width: '38%', indent: true },
] as const

const win = css({
  border: '1px solid',
  borderColor: 'hairline.soft',
  borderRadius: '10px',
  background: 'dark.panel',
  overflow: 'hidden',
})

const head = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '24px',
  paddingInline: '9px',
  borderBottom: '1px solid',
  borderColor: 'dark.fg/9',
})

const dot = css({
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  background: 'dark.fg/18',
})

const file = css({
  marginInline: 'auto',
  fontFamily: 'mono',
  fontSize: '8.5px',
  letterSpacing: '0.05em',
  color: 'dark.dim',
})

const body = css({ padding: '11px 12px 13px' })

const line = cva({
  base: {
    height: '6px',
    borderRadius: '3px',
    marginTop: '8px',
    '&:first-child': { marginTop: 0 },
  },
  variants: {
    tone: {
      keyword: { background: 'accent/80' },
      plain: { background: 'dark.fg/30' },
      string: { background: 'mockup.codeString/75' },
    },
    indent: {
      true: { marginLeft: '14%' },
      false: {},
    },
  },
})

const lastRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginTop: '8px',
})

const lastLine = css({
  height: '6px',
  width: '12%',
  borderRadius: '3px',
  background: 'accent/80',
  transition: 'width 0.9s {easings.out}',
  '[data-svc]:hover &': { width: '34%' },
  _motionReduce: { transition: 'none' },
})

const caret = css({
  width: '5px',
  height: '10px',
  background: 'accent',
  animation: 'caretBlink 1.1s steps(1) infinite',
  _motionReduce: { animation: 'none' },
})
</script>

<template>
  <div :class="win" aria-hidden="true">
    <div :class="head">
      <i :class="dot" /><i :class="dot" /><i :class="dot" />
      <span :class="file">rezervacie.ts</span>
    </div>
    <div :class="body">
      <div v-for="(item, index) in LINES" :key="index" :class="line({ tone: item.tone, indent: item.indent })" />
      <div :class="lastRow">
        <span :class="lastLine" />
        <span :class="caret" />
      </div>
    </div>
  </div>
</template>
