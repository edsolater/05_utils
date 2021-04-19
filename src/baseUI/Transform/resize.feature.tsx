import { attachWheel } from 'helper/attachEventHandler'
import changeSizeByDeltaWidth from 'helper/manageStyle/changeSizeByDeltaWidth'
import attachPointer from 'helper/manageEvent/attachPointer'
import { RefObject, useEffect, useMemo, useRef } from 'react'
import React from 'react'
import Div from 'baseUI/Div'
import cssColor from 'style/cssColor'
import { cssTransform } from 'style/cssFunctions'
import { toPer, halfPer } from 'style/cssUnits'

/**
 * props定义声明
 */
export interface FeatureProps {
  /* ---------------------------------- 大小变化（会重排） ---------------------------------- */
  /**会放大缩小，会影响元素的大小 */
  resizable?: boolean
  /**放大缩小的触发器，有滚轮、鼠标拖拽点 */
  resizeTrigger?: 'wheel' | 'right-bottom-dot' | 'both'
  /**内部元素的形状，会影响鼠标拖拽点的位置 */
  innerShape?: 'rect' | 'circle'
  /**滚轮改变大小的速度 */
  resizeWheelSpeed?: number
  /**改变大小的下限 */
  resizeMinRatio?: number
  /**改变大小的上限 */
  resizeMaxRatio?: number
}

/**
 * props的字符串们
 */
export const featureProps: (keyof FeatureProps)[] = [
  'resizable',
  'resizeTrigger',
  'innerShape',
  'resizeWheelSpeed',
  'resizeMinRatio',
  'resizeMaxRatio'
]

// 这种attachEvent的方式怎么注入dom呢？
/** @mutable 具体实现  */
export function useFeatureResize(
  component: RefObject<HTMLDivElement | undefined>,
  {
    resizable = false,
    innerShape = 'rect',
    resizeTrigger = 'both',
    resizeWheelSpeed = 0.5,
    resizeMaxRatio = 50,
    resizeMinRatio = 0.8
  }: FeatureProps
) {
  const rightBottomTrigger = useRef()
  useEffect(() => {
    if (resizable) {
      if (resizeTrigger === 'wheel' || resizeTrigger === 'both') {
        attachWheel(component.current!, (ev, deltaY) => {
          changeSizeByDeltaWidth(component.current!, deltaY * resizeWheelSpeed, {
            minRatio: resizeMinRatio,
            maxRatio: resizeMaxRatio
          })
        })
      }
      if (resizeTrigger === 'right-bottom-dot' || resizeTrigger === 'both') {
        attachPointer(rightBottomTrigger.current!, {
          move: ({ delta }) => {
            changeSizeByDeltaWidth(component.current!, delta.dx ?? 0, {
              minRatio: resizeMinRatio,
              maxRatio: resizeMaxRatio
            })
          }
        })
      }
    }
  }, [])
  const resizeDot = useMemo(
    () =>
      resizable && (
        <Div
          domRef={rightBottomTrigger}
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
      ),
    [innerShape, resizable]
  )
  return { resizeDot }
}
