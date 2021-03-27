import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssMixins'
import { cssRowBoxAppearance, rowBoxStylePropNames, RowBoxAppearanceProps } from './appearance'
import omit from 'utils/object/omit'

export interface RowBoxProps extends DivProps, RowBoxAppearanceProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const RowBox = (props: RowBoxProps) => {
  const restProps = omit(props, rowBoxStylePropNames)
  return <Div {...restProps} css={mix(cssRowBoxAppearance(props), props.css)}></Div>
}

export default RowBox
