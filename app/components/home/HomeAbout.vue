<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { css, cva } from '~~/styled-system/css'

const SEGMENTS = [
  { text: 'Za Daktusom stojí tím vývojárov a dizajnérov s rokmi praxe z veľkého firemného vývoja.', accent: false },
  { text: 'Dizajn aj kód staviame pod jednou strechou.', accent: true },
]

const PRINCIPLES = [
  {
    title: 'Píšete si priamo s nami',
    text: 'Žiadni account manažéri ani odovzdávanie medzi firmami. Od prvej správy po spustenie jeden tím.',
  },
  {
    title: 'Ľahkosť ako princíp',
    text: 'Ľahké weby, ľahká komunikácia, ľahké rozhodovanie. Zložitosť nechávame v kóde, nie u vás.',
  },
  {
    title: 'Dlhodobé partnerstvá',
    text: 'Web ani appka nie sú jednorazovka. Zostávame pri produkte aj po spustení.',
  },
]

const words = SEGMENTS.flatMap(segment =>
  segment.text.split(' ').map(word => ({ word, accent: segment.accent })),
)

const onCount = ref(0)
const statementEl = ref<HTMLElement | null>(null)
const headEl = ref<HTMLElement | null>(null)
const headIn = useInView(headEl)
const sideEl = ref<HTMLElement | null>(null)
const sideIn = useInView(sideEl)
let trigger: ScrollTrigger | null = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    onCount.value = words.length
    return
  }
  gsap.registerPlugin(ScrollTrigger)
  // rozsvecovanie začína hneď pri vstupe a je kompletné, keď text dosiahne polku viewportu
  trigger = ScrollTrigger.create({
    trigger: statementEl.value,
    start: 'top 90%',
    end: 'top 45%',
    onUpdate: self => (onCount.value = Math.floor(self.progress * words.length)),
  })
})

onBeforeUnmount(() => trigger?.kill())

const eyebrowRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
})

const eyebrowDash = css({
  width: '26px',
  height: '2px',
  background: 'accent',
  flexShrink: 0,
})

const eyebrowLabel = css({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'dim',
})

const cols = css({
  display: 'grid',
  gridTemplateColumns: '1.25fr 0.75fr',
  gap: 'clamp(40px, 6vw, 110px)',
  marginTop: '48px',
  alignItems: 'start',
  '@media (max-width: 860px)': { gridTemplateColumns: '1fr' },
})

const statement = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: 'clamp(28px, 3.4vw, 54px)',
  lineHeight: 1.2,
  letterSpacing: '-0.015em',
})

const word = cva({
  base: {
    opacity: 0.14,
    transition: 'opacity 0.5s ease',
    '&.on': { opacity: 1 },
    _motionReduce: { opacity: 1 },
  },
  variants: {
    accent: {
      true: { color: 'accent.deep' },
    },
  },
})

const side = css({
  display: 'flex',
  flexDirection: 'column',
})

const principle = css({
  borderTop: '1px solid',
  borderColor: 'hairline',
  paddingBlock: '22px',
  '&:first-child': { borderTop: 'none', paddingTop: 0 },
  '&:last-child': { borderBottom: '1px solid {colors.hairline}' },
})

const principleTitle = css({
  fontSize: '17px',
  fontWeight: 600,
})

const principleText = css({
  fontSize: '15px',
  color: 'dim',
  margin: '8px 0 0',
})
</script>

<template>
  <section id="o-nas" :class="sectionBlock">
    <div :class="wrap">
      <div ref="headEl" :class="[eyebrowRow, fadeIn(), { in: headIn }]">
        <span :class="eyebrowDash" />
        <span :class="eyebrowLabel">O nás</span>
      </div>
      <div :class="cols">
        <div ref="statementEl" :class="statement">
          <template v-for="(item, index) in words" :key="index">
            <span :class="[word({ accent: item.accent }), { on: index < onCount }]">{{ item.word }}</span>{{ ' ' }}
          </template>
        </div>
        <div ref="sideEl" :class="[side, fadeIn(), { in: sideIn }]">
          <div v-for="item in PRINCIPLES" :key="item.title" :class="principle">
            <div :class="principleTitle">{{ item.title }}</div>
            <p :class="principleText">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
