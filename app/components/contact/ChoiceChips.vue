<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{
  label: string
  /** name radio skupiny — pod týmto kľúčom príde hodnota do Netlify Forms. */
  name: string
  options: string[]
}>()

const model = defineModel<string>({ required: true })

const group = css({
  border: 'none',
  padding: 0,
  margin: 0,
})

const groupLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  fontSize: '12.5px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'dim',
  _before: { content: '""', width: '18px', height: '2px', background: 'accent' },
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
    background: 'ink',
    color: 'paper',
    borderColor: 'ink',
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
      <label v-for="option in options" :key="option" :class="chip">
        <input v-model="model" :class="hiddenInput" type="radio" :name="name" :value="option">
        {{ option }}
      </label>
    </div>
  </fieldset>
</template>
