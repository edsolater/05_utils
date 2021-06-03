import {
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  DIRECTION_BOTTOM
} from 'constants/constants'
import attachPointer from 'helper/manageEvent/attachPointer'
import changeTransform from 'helper/manageStyle/changeTransform'
import inertialSlide from 'helper/manageStyle/inertialSlide'
import { RefObject, useEffect, useMemo } from 'react'
import { cssVar } from 'style/cssFunctions'
import { mixCSSObjects } from 'style/cssParser'
import { Vector, Delta2dTranslate } from 'typings/constants'
import asyncInvoke from './helper/asyncInvoke'

/**
 * props定义声明
 */
export interface FeatureProps {
  /* ----------------------------------- 拖动 ----------------------------------- */

  disable?: boolean
  moveDirection?: 'x' | 'y' | 'both'
  /** 可拖动的区域 */
  moveBoundary?: 'offsetParent' | 'none'
  onMoveStart?: (el: HTMLDivElement) => void
  onMoveEnd?: (el: HTMLDivElement, speedVector: Vector) => void
  onMove?: (el: HTMLDivElement, delta: Delta2dTranslate) => void
  onReachOffsetBoundary?: (
    el: HTMLDivElement,
    boundary: 'left' | 'top' | 'right' | 'bottom'
  ) => void

  /* ---------------------------------- 惯性滑动 ---------------------------------- */

  /** 开启惯性滑动 */
  canInertialSlide?: boolean
  /** （前提：已开启惯性滚动）惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
  acc?: number
  /** （前提：已开启惯性滚动）惯性滑动的最大初速度（的绝对值） */
  maxInitSpeed?: number
  onSlideEnd?: (el: HTMLDivElement) => void
}

/**
 * props的字符串们
 */
export const featureProps: (keyof FeatureProps)[] = [
  'disable',
  'moveDirection',
  'moveBoundary',
  'onMoveStart',
  'onMoveEnd',
  'onMove',
  'onReachOffsetBoundary',
  'canInertialSlide',
  'acc',
  'maxInitSpeed',
  'onSlideEnd'
]

/** @mutable 具体实现  */
export function useUiMove(
  component: RefObject<HTMLDivElement | undefined>,
  {
    disable = false,
    canInertialSlide = false,
    acc = 0.004,
    maxInitSpeed = 2,
    moveBoundary = 'offsetParent',
    moveDirection = 'both',
    onMoveStart,
    onMove,
    onReachOffsetBoundary,
    onMoveEnd,
    onSlideEnd
  }: FeatureProps
) {
  useEffect(() => {
    if (disable) return
    const el = component.current!
    const offsetRect =
      // todo: 不更新的话，一滚动就没了
      moveBoundary === 'offsetParent' ? el.offsetParent?.getBoundingClientRect() : undefined
    attachPointer(el, {
      start() {
        onMoveStart?.(el)
        // TODO:此时应该更新offsetRect的, 或者用resizeObserver监控更新
      },
      move({ prev, curr }) {
        const dx = curr.x - prev.x
        const dy = curr.y - prev.y
        let computedDx = 0
        let computedDy = 0
        let moveboxRect: DOMRect | undefined = undefined
        if (moveDirection === 'both' || moveDirection === 'x') {
          computedDx = dx
          if (offsetRect) {
            if (!moveboxRect) moveboxRect = el.getBoundingClientRect()
            if (offsetRect.left > dx + moveboxRect.left) {
              computedDx = offsetRect.left - moveboxRect.left
              asyncInvoke(onReachOffsetBoundary, el, DIRECTION_LEFT)
            } else if (offsetRect.right < dx + moveboxRect.right) {
              computedDx = offsetRect.right - moveboxRect.right
              asyncInvoke(onReachOffsetBoundary, el, DIRECTION_RIGHT)
            }
          }
        }
        if (moveDirection === 'both' || moveDirection === 'y') {
          computedDy = dy
          if (offsetRect) {
            if (!moveboxRect) moveboxRect = el.getBoundingClientRect()
            if (offsetRect.top > moveboxRect.top + dy) {
              computedDy = offsetRect.top - moveboxRect.top
              asyncInvoke(onReachOffsetBoundary, el, DIRECTION_TOP)
            } else if (offsetRect.bottom < moveboxRect.bottom + dy) {
              computedDy = offsetRect.bottom - moveboxRect.bottom
              asyncInvoke(onReachOffsetBoundary, el, DIRECTION_BOTTOM)
            }
          }
        }
        const computedDelta: Delta2dTranslate = {
          dx: computedDx,
          dy: computedDy
        }
        onMove?.(el, computedDelta)
        changeTransform(el, { translate: computedDelta })
      },
      end({ speedVector }) {
        onMoveEnd?.(el, speedVector)
        if (canInertialSlide) {
          inertialSlide(el, {
            speedVector,
            acc,
            maxInitSpeed,
            boundingBox: offsetRect,
            onSlideEnd: () => {
              onSlideEnd?.(el)
            }
          })
        }
      }
    })
  }, [])
  const css = useMemo(
    () =>
      mixCSSObjects({
        touchAction: 'none', // 禁用掉浏览器对双指缩放的默认出处理
        userSelect: 'none', // 禁用掉文字的用户选择
        translate: disable ? [] : [cssVar('--x', '0', 'px'), cssVar('--y', '0', 'px')]
      }),
    [disable]
  )
  return { css }
}
