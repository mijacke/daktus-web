<script setup lang="ts">
import { figureParts as f } from '~/utils/figure'

/** Mário — IT a DevOps: headset s mikrofónom a serverový box v rukách. */
defineProps<{ edge: string }>()
</script>

<template>
  <g stroke-linecap="round" stroke-linejoin="round">
    <g :filter="edge">
      <path :class="f.body" d="M58 188 V148 C58 124 76 110 100 110 C124 110 142 124 142 148 V188 Z" />
      <rect :class="f.skinShade" x="91" y="102" width="18" height="14" rx="7" />
      <path :class="f.shadeLine" d="M86 112 Q100 124 114 112" stroke-width="3" />
      <circle :class="f.skinShade" cx="64" cy="78" r="7" />
      <circle :class="f.skinShade" cx="136" cy="78" r="7" />
      <circle :class="f.skin" cx="100" cy="74" r="36" />
      <path :class="f.hair" d="M64 74 C62 48 80 36 100 36 C122 36 140 48 136 74 C130 62 118 56 104 58 C92 52 74 58 64 74 Z" />
      <path :class="f.detailLine" d="M60 80 C58 16 142 16 140 80" stroke-width="5" />
      <rect :class="f.detail" x="54" y="70" width="13" height="22" rx="6" />
      <rect :class="f.detail" x="133" y="70" width="13" height="22" rx="6" />
      <path :class="f.detailLine" d="M60 91 C60 102 70 104 82 101" stroke-width="3" />
      <circle :class="f.detail" cx="84" cy="100.5" r="3.6" />
    </g>
    <path :class="f.browLine" d="M83 69 Q88 66 93 69" stroke-width="2.4" />
    <path :class="f.browLine" d="M107 69 Q112 66 117 69" stroke-width="2.4" />
    <ellipse :class="f.eye" cx="88" cy="78" rx="3.2" ry="4" />
    <ellipse :class="f.eye" cx="112" cy="78" rx="3.2" ry="4" />
    <circle :class="f.cheek" cx="80" cy="88" r="6" />
    <circle :class="f.cheek" cx="120" cy="88" r="6" />
    <path :class="f.faceLine" d="M93 89 Q100 95 107 89" stroke-width="2.4" />
    <g :filter="edge">
      <rect :class="f.prop" x="72" y="134" width="56" height="44" rx="9" stroke-width="2" />
      <path :class="f.propLine" d="M72 156 H128" stroke-width="2" />
      <circle :class="f.detail" cx="82" cy="145" r="2.8" />
      <circle :class="f.soft" cx="90" cy="145" r="2.8" />
      <path :class="f.propLine" d="M102 145 H119" stroke-width="2.6" />
      <circle :class="f.detail" cx="82" cy="167" r="2.8" />
      <circle :class="f.detail" cx="90" cy="167" r="2.8" />
      <path :class="f.propLine" d="M102 167 H119" stroke-width="2.6" />
      <circle :class="f.skin" cx="70" cy="160" r="8" />
      <circle :class="f.skin" cx="130" cy="160" r="8" />
    </g>
  </g>
</template>
