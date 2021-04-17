import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  featureProps as featureStyleProps,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import omit from 'utils/object/omit'

export interface CardProps extends DivProps, FeatureStyleProps {}

const Card = (props: CardProps) => {
  const restProps = omit(props, featureStyleProps)
  const { css: styleCss } = useFeatureStyle(props)
  return <Div {...restProps} css={mix(styleCss, props.css)} />
}
export default Card

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
