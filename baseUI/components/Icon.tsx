import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import pick from 'utils/functions/object/pick'
import { BaseUIDiv, DivProps, divProps } from './Div'
import Image, { ImageProps } from './Image'
import cache from 'utils/functions/functionFactory/cache'
import { CSSObject } from '@emotion/serialize'
import { useAppSettings } from './AppSettings'
import { CSSPropertyValue } from 'baseUI/style/cssValue'
import mergeProps from 'baseUI/functions/mergeProps'
import addDefaultProps from 'baseUI/functions/addDefaultProps'

const iconFileBasePath = '/icons' //CONFIG 配置项
const iconFileType = 'svg' //CONFIG 配置项
type AllIconNames = '' //CONFIG 配置项

export interface IconProps extends DivProps {
  /**
   * icon名字
   */
  name?: AllIconNames | (string & {})

  imageProps?: ImageProps

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
  size?: CSSPropertyValue<'width'>
}

export interface IconSprops extends IconProps {}

const defaultSprops: IconSprops = {
  size: '24px'
}

const getCSS = cache((sprops: IconSprops, core: { src: string }) =>
  mixCSSObjects({
    width: sprops.size,
    height: sprops.size,
    position: 'relative',
    borderRadius: '2px',
    transition: 'background 200ms',
    '::before': {
      content: "''",
      position: 'absolute',
      inset: '0',
      mask: sprops.color ?? sprops.hoverColor ? `url(${core.src})  0% 0% / contain no-repeat` : '',
      background: sprops.color,
      transition: 'background 200ms',
      ':hover': {
        background: sprops.hoverColor ?? sprops.color
      }
    }
  })
)
const getImageCSS = cache(() =>
  mixCSSObjects({
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  })
)

/**
 * @BaseUIComponent
 * Icon's basicPath need to be setted
 */
export default function Icon(props: IconProps) {
  const appSettings = useAppSettings()
  const _sprops = mergeProps(appSettings.globalProps?.Icon, props)
  const sprops = addDefaultProps(_sprops, defaultSprops)

  const src = `${iconFileBasePath}/${sprops.name}.${iconFileType}`
  const sholdUseRaw = !sprops.color
  return (
    <BaseUIDiv {...pick(sprops, divProps)} _css={getCSS(sprops, { src })}>
      {sholdUseRaw && (
        <Image
          {...sprops.imageProps}
          src={src}
          alt={sprops.name}
          css={[getImageCSS(), sprops.imageProps?.css]}
        />
      )}
    </BaseUIDiv>
  )
}
