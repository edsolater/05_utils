import Div, { DivProps } from './Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { cssBrightness } from 'style/cssFunctions'
import { toPx } from 'helper/manageStyle/withPx'
// BaseUI的样式：只提供能在黑白视图中，瞬间明白这玩意儿是干啥用的基础界面UI：
const cssButtonBaseStyle = (type: ButtonProps['type']) =>
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
      color: 'white',
      backgroundColor: '#666',
      ':hover': { filter: cssBrightness(1.4) },
      ':active': { filter: cssBrightness(0.8) }
    },
    type === 'border' && {
      borderWidth: 2,
      padding: toPx([8 - 2, 16 - 2]),
      borderStyle: 'solid',
      borderColor: 'currentcolor'
    }
  )

export interface ButtonProps extends DivProps<'button'> {
  /**
   * 按钮元素的权重
   * 默认：border（空心按钮）
   */
  type?: 'primary' | 'border' | 'text' | 'text-link'
}

/**
 * 普通Button，TODO
 */
const Button = ({ type = 'border', ...restProps }: ButtonProps) => (
  <Div {...restProps} _tagName='button' css={mix(cssButtonBaseStyle(type), restProps.css)}></Div>
)

export default Button
