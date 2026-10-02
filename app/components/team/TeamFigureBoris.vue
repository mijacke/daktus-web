<script setup lang="ts">
import { figureParts as f } from '~/utils/figure'

/** Boris — projektový manažér: košeľa s golierom a checklist na podložke. */
defineProps<{ edge: string }>()
</script>

<template>
  <g stroke-linecap="round" stroke-linejoin="round">
    <g :filter="edge">
      <path :class="f.body" d="M58 188 V148 C58 124 76 110 100 110 C124 110 142 124 142 148 V188 Z" />
      <rect :class="f.skinShade" x="91" y="102" width="18" height="14" rx="7" />
      <path :class="f.shade" d="M86 110 L100 124 L92 131 L81 116 Z M114 110 L100 124 L108 131 L119 116 Z" />
      <circle :class="f.propFill" cx="100" cy="138" r="2.2" />
      <circle :class="f.propFill" cx="100" cy="152" r="2.2" />
      <circle :class="f.skinShade" cx="64" cy="78" r="7" />
      <circle :class="f.skinShade" cx="136" cy="78" r="7" />
      <circle :class="f.skin" cx="100" cy="74" r="36" />
      <path :class="f.hair" d="M64 76 C62 50 80 35 102 35 C124 35 140 50 136 76 C134 64 128 57 116 54 C104 61 82 61 70 62 C66 66 64 70 64 76 Z" />
    </g>
    <path :class="f.browLine" d="M84 69 Q89 67 94 69" stroke-width="2.4" />
    <path :class="f.browLine" d="M106 69 Q111 67 116 69" stroke-width="2.4" />
    <ellipse :class="f.eye" cx="89" cy="78" rx="3.2" ry="4" />
    <ellipse :class="f.eye" cx="111" cy="78" rx="3.2" ry="4" />
    <circle :class="f.cheek" cx="80" cy="88" r="6" />
    <circle :class="f.cheek" cx="120" cy="88" r="6" />
    <path :class="f.faceLine" d="M92 89 Q100 97 108 89" stroke-width="2.4" />
    <g :filter="edge">
      <rect :class="f.prop" x="106" y="124" width="40" height="54" rx="6" stroke-width="2" />
      <rect :class="f.propFill" x="118" y="119" width="16" height="9" rx="3" />
      <path :class="f.detailLine" d="M112 140 L115 143 L121 137 M112 154 L115 157 L121 151" stroke-width="2.4" />
      <path :class="f.softLine" d="M125 140 H139 M125 154 H139 M125 168 H135" stroke-width="2.6" />
      <rect :class="f.detailLine" x="112" y="164" width="8" height="8" rx="2" stroke-width="2" />
      <circle :class="f.skin" cx="66" cy="160" r="8" />
      <circle :class="f.skin" cx="106" cy="160" r="8" />
    </g>
  </g>
</template>
