import React from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useFeature as useFeatureStyle,
  featureProps as featureStyleProps,
  FeatureProps as FeatureStyleProps
} from './style.feature'
import {
  useFeature as useFeatureCore,
  featureProps as featureCoreProps,
  FeatureProps as FeatureCoreProps
} from './core.feature'
import omit from 'utils/object/omit'
import Img from 'baseUI/Img'

export interface IconProps extends DivProps, FeatureCoreProps, FeatureStyleProps {}
const Icon = (props: IconProps) => {
  const restProps = omit(props, featureCoreProps, featureStyleProps)

  const { src, name } = useFeatureCore(props)
  const { css: styleCss, sholdUseRaw } = useFeatureStyle(props, { src })

  return (
    <Div {...restProps} css={mix(styleCss, props.css)}>
      {sholdUseRaw && <Img src={src} alt={name} />}
    </Div>
  )
}

export default Icon

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
