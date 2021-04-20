import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useButtonStyle,
  ButtonStyleProps
} from './style'
import pick from 'utils/object/pick'

export interface ButtonProps extends DivProps<'button'>, ButtonStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Button = (props: ButtonProps) => {
  const {coreCss } = useButtonStyle(props)
  return <Div _tagName='button' {...pick(props, divProps)} css={mix(props.css, coreCss)}></Div>
}

export default Button
