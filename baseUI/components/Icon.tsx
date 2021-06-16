import React from 'react'
import pick from 'utils/functions/object/pick'
import { DivProps, divProps } from './Div'
import Image, { ImageProps } from './Image'
import { CSSObject } from '@emotion/serialize'
import { injectAppSetting } from './AppSettings'
import { BaseUIDiv } from '.'
import useCSS from 'baseUI/hooks/useCSS'
import uiCSS from 'baseUI/settings/uiCSS'

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
  size?: 'medium' | 'large'
}


/**
 * @BaseUIComponent
 * Icon's basicPath need to be setted
 */
function Icon(props: IconProps) {
  const src = `${iconFileBasePath}/${props.name}.${iconFileType}`
  const sholdUseRaw = !props.color
  const css = useCSS(props, (props) => ({
    width: uiCSS.Icon[`size--${props.size}`],
    height: uiCSS.Icon[`size--${props.size}`],
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
  }))
  const ImageCss = useCSS(props, (props) => ({
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }))
  return (
    <BaseUIDiv {...pick(props, divProps)} _css={css}>
      {sholdUseRaw && (
        <Image
          {...props.imageProps}
          src={src}
          alt={props.name}
          css={[ImageCss, props.imageProps?.css]}
        />
      )}
    </BaseUIDiv>
  )
}

export default injectAppSetting(Icon, { size: 'medium' })
