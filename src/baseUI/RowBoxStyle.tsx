import { mix } from 'style/cssMixins'
import { ICSS } from 'style/cssType'
import { toPx } from 'style/cssUnits'

export interface RowBoxCSSPart {
  small?: ICSS
  middle?: ICSS
  large?: ICSS
  noStratch?: ICSS
}
export interface RowBoxStyleProps {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: RowBoxCSSPart
  /**
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'middle' | 'large'
  noStratch?: boolean
}
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const cssRowBoxBaseStyle = ({ gapSize = 'middle', cssPart, noStratch }: RowBoxStyleProps) =>
  mix(
    { display: 'flex' },
    gapSize === 'small' && { gap: 4 },
    gapSize === 'middle' && { gap: 8 },
    gapSize === 'large' && { gap: 16 },
    gapSize === 'small' && cssPart?.small,
    gapSize === 'middle' && cssPart?.middle,
    gapSize === 'large' && cssPart?.large,

    noStratch && { alignItems: 'center' },
    noStratch && cssPart?.noStratch
  )
