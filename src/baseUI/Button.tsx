import Div, { DivProps } from './Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { cssBrightness, cssVar } from 'style/cssFunctions'
import { toPx } from 'helper/manageStyle/withPx'
import { ICSS } from 'style/cssType'

interface ButtonCSSPart {
  primary?: ICSS
  bordered?: ICSS
  text?: ICSS
}
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
const cssButtonBaseStyle = ({ type, cssPart, css }: ButtonProps) =>
  mix(
    {
      appearance: 'none', // 好像并没有实际效果
      borderRadius: 4,
      padding: toPx([8, 16]),
      borderWidth: 0,
      cursor: 'pointer',
      userSelect: 'none',
      width: 'max-content',
      boxSizing: 'border-box'
    },
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
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: cssVar('--button-border-color', 'currentcolor'),
        opacity: 0.3,
        color: 'inherit'
      }
    },
    type === 'text' && {
      color: cssVar('--button-text-color')
    },

    type === 'primary' && cssPart?.primary,
    type === 'bordered' && cssPart?.bordered,
    type === 'text' && cssPart?.text,
    css
  )

export interface ButtonProps extends DivProps<'button'> {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: ButtonCSSPart
  /**
   * 按钮元素的权重
   * 默认：bordered（空心按钮）
   */
  type?: 'primary' | 'bordered' | 'text'
}

/**
 * 普通Button，TODO
 */
const Button = ({ type = 'bordered', cssPart, css, ...restProps }: ButtonProps) => (
  <Div _tagName='button' {...restProps} css={mix(cssButtonBaseStyle({ type, cssPart, css }))}></Div>
)

export default Button
