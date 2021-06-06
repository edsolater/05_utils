import { RefObject, useEffect, useMemo, useRef } from 'react'
import React from 'react'
import Div from '../components/Div'
import cssColor from '../style/cssColor'
import { toPer, halfPer } from '../style/cssUnits'
import changeSizeByDeltaWidth from '../components/Transform/changeSizeByDeltaWidth'
import { attachWheel } from 'utils/helper/attachEventHandler'
import attachPointer from 'utils/helper/manageEvent/attachPointer'

/**
 * props定义声明
 */
export interface FeatureResizeOptions {
  /* ---------------------------------- 大小变化（会重排） ---------------------------------- */
  resizeTriggerRef?: RefObject<HTMLDivElement | null>
  /**会放大缩小，会影响元素的大小 */
  disable?: boolean
  /**放大缩小的触发器，有滚轮、鼠标拖拽点 */
  triggerType?: 'wheel' | 'right-bottom-dot' | 'both'

  /**滚轮改变大小的速度 */
  resizeWheelSpeed?: number
  /**改变大小的下限 */
  resizeMinRatio?: number
  /**改变大小的上限 */
  resizeMaxRatio?: number
}

/**
 * @hook feature move
 * this will set css variable on the element
 *
 * `--x` `--y` show how much distance does element move. number of px.
 *
 * @example
 * useFeatureResize(contentRef, {
 *   direction: 'y',
 *   onMoveStart() {
 *     disableIsScrollingByThumb()
 *   },
 *   onMoveEnd() {
 *     enableIsScrollingByThumb()
 *   },
 *   onMove({ delta }) {
 *     const content = contentRef.current!
 *     const thumbScrollDeltaTop = delta.dy
 *     const contentScrollTop = thumbScrollDeltaTop * (content.scrollHeight / content.clientHeight)
 *     contentRef.current!.scrollBy({ top: contentScrollTop })
 *   }
 * })
 */
export default function useFeatureResize(
  component: RefObject<HTMLDivElement | undefined>,
  {
    disable = false,
    triggerType = 'both',
    resizeWheelSpeed = 0.5,
    resizeMaxRatio = 50,
    resizeMinRatio = 0.8
  }: FeatureResizeOptions = {}
) {
  const rightBottomTrigger = useRef()
  useEffect(() => {
    if (disable) return
    if (triggerType === 'wheel' || triggerType === 'both') {
      attachWheel(component.current!, (ev, deltaY) => {
        changeSizeByDeltaWidth(component.current!, deltaY * resizeWheelSpeed, {
          minRatio: resizeMinRatio,
          maxRatio: resizeMaxRatio
        })
      })
    }
    if (triggerType === 'right-bottom-dot' || triggerType === 'both') {
      attachPointer(rightBottomTrigger.current!, {
        move: ({ delta }) => {
          changeSizeByDeltaWidth(component.current!, delta.dx ?? 0, {
            minRatio: resizeMinRatio,
            maxRatio: resizeMaxRatio
          })
        }
      })
    }
  }, [])
}
