<script setup lang="ts">
import { css } from '~~/styled-system/css'
import type { ClayGlyphName } from '~/components/clay/ClayGlyph.vue'

/** Možnosť výberu — clay glyf robí z chipu malú vizitku služby. */
export interface ChipOption {
  label: string
  glyph?: ClayGlyphName
}

defineProps<{
  label: string
  /** name radio skupiny — pod týmto kľúčom príde hodnota do Netlify Forms. */
  name: string
  options: ChipOption[]
}>()

const model = defineModel<string>({ required: true })

const group = css({
  border: 'none',
  padding: 0,
  margin: 0,
})

const groupLabel = css({
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'dim',
})

const chips = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '18px',
})

const chip = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '9px',
  height: '46px',
  paddingInline: '22px',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'hairline',
  fontSize: '15px',
  fontWeight: 500,
  cursor: 'pointer',
  transitionProperty: 'border-color, background, color',
  transitionDuration: '0.3s',
  _hover: { borderColor: 'accent' },
  '&:has(input:checked)': {
    background: 'accent/14',
    borderColor: 'accent',
  },
  '&:has(input:focus-visible)': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '3px',
  },
})

const hiddenInput = css({ srOnly: true })
</script>

<template>
  <fieldset :class="group">
    <legend :class="groupLabel">{{ label }}</legend>
    <div :class="chips">
      <label v-for="option in options" :key="option.label" :class="chip">
        <input v-model="model" :class="hiddenInput" type="radio" :name="name" :value="option.label">
        <ClayGlyph v-if="option.glyph" :name="option.glyph" :size="20" />
        {{ option.label }}
      </label>
    </div>
  </fieldset>
</template>
