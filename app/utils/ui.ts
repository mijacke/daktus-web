import { css, cva } from '~~/styled-system/css'

/** Spoločný horizontálny kontajner sekcií — max šírka a bočné odsadenie. */
export const wrap = css({
  maxWidth: '1760px',
  marginInline: 'auto',
  paddingInline: 'clamp(20px, 3.5vw, 72px)',
})

/** Vertikálny rytmus obsahovej sekcie. */
export const sectionBlock = css({
  paddingTop: 'clamp(88px, 11vh, 150px)',
})

/** Spodné odsadenie posledného bloku podstránky (band pred footerom). */
export const pageBottom = css({
  marginBottom: 'clamp(60px, 8vh, 100px)',
})

/** Šípkový odkaz v hlavičke sekcie („Všetky projekty" a pod.). */
export const sectionLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '15px',
  fontWeight: 600,
  borderBottom: '1px solid',
  borderColor: 'hairline',
  paddingBottom: '6px',
  transition: 'color 0.3s ease',
  _hover: { color: 'accent.deep' },
})

/** Ikona šípky v sekciovom odkaze — vždy v hlbokom akcente. */
export const sectionLinkIcon = css({
  display: 'inline-flex',
  color: 'accent.deep',
})

/** Poznámka v hlavičke sekcie (pravá strana bez odkazu). */
export const sectionNote = css({
  maxWidth: '420px',
  fontSize: '15px',
  color: 'dim',
  '[data-dark] &': { color: 'dark.dim' },
})

/**
 * Klipovací obal reveal riadku nadpisu. Namiesto overflow: hidden klipuje
 * cez clip-path so záporným presahom hore/dole — diakritika nad verzálkami
 * (Á, É, Č…) a spodky glyfov prežijú aj tesný line-height nadpisov,
 * a na rozdiel od padding/margin kompenzácie sa nemení layout.
 */
export const revealLine = css({
  display: 'block',
  clipPath: 'inset(-0.3em 0 -0.12em 0)',
})

/** Vnútro reveal riadku — vysunie sa spod klipu, keď rodič dostane triedu `in`. */
export const revealInner = cva({
  base: {
    display: 'block',
    transform: 'translateY(140%)',
    transition: 'transform 0.8s {easings.out}',
    '.in &': { transform: 'translateY(0)' },
    _motionReduce: { transform: 'none', transition: 'none' },
  },
  variants: {
    delay: {
      1: { transitionDelay: '0.05s' },
      2: { transitionDelay: '0.16s' },
      3: { transitionDelay: '0.27s' },
    },
  },
})

/**
 * Scroll-reveal fade: element sa objaví, keď on sám (`&.in`) alebo jeho
 * pozorovaný rodič (`.in &`) dostane marker triedu `in` (useInView).
 */
export const fadeIn = cva({
  base: {
    opacity: 0,
    transform: 'translateY(26px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.55s',
    transitionTimingFunction: 'out',
    '.in &': { opacity: 1, transform: 'none' },
    '&.in': { opacity: 1, transform: 'none' },
    _motionReduce: { opacity: 1, transform: 'none', transition: 'none' },
  },
  variants: {
    delay: {
      0: {},
      1: { transitionDelay: '0.06s' },
      2: { transitionDelay: '0.12s' },
      3: { transitionDelay: '0.18s' },
    },
  },
  defaultVariants: { delay: 0 },
})
