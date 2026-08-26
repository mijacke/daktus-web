<script setup lang="ts">
import { css } from '~~/styled-system/css'

/**
 * Vlastný povrch stránky. Svetlé sekcie nekreslia pozadie, a keby ho brali
 * z body, stmavli by spolu s ním — body totiž prepíname kvôli tónovaniu líšt
 * Safari (globalCss v panda.config.ts).
 */
const surface = css({ background: 'paper' })
</script>

<template>
  <div :class="surface">
    <SiteCursor />
    <ScrollProgress />
    <SiteNav />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
