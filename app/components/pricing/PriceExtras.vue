<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

/** Tichý riadok doplnkov pod balíkmi — orientačná suma hneď, žiadne „na vyžiadanie". */
interface Extra {
  glyph: ClayGlyphName
  title: string
  price: string
  text: string
}

const EXTRAS: Extra[] = [
  {
    glyph: 'ceruzka',
    title: 'Redizajn webu',
    price: 'od 600 €',
    text: 'Existujúci web prekreslíme do čistej podoby bez straty obsahu a pozícií vo vyhľadávaní.',
  },
  {
    glyph: 'stit',
    title: 'Údržba a správa',
    price: 'od 39 € mesačne',
    text: 'Aktualizácie, zálohy a dohľad nad prevádzkou. Prvý mesiac je v cene každého balíka.',
  },
  {
    glyph: 'lupa',
    title: 'Konzultácie',
    price: 'prvá zadarmo',
    text: 'Poradíme s výberom riešenia skôr, než sa začne stavať. Ušetrí to peniaze aj nervy.',
  },
]

const rootEl = ref<HTMLElement | null>(null)
const inView = useInView(rootEl)

const strip = css({
  borderTop: '1px solid',
  borderColor: 'hairline',
  marginTop: 'clamp(48px, 7vh, 72px)',
  paddingBlock: 'clamp(44px, 6vh, 68px)',
})

const eyebrowRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '13px',
})

const dash = css({
  width: '26px',
  height: '2px',
  background: 'accent',
  flexShrink: 0,
})

const label = css({
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'dim',
})

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(24px, 3vw, 48px)',
  marginTop: '34px',
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
})

const item = css({
  display: 'flex',
  gap: '14px',
  alignItems: 'flex-start',
})

const itemHead = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '10px',
  flexWrap: 'wrap',
})

const itemTitle = css({
  fontSize: '15.5px',
  fontWeight: 600,
  margin: '2px 0 0',
})

const itemPrice = css({
  fontSize: '13.5px',
  fontWeight: 700,
  color: 'accent.deep',
  whiteSpace: 'nowrap',
})

const itemText = css({
  fontSize: '14.5px',
  color: 'dim',
  margin: '6px 0 0',
  maxWidth: '38ch',
})
</script>

<template>
  <section ref="rootEl" :class="[strip, { in: inView }]">
    <div :class="fadeIn()">
      <div :class="eyebrowRow">
        <span :class="dash" />
        <span :class="label">Okrem balíkov</span>
      </div>
    </div>
    <div :class="grid">
      <div
        v-for="(extra, index) in EXTRAS"
        :key="extra.title"
        :class="[item, fadeIn({ delay: (index + 1) as 1 | 2 | 3 })]"
      >
        <ClayGlyph :name="extra.glyph" :size="34" />
        <div>
          <div :class="itemHead">
            <h3 :class="itemTitle">{{ extra.title }}</h3>
            <span :class="itemPrice">{{ extra.price }}</span>
          </div>
          <p :class="itemText">{{ extra.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
