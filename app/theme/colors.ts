import { defineTokens } from '@pandacss/dev'

/** Farebné tokeny — jediné miesto, kde sa definujú farby. Komponenty používajú len názvy tokenov. */
export const colors = defineTokens.colors({
  // svetlý základ
  white: { value: '#FFFFFF' },
  paper: { value: '#F3F3F0' },
  paper2: { value: '#EBEBE6' },
  card: { value: '#FCFCFA' },
  ink: { value: '#101315' },
  dim: { value: '#6C7477' },
  hairline: {
    DEFAULT: { value: 'rgba(16, 19, 21, 0.13)' },
    soft: { value: 'rgba(16, 19, 21, 0.08)' },
  },
  // šalviový akcent
  accent: {
    DEFAULT: { value: '#6FA8A2' },
    deep: { value: '#588B85' },
  },
  // tmavé sekcie (proces, stack, CTA, footer)
  dark: {
    bg: { value: '#0F1113' },
    panel: { value: '#101316' },
    panel2: { value: '#0E1114' },
    fg: { value: '#EDEDEA' },
    dim: { value: '#8A9092' },
    hairline: { value: 'rgba(237, 237, 234, 0.11)' },
  },
  // dekoratívne podklady mockupov projektov
  cover: {
    blush: { value: '#EFDCD3' },
    blush2: { value: '#E4CCC0' },
    steel: { value: '#D8E2E8' },
    steel2: { value: '#C6D4DC' },
    paper: { value: '#EDEDE8' },
    paper2: { value: '#E2E2DB' },
  },
  // semafor v hlavičke náhľadového okna projektu — natívne macOS odtiene, čisto dekoratívne
  traffic: {
    red: { value: '#FF5F57' },
    amber: { value: '#FEBC2E' },
    green: { value: '#28C840' },
  },
  mockup: {
    peach: { value: '#E5C8BA' },
    peach2: { value: '#D9B4A4' },
    cream: { value: '#EFE3DA' },
    cream2: { value: '#E2CFC2' },
    clay: { value: '#D9C4B8' },
    clay2: { value: '#CBB0A2' },
    slate: { value: '#3D4548' },
    codeString: { value: '#C9BFA9' },
  },
})
