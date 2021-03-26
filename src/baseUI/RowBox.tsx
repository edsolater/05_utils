import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssMixins'
import { cssRowBoxBaseStyle, RowBoxStyleProps } from './RowBoxStyle'

export interface RowBoxProps extends DivProps, RowBoxStyleProps {}

/**
 * 普通RowBox，TODO
 */
const RowBox = ({ gapSize, cssPart, css, noStratch, ...restProps }: RowBoxProps) => (
  <Div {...restProps} css={mix(cssRowBoxBaseStyle({ gapSize, noStratch, cssPart }), css)}></Div>
)

export default RowBox
