import { cssDefaults } from 'baseUI/settings'
import { cssDefaultColor } from 'baseUI/settings/cssDefaults'
import { CSSPropertyValue, mixCSSObjects, toCssValue, cssValues } from 'baseUI/style'
import React from 'react'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import { BaseUIDiv } from '.'
import { injectAppSetting } from './AppSettings'
import { DivProps, divProps } from './Div'

export interface CardProps extends DivProps {
  /**
   * @cssProps 卡片的颜色
   */
  color?: CSSPropertyValue<'color'>

  /**
   * @cssProps 卡片的背景图片（background能接收即可）
   */
  bg?: CSSPropertyValue<'background'>

  /**
   * @cssProps 卡片的宽度
   */
  width?: number | string
  /**
   * @cssProps 卡片的高度
   */
  height?: number | string
  /**
   * @cssProps 卡片的圆角程度
   * @default 'medium'
   */
  borderRadius?: 'small' | 'medium' | 'large'
}

const getCSS = cache((props: CardProps) =>
  mixCSSObjects({
    width: toCssValue(props.width),
    height: toCssValue(props.height),
    borderRadius:
      props.borderRadius === 'small'
        ? cssDefaults.Card['borderRadius--small']
        : props.borderRadius === 'medium'
        ? cssDefaults.Card['borderRadius--medium']
        : cssDefaults.Card['borderRadius--large'],
    boxShadow: cssValues.smoothShadow,
    background: props.bg,
    backgroundColor: props.color
  })
)

/**
 * @BaseUIComponent
 */
function Card(props: CardProps) {
  return <BaseUIDiv {...pick(props, divProps)} _css={getCSS(props)} />
}
const defaultSprops: CardProps = {
  borderRadius: 'medium',
  bg: cssDefaultColor.whiteCard
}

export default injectAppSetting(Card, defaultSprops)
