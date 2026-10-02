<script setup lang="ts">
import { figureParts as f } from '~/utils/figure'

/** Viktor — programátor: mikina s kapucňou, okuliare a notebook so značkou </>. */
defineProps<{ edge: string }>()
</script>

<template>
  <g stroke-linecap="round" stroke-linejoin="round">
    <g :filter="edge">
      <path :class="f.body" d="M58 188 V148 C58 124 76 110 100 110 C124 110 142 124 142 148 V188 Z" />
      <ellipse :class="f.shade" cx="100" cy="84" rx="46" ry="42" />
      <path :class="f.softLine" d="M94 114 L92 132 M106 114 L108 132" stroke-width="2.5" />
      <circle :class="f.soft" cx="92" cy="133" r="2.6" />
      <circle :class="f.soft" cx="108" cy="133" r="2.6" />
      <circle :class="f.skinShade" cx="64" cy="78" r="7" />
      <circle :class="f.skinShade" cx="136" cy="78" r="7" />
      <circle :class="f.skin" cx="100" cy="74" r="36" />
      <path :class="f.hair" d="M64 76 C60 46 84 34 104 36 C126 38 140 54 136 76 C132 66 126 62 120 59 C116 66 108 66 102 59 C96 66 86 66 82 59 C74 63 68 69 64 76 Z" />
    </g>
    <circle :class="f.lens" cx="88" cy="79" r="9" stroke-width="2.2" />
    <circle :class="f.lens" cx="112" cy="79" r="9" stroke-width="2.2" />
    <path :class="f.faceLine" d="M97 79 Q100 76 103 79" stroke-width="2.2" />
    <circle :class="f.eye" cx="88" cy="79" r="2.8" />
    <circle :class="f.eye" cx="112" cy="79" r="2.8" />
    <circle :class="f.cheek" cx="79" cy="92" r="5.5" />
    <circle :class="f.cheek" cx="121" cy="92" r="5.5" />
    <path :class="f.faceLine" d="M94 94 Q100 99 106 94" stroke-width="2.4" />
    <g :filter="edge">
      <rect :class="f.prop" x="66" y="126" width="68" height="46" rx="7" stroke-width="2" />
      <path :class="f.detailLine" d="M91 142 L84 149 L91 156 M109 142 L116 149 L109 156 M103 140 L97 158" stroke-width="3" />
      <rect :class="f.propFill" x="58" y="171" width="84" height="8" rx="4" />
      <circle :class="f.skin" cx="63" cy="165" r="8" />
      <circle :class="f.skin" cx="137" cy="165" r="8" />
    </g>
  </g>
</template>
