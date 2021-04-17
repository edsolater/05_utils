import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureAppearance,
  featureProps as featureAppearanceProps,
  FeatureProps as FeatureAppearanceProps
} from './appearance.feature'
import omit from 'utils/object/omit'

export interface CardProps extends DivProps, FeatureAppearanceProps {}

const Card = (props: CardProps) => {
  const restProps = omit(props, featureAppearanceProps)
  const { css: appearanceCss } = useFeatureAppearance(props)
  return <Div {...restProps} css={mix(appearanceCss, props.css)} />
}
export default Card

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
