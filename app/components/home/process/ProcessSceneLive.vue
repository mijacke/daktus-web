<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Nasadenie — scroll v kroku píše `npm run generate`, postupne odkrýva
 * deploy log s pruhom nahrávania a na konci sa otvorí okno prehliadača,
 * kde stránka z Dizajnu už beží naživo. Bez pinu beží log na čas.
 */
const props = withDefaults(defineProps<{
  /** Priebeh kroku 0 – 100 zo scroll pinu; záporná hodnota = bez pinu. */
  deployT?: number
}>(), { deployT: -1 })

const driven = computed(() => props.deployT >= 0)
const t = computed(() => Math.min(100, Math.max(0, props.deployT)))

const CMD = '$ npm run generate'
/** Pri scrolle sa príkaz píše po znakoch (t 2 – 14), potom beží log. */
const typedCmd = computed(() => {
  if (!driven.value) return CMD
  return CMD.slice(0, Math.round(CMD.length * Math.min(1, Math.max(0, (t.value - 2) / 12))))
})
const typing = computed(() => driven.value && t.value >= 2 && t.value < 18)

/** Percento nahrávania na produkciu — plní sa medzi riadkom nahrávania a CDN. */
const uploadPct = computed(() => Math.round(Math.min(1, Math.max(0, (t.value - 26) / 36)) * 100))

const STATUS = [
  { label: 'zálohy', value: 'denne' },
  { label: 'monitoring', value: '24/7' },
  { label: 'SSL', value: 'aktívne' },
] as const

/** Riadok/blok scény: pri pine ho odhalí prah scrollu, inak časový sceneItem. */
function reveal(delay: 15 | 35 | 55 | 75 | 90 | 105 | 115 | 135, at: number) {
  return driven.value ? [sceneReveal, { on: t.value >= at }] : [sceneItem({ delay })]
}

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

/** Kurzor za písaným príkazom. */
const cmdCaret = css({
  display: 'inline-block',
  width: '7px',
  height: '13px',
  marginLeft: '3px',
  background: 'accent',
  verticalAlign: '-2px',
  animation: 'caretBlink 1s steps(1) infinite',
  _motionReduce: { animation: 'none' },
})

/** Pruh nahrávania pod riadkom „nahrávam" — pri pine ho plní scroll. */
const uploadBar = css({
  height: '4px',
  maxWidth: '240px',
  borderRadius: 'full',
  background: 'dark.fg/12',
  overflow: 'hidden',
  marginBlock: '7px',
})

const uploadFill = css({
  display: 'block',
  height: '100%',
  borderRadius: 'full',
  background: 'accent',
  transition: 'width 0.15s linear',
})

/** Bez pinu sa pruh naplní sám, keď scéna nabehne. */
const uploadFillAuto = css({
  width: '0%',
  '.scene-on &': { animation: 'fillBar 1.1s {easings.out} 0.75s forwards' },
  _motionReduce: { width: '100%', animation: 'none' },
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

/** Status pod NAŽIVO oknom — mono riadok s pulzujúcimi bodkami, reč logu. */
const statusLine = css({
  display: 'flex',
  justifyContent: 'center',
  gap: 'clamp(14px, 2vw, 26px)',
  flexWrap: 'wrap',
  fontFamily: 'mono',
  fontSize: '11.5px',
  color: 'dark.dim',
})

const statusItem = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  '& b': { fontWeight: 400, color: 'dark.fg' },
})
</script>

<template>
  <div :class="grid">
    <ProcessPanel title="Nasadenie">
      <div :class="[logLine, reveal(15, 2)]" data-tone="cmd">
        {{ typedCmd }}<span v-if="typing" :class="cmdCaret" />
      </div>
      <div :class="[logLine, reveal(35, 18)]" data-tone="ok">✓ 12 stránok vygenerovaných</div>
      <div :class="[logLine, reveal(55, 26)]" data-tone="plain">
        → nahrávam na produkciu…<template v-if="driven"> {{ uploadPct }} %</template>
      </div>
      <div :class="[uploadBar, reveal(55, 26)]">
        <i :class="driven ? uploadFill : [uploadFill, uploadFillAuto]" :style="driven ? { width: `${uploadPct}%` } : undefined" />
      </div>
      <div :class="[logLine, reveal(75, 64)]" data-tone="ok">✓ CDN a cache pripravené</div>
      <div :class="[logLine, reveal(90, 72)]" data-tone="ok">✓ DNS a SSL certifikát aktívne</div>
      <div :class="[logLine, reveal(105, 80)]" data-tone="accent">✓ vas-projekt.sk je naživo</div>
    </ProcessPanel>
    <div :class="liveWrap">
      <div :class="[win, reveal(115, 84)]">
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
      <div :class="[statusLine, reveal(135, 90)]">
        <span v-for="item in STATUS" :key="item.label" :class="statusItem">
          <span :class="liveDot" />{{ item.label }} <b>{{ item.value }}</b>
        </span>
      </div>
    </div>
  </div>
</template>
