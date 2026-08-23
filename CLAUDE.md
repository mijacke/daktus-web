# CLAUDE.md

Pravidlá pre AI agentov (Claude Code a pod.) pracujúcich v tomto repozitári.

## Projekt

Web štúdia Daktus (daktus.sk). Stack: Nuxt 4 (Vue 3), animácie GSAP + Lenis, statický výstup (`nuxt generate`), hosting Netlify, Node.js 24 LTS (`.nvmrc`). Obsah webu je v slovenčine, kód a commit správy v angličtine.

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

## Workflow

- `master` je chránený: zmeny idú cez PR, CI check `checks` musí byť zelený, po merge sa head vetva maže automaticky.
- Vetvy pomenúvaj `feat/...`, `fix/...`, `chore/...`.
- Commit správy: angličtina, imperatív, stručne (napr. „Add hero animation").
- Deploy: merge do `master` → produkcia (Netlify), každý PR → deploy preview. Build konfigurácia je v `netlify.toml`.
- Detaily v [CONTRIBUTING.md](CONTRIBUTING.md).

## Príkazy (po pridaní Nuxt scaffoldu)

- `npm run dev` — lokálny vývoj
- `npm run generate` — statický build (nasadzuje Netlify)
- `npm run lint`, `npm run typecheck`, `npm run test` — rovnaké kontroly ako v CI (`.github/workflows/ci.yml`)

## Aktuálny stav

Na produkcii je dočasná coming-soon stránka (`index.html` v koreni repa). Nuxt scaffold ju nahradí — pri tom aktualizuj `netlify.toml`, CI skripty a túto sekciu.
