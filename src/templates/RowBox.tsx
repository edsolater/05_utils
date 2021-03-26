import Div, { DivProps } from 'baseUI/Div'
import React from 'react'
import { mix } from 'style/cssMixins'
import { RowBoxCSSPart, cssRowBoxBaseStyle } from './RowBoxStyle'

export interface RowBoxProps extends DivProps {
  /**对组件的每一个part或虚拟part定义样式 */
  cssPart?: RowBoxCSSPart
  /**
   * "横"盒子空隙的大小
   */
  gapSize?: 'small' | 'middle' | 'large'
}

/**
 * 普通RowBox，TODO
 */
const RowBox = ({
  gapSize = 'middle',
  cssPart,
  css,
  ...restProps
}: RowBoxProps) => (
  <Div
    {...restProps}
    css={mix(cssRowBoxBaseStyle({ gapSize, cssPart, css }))}
  ></Div>
)

export default RowBox
