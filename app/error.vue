<script setup lang="ts">
import type { NuxtError } from '#app'

/** Chybová obálka appky — vizuál nesie zdieľaná ClayError scéna. */
const props = defineProps<{ error: NuxtError }>()

const notFound = computed(() => props.error.statusCode === 404)

useHead({ title: () => `${props.error.statusCode ?? 'Chyba'} — Daktus` })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <ClayError :status-code="error.statusCode ?? 500">
    <template #title>
      {{ notFound ? 'Túto stránku sme ešte nevytvarovali' : 'Niečo sa nám rozpučilo' }}
    </template>
    <template #note>
      {{ notFound
        ? 'Adresa neexistuje alebo sa presunula. Z domovskej stránky sa dostanete všade, kde niečo stojí.'
        : 'Skúste to o chvíľu znova — hmotu už miesime naspäť do tvaru.' }}
    </template>
    <AppButton arrow @click="goHome">Späť domov</AppButton>
  </ClayError>
</template>
