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
 * Je plocha pod bodom tmavá? Prvky sa berú zhora nadol, kým niektorý naozaj
 * kreslí pozadie — fixné vrstvy (hlavička, ukazovateľ scrollu, kurzor) sa
 * preskakujú, tie sú nad stránkou, nie pod ňou.
 *
 * Meria sa skutočná farba, nie značka na sekcii: hlavička tak sedí aj nad
 * plochami, ktoré tmavou sekciou nie sú — napríklad nad navy krytom projektu,
 * ktorý sa na mobile roztiahne cez celú šírku.
 */
export function isDarkUnder(x: number, y: number) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (getComputedStyle(el).position === 'fixed') continue
    const tone = surfaceTone(el)
    if (tone !== null) return tone < 0.5
  }
  return false
}
