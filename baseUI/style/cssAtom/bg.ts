import cssColor, { CSSColorName, isColorName } from '../cssColor'

/**
 * @see https://tailwindcss.com/docs/background-color
 * @param params
 * @returns
 */
function bg(params: string) {
  // param represent a color
  if (isColorName(params)) {
    return bgColor(params)
  }

  if (isBgSize(params)) {
    return bgSize(params)
  }

  return { background: 'todo' }
}

/**
 * @cssAtomGenerator
 */
function bgColor(colorName: CSSColorName) {
  return { backgroundColor: cssColor[colorName] }
}

const bgSizeValues = ['none', 'cover', 'contain'] as const
type BigSizeValue = typeof bgSizeValues[number]

function isBgSize(size: string): size is BigSizeValue {
  return bgSizeValues.includes(size as any)
}

/**
 * @cssAtomGenerator
 * @see https://tailwindcss.com/docs/background-size
 */
function bgSize(size: BigSizeValue) {
  return { backgroundSize: size }
}
