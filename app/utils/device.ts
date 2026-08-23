import { cva } from '~~/styled-system/css'

/**
 * Farebná edícia zariadení — jediné miesto s premennými rámov. Číta ich
 * LivePreview (morfujúce zariadenia projektov), DeviceFoot aj DeviceMac,
 * takže MacBook vyzerá všade rovnako.
 */
export const deviceTone = cva({
  variants: {
    tone: {
      light: {
        '--dev-bezel': 'token(colors.device.aluminum)',
        '--dev-edge': 'token(colors.device.aluminum2)',
        '--dev-chin': 'token(colors.device.aluminum2)',
        '--dev-phone': 'token(colors.device.silver)',
        '--dev-ring': 'token(colors.device.silver2)',
        '--dev-hi': 'rgba(255, 255, 255, 0.6)',
        '--dev-foot1': 'token(colors.device.silver)',
        '--dev-foot2': 'token(colors.device.silver2)',
        '--dev-foot3': 'token(colors.device.aluminum4)',
        '--dev-neck-a': 'token(colors.device.aluminum4)',
        '--dev-neck-b': 'token(colors.device.aluminum3)',
        '--dev-neck-hi': 'token(colors.white)',
        '--dev-base-a': 'token(colors.device.aluminum2)',
        '--dev-base-b': 'token(colors.device.aluminum4)',
        '--dev-screen': 'token(colors.card)',
      },
      dark: {
        '--dev-bezel': 'token(colors.device.dark)',
        '--dev-edge': 'token(colors.device.dark2)',
        '--dev-chin': 'token(colors.device.dark3)',
        '--dev-phone': 'token(colors.device.island)',
        '--dev-ring': 'token(colors.device.dark2)',
        '--dev-hi': 'rgba(255, 255, 255, 0.14)',
        '--dev-foot1': 'token(colors.device.dark4)',
        '--dev-foot2': 'token(colors.device.island)',
        '--dev-foot3': 'token(colors.device.island)',
        '--dev-neck-a': 'token(colors.device.island)',
        '--dev-neck-b': 'token(colors.device.dark4)',
        '--dev-neck-hi': 'token(colors.device.dark5)',
        '--dev-base-a': 'token(colors.device.dark3)',
        '--dev-base-b': 'token(colors.device.island)',
        '--dev-screen': 'token(colors.device.island)',
      },
    },
  },
})
