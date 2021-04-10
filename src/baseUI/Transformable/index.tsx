import React, { useRef } from 'react'
import Div, { DivProps } from 'baseUI/Div'
import { fullVw } from 'style/cssUnits'
import omit from 'utils/object/omit'

import {
  FeatureProps as FeatureScaleProps,
  featureProps as featureScaleProps,
  useFeatureScale
} from './featureHooks/useFeatureScale'
import {
  FeatureProps as FeatureResizeProps,
  featureProps as featureResizeProps,
  useFeatureResize
} from './featureHooks/useFeatureResize'
import {
  FeatureProps as FeatureMoveProps,
  featureProps as featureMoveProps,
  useFeatureMove
} from './featureHooks/useFeatureMove'

export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
// TODO: 可以把manageEvent提取到组件内部的文件夹
interface TransformableProps
  extends DivProps,
    FeatureResizeProps,
    FeatureMoveProps,
    FeatureScaleProps {}

/**
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 */
const Transformable = (props: TransformableProps) => {
  const box = useRef<HTMLDivElement>()
  const restProps = omit(props, [...featureResizeProps, ...featureMoveProps, ...featureScaleProps])
  const { vdom: featureResizeDom } = useFeatureResize(box, props)
  const { css: featureMoveCss } = useFeatureMove(box, props)
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
      {featureResizeDom}
    </Div>
  )
}
export default Transformable
