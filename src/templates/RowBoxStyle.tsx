import { mix } from 'style/cssMixins'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { ICSS } from 'style/cssType'
import { toPx } from 'style/cssUnits'
import { RowBoxProps } from './RowBox'

export interface RowBoxCSSPart {
  small?: ICSS
  middle?: ICSS
  large?: ICSS
}
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const cssRowBoxBaseStyle = ({ gapSize, cssPart, css }: RowBoxProps) =>
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
    gapSize === 'small' && { padding: toPx(2, 8), fontSize: 14 },
    gapSize === 'middle' && { padding: toPx(6, 14), fontSize: 14 },
    gapSize === 'large' && { padding: toPx(12, 16), fontSize: 16 },
    gapSize === 'small' && cssPart?.small,
    gapSize === 'middle' && cssPart?.middle,
    gapSize === 'large' && cssPart?.large,
    css
  )
