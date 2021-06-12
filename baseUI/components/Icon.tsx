import React from 'react'
import { mixCSSObjects } from '../style/cssParser'
import pick from 'utils/functions/object/pick'
import { BaseUIDiv, DivProps, divProps } from './Div'
import Image, { ImageProps } from './Image'
import cache from 'utils/functions/functionFactory/cache'
import { CSSObject } from '@emotion/serialize'
import addDefault from 'utils/functions/magic/addDefault'
import { useAppSettings } from './AppSettings'

const iconFileBasePath = '/icons' //CONFIG 配置项
const iconFileType = 'svg' //CONFIG 配置项
type AllIconNames = '' //CONFIG 配置项

export interface IconProps extends DivProps, IconCSSProps {
  /**
   * icon名字
   */
  name?: AllIconNames | (string & {})
  /**
   * ！双重作用props
   *
   * color是否设定，决定了是否启用Img标签
   */
  color?: string

  imageProps?: ImageProps
}

interface IconCSSProps {
  /**
   * ！双重作用props
   *
   * CSS: 代表颜色的CSS色值（只要是background属性能接受的值）
   * 不设定，使用图标原本的颜色
   */
  color?: string
  /**
   * CSS: 代表颜色的CSS色值（只要是background属性能接受的值）
   */
  hoverColor?: string
}

export interface IconDetailCSS {
  /** this will set both width and height */
  iconSize?: CSSObject['width']
}

const getCSS = cache((props: IconCSSProps, _cssSetting: IconDetailCSS, src: string) => {
  const cssSetting = addDefault(_cssSetting, { iconSize: '24px' })
  return mixCSSObjects({
    // TODO 常见的图标尺寸要查询： 24*24 48*48 等等
    width: cssSetting.iconSize,
    height: cssSetting.iconSize,
    position: 'relative',
    borderRadius: '2px',
    transition: 'background 200ms',
    '::before': {
      content: "''",
      position: 'absolute',
      inset: '0',
      mask: props.color ?? props.hoverColor ? `url(${src})  0% 0% / contain no-repeat` : '',
      background: props.color,
      transition: 'background 200ms',
      ':hover': {
        background: props.hoverColor ?? props.color
      }
    }
  })
})
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
const Icon = (props: IconProps) => {
  const { baseUICSS } = useAppSettings()
  const src = `${iconFileBasePath}/${props.name}.${iconFileType}`
  const sholdUseRaw = !props.color
  return (
    <BaseUIDiv {...pick(props, divProps)} _css={getCSS(props, baseUICSS?.Icon ?? {}, src)}>
      {sholdUseRaw && (
        <Image
          {...props.imageProps}
          src={src}
          alt={props.name}
          css={[getImageCSS(), props.imageProps?.css]}
        />
      )}
    </BaseUIDiv>
  )
}

export default Icon

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
