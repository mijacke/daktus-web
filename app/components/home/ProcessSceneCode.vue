<script setup lang="ts">
import { css } from '~~/styled-system/css'

const codeLine = css({
  display: 'flex',
  gap: '12px',
  fontFamily: 'mono',
  fontSize: '12.5px',
  lineHeight: 2,
  whiteSpace: 'nowrap',
})

const lineNo = css({
  color: 'dark.fg/25',
  width: '14px',
  textAlign: 'right',
})

const lineText = css({
  color: 'dark.fg/85',
  '& b': { fontWeight: 400, color: 'accent' },
  '& i': { fontStyle: 'normal', color: 'mockup.codeString' },
})

const previewHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'dark.fg/12',
  borderRadius: '9px',
  padding: '9px 12px',
})

const previewLogo = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '12px',
  textTransform: 'uppercase',
  color: 'dark.fg',
})

const previewMenu = css({
  display: 'flex',
  gap: '10px',
  fontSize: '10.5px',
  color: 'dark.dim',
})

const previewBox = css({
  border: '1px solid',
  borderColor: 'dark.fg/12',
  borderRadius: '9px',
  padding: '14px',
  marginTop: '10px',
})

const previewTitle = css({
  fontFamily: 'display',
  fontWeight: 800,
  fontSize: '18px',
  textTransform: 'uppercase',
  color: 'dark.fg',
})

const previewNote = css({
  fontSize: '11.5px',
  color: 'dark.dim',
  marginTop: '6px',
})

const previewButton = css({
  display: 'inline-flex',
  alignItems: 'center',
  height: '34px',
  paddingInline: '18px',
  borderRadius: 'full',
  background: 'accent',
  color: 'dark.bg',
  fontSize: '12.5px',
  fontWeight: 700,
  marginTop: '12px',
})
</script>

<template>
  <div :class="sceneGrid">
    <ProcessPanel title="Kód">
      <div :class="[codeLine, sceneItem({ delay: 15 })]">
        <span :class="lineNo">1</span><span :class="lineText"><b>const</b> web = <b>await</b> daktus.<b>build</b>({</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 45 })]">
        <span :class="lineNo">2</span><span :class="lineText">&nbsp;&nbsp;dizajn: <i>'na mieru'</i>,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 75 })]">
        <span :class="lineNo">3</span><span :class="lineText">&nbsp;&nbsp;rychlost: <i>'100/100'</i>,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 105 })]">
        <span :class="lineNo">4</span><span :class="lineText">&nbsp;&nbsp;seo: <b>true</b>,</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 135 })]">
        <span :class="lineNo">5</span><span :class="lineText">})</span>
      </div>
      <div :class="[codeLine, sceneItem({ delay: 175 })]">
        <span :class="lineNo">6</span><span :class="lineText"><b>export default</b> web</span>
      </div>
    </ProcessPanel>
    <ProcessPanel title="Náhľad">
      <div :class="[previewHeader, sceneItem({ delay: 50 })]">
        <span :class="previewLogo">Logo</span>
        <span :class="previewMenu"><span>Domov</span><span>Služby</span><span>Kontakt</span></span>
      </div>
      <div :class="[previewBox, sceneItem({ delay: 100 })]">
        <div :class="previewTitle">Nadpis sekcie</div>
        <div :class="previewNote">Obsah sa skladá presne podľa dizajnu.</div>
      </div>
      <span :class="[previewButton, sceneItem({ delay: 160 })]">Funkčné tlačidlo</span>
    </ProcessPanel>
  </div>
</template>
