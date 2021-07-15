import cssColor, { CSSColorName, isColorName } from '../cssColor'
import { CSSValueLength } from '../cssUnits'
import { jssAtomFunctionFactory } from './jssAtomFunctionFactory'

//#region ------------------- backgound-color -------------------
/**
 * @cssAtomGenerator
 */
function bgColor(colorName: CSSColorName) {
  return { backgroundColor: cssColor[colorName] }
}
//#endregion

export const {
  mainFunction: backgroundSize,
  shortcutFunction: {
    inherit: backgroundSizeInherit,
    initial: backgroundSizeInitial,
    revert: backgroundSizeRevert,
    unset: backgroundSizeUnset,

    auto: backgroundSizeAuto,
    cover: backgroundSizeCover,
    contain: backgroundSizeContain
  }
} = jssAtomFunctionFactory({
  cssPropertyName: 'background-size',
  allowKeywords: ['auto', 'cover', 'contain']
})

export const {
  mainFunction: backgroundOrigin,
  shortcutFunction: {
    inherit: backgroundOriginInherit,
    initial: backgroundOriginInitial,
    revert: backgroundOriginRevert,
    unset: backgroundOriginUnset,

    'border-box': backgroundOriginBorderBox,
    'padding-box': backgroundOriginPaddingBox,
    'content-box': backgroundOriginContentBox
  }
} = jssAtomFunctionFactory({
  cssPropertyName: 'background-origin',
  allowKeywords: ['border-box', 'padding-box', 'content-box']
})

export const {
  mainFunction: backgroundPosition,
  shortcutFunction: {
    inherit: backgroundPositionInherit,
    initial: backgroundPositionInitial,
    revert: backgroundPositionRevert,
    unset: backgroundPositionUnset,

    'left top': backgroundPositionLeftTop,
    'top': backgroundPositionTop,
    'right top': backgroundPositionRightTop,
    'left': backgroundPositionLeft,
    'center': backgroundPositionCenter,
    'right': backgroundPositionRight,
    'left bottom': backgroundPositionLeftBottom,
    'bottom': backgroundPositionBottom,
    'right bottom': backgroundPositionRightBottom
  }
} = jssAtomFunctionFactory({
  cssPropertyName: 'background-origin',
  allowKeywords: [
    'left top',
    'top',
    'right top',
    'left',
    'center',
    'right',
    'left bottom',
    'bottom',
    'right bottom'
  ]
})
