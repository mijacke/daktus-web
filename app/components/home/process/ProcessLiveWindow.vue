<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Okno prehliadača so spustenou stránkou z Dizajnu — pulz pri doméne ako
 * jediný živý bod a statický status (zálohy, monitoring, SSL) v päte okna.
 */
const STATUS = [
  { label: 'zálohy', value: 'denne' },
  { label: 'monitoring', value: '24/7' },
  { label: 'SSL', value: 'aktívne' },
] as const

const winBar = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  height: '28px',
  paddingInline: '10px',
  background: 'paper2',
  borderBottom: '1px solid',
  borderColor: 'hairline.soft',
})

const winDot = css({
  width: '6px',
  height: '6px',
  borderRadius: 'full',
  '&:nth-child(1)': { background: 'traffic.red' },
  '&:nth-child(2)': { background: 'traffic.amber' },
  '&:nth-child(3)': { background: 'traffic.green' },
})

const winUrl = css({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  height: '17px',
  paddingInline: '10px',
  borderRadius: 'full',
  background: 'card',
  border: '1px solid',
  borderColor: 'ink/8',
  fontSize: '9.5px',
  color: 'dim',
  whiteSpace: 'nowrap',
})

/** Pulz pri doméne — jediný živý bod scény, web žije. */
const liveDot = css({
  position: 'relative',
  width: '7px',
  height: '7px',
  borderRadius: 'full',
  background: 'accent',
  flexShrink: 0,
  _after: {
    content: '""',
    position: 'absolute',
    inset: '-4px',
    borderRadius: 'full',
    border: '1.5px solid',
    borderColor: 'accent/50',
    animation: 'pulse 1.8s ease-out infinite',
  },
  _motionReduce: { _after: { animation: 'none' } },
})

const winBody = css({ background: 'paper', padding: '13px' })

const pageNav = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const pageLogo = css({ width: '24px', height: '5px', borderRadius: '3px', background: 'ink/75' })

const pageMenu = css({
  display: 'flex',
  gap: '4px',
  '& i': { width: '10px', height: '3px', borderRadius: 'full', background: 'ink/22' },
})

const pageLine = css({ width: '72%', height: '8px', borderRadius: '4px', background: 'ink/55', marginTop: '10px' })
const pageLine2 = css({ width: '46%', height: '8px', borderRadius: '4px', background: 'ink/55', marginTop: '4px' })

const pageImg = css({
  height: '46px',
  borderRadius: '6px',
  marginTop: '10px',
  background: 'linear-gradient(140deg, color-mix(in srgb, token(colors.accent) 45%, transparent), color-mix(in srgb, token(colors.accent) 15%, transparent))',
})

const pageCta = css({ width: '40px', height: '10px', borderRadius: 'full', background: 'ink/80', marginTop: '9px' })

/** Status v päte okna — statické bodky, žiadne blikanie. */
const winStatus = css({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '4px 14px',
  padding: '7px 10px',
  background: 'paper2',
  borderTop: '1px solid',
  borderColor: 'hairline.soft',
  fontFamily: 'mono',
  fontSize: '9.5px',
  color: 'dim',
})

const winStatusItem = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  whiteSpace: 'nowrap',
  '& b': { fontWeight: 400, color: 'ink' },
})

const winStatusDot = css({
  width: '5px',
  height: '5px',
  borderRadius: 'full',
  background: 'accent',
  flexShrink: 0,
})
</script>

<template>
  <div>
    <div :class="winBar">
      <i :class="winDot" /><i :class="winDot" /><i :class="winDot" />
      <span :class="winUrl"><span :class="liveDot" />vas-projekt.sk</span>
    </div>
    <div :class="winBody">
      <div :class="pageNav">
        <span :class="pageLogo" /><span :class="pageMenu"><i /><i /><i /></span>
      </div>
      <div :class="pageLine" />
      <div :class="pageLine2" />
      <div :class="pageImg" />
      <div :class="pageCta" />
    </div>
    <div :class="winStatus">
      <span v-for="item in STATUS" :key="item.label" :class="winStatusItem">
        <span :class="winStatusDot" />{{ item.label }} <b>{{ item.value }}</b>
      </span>
    </div>
  </div>
</template>
