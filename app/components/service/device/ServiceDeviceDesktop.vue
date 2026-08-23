<script setup lang="ts">
import { css } from '~~/styled-system/css'

/** Mini iMac na poličke — hover karty pridá do zoznamu nový záznam. */
const shell = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'min(78%, 190px)',
})

/** Bezel s bradou — hrubší spodný okraj ako iMac 24". */
const bezel = css({
  position: 'relative',
  width: '100%',
  background: 'device.aluminum',
  border: '1px solid',
  borderColor: 'device.aluminum2',
  borderRadius: '8px',
  padding: '4px 4px 13px',
})

const camera = css({
  position: 'absolute',
  top: '1px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '2.5px',
  height: '2.5px',
  borderRadius: 'full',
  background: 'device.panel',
})

const screen = css({
  background: 'paper',
  borderRadius: '5px',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateColumns: '22px 1fr',
  gap: '7px',
  padding: '8px',
  height: '84px',
})

const side = css({
  borderRadius: '5px',
  background: 'paper2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
  paddingTop: '6px',
})

const sideItem = css({
  width: '9px',
  height: '9px',
  borderRadius: '3.5px',
  background: 'ink/12',
  '&:first-child': { background: 'accent' },
})

const rows = css({ minWidth: 0 })

/** Nový záznam — na hover sa vysunie na vrch zoznamu. */
const rowNew = css({
  overflow: 'hidden',
  maxHeight: 0,
  opacity: 0,
  transition: 'max-height 0.5s {easings.out}, opacity 0.4s ease 0.1s',
  '[data-svc]:hover &': { maxHeight: '15px', opacity: 1 },
  _motionReduce: { transition: 'none' },
})

const rowNewInner = css({
  height: '10px',
  borderRadius: '4px',
  background: 'accent/22',
  border: '1px solid',
  borderColor: 'accent/45',
  marginBottom: '5px',
})

const row = css({
  height: '10px',
  borderRadius: '4px',
  background: 'ink/8',
  marginTop: '5px',
  '&:first-of-type': { marginTop: 0 },
})

/** Stojan — plochý krk a podstava, tak ako pri veľkom iMacu v náhľadoch. */
const neck = css({
  width: '26px',
  height: '20px',
  background: 'linear-gradient(180deg, token(colors.device.aluminum4) 0%, token(colors.device.aluminum3) 45%, token(colors.device.aluminum3) 85%, token(colors.white) 92%, token(colors.device.aluminum4) 100%)',
})

const base = css({
  width: '64px',
  height: '4px',
  borderRadius: '1px',
  background: 'radial-gradient(circle at center, token(colors.device.aluminum2) 78%, token(colors.device.aluminum4) 100%)',
})
</script>

<template>
  <div :class="shell" aria-hidden="true">
    <div :class="bezel">
      <span :class="camera" />
      <div :class="screen">
        <div :class="side">
          <span :class="sideItem" /><span :class="sideItem" /><span :class="sideItem" />
        </div>
        <div :class="rows">
          <div :class="rowNew">
            <div :class="rowNewInner" />
          </div>
          <div :class="row" />
          <div :class="row" />
          <div :class="row" />
          <div :class="row" />
        </div>
      </div>
    </div>
    <div :class="neck" />
    <div :class="base" />
  </div>
</template>
