<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * AI asistent ako chatové okno — služba „AI a automatizácia". Klient zadá
 * úlohu, asistent píše (bodky) a hover bloku doručí hotovú odpoveď,
 * rovnaká réžia ako riadok terminálu (data-svc).
 */
const root = css({
  display: 'flex',
  flexDirection: 'column',
  background: 'card',
  border: '1px solid',
  borderColor: 'device.aluminum2',
  borderRadius: '13px',
  boxShadow: 'window',
  overflow: 'hidden',
})

const head = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 14px',
  borderBottom: '1px solid',
  borderColor: 'ink/8',
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
  color: 'dim',
})

const body = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
  padding: '14px 14px 16px',
})

/** Správa klienta — vpravo, tichý papierový tón. */
const userMsg = css({
  alignSelf: 'flex-end',
  maxWidth: '82%',
  background: 'paper2',
  borderRadius: '11px 11px 3px 11px',
  padding: '8px 12px',
  fontSize: '12px',
  color: 'ink/80',
})

/** Odpoveď asistenta — vľavo, mint hmota. */
const aiMsg = css({
  alignSelf: 'flex-start',
  maxWidth: '82%',
  background: 'accent/14',
  borderRadius: '11px 11px 11px 3px',
  padding: '8px 12px',
  fontSize: '12px',
  color: 'ink',
})

/** Asistent píše — bodky zmiznú, keď hover doručí odpoveď. */
const typing = css({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  height: '18px',
  '& i': {
    width: '5px',
    height: '5px',
    borderRadius: 'full',
    background: 'accent.deep',
  },
  '& i:nth-child(2)': { opacity: 0.65 },
  '& i:nth-child(3)': { opacity: 0.35 },
  '[data-svc]:hover &': { display: 'none' },
})

const answer = css({
  display: 'none',
  '[data-svc]:hover &': { display: 'block' },
})
</script>

<template>
  <div :class="root" aria-hidden="true">
    <div :class="head">
      <i :class="dot" /><i :class="dot" /><i :class="dot" />
      <span :class="headTitle">daktus — asistent</span>
    </div>
    <div :class="body">
      <div :class="userMsg">Sprav súhrn dopytov za dnešok a priprav ponuky.</div>
      <div :class="aiMsg">Mám 12 dopytov, 3 súrne. Ponuky pripravujem…</div>
      <div :class="aiMsg">
        <span :class="typing"><i /><i /><i /></span>
        <span :class="answer">Hotovo. 3 ponuky čakajú na schválenie.</span>
      </div>
    </div>
  </div>
</template>
