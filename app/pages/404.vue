<script setup lang="ts">
/**
 * Statická 404 pre Netlify — prerenderovaná s plným obsahom, servíruje ju
 * redirect pravidlo v netlify.toml pre všetky neznáme cesty.
 */
useHead({
  title: '404 — Daktus',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <ClayError :status-code="404">
    <template #title>Túto stránku sme ešte nevytvarovali</template>
    <template #note>Adresa neexistuje alebo sa presunula. Z domovskej stránky sa dostanete všade, kde niečo stojí.</template>
    <AppButton href="/" arrow>Späť domov</AppButton>
  </ClayError>
</template>
