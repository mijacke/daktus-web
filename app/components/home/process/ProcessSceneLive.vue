<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Nasadenie — vľavo dobehne deploy log, vpravo sa otvorí okno prehliadača
 * a stránka z Dizajnu v ňom už beží naživo: pulzujúca bodka pri doméne,
 * pod oknom starostlivosť.
 */
const LOG = [
  { text: '$ npm run generate', tone: 'cmd', delay: 15 },
  { text: '✓ 12 stránok vygenerovaných', tone: 'ok', delay: 35 },
  { text: '→ nahrávam na produkciu…', tone: 'plain', delay: 55 },
  { text: '✓ CDN a cache pripravené', tone: 'ok', delay: 75 },
  { text: '✓ DNS a SSL certifikát aktívne', tone: 'ok', delay: 90 },
  { text: '✓ vas-projekt.sk je naživo', tone: 'accent', delay: 105 },
] as const

const META = [
  { label: 'Zálohy zapnuté', delay: 135 },
  { label: 'Monitoring 24/7', delay: 140 },
] as const

/** Log dostáva širší stĺpec — displej MacBooku medzitým narástol. */
const grid = css({
  display: 'grid',
  gridTemplateColumns: '1.25fr 1fr',
  gap: '22px',
  height: '100%',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr' },
})

const logLine = css({
  fontFamily: 'mono',
  fontSize: '12.5px',
  lineHeight: 2.1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'dark.fg/60',
  '&[data-tone="cmd"]': { color: 'dark.fg/85' },
  '&[data-tone="ok"]': { color: 'dark.fg/60', _firstLetter: { color: 'accent' } },
  '&[data-tone="accent"]': { color: 'accent', fontWeight: 700 },
})

const liveWrap = css({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
})

/** Okno so spustenou stránkou — tá istá mini stránka ako na dizajnovom plátne. */
const win = css({
  width: 'min(300px, 100%)',
  background: 'card',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 18px 44px rgba(0, 0, 0, 0.45)',
})

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

/** Pulz pri doméne — web žije. */
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

const liveMeta = css({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
  justifyContent: 'center',
})

const metaChip = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  height: '30px',
  paddingInline: '14px',
  borderRadius: 'full',
  background: 'accent/12',
  fontSize: '12px',
  fontWeight: 600,
  color: 'accent',
})
</script>

<template>
  <div :class="grid">
    <ProcessPanel title="Nasadenie">
      <div
        v-for="item in LOG"
        :key="item.text"
        :class="[logLine, sceneItem({ delay: item.delay })]"
        :data-tone="item.tone"
      >
        {{ item.text }}
      </div>
    </ProcessPanel>
    <div :class="liveWrap">
      <div :class="[win, sceneItem({ delay: 115 })]">
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
      </div>
      <div :class="liveMeta">
        <span v-for="item in META" :key="item.label" :class="[metaChip, sceneItem({ delay: item.delay })]">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>
