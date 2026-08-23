# CLAUDE.md

Pravidlá pre AI agentov (Claude Code a pod.) pracujúcich v tomto repozitári.

## Projekt

Web štúdia Daktus (daktus.sk). Stack: Nuxt 4 (Vue 3), štýly Panda CSS (TypeScript), animácie GSAP + Lenis, statický výstup (`nuxt generate`), hosting Netlify, Node.js 24 LTS (`.nvmrc`). Obsah webu je v slovenčine, kód a commit správy v angličtine.

## Zdroje informácií — vždy Context7

- Na informácie o knižniciach a frameworkoch (Nuxt, Vue, GSAP, Lenis, …) **vždy použi Context7**: najprv `resolve-library-id`, potom `query-docs` s konkrétnou otázkou. Max 3 volania na jednu otázku.
- Nespoliehaj sa na verzie a API z tréningových dát — aktuálnu verziu over v npm registry (`npm view <balík> version`) a správanie cez Context7.

## Graphify — projektová mapa (povinné)

- Pred hľadaním v kóde použi `graphify query "<otázka>"`, `graphify path "A" "B"` alebo `graphify explain "<uzol>"` namiesto grep/find — je to rýchlejšie a šetrí tokeny.
- Pred väčšími úpravami si prečítaj `graphify-out/GRAPH_REPORT.md`.
- Ak `graphify-out/` neexistuje alebo je zastaraný, spusti skill `/graphify` (`~/.agents/skills/graphify/SKILL.md`). Ak nástroj nie je nainštalovaný, stiahni si ho (`pip install graphifyy`) a mapu vybuduj pred prácou s kódom.
- Po každej úprave kódu spusti `graphify update .` (AST-only, bez LLM nákladov).
- `graphify-out/` je v `.gitignore` — mapa sa neverzionuje, každý si ju generuje lokálne.
- Hrany typu EXTRACTED ber ako podložené zdrojom; INFERRED a AMBIGUOUS over v kóde skôr, než na nich postavíš rozhodnutie.

## Architektúra

- Malé kompozičné jednotky, žiadne monolity: bežný komponent/composable do ~100 riadkov, tvrdý strop 300 riadkov na súbor. Pri raste rozdeľ na podkomponenty alebo menšie composables.
- Všetok aplikačný kód žije v `app/`: `components/` (PascalCase, jedna zodpovednosť), `composables/` (`use*`), `pages/`, `layouts/`, `utils/`, `theme/` (design tokeny).
- Vue: výhradne `<script setup lang="ts">`, typované props/emits, strict TypeScript.
- **Štýly: výhradne TypeScript cez Panda CSS** — `css()`/recipes z `styled-system` (generuje `panda codegen`, beží automaticky v postinstall). Žiadne vanilla CSS: žiadne `<style>` bloky v SFC, žiadne nové `.css` súbory, žiadne inline štýly. Jediná výnimka je `app/assets/main.css` (vstupné `@layer` deklarácie Pandy) — needituj ho.
- Design tokeny: farby VÝHRADNE v `app/theme/colors.ts`, ostatné tokeny (fonty, neskôr spacing/typografia) v `app/theme/tokens.ts`; registrujú sa v `panda.config.ts`. V komponentoch nikdy hex/px hodnoty tam, kde existuje token — vždy token.
- Globálne štýly a keyframes: len cez `globalCss` / `theme.keyframes` v `panda.config.ts`.

## Workflow

- `master` je chránený: zmeny idú cez PR, CI check `checks` musí byť zelený, po merge sa head vetva maže automaticky.
- Vetvy pomenúvaj `feat/...`, `fix/...`, `chore/...`.
- Commit správy: angličtina, imperatív, stručne (napr. „Add hero animation").
- Deploy: merge do `master` → produkcia (Netlify), každý PR → deploy preview. Build konfigurácia je v `netlify.toml`.
- Detaily v [CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Príkazy

- `npm run dev` — lokálny vývoj (http://localhost:3000)
- `npm run generate` — statický build do `.output/public` (nasadzuje Netlify)
- `npm run lint`, `npm run typecheck` — rovnaké kontroly ako v CI (`.github/workflows/ci.yml`); `npm run test` pribudne s test setupom

## Aktuálny stav

Nuxt 4 scaffold je hotový, dočasnú coming-soon stránku renderuje `app/app.vue` — štýly už kompletne cez Panda CSS. TypeScript je zámerne na 5.9.x — najnovší, ktorý funguje bez obchádzok: čistý `typescript@7` (tsgo) s vue-tsc padá na `ERR_PACKAGE_PATH_NOT_EXPORTED` (overené 23. 8. 2026), TS 6/7 vyžadujú bridge/alias balíky (`@typescript/typescript6`, `typescript-native-bridge`), ktoré Nuxt ekosystém oficiálne nepoužíva. Pred povýšením over cez Context7 (`/vuejs/language-tools`). Ostrý dizajn stránok (Domov, Projekty, Služby, Cenník, Kontakt) sa bude prenášať z prototypu v ďalších PR.
