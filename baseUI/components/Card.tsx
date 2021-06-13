import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import { DivProps, BaseUIDiv, divProps } from './Div'
import { useAppSettings } from './AppSettings'
import { CSSObject } from '@emotion/serialize'
import { toCssValue } from 'baseUI/style/cssUnits'
import { cssValues } from 'baseUI/style/cssValue'
import cache from 'utils/functions/functionFactory/cache'
import pick from 'utils/functions/object/pick'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

export interface CardProps extends DivProps {
  /**
   * @cssProps 卡片的颜色
   */
  color?: string

  /**
   * @cssProps 卡片的背景图片（background能接收即可）
   */
  bgImg?: string

  /**
   * @cssProps 卡片的渐变图片
   */
  gradient?: string

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
  width?: Extract<CSSObject['width'], string>
  height?: Extract<CSSObject['height'], string>

  'borderRadius--small'?: Extract<CSSObject['borderRadius'], string>
  'borderRadius--medium'?: Extract<CSSObject['borderRadius'], string>
  'borderRadius--large'?: Extract<CSSObject['borderRadius'], string>
}

const defaultSprops: CardSprops = {
  borderRadius: 'medium',

  'borderRadius--small': '4px',
  'borderRadius--medium': '8px',
  'borderRadius--large': '32px'
}

const getCSS = cache((sprops: CardSprops) =>
  mixCSSObjects({
    width: (toCssValue(sprops.width) || sprops?.width) ?? 'unset',
    height: (toCssValue(sprops.height) || sprops?.height) ?? 'unset',
    borderRadius:
      sprops.borderRadius === 'small'
        ? sprops['borderRadius--small']
        : sprops.borderRadius === 'medium'
        ? sprops['borderRadius--medium']
        : sprops['borderRadius--large'],
    boxShadow: cssValues.smoothShadow,
    background: sprops.bgImg ? `url(${sprops.bgImg}) center / cover` : sprops.gradient,
    backgroundColor: sprops.color
  })
)

/**
 * @BaseUIComponent
 */
export default function Card(props: CardProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Card, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)
  return <BaseUIDiv {...pick(sprops, divProps)} _css={getCSS(sprops)} />
}
