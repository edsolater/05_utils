import React from 'react'
import Div, { divProps, DivProps } from 'baseUI/Div'
import { mix } from 'style/cssParser'
import {
  useIconStyle,
  IconStyleProps
} from './style'
import {
  useFeature as useFeatureCore,
  FeatureProps as FeatureCoreProps
} from './core.feature'
import Image from 'baseUI/Image'
import pick from 'utils/object/pick'

export interface IconProps extends DivProps, FeatureCoreProps, IconStyleProps {}
const Icon = (props: IconProps) => {
  const { src, name, sholdUseRaw } = useFeatureCore(props)
  const { coreCss } = useIconStyle(props, { src })

  return (
    <Div {...pick(props, divProps)} css={mix(props.css, coreCss)}>
      {sholdUseRaw && <Image src={src} alt={name} />}
    </Div>
  )
}

export default Icon

// IDEA: css-in-js 骚操作 用 @property 做有过渡的 gridiant
