import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useCaptionStyle, CaptionStyleProps } from './style'
import pick from 'utils/object/pick'

export interface CaptionProps extends DivProps, CaptionStyleProps {}

/**
 * @BaseUIComponent
 */
const Caption = (props: CaptionProps) => {
  const { coreCss } = useCaptionStyle(props)
  return <Div {...pick(props, divProps)} css={mixCSSObjects(props.css, coreCss)}></Div>
}

export default Caption
