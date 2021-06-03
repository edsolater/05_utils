import React, { useRef } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { fullVw } from 'style/cssUnits'
import omit from 'utils/object/omit'

import {
  FeatureProps as FeatureScaleProps,
  featureProps as featureScaleProps,
  useFeatureScale
} from './scale.feature'
import {
  FeatureProps as FeatureResizeProps,
  featureProps as featureResizeProps,
  useFeatureResize
} from './resize.feature'
import {
  FeatureProps as FeatureMoveProps,
  featureProps as featureMoveProps,
  useElementMove
} from './move.feature'

export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
export interface TransformProps
  extends DivProps,
    FeatureResizeProps,
    FeatureMoveProps,
    FeatureScaleProps {}

/**
 * @BaseUIComponent
 * 
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 * 
 * 
 * @todo handoff {boolean} 把结果附加在其子children节点上
 */
const Transform = (props: TransformProps) => {
  const box = useRef<HTMLDivElement>()
  const restProps = omit(props, [...featureResizeProps, ...featureMoveProps, ...featureScaleProps])
  const { resizeDot } = useFeatureResize(box, props)
  const { css: featureMoveCss } = useElementMove(box, props)
  const { css: featureScaleCss } = useFeatureScale(box, props)
  return (
    <Div
      {...restProps}
      domRef={[props.domRef, box]}
      className={['movable-wrapper', props.className]}
      css={[
        {
          position: 'relative',
          width: 'max-content',
          borderRadius: props.innerShape === 'circle' ? fullVw : '',
          '&:hover': {
            boxShadow: '0px 0px 0px 2px rgba(30, 143, 255, 0.219)'
          }
        },
        featureMoveCss,
        featureScaleCss,
        props.css
      ]}
    >
      {props.children}
      {resizeDot}
    </Div>
  )
}
export default Transform
