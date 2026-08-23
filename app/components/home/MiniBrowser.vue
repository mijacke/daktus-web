<script setup lang="ts">
import { css } from '~~/styled-system/css'

defineProps<{ url: string }>()

const mini = css({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'card',
  border: '1px solid',
  borderColor: 'ink/10',
  borderRadius: '13px 13px 0 0',
  boxShadow: 'overlay',
})

const bar = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  height: '38px',
  paddingInline: '14px',
  borderBottom: '1px solid',
  borderColor: 'ink/8',
})

const dots = css({
  display: 'inline-flex',
  gap: '5px',
  '& i': {
    width: '8px',
    height: '8px',
    borderRadius: 'full',
    background: 'ink/14',
  },
})

const urlPill = css({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '22px',
  borderRadius: 'full',
  background: 'ink/5',
  fontSize: '10.5px',
  color: 'dim',
})
</script>

<template>
  <div :class="mini">
    <div :class="bar">
      <span :class="dots"><i /><i /><i /></span>
      <span :class="urlPill">{{ url }}</span>
    </div>
    <slot />
  </div>
</template>
