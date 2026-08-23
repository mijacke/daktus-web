# Daktus Web

Oficiálny web štúdia Daktus (daktus.sk).

## Stack

Nuxt 4 (Vue 3), štýly Panda CSS (TypeScript, design tokens — žiadne vanilla CSS), animácie GSAP a Lenis, Node.js 24 LTS (Nuxt 4 vyžaduje Node 22+).

Aktuálne verzie k 23. 8. 2026: Nuxt 4.5.2, Vue 3.5.41, TypeScript 6.0.3, Panda CSS 1.12.0, GSAP 3.15.0, Lenis 1.3.26.

## Lokálne spustenie

```bash
nvm use        # Node 24 podľa .nvmrc
npm install
npm run dev    # http://localhost:3000
```

Ďalšie príkazy: `npm run generate` (statický build do `.output/public`), `npm run lint`, `npm run typecheck`.

## Vývoj

Vetva `master` je chránená — každá zmena ide cez pull request. Na PR beží CI (lint, typecheck a testy, keď pribudnú) a Netlify vytvorí deploy preview. Detaily v [CONTRIBUTING.md](.github/CONTRIBUTING.md), pravidlá pre AI agentov v [CLAUDE.md](CLAUDE.md).

## Deploy

Hosting Netlify. Každý merge do vetvy `master` sa automaticky nasadí na produkciu, pull requesty dostávajú deploy preview.

## Stav

Nuxt 4 scaffold je hotový — dočasnú coming-soon stránku teraz renderuje Nuxt (`app/app.vue`). Ostrý dizajn stránok (Domov, Projekty, Služby, Cenník, Kontakt) pribudne v ďalších PR.
