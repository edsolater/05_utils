import React, { useContext } from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useButtonStyle, ButtonStyleProps } from './style'
import pick from 'utils/object/pick'
import { DefaultPropsContext } from 'baseUI/GlobalSettings'
import merge from 'utils/object/merge'

export interface ButtonProps extends DivProps<'button'>, ButtonStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Button = (props: ButtonProps) => {
  const defaultProps = useContext(DefaultPropsContext)
  const mprops = merge(defaultProps?.ButtonProps, props)
  const { coreCss } = useButtonStyle(mprops)
  return <Div _tagName='button' {...pick(mprops, divProps)} css={mixCSSObjects(mprops.css, coreCss)}></Div>
}

export default Button
