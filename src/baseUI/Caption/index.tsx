import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  featureProps as featureStyleProps,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import omit from 'utils/object/omit'

export interface CaptionProps extends DivProps, FeatureStyleProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Caption = (props: CaptionProps) => {
  const restProps = omit(props, featureStyleProps)
  const { css: styleCss } = useFeatureStyle(props)
  return <Div {...restProps} css={mix(props.css, styleCss)}></Div>
}

export default Caption
