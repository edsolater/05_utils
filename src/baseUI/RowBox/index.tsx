import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { RowBoxStyleProps, useRowBoxStyle } from './style'
import pick from 'utils/object/pick'

export interface RowBoxProps extends DivProps, RowBoxStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const RowBox = (props: RowBoxProps) => {
  const { coreCss } = useRowBoxStyle(props)
  return <Div {...pick(props, divProps)} css={mixCSSObjects(props.css, coreCss)}></Div>
}

export default RowBox
