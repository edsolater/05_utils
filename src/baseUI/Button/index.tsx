import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssMixins'
import { cssButtonBaseStyle, buttonStylePropNames, ButtonStyleProps } from './style'
import omit from 'utils/object/omit'

export interface ButtonProps extends DivProps<'button'>, ButtonStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Button = (props: ButtonProps) => {
  const restProps = omit(props, buttonStylePropNames)
  return (
    <Div _tagName='button' {...restProps} css={mix(cssButtonBaseStyle(props), props.css)}></Div>
  )
}

export default Button
