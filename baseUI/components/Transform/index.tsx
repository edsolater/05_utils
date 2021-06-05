import React, { useRef } from 'react'

import { FeatureProps as FeatureScaleProps, useFeatureScale } from './scale.feature'
import { FeatureProps as FeatureResizeProps, useFeatureResize } from './resize.feature'
import { MoveOptions, useFeatureMove } from '../../hooks/useFeatureMove'
import { fullVw } from '../../style/cssUnits'
import pick from 'utils/functions/object/pick'
import { BaseUIDiv, DivProps, divProps } from '../Div'

export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
export interface TransformProps
  extends DivProps,
    FeatureResizeProps,
    MoveOptions,
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
  const { resizeDot } = useFeatureResize(box, props)
  const { css: featureMoveCss } = useFeatureMove(box, props)
  const { css: featureScaleCss } = useFeatureScale(box, props)
  return (
    <BaseUIDiv
      {...pick(props, divProps)}
      _domRef={box}
      _className='Transform'
      _css={[
        {
          position: 'relative',
          width: 'max-content',
          borderRadius: props.innerShape === 'circle' ? fullVw : '',
          '&:hover': {
            boxShadow: '0px 0px 0px 2px rgba(30, 143, 255, 0.219)'
          }
        },
        featureMoveCss,
        featureScaleCss
      ]}
    >
      {props.children}
      {resizeDot}
    </BaseUIDiv>
  )
}
export default Transform
