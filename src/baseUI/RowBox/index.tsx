import React, { ReactNode } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssMixins'
import { cssRowBoxBaseStyle, rowBoxStylePropNames, RowBoxStyleProps } from './style'
import omit from 'utils/object/omit'

export interface RowBoxProps extends DivProps, RowBoxStyleProps {
  /**对此RowBox内容的描述 */
  caption?: ReactNode
  captionPosition?: `${'top' | 'bottom'}-${'left' | 'center' | 'right'}`
}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const RowBox = (props: RowBoxProps) => {
  const restProps = omit(props, rowBoxStylePropNames)
  return <Div {...restProps} css={mix(cssRowBoxBaseStyle(props), props.css)}></Div>
}

export default RowBox
