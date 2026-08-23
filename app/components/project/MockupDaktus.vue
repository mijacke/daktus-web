<script setup lang="ts">
import { css } from '~~/styled-system/css'

const position = css({
  bottom: '-30px',
  width: 'min(640px, 92%)',
})

const body = css({ padding: '20px 22px 24px' })

const headline = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '30px',
  lineHeight: 0.96,
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  color: 'ink',
})

const outline = css({
  color: 'transparent',
  WebkitTextStroke: '1.1px token(colors.ink)',
})

const amp = css({ color: 'accent.deep' })

const pills = css({
  display: 'flex',
  gap: '8px',
  marginTop: '14px',
})

const pillDark = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '28px',
  paddingInline: '14px',
  borderRadius: 'full',
  background: 'ink',
  color: 'paper',
  fontSize: '11px',
  fontWeight: 600,
})

const pillGhost = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '28px',
  paddingInline: '14px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'ink/16',
  fontSize: '11px',
  color: 'ink',
})
</script>

<template>
  <MiniBrowser :class="position" url="daktus.sk">
    <div :class="body">
      <div :class="headline">Weby, <span :class="outline">softvér</span><br><span :class="amp">&amp;</span> appky.</div>
      <div :class="pills">
        <span :class="pillDark">Prebrať projekt</span>
        <span :class="pillGhost">Pozrieť prácu</span>
      </div>
    </div>
  </MiniBrowser>
</template>
