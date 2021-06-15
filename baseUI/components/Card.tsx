import { mergeProps, addDefaultProps } from 'baseUI/functions'
import { cssDefaults } from 'baseUI/settings'
import { CSSPropertyValue, mixCSSObjects, toCssValue, cssValues } from 'baseUI/style'
import React from 'react'
import { cache } from 'utils/functions/functionFactory'
import { pick } from 'utils/functions/object'
import { BaseUIDiv } from '.'
import { injectAppSetting, useAppSettings } from './AppSettings'
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

export interface CardSprops extends CardProps {
  'borderRadius--small'?: CSSPropertyValue<'borderRadius'>
  'borderRadius--medium'?: CSSPropertyValue<'borderRadius'>
  'borderRadius--large'?: CSSPropertyValue<'borderRadius'>
}


const getCSS = cache((sprops: CardSprops) =>
  mixCSSObjects({
    width: toCssValue(sprops.width),
    height: toCssValue(sprops.height),
    borderRadius:
      sprops.borderRadius === 'small'
        ? sprops['borderRadius--small']
        : sprops.borderRadius === 'medium'
        ? sprops['borderRadius--medium']
        : sprops['borderRadius--large'],
    boxShadow: cssValues.smoothShadow,
    background: sprops.bg,
    backgroundColor: sprops.color
  })
)

/**
 * @BaseUIComponent
 */
function Card(props: CardSprops) {
  return <BaseUIDiv {...pick(props, divProps)} _css={getCSS(props)} />
}
const defaultSprops: CardSprops = {
  borderRadius: 'medium',
  bg: cssDefaults.whiteCard,

  'borderRadius--small': '4px', // FIXME: 感觉这个是theme呀，设置在appSetting里不合适
  'borderRadius--medium': '8px',
  'borderRadius--large': '32px'
}

export default injectAppSetting(Card, defaultSprops)
