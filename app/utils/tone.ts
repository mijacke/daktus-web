/** Relatívna svetlosť farby v zápise rgb()/rgba(); null, keď je priehľadná. */
function colorTone(parts: string[]) {
  const [r, g, b, a] = parts.map(Number)
  if (a !== undefined && a < 0.5) return null
  return (0.2126 * r! + 0.7152 * g! + 0.0722 * b!) / 255
}

/**
 * Svetlosť plochy, ktorú prvok kreslí: farba pozadia, a keď je priehľadná,
 * priemer farebných zarážok gradientu. null znamená, že prvok nekreslí nič
 * a treba sa pozrieť pod neho.
 */
function surfaceTone(el: Element) {
  const style = getComputedStyle(el)
  const solid = style.backgroundColor.match(/[\d.]+/g)
  const flat = solid && solid.length >= 3 ? colorTone(solid) : null
  if (flat !== null) return flat

  const stops = style.backgroundImage.match(/rgba?\([^)]+\)/g)
  if (!stops) return null
  const tones = stops
    .map(stop => colorTone(stop.match(/[\d.]+/g) ?? []))
    .filter((tone): tone is number => tone !== null)
  return tones.length ? tones.reduce((sum, tone) => sum + tone, 0) / tones.length : null
}

/**
 * Leží prvok vo fixnej vrstve? Hlavička, ukazovateľ scrollu a kurzor sú nad
 * stránkou, nie pod ňou. Kontroluje sa aj rodičovstvo, nielen samotný prvok:
 * deti hlavičky (logo, tlačidlo, burger) fixné nie sú a hlavička by cez ne
 * merala samu seba.
 */
function inFixedLayer(el: Element) {
  for (let node: Element | null = el; node; node = node.parentElement) {
    if (getComputedStyle(node).position === 'fixed') return true
  }
  return false
}

/**
 * Kreslí prvok plochu cez celú šírku okna? Hlavička sedí na sekcii — karta,
 * kryt projektu ani tlačidlo, ktoré popod ňu len prejde, jej tón neurčujú.
 * Šírka ide z clientWidth, nie z innerWidth: v innerWidth je aj posuvník,
 * o ktorý je full-bleed sekcia užšia.
 */
function spansViewport(el: Element, width: number) {
  const rect = el.getBoundingClientRect()
  return rect.left <= 1 && rect.right >= width - 1
}

/**
 * Je plocha pod hlavičkou tmavá? Rozhoduje prvá sekcia zhora, ktorá kreslí
 * cez celú šírku okna — presne ten povrch, na akom hlavička vizuálne sedí.
 *
 * Meria sa skutočná farba, nie značka na sekcii: hlavička tak sedí aj nad
 * plochami, ktoré tmavou sekciou nie sú — napríklad nad tmavým pásom služby.
 */
export function isDarkUnder(y: number) {
  const width = document.documentElement.clientWidth
  for (const el of document.elementsFromPoint(width / 2, y)) {
    if (!spansViewport(el, width)) continue
    const tone = surfaceTone(el)
    if (tone !== null && !inFixedLayer(el)) return tone < 0.5
  }
  return false
}
