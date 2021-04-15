import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureAppearance,
  featureProps as featureAppearanceProps,
  FeatureProps as FeatureAppearanceProps
} from './appearance.feature'
import omit from 'utils/object/omit'

export interface IconProps extends DivProps, FeatureAppearanceProps {}

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Icon = (props: IconProps) => {
  const restProps = omit(props, featureAppearanceProps)
  const { css: appearanceCss } = useFeatureAppearance(props)
  return <Div {...restProps} css={mix(appearanceCss, props.css)}></Div>
}

export default Icon
