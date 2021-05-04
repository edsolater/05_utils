import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mixCSSObjects } from 'style/cssParser'
import { useIconStyle, IconStyleProps } from './style'
import { useFeature as useFeatureCore, FeatureProps as FeatureCoreProps } from './core.feature'
import Image, { ImageProps } from 'baseUI/Image'
import pick from 'utils/object/pick'

export interface IconProps extends DivProps, FeatureCoreProps, IconStyleProps {
  iconImage?: ImageProps
}
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
