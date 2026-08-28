/** Položky hlavného menu — jediný zdroj pre hlavičku, mobilné menu aj pätu. */
export const MENU = [
  { label: 'Domov', href: '/' },
  { label: 'Projekty', href: '/projekty' },
  { label: 'Služby', href: '/sluzby' },
  { label: 'Cenník', href: '/cennik' },
  { label: 'Kontakt', href: '/kontakt' },
]

/** Hlavička Domov nepotrebuje — tam vedie logo. */
export const NAV_LINKS = MENU.filter(item => item.href !== '/')
