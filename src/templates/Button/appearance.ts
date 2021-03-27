import { cssBrightness, cssVar } from 'style/cssFunctions'
import { mix } from 'style/cssMixins'
import { ICSS } from 'style/ICSS'
import { toPx } from 'style/cssUnits'

// 声明组件有哪些props是纯粹改变外观的
export interface ButtonStyleProps {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: {
    primary?: ICSS
    border?: ICSS
    text?: ICSS
    small?: ICSS
    middle?: ICSS
    large?: ICSS
  }
  /**
   * 按钮元素的权重
   * 默认：border（空心按钮）
   */
  type?: 'primary' | 'border' | 'text'
  /**
   * 按钮的大小
   */
  size?: 'small' | 'middle' | 'large'
}

// 表明具体有哪些props是纯粹改变外观的（JS代码声明，也便于提取相关属性）
export const buttonStylePropNames: (keyof ButtonStyleProps)[] = ['cssPart', 'type', 'size']

// 样式的具体css-in-js实现
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
export const cssButtonBaseStyle = ({
  size = 'middle',
  type = 'border',
  cssPart
}: ButtonStyleProps) =>
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
    type === 'border' && {
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
    type === 'border' && cssPart?.border,
    type === 'text' && cssPart?.text
  )
