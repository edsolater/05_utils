import cssColor, { CSSColorName, isColorName } from '../cssColor'
import { CSSValueLength, toPxIfNumber } from '../cssUnits'

//#region ------------------- backgound-color -------------------
/**
 * @cssAtomGenerator
 */
function bgColor(colorName: CSSColorName) {
  return { backgroundColor: cssColor[colorName] }
}
//#endregion

//#region ------------------- background-size -------------------
/**
 * @cssAtomGenerator
 * @see https://tailwindcss.com/docs/background-size
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
 */
export function backgroundSize(
  ...params: ['cover' | 'contain'] | [CSSValueLength, CSSValueLength?]
): { backgroundSize: string } {
  return { backgroundSize: params.map(toPxIfNumber).join(' ') }
}

/** @shortcut origin is {@link backgroundSize}*/
export const backgroundSizeAuto = () => backgroundSize('auto')

/** @shortcut origin is {@link backgroundSize}*/
export const backgroundSizeCover = () => backgroundSize('cover')

/** @shortcut origin is {@link backgroundSize}*/
export const backgroundSizeContain = () => backgroundSize('contain')
//#endregion


//#region ------------------- background-origin -------------------
/**
 * @cssAtomGenerator
 * @see https://tailwindcss.com/docs/background-origin
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
 */
export function backgroundOrigin(
  ...params: ['border-box' | 'padding-box' | 'content-box']
): { backgroundOrigin: string } {
  return { backgroundOrigin: params.map(toPxIfNumber).join(' ') }
}

/** @shortcut origin is {@link backgroundOrigin}*/
export const backgroundOriginBorderBox = () => backgroundOrigin('border-box')

/** @shortcut origin is {@link backgroundOrigin}*/
export const backgroundOriginPaddingBox = () => backgroundOrigin('padding-box')

/** @shortcut origin is {@link backgroundOrigin}*/
export const backgroundOriginContentBox = () => backgroundOrigin('content-box')

//#endregion

//#region ------------------- index -------------------
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
//#endregion

console.log(backgroundSize)
