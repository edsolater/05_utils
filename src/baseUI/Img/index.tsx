import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  featureProps as featureStyleProps,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import omit from 'utils/object/omit'

export interface ImageProps extends DivProps<'img'>, FeatureStyleProps, ImageCoreProp {}
export interface ImageCoreProp {
  src?: string
  alt?: string
}
export const imageProps: (keyof ImageCoreProp)[] = ['src', 'alt']

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Img = (props: ImageProps) => {
  const restProps = omit(props, [...imageProps, ...featureStyleProps])
  const { css: styleCss } = useFeatureStyle(props)
  return (
    <Div
      _tagName='img'
      {...restProps}
      htmlProps={{ src: props.src, alt: props.alt, ...restProps.htmlProps }}
      css={mix(props.css, styleCss)}
    ></Div>
  )
}

export default Img
