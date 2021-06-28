import React from 'react'
import { BaseUIDiv } from '.'
import { injectAppSetting } from './AppSettings'
import { DivProps } from "./baseProps"
import uiCSS from 'baseUI/settings/uiCSS'
import { toCssValue } from 'baseUI/style/cssUnits'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import cssTheme from 'baseUI/settings/cssTheme'
import { toICSS } from 'baseUI/style/cssParser'

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

const getCSS = toICSS(({ width, height, borderRadius, bg, color }: CardProps) => ({
  width: toCssValue(width),
  height: toCssValue(height),
  borderRadius:
    borderRadius === 'small'
      ? uiCSS.Card['borderRadius--small']
      : borderRadius === 'medium'
      ? uiCSS.Card['borderRadius--medium']
      : uiCSS.Card['borderRadius--large'],
  boxShadow: cssTheme.shadow.smooth,
  background: bg ?? cssTheme.color.whiteCard,
  backgroundColor: color
}))

/**
 * @BaseUIComponent
 */
function Card({ width, height, borderRadius, bg, color, ...restProps }: CardProps) {
  const css = getCSS({ width, height, borderRadius, bg, color })
  return <BaseUIDiv {...restProps} _css={css} />
}

export default injectAppSetting(Card, { borderRadius: 'medium' })
