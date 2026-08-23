import { css, cva } from '~~/styled-system/css'

/** Dvojstĺpcová mriežka obsahu scény v demo okne procesu. */
export const sceneGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '22px',
  height: '100%',
  '@media (max-width: 1000px)': { gridTemplateColumns: '1fr' },
})

/**
 * Položka scény procesu — objaví sa s odstupom, keď je scéna aktívna
 * (marker `scene-on` na obale scény). Delay v stotinách sekundy.
 */
export const sceneItem = cva({
  base: {
    opacity: 0,
    '.scene-on &': {
      animation: 'riseIn 0.55s {easings.out} forwards',
      _motionReduce: { animation: 'none' },
    },
    _motionReduce: { opacity: 1 },
  },
  variants: {
    delay: {
      15: { animationDelay: '0.15s' },
      20: { animationDelay: '0.2s' },
      25: { animationDelay: '0.25s' },
      35: { animationDelay: '0.35s' },
      45: { animationDelay: '0.45s' },
      50: { animationDelay: '0.5s' },
      55: { animationDelay: '0.55s' },
      70: { animationDelay: '0.7s' },
      75: { animationDelay: '0.75s' },
      85: { animationDelay: '0.85s' },
      90: { animationDelay: '0.9s' },
      100: { animationDelay: '1s' },
      105: { animationDelay: '1.05s' },
      110: { animationDelay: '1.1s' },
      115: { animationDelay: '1.15s' },
      120: { animationDelay: '1.2s' },
      130: { animationDelay: '1.3s' },
      135: { animationDelay: '1.35s' },
      140: { animationDelay: '1.4s' },
      150: { animationDelay: '1.5s' },
      160: { animationDelay: '1.6s' },
      175: { animationDelay: '1.75s' },
    },
  },
})
