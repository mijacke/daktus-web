# Daktus Web

Oficiálny web štúdia Daktus (daktus.sk).

## Stack

Nuxt 4 (Vue 3), animácie GSAP a Lenis, Node.js 24 LTS (Nuxt 4 vyžaduje Node 22+).

Aktuálne verzie k 23. 8. 2026: Nuxt 4.5.2, Vue 3.5.41, GSAP 3.15.0, Lenis 1.3.26.

## Vývoj

Vetva `master` je chránená — každá zmena ide cez pull request. Na PR beží CI (lint, typecheck a testy, keď pribudnú) a Netlify vytvorí deploy preview.

## Deploy

Hosting Netlify. Každý merge do vetvy `master` sa automaticky nasadí na produkciu, pull requesty dostávajú deploy preview.

## Stav

Na produkcii je zatiaľ dočasná coming-soon stránka (`index.html` v koreni repa, publikovaná cez `netlify.toml`). Nuxt 4 scaffold pribudne neskôr a nahradí ju.
