import { css } from '~~/styled-system/css'

/**
 * Výplne a ťahy pastelových figúrok tímu. Spoločné časti (pokožka, tvár)
 * idú priamo z tokenov, farby oblečenia a rekvizít z CSS premenných
 * `--fig-*`, ktoré nastavuje TeamFigure podľa člena tímu.
 */
export const figureParts = {
  shadow: css({ fill: 'figure.shadow' }),
  skin: css({ fill: 'figure.skin' }),
  skinShade: css({ fill: 'figure.skinShade' }),
  cheek: css({ fill: 'figure.cheek', fillOpacity: 0.5 }),
  eye: css({ fill: 'figure.face' }),
  faceLine: css({ fill: 'none', stroke: 'figure.face' }),
  body: css({ fill: 'var(--fig-body)' }),
  shade: css({ fill: 'var(--fig-shade)' }),
  shadeLine: css({ fill: 'none', stroke: 'var(--fig-shade)' }),
  hair: css({ fill: 'var(--fig-hair)' }),
  browLine: css({ fill: 'none', stroke: 'var(--fig-brow)' }),
  prop: css({ fill: 'var(--fig-prop)', stroke: 'var(--fig-prop-line)' }),
  propLine: css({ fill: 'none', stroke: 'var(--fig-prop-line)' }),
  propFill: css({ fill: 'var(--fig-prop-line)' }),
  detail: css({ fill: 'var(--fig-detail)' }),
  detailLine: css({ fill: 'none', stroke: 'var(--fig-detail)' }),
  soft: css({ fill: 'var(--fig-soft)' }),
  softLine: css({ fill: 'none', stroke: 'var(--fig-soft)' }),
  lens: css({ fill: 'white', fillOpacity: 0.35, stroke: 'figure.face' }),
}
