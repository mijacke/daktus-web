/** Údaje o projektoch — jediný zdroj pravdy pre domovskú sekciu aj stránku Projekty. */

export interface ProjectChip {
  label: string
  accent?: boolean
}

export interface Project {
  /** Názov projektu / klienta. */
  name: string
  /** Jedna veta pod názvom na karte. */
  description: string
  /** Odsek s detailom na stránke Projekty. */
  summary: string
  /** Farebný podklad obálky s mockupom. */
  tone: 'blush' | 'steel'
  /** Štítky pri názve — posledný nesie stav projektu (accent). */
  chips: ProjectChip[]
  /** Čo sme na projekte robili. */
  scope: string[]
  /** Doména webu — len ak je projekt naživo. */
  domain?: string
}

export const PAULI: Project = {
  name: 'Pauli Fotografka',
  description: 'Portfólio a rezervácie pre rodinnú fotografku',
  summary: 'Portfóliový web, ktorý dáva priestor fotkám a zároveň berie rezervácie. '
    + 'Návštevník si prezrie galériu, vyberie typ fotenia a termín dohodne priamo na stránke — '
    + 'bez dohadovania v správach.',
  tone: 'blush',
  chips: [{ label: 'Webstránka' }, { label: 'Naživo', accent: true }],
  scope: ['Dizajn', 'Vývoj', 'Rezervácia termínov'],
  domain: 'paulifotografka.sk',
}

export const ADITRADE: Project = {
  name: 'Aditrade',
  description: 'Web pre špecialistov na nadrozmernú prepravu',
  summary: 'Prezentačný web pre prepravu nadrozmerného nákladu. Službu vysvetľuje jazykom klienta — '
    + 'sprievodné vozidlá, povolenia v EÚ, plánovanie trás — a celú stránku vedie k nezáväznému dopytu.',
  tone: 'steel',
  chips: [{ label: 'Webstránka' }, { label: 'Pred spustením', accent: true }],
  scope: ['Dizajn', 'Vývoj', 'Dopytový formulár'],
}
