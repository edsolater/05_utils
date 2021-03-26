import { mix } from 'style/cssMixins'
import { ICSS } from 'style/cssType'

// 声明组件有哪些props是服务于样式的
export interface RowBoxStyleProps {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: {
    small?: ICSS
    middle?: ICSS
    large?: ICSS
    noStratch?: ICSS
  }
  /**
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'middle' | 'large'
  noStratch?: boolean
}

// 表明具体有哪些props是服务于样式的（JS代码声明，也便与提取相关属性）
export const rowBoxStylePropNames: (keyof RowBoxStyleProps)[] = ['cssPart', 'gapSize', 'noStratch']

// 样式的具体css-in-js实现
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
