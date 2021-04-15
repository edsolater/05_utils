import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureAppearance,
  featureProps as featureAppearanceProps,
  FeatureProps as FeatureAppearanceProps
} from './appearance.feature'
import omit from 'utils/object/omit'

export interface ImageProps extends DivProps<'img'>, FeatureAppearanceProps, ImageCoreProp {}
export interface ImageCoreProp {
  src?: string
  alt?: string
}
export const imageProps: (keyof ImageCoreProp)[] = ['src', 'alt']

/**
 * 将子元素显示在一行，相当于flexbox
 */
const Img = (props: ImageProps) => {
  const restProps = omit(props, [...imageProps, ...featureAppearanceProps])
  const { css: appearanceCss } = useFeatureAppearance(props)
  return (
    <Div
      _tagName='img'
      {...restProps}
      htmlProps={{ src: props.src, alt: props.alt, ...restProps.htmlProps }}
      css={mix(appearanceCss, props.css)}
    ></Div>
  )
}

export default Img
