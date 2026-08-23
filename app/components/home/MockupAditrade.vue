<script setup lang="ts">
import { css } from '~~/styled-system/css'

const position = css({
  bottom: '-48px',
  width: 'min(500px, 92%)',
})

const body = css({ padding: '18px 18px 24px' })

const topRow = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const logo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '15px',
  textTransform: 'uppercase',
  color: 'ink',
})

const chipCta = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '26px',
  paddingInline: '13px',
  borderRadius: 'full',
  background: 'ink',
  color: 'paper',
  fontSize: '10.5px',
  fontWeight: 600,
})

const headline = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '21px',
  lineHeight: 1.05,
  textTransform: 'uppercase',
  color: 'ink',
  marginTop: '14px',
})

const route = css({
  width: '100%',
  marginTop: '10px',
  color: 'accent.deep',
})

const chips = css({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
})

const chipOutline = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '26px',
  paddingInline: '12px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'ink/14',
  fontSize: '10.5px',
  color: 'mockup.slate',
})
</script>

<template>
  <MiniBrowser :class="position" url="aditrade.sk">
    <div :class="body">
      <div :class="topRow">
        <span :class="logo">Aditrade</span>
        <span :class="chipCta">Nezáväzný dopyt</span>
      </div>
      <div :class="headline">Nadrozmerná preprava<br>bez starostí</div>
      <svg :class="route" height="46" viewBox="0 0 420 46" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M8 34 C 90 12, 160 40, 240 22 C 300 9, 360 20, 412 14" stroke="currentColor" stroke-width="2.4" stroke-dasharray="1 7" stroke-linecap="round" />
        <circle cx="8" cy="34" r="5" fill="currentColor" />
        <circle cx="412" cy="14" r="5" fill="none" stroke="currentColor" stroke-width="2.2" />
      </svg>
      <div :class="chips">
        <span :class="chipOutline">Sprievodné vozidlá</span>
        <span :class="chipOutline">Povolenia v EÚ</span>
        <span :class="chipOutline">Plánovanie trás</span>
      </div>
    </div>
  </MiniBrowser>
</template>
