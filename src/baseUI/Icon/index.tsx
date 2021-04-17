import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureAppearance,
  featureProps as featureAppearanceProps,
  FeatureProps as FeatureAppearanceProps
} from './appearance.feature'
import {
  useFeature as useFeatureCore,
  featureProps as featureCoreProps,
  FeatureProps as FeatureCoreProps
} from './core.feature'
import omit from 'utils/object/omit'
import Img from 'baseUI/Img'

export interface IconProps extends DivProps, FeatureCoreProps, FeatureAppearanceProps {}
const Icon = (props: IconProps) => {
  const restProps = omit(props, [...featureCoreProps, ...featureAppearanceProps])

  const { src, name } = useFeatureCore(props)
  const { css: appearanceCss, sholdUseRaw } = useFeatureAppearance(props, { src })

  return (
    <Div {...restProps} css={mix(appearanceCss, props.css)}>
      {sholdUseRaw && <Img src={src} alt={name} />}
    </Div>
  )
}

export default Icon

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
