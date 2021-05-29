import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useCardStyle, CardStyleProps } from './style'
import pick from 'utils/object/pick'
import BaseUIDiv from 'baseUI/Div/BaseUIDiv'

export interface CardProps extends DivProps, CardStyleProps {}

/**
 * @BaseUIComponent
 */
const Card = (props: CardProps) => {
  const { coreCss } = useCardStyle(props)
  return <BaseUIDiv {...pick(props, divProps)} css={mixCSSObjects(props.css, coreCss)} />
}
export default Card

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
