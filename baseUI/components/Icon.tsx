import React from 'react'
import { DivProps } from "./baseProps"
import Image, { ImageProps } from './Image'
import { CSSObject } from '@emotion/serialize'
import { InjectAppSetting } from './AppSettings'
import { BaseUIDiv } from '.'
import uiCSS from 'baseUI/settings/uiCSS'
import { toICSS } from 'baseUI/style/cssParser'
import { notDefined } from 'utils/functions/judgers'

const iconFileBasePath = '/icons' //CONFIG 配置项
const iconFileType = 'svg' //CONFIG 配置项
type AllIconNames = '' //CONFIG 配置项

export interface IconProps extends DivProps {
  /**
   * icon名字
   */
  name?: AllIconNames | (string & {})

  propsImage?: ImageProps

  /**
   * ！双重作用props
   * @cssProps 代表颜色的CSS色值（只要是background属性能接受的值）
   * 若，不设定，不启用Img标签
   */
  color?: CSSObject['color']
  /**
   * @cssProps 代表颜色的CSS色值（只要是background属性能接受的值）
   */
  hoverColor?: CSSObject['color']

  /**@cssProps this will set both width and height */
  size?: 'medium' | 'large'
}

const getCSS = toICSS(({ size, color, hoverColor }: IconProps, src?: string) => ({
  width: uiCSS.Icon[`size--${size}`],
  height: uiCSS.Icon[`size--${size}`],
  position: 'relative',
  borderRadius: '2px',
  transition: 'background 200ms',
  '::before': {
    content: "''",
    position: 'absolute',
    inset: '0',
    mask: color ?? hoverColor ? `url(${src!})  0% 0% / contain no-repeat` : '',
    background: color,
    transition: 'background 200ms',
    ':hover': {
      background: hoverColor ?? color
    }
  }
}))

const getImageCSS = toICSS(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain'
}))
/**
 * @BaseUIComponent
 * Icon's basicPath need to be setted
 */
function Icon({ name, size, color, hoverColor, propsImage, ...restProps }: IconProps) {
  const src = `${iconFileBasePath}/${name}.${iconFileType}`
  const sholdUseRaw = notDefined(color)
  const css = getCSS({ size, color, hoverColor }, src)
  const ImageCss = getImageCSS()
  return (
    <BaseUIDiv {...restProps} _css={css}>
      {sholdUseRaw && (
        <Image {...propsImage} src={src} alt={name} css={[ImageCss, propsImage?.css]} />
      )}
    </BaseUIDiv>
  )
}

export default InjectAppSetting(Icon, { size: 'medium' })
