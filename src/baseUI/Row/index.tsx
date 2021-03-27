import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssMixins'
import { cssRowAppearance, rowStylePropNames, RowAppearanceProps } from './appearance'
import omit from 'utils/object/omit'

export interface RowProps extends DivProps, RowAppearanceProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Row = (props: RowProps) => {
  const restProps = omit(props, rowStylePropNames)
  return <Div {...restProps} css={mix(cssRowAppearance(props), props.css)}></Div>
}

export default Row
