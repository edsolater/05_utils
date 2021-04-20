import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import { useCardStyle, CardStyleProps } from './style'
import pick from 'utils/object/pick'

export interface CardProps extends DivProps, CardStyleProps {}

const Card = (props: CardProps) => {
  const { coreCss } = useCardStyle(props)
  return <Div {...pick(props, divProps)} css={mix(props.css, coreCss)} />
}
export default Card

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
