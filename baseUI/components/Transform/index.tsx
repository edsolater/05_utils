import React, { ReactNode, useRef } from 'react'

import useFeatureScale, { FeatureScaleOptions } from '../../hooks/useFeatureScale'
import useFeatureResize, { FeatureResizeOptions } from '../../hooks/useFeatureResize'
import useFeatureMove, { FeatureMoveOptions } from '../../hooks/useFeatureMove'
import { fullVw, halfPer, toPer } from '../../style/cssUnits'
import Div, { DivProps } from '../Div'
import cssColor from '../../style/cssColor'
import { cssVar } from 'baseUI/style/cssFunctions'
import { BaseUIDiv } from '..'

export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
export interface TransformProps extends DivProps {
  /**内部元素的形状，会影响鼠标拖拽点的位置 */
  innerShape?: 'rect' | 'circle'
  resizable?: boolean
  scaleable?: boolean
  featureMoveOptions?: FeatureMoveOptions
  featureResizeOptions?: FeatureResizeOptions
  featureScaleOptions?: FeatureScaleOptions
  children?: ReactNode
}

/**
 * @BaseUIComponent
 *
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 *
 *
 * @todo handoff {boolean} 把结果附加在其子children节点上
 */
const Transform = ({
  innerShape,
  resizable = false,
  scaleable = false,
  featureMoveOptions,
  featureResizeOptions,
  featureScaleOptions,
  children,
  ...restProps
}: TransformProps) => {
  const box = useRef<HTMLDivElement>(null)
  const resizeTrigger = useRef<HTMLDivElement>(null)
  const [isMoving] = useFeatureMove(box, featureMoveOptions)
  useFeatureResize(box, {
    disable: !resizable,
    ...featureResizeOptions,
    resizeTriggerRef: resizeTrigger
  })
  const { css: featureScaleCss } = useFeatureScale(box, {
    disable: !scaleable,
    ...featureScaleOptions
  })
  return (
    <BaseUIDiv
      {...restProps}
      _domRef={box}
      _className='Transform'
      _css={[
        {
          position: 'relative',
          width: 'max-content',
          borderRadius: innerShape === 'circle' ? fullVw : '',
          '&:hover': {
            boxShadow: '0px 0px 0px 2px rgba(30, 143, 255, 0.219)'
          }
        },
        {
          cursor: isMoving ? 'grabbing' : 'grab',
          touchAction: 'none', // 禁用掉浏览器对双指缩放的默认出处理
          userSelect: 'none', // 禁用掉文字的用户选择
          translate: [cssVar('--x', '0', 'px'), cssVar('--y', '0', 'px')]
        },
        featureScaleCss
      ]}
    >
      {children}
      {resizable && (
        <Div
          domRef={resizeTrigger}
          className='resize-trigger'
          css={{
            position: 'absolute',
            right: innerShape === 'circle' ? toPer(14.625) : 0,
            bottom: innerShape === 'circle' ? toPer(14.625) : 0,
            width: 8,
            height: 8,
            background: cssColor.dodgerblue,
            borderRadius: halfPer,
            cursor: 'nw-resize',
            opacity: 0,
            translate: [halfPer, halfPer],
            transition: '200ms',
            '*:hover > &': {
              opacity: 1
            },
            '&:hover': {
              translate: [halfPer, halfPer],
              scale: 2
            }
          }}
        />
      )}
    </BaseUIDiv>
  )
}
export default Transform
