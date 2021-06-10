import React from 'react'
import { mixCSSObjects } from '../../style/cssParser'
import { useIconStyle, IconStyleProps } from './style'
import { useFeature as useFeatureCore, FeatureProps as FeatureCoreProps } from './core.feature'
import pick from 'utils/functions/object/pick'
import Div, { DivProps, divProps } from '../Div'
import Image, { ImageProps } from '../Image'

export interface IconProps extends DivProps, FeatureCoreProps, IconStyleProps {
  iconImage?: ImageProps
}
/**
 * @BaseUIComponent
 * Icon's basicPath need to be setted 
 */
const Icon = (props: IconProps) => {
  const { src, name, sholdUseRaw } = useFeatureCore(props)
  const { coreCss, iconImageCss } = useIconStyle(props, { src })

  return (
    <Div {...pick(props, divProps)} css={mixCSSObjects(props.css, coreCss)}>
      {sholdUseRaw && (
        <Image
          src={src}
          alt={name}
          {...props.iconImage}
          css={[iconImageCss, props.iconImage?.css]}
        />
      )}
    </Div>
  )
}

export default Icon

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
