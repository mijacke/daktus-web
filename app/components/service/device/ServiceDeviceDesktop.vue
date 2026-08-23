<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Mini desktopová aplikácia — hover karty pridá do zoznamu nový záznam. */
const win = css({
  border: '1px solid',
  borderColor: 'hairline.soft',
  borderRadius: '10px',
  background: 'paper',
  overflow: 'hidden',
})

const head = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '24px',
  paddingInline: '9px',
  background: 'paper2',
  borderBottom: '1px solid',
  borderColor: 'hairline.soft',
})

const dot = css({
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  '&:nth-child(1)': { background: 'traffic.red' },
  '&:nth-child(2)': { background: 'traffic.amber' },
  '&:nth-child(3)': { background: 'traffic.green' },
})

const body = css({
  display: 'grid',
  gridTemplateColumns: '26px 1fr',
  gap: '8px',
  padding: '9px',
})

const side = css({
  borderRadius: '6px',
  background: 'paper2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  paddingTop: '7px',
})

const sideItem = css({
  width: '10px',
  height: '10px',
  borderRadius: '4px',
  background: 'ink/12',
  '&:first-child': { background: 'accent' },
})

const rows = css({ minWidth: 0 })

/** Nový záznam — na hover sa vysunie na vrch zoznamu. */
const rowNew = css({
  overflow: 'hidden',
  maxHeight: 0,
  opacity: 0,
  transition: 'max-height 0.5s {easings.out}, opacity 0.4s ease 0.1s',
  '[data-svc]:hover &': { maxHeight: '16px', opacity: 1 },
  _motionReduce: { transition: 'none' },
})

const rowNewInner = css({
  height: '11px',
  borderRadius: '4px',
  background: 'accent/22',
  border: '1px solid',
  borderColor: 'accent/45',
  marginBottom: '5px',
})

const row = css({
  height: '11px',
  borderRadius: '4px',
  background: 'ink/8',
  marginTop: '5px',
  '&:first-of-type': { marginTop: 0 },
})
</script>

<template>
  <div :class="win" aria-hidden="true">
    <div :class="head">
      <i :class="dot" /><i :class="dot" /><i :class="dot" />
    </div>
    <div :class="body">
      <div :class="side">
        <span :class="sideItem" /><span :class="sideItem" /><span :class="sideItem" />
      </div>
      <div :class="rows">
        <div :class="rowNew">
          <div :class="rowNewInner" />
        </div>
        <div :class="row" />
        <div :class="row" />
        <div :class="row" />
        <div :class="row" />
      </div>
    </div>
  </div>
</template>
