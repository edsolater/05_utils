import React, { useCallback, useEffect, useRef } from 'react'
import Div, { DivProps } from '../Div'

import { Delta2dTranslate, Direction, Vector } from 'typings/constants'
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP
} from 'constants/constants'
import { attachWheel } from 'helper/attachEventHandler'
import changeTransform from 'helper/manageStyle/changeTransform'
import inertialSlide from 'helper/manageStyle/inertialSlide'
import attachGestureScale from 'helper/manageEvent/attachGestureScale'
import attachPointer from 'helper/manageEvent/attachPointer'
import { fullVw, halfPer, toPer } from 'style/cssUnits'
import { cssTransform } from 'style/cssFunctions'
import cssColor from 'style/cssColor'
import { mergeRefs } from '../Div/util/mergeRefs'
import { attachFeatures, featureCss, featureProps, FeaturesProps } from './feature'
import omit from 'utils/object/omit'
import { useFeatureResize } from './feature/resize'
export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
// TODO: 可以把manageEvent提取到组件内部的文件夹
interface TransformableProps extends DivProps, FeaturesProps {}

/**
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 */
const Transformable = (props: TransformableProps) => {
  const box = useRef<HTMLDivElement>()
  const attachFeatureCallback = useCallback((el) => attachFeatures(el, props), [props])
  const { vdom: resizeDom } = useFeatureResize(box, props)
  return (
    <Div
      {...omit(props, featureProps)}
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
        props.css
      ]}
    >
      {props.children}
      {resizeDom}
    </Div>
  )
}
export default Transformable
