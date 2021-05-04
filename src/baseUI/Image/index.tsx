import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useImageStyle, ImageStyleProps } from './style'
import pick from 'utils/object/pick'

export interface ImageProps extends DivProps<'img'>, ImageStyleProps, ImageCoreProp {}
export interface ImageCoreProp {
  src?: string
  alt?: string
}
export const imageProps: (keyof ImageCoreProp)[] = ['src', 'alt']

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Image = (props: ImageProps) => {
  const { coreCss } = useImageStyle(props)
  return (
    <Div
      _tagName='img'
      {...pick(props, divProps)}
      htmlProps={{ src: props.src, alt: props.alt, ...props.htmlProps }}
      css={mixCSSObjects(props.css, coreCss)}
    ></Div>
  )
}

export default Image
