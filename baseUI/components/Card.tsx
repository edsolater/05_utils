import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { DivProps, BaseUIDiv } from './Div'
import { useAppSettings } from './AppSettings'
import { CSSObject } from '@emotion/serialize'
import { toCssValue } from 'baseUI/style/cssUnits'
import { cssValues } from 'baseUI/style/cssValue'
import cache from 'utils/functions/functionFactory/cache'
import addDefault from 'utils/functions/magic/addDefault'

export interface CardProps extends DivProps, CardCSSProps {}
interface CardCSSProps {
  /**
   * 卡片的颜色
   */
  color?: string

  /**
   * 卡片的背景图片（background能接收即可）
   */
  bgImg?: string

  /**
   * 卡片的渐变图片
   */
  gradient?: string

  /**
   * 卡片的宽度
   */
  width?: number | string
  /**
   * 卡片的高度
   */
  height?: number | string
  /**
   * 卡片的圆角程度
   * @default 'medium'
   */
  borderRadius?: 'small' | 'medium' | 'large'
}

export interface CardDetailCSS {
  cardWidth?: CSSObject['width']
  cardHeight?: CSSObject['height']
}

const getCSS = cache((_props: CardCSSProps, cssSetting?: CardDetailCSS) => {
  const props = addDefault(_props, { borderRadius: 'medium' })
  return mixCSSObjects({
    width: (toCssValue(props.width) || cssSetting?.cardWidth) ?? 'unset',
    height: (toCssValue(props.height) || cssSetting?.cardHeight) ?? 'unset',
    borderRadius: props.borderRadius === 'small' ? 4 : props.borderRadius === 'large' ? 32 : 8,
    boxShadow: cssValues.smoothShadow,
    background: props.bgImg ? `url(${props.bgImg}) center / cover` : props.gradient,
    backgroundColor: props.color
  })
})

/**
 * @BaseUIComponent
 */
export default function Card(props: CardProps) {
  const { baseUICSS } = useAppSettings()
  return <BaseUIDiv {...props} _css={getCSS(props, baseUICSS?.Card)} />
}
