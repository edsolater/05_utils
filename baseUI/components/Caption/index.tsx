import React from 'react'
import { useCaptionStyle, CaptionStyleProps } from './style'
import pick from 'utils/functions/object/pick'
import { mixCSSObjects } from '../../style/cssParser'
import Div, { DivProps, divProps } from '../Div'

export interface CaptionProps extends DivProps, CaptionStyleProps {}

/**
 * @BaseUIComponent
 */
const Caption = (props: CaptionProps) => {
  const { coreCss } = useCaptionStyle(props)
  return <Div {...pick(props, divProps)} css={mixCSSObjects(props.css, coreCss)}></Div>
}

export default Caption
