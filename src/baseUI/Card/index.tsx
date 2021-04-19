import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import pick from 'utils/object/pick'

export interface CardProps extends DivProps, FeatureStyleProps {}

const Card = (props: CardProps) => {
  const { css: styleCss } = useFeatureStyle(props)
  return <Div {...pick(props, divProps)} css={mix(props.css, styleCss)} />
}
export default Card

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
