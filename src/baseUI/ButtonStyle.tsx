import { mix } from 'style/cssMixins'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { ICSS } from 'style/cssType'
import { toPx } from 'style/cssUnits'
import { ButtonProps } from './Button'

export interface ButtonCSSPart {
  primary?: ICSS
  bordered?: ICSS
  text?: ICSS
  small?: ICSS
  middle?: ICSS
  large?: ICSS
}
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const cssButtonBaseStyle = ({ size, type, cssPart, css }: ButtonProps) =>
  mix(
    {
      appearance: 'none',
      borderRadius: 2,
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
    size === 'small' && { padding: toPx(2, 8), fontSize: 14 },
    size === 'middle' && { padding: toPx(6, 14), fontSize: 14 },
    size === 'large' && { padding: toPx(12, 16), fontSize: 16 },
    type === 'primary' && {
      color: cssVar('--button-text-color', 'white'),
      backgroundColor: cssVar('--button-background-color', '#666'),
      ':hover': { filter: cssBrightness(1.4) },
      ':active': { filter: cssBrightness(0.8) }
    },
    type === 'bordered' && {
      position: 'relative',
      backgroundColor: 'transparent',
      color: cssVar('--button-text-color'),
      '::before': {
        content: "''",
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        borderWidth: cssVar('--button-border-width', '1px'),
        borderStyle: 'solid',
        borderColor: cssVar('--button-border-color', 'currentcolor'),
        opacity: 0.3,
        color: 'inherit'
      }
    },
    type === 'text' && {
      color: cssVar('--button-text-color')
    },
    size === 'small' && cssPart?.small,
    size === 'middle' && cssPart?.middle,
    size === 'large' && cssPart?.large,
    type === 'primary' && cssPart?.primary,
    type === 'bordered' && cssPart?.bordered,
    type === 'text' && cssPart?.text,
    css
  )
