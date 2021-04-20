import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import { useCaptionStyle, CaptionStyleProps } from './style'
import pick from 'utils/object/pick'

export interface CaptionProps extends DivProps, CaptionStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Caption = (props: CaptionProps) => {
  const { coreCss } = useCaptionStyle(props)
  return <Div {...pick(props, divProps)} css={mix(props.css, coreCss)}></Div>
}

export default Caption
