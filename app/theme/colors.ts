import { defineTokens } from '@pandacss/dev'

/** Farebné tokeny — jediné miesto, kde sa definujú farby. Komponenty používajú len názvy tokenov. */
export const colors = defineTokens.colors({
  paper: { value: '#F3F3F0' },
  ink: { value: '#101315' },
  dim: { value: '#6C7477' },
  accent: { value: '#6FA8A2' },
  accentDeep: { value: '#588B85' },
  darkBg: { value: '#0F1113' },
  hair: { value: 'rgba(16, 19, 21, 0.13)' },
  grid: { value: 'rgba(16, 19, 21, 0.045)' },
  blueprintLine: { value: 'rgba(16, 19, 21, 0.32)' },
  blueprintFill: { value: 'rgba(16, 19, 21, 0.02)' },
  accentWash: { value: 'rgba(111, 168, 162, 0.08)' },
  accentSelection: { value: 'rgba(111, 168, 162, 0.35)' },
})
