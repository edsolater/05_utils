import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import { cssCaptionAppearance, captionStylePropNames, CaptionAppearanceProps } from './appearance'
import omit from 'utils/object/omit'

export interface CaptionProps extends DivProps, CaptionAppearanceProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Caption = (props: CaptionProps) => {
  const restProps = omit(props, captionStylePropNames)
  return <Div {...restProps} css={mix(cssCaptionAppearance(props), props.css)}></Div>
}

export default Caption
