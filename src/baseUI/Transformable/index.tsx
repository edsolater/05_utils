import React, { useCallback, useRef } from 'react'
import Div, { DivProps } from '../Div'

import { fullVw } from 'style/cssUnits'
import { attachFeatures, featureCss, featureProps, FeaturesProps } from './featureHooks'
import omit from 'utils/object/omit'
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
    FeaturesProps {}

/**
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 */
const Transformable = (props: TransformableProps) => {
  const box = useRef<HTMLDivElement>()
  const attachFeatureCallback = useCallback((el) => attachFeatures(el, props), [props])
  const restProps = omit(props, [...featureResizeProps, ...featureMoveProps])
  const { vdom: featureResizeDom } = useFeatureResize(box, props)
  const { css: featureMoveCss } = useFeatureMove(box, props)
  return (
    <Div
      {...restProps}
      domRef={[props.domRef, box, attachFeatureCallback]}
      className={['movable-wrapper', props.className]}
      css={[
        featureCss(props),
        {
          position: 'relative',
          width: 'max-content',
          borderRadius: props.innerShape === 'circle' ? fullVw : '',
          '&:hover': {
            boxShadow: '0px 0px 0px 2px rgba(30, 143, 255, 0.219)'
          }
        },
        featureMoveCss,
        props.css
      ]}
    >
      {props.children}
      {featureResizeDom}
    </Div>
  )
}
export default Transformable
