<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Nasadenie — deploy pipeline: scroll napíše `npm run generate` a potom
 * zhora nadol plní zvislú linku medzi krokmi Build → Upload → Sieť → Naživo.
 * Vpravo okno prehliadača so stránkou z Dizajnu; status (zálohy, monitoring,
 * SSL) žije staticky v päte okna. Bez pinu beží scéna na čas.
 */
const props = withDefaults(defineProps<{
  /** Priebeh kroku 0 – 100 zo scroll pinu; záporná hodnota = bez pinu. */
  deployT?: number
}>(), { deployT: -1 })

const driven = computed(() => props.deployT >= 0)
const t = computed(() => Math.min(100, Math.max(0, props.deployT)))

const CMD = '$ npm run generate'
/** Pri scrolle sa príkaz píše po znakoch (t 2 – 14), potom sa plní pipeline. */
const typedCmd = computed(() => {
  if (!driven.value) return CMD
  return CMD.slice(0, Math.round(CMD.length * Math.min(1, Math.max(0, (t.value - 2) / 12))))
})
const typing = computed(() => driven.value && t.value >= 2 && t.value < 18)

/** Kroky pipeline — `at` je prah scrollu, `delay` časový fallback bez pinu. */
const STAGES = [
  { title: 'Build', detail: '12 stránok vygenerovaných', at: 18, delay: 35 },
  { title: 'Upload', detail: 'nahrané na produkciu', at: 30, delay: 55 },
  { title: 'Sieť', detail: 'CDN, DNS a SSL pripravené', at: 66, delay: 90 },
  { title: 'Naživo', detail: 'vas-projekt.sk beží', at: 84, delay: 105 },
] as const

/** Percento uploadu — plní sa medzi krokmi Upload a Sieť. */
const uploadPct = computed(() => Math.round(Math.min(1, Math.max(0, (t.value - 30) / 36)) * 100))

/** Uzol je hotový, keď scroll prejde jeho prah; bez pinu hneď. */
function stageDone(at: number) {
  return !driven.value || t.value >= at
}

/** Naplnenie spojky medzi uzlom `index` a nasledujúcim (0 – 100 %). */
function segmentFill(index: number) {
  if (!driven.value) return 100
  const from = STAGES[index]!.at
  const to = STAGES[index + 1]?.at ?? 100
  return Math.round(Math.min(1, Math.max(0, (t.value - from) / (to - from))) * 100)
}

/** Detail uploadu ukazuje pri scrolle živé percento. */
function stageDetail(stage: (typeof STAGES)[number]) {
  if (driven.value && stage.title === 'Upload') return `nahrávam na produkciu · ${uploadPct.value} %`
  return stage.detail
}

/** Vstupná animácia bez pinu — pri scrolle je kostra viditeľná od začiatku. */
function entrance(delay: 15 | 35 | 55 | 90 | 105) {
  return driven.value ? [] : [sceneItem({ delay })]
}

const grid = css({
  display: 'grid',
  gridTemplateColumns: '1.15fr 1fr',
  gap: '26px',
  height: '100%',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr' },
})

const cmdLine = css({
  fontFamily: 'mono',
  fontSize: '12.5px',
  color: 'dark.fg/85',
  marginBottom: '14px',
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

/** Riadok pipeline — uzol so spojkou vľavo, text vpravo. */
const stageRow = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '14px',
  '&:last-child [data-segment]': { display: 'none' },
})

const nodeCol = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const node = css({
  width: '20px',
  height: '20px',
  borderRadius: 'full',
  border: '1.5px solid',
  borderColor: 'dark.fg/25',
  color: 'dark.bg',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transitionProperty: 'background, border-color, transform',
  transitionDuration: '0.3s',
  transitionTimingFunction: 'ease',
  '& svg': { opacity: 0, transition: 'opacity 0.3s ease' },
  '&.done': {
    background: 'accent',
    borderColor: 'accent',
    '& svg': { opacity: 1 },
  },
  _motionReduce: { transition: 'none', '& svg': { transition: 'none' } },
})

/** Zvislá spojka medzi uzlami — plní sa zhora nadol podľa scrollu. */
const segment = css({
  position: 'relative',
  width: '2px',
  flex: 1,
  minHeight: '22px',
  marginBlock: '4px',
  borderRadius: 'full',
  background: 'dark.fg/12',
  overflow: 'hidden',
})

const segmentFillBar = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  background: 'accent',
  transition: 'height 0.15s linear',
  _motionReduce: { transition: 'none' },
})

const stageBody = css({ paddingBottom: '18px' })

const stageTitle = css({
  fontSize: '13.5px',
  fontWeight: 600,
  color: 'dark.fg',
  lineHeight: '20px',
  '&.live': { color: 'accent' },
})

const stageDetailLine = css({
  fontFamily: 'mono',
  fontSize: '11px',
  color: 'dark.dim',
  marginTop: '3px',
})

const liveWrap = css({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

/** Okno so spustenou stránkou — vnútro kreslí ProcessLiveWindow. */
const win = css({
  width: 'min(320px, 100%)',
  background: 'card',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 18px 44px rgba(0, 0, 0, 0.45)',
})
</script>

<template>
  <div :class="grid">
    <ProcessPanel title="Nasadenie">
      <div :class="[cmdLine, entrance(15)]">
        {{ typedCmd }}<span v-if="typing" :class="cmdCaret" />
      </div>
      <div v-for="(stage, index) in STAGES" :key="stage.title" :class="[stageRow, entrance(stage.delay)]">
        <div :class="nodeCol">
          <span :class="[node, { done: stageDone(stage.at) }]"><IconCheck :size="9" /></span>
          <span :class="segment" data-segment>
            <i :class="segmentFillBar" :style="{ height: `${segmentFill(index)}%` }" />
          </span>
        </div>
        <div :class="stageBody">
          <div :class="[stageTitle, { live: stage.title === 'Naživo' }]">{{ stage.title }}</div>
          <div :class="stageDetailLine">{{ stageDetail(stage) }}</div>
        </div>
      </div>
    </ProcessPanel>
    <div :class="liveWrap">
      <div :class="[win, driven ? [sceneReveal, { on: t >= 84 }] : sceneItem({ delay: 115 })]">
        <ProcessLiveWindow />
      </div>
    </div>
  </div>
</template>
