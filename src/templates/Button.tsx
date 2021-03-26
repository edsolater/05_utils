import Div, { DivProps } from 'baseUI/Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { ButtonCSSPart, cssButtonBaseStyle } from './ButtonStyle'

export interface ButtonProps extends DivProps<'button'> {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: ButtonCSSPart
  /**
   * 按钮元素的权重
   * 默认：bordered（空心按钮）
   */
  type?: 'primary' | 'bordered' | 'text'
  /**
   * 按钮的大小
   */
  size?: 'small' | 'middle' | 'large'
}

/**
 * 普通Button，TODO
 */
const Button = ({
  type = 'bordered',
  size = 'middle',
  cssPart,
  css,
  ...restProps
}: ButtonProps) => (
  <Div
    _tagName='button'
    {...restProps}
    css={mix(cssButtonBaseStyle({ size, type, cssPart, css }))}
  ></Div>
)

export default Button
