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
  // dekoratívne kryty projektov
  cover: {
    // béžová presne podľa webu paulifotografka.sk (cream-200 → cream-300)
    blush: { value: '#F5F0E8' },
    blush2: { value: '#EBE3D5' },
    // zosvetlená navy z palety aditrade.sk — tmavé okno návrhu na nej kontrastuje
    navy: { value: '#3D5070' },
    navy2: { value: '#283A52' },
    // šalviový akcent stiahnutý do svetlého tónu krytov — vlastný projekt
    mint: { value: '#C8DFDA' },
    mint2: { value: '#AFCFC9' },
  },
  // rámy zariadení v živých náhľadoch projektov — odtiene adaptované
  // z devices.css (MIT, picturepan2): iMac 24" silver a iPhone silver
  device: {
    aluminum: { value: '#EDEEF0' },
    aluminum2: { value: '#D4D5D7' },
    aluminum3: { value: '#C9CACC' },
    aluminum4: { value: '#8E8F91' },
    silver: { value: '#E2E3E4' },
    silver2: { value: '#C8C9CB' },
    dark: { value: '#1A1B1E' },
    dark2: { value: '#313338' },
    dark3: { value: '#38363E' },
    dark4: { value: '#2E3134' },
    dark5: { value: '#787C84' },
    panel: { value: '#010101' },
    island: { value: '#08090B' },
    lens: { value: '#6074BF' },
  },
  // semafor v hlavičke náhľadového okna projektu — natívne macOS odtiene, čisto dekoratívne
  traffic: {
    red: { value: '#FF5F57' },
    amber: { value: '#FEBC2E' },
    green: { value: '#28C840' },
  },
  mockup: {
    codeString: { value: '#C9BFA9' },
  },
  // pastelové figúrky tímu (sekcia Ľudia za Daktusom) — každý člen má vlastný
  // tón s rovnakou sadou kľúčov, aby ich TeamFigure prepínal len cez CSS premenné
  figure: {
    skin: { value: '#F5D9C4' },
    skinShade: { value: '#EBC5AB' },
    cheek: { value: '#F2A79C' },
    face: { value: '#2B2A28' },
    shadow: { value: 'rgba(16, 19, 21, 0.07)' },
    mario: {
      stage: { value: '#DDEBE7' },
      body: { value: '{colors.cover.mint}' },
      shade: { value: '{colors.cover.mint2}' },
      hair: { value: '#4A3A31' },
      brow: { value: '#4A3A31' },
      prop: { value: '#EEF6F2' },
      propLine: { value: '#97C0B6' },
      detail: { value: '{colors.accent.deep}' },
      soft: { value: '#F2A79C' },
    },
    viktor: {
      stage: { value: '#E6E1F7' },
      body: { value: '#CBC2EE' },
      shade: { value: '#B8ADE3' },
      hair: { value: '#7A5A44' },
      brow: { value: '#7A5A44' },
      prop: { value: '#F3F0FB' },
      propLine: { value: '#A99EE0' },
      detail: { value: '#7B6CC9' },
      soft: { value: '#9C90D6' },
    },
    boris: {
      stage: { value: '#F9E3D6' },
      body: { value: '#F5CDB6' },
      shade: { value: '#FFF8F2' },
      hair: { value: '#A8754A' },
      brow: { value: '#8C5E37' },
      prop: { value: '#FFF8F2' },
      propLine: { value: '#E0A27E' },
      detail: { value: '#C47A50' },
      soft: { value: '#E7BFA6' },
    },
  },
})
