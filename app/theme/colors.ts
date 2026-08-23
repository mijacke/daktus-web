import { defineTokens } from '@pandacss/dev'

/** Farebné tokeny — jediné miesto, kde sa definujú farby. Komponenty používajú len názvy tokenov. */
export const colors = defineTokens.colors({
  bg: { value: '#0F1113' },
  fg: { value: '#EDEDEA' },
  dim: { value: '#8A9092' },
  accent: { value: '#6FA8A2' },
})
