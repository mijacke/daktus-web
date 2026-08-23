# Ako prispievať

## Požiadavky

- Node.js 24 LTS — `nvm use` (verzia je v `.nvmrc`)
- npm

## Postup

1. Vytvor vetvu z `master`: `feat/...`, `fix/...` alebo `chore/...`.
2. Commituj v angličtine, imperatívne a stručne („Add hero animation“).
3. Otvor pull request do `master` a vyplň šablónu.
4. Počkaj na zelené CI (lint, typecheck, testy) a skontroluj Netlify deploy preview.
5. Po merge sa vetva na GitHube zmaže automaticky — lokálne si uprac cez `git fetch --prune`.

## Pravidlá vetvy master

- Priamy push je zablokovaný, zmeny idú výhradne cez PR.
- Vyžaduje sa 1 approval (admin má výnimku) a zelený CI check `checks`.
- Komentáre v PR treba vyriešiť pred mergom.
- Force-push a zmazanie vetvy `master` sú zakázané.

## Kvalita

- Pred pushom spusti `npm run lint` a `npm run typecheck` (keď scaffold existuje).
- Nové funkcionality sprevádzaj testami, hneď ako bude test setup k dispozícii.
- Pre AI agentov platia pravidlá v [CLAUDE.md](CLAUDE.md).
