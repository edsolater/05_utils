import { RefObject, useEffect, useMemo } from 'react'
import { cssVar } from '../style/cssFunctions'
import { mixCSSObjects } from '../style/cssParser'
import { Vector, Delta2dTranslate } from 'typings/constants'
import asyncInvoke from '../components/Transform/helper/asyncInvoke'
import useToggle from './useToggle'
import {
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP,
  DIRECTION_BOTTOM
} from 'utils/constants/constants'
import attachPointer from 'utils/helper/manageEvent/attachPointer'
import changeTransform from '../components/Transform/changeTransform'
import inertialSlide from '../components/Transform/inertialSlide'

/**
 * props定义声明
 */
export interface FeatureMoveOptions {
  /* ----------------------------------- 拖动 ----------------------------------- */

  disable?: boolean
  direction?: 'x' | 'y' | 'both'
  /** 可拖动的区域 */
  moveBoundary?: 'offsetParent' | 'none'
  onMoveStart?: (ev: { el: HTMLElement }) => void
  onMoveEnd?: (ev: { el: HTMLElement; speedVector: Vector }) => void
  onMove?: (ev: {
    /**
     * target element
     */
    el: HTMLElement

    /**
     *  a move piece  from last position
     */
    delta: Delta2dTranslate

    /**
     * move distance from moveStart
     */
    // TODO: deltaTotal: Delta2dTranslate
  }) => void
  onReachOffsetBoundary?: (el: HTMLElement, boundary: 'left' | 'top' | 'right' | 'bottom') => void

  /* ---------------------------------- 惯性滑动 ---------------------------------- */

  /** 开启惯性滑动 */
  canSlide?: boolean
  /** （前提：已开启惯性滚动）惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
  acc?: number
  /** （前提：已开启惯性滚动）惯性滑动的最大初速度（的绝对值） */
  maxInitSpeed?: number
  onSlideEnd?: (el: HTMLElement) => void
}

/**
 * @hook feature move
 * this will set css variable on the element
 *
 * `--x` `--y` show how much distance does element move. number of px.
 *
 * @example
 * useFeatureMove(contentRef, {
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
export default function useFeatureMove(
  component: RefObject<HTMLElement>,
  {
    disable = false,
    canSlide = false,
    acc = 0.004,
    maxInitSpeed = 2,
    moveBoundary = 'offsetParent',
    direction = 'both',
    onMoveStart,
    onMove,
    onReachOffsetBoundary,
    onMoveEnd,
    onSlideEnd
  }: FeatureMoveOptions = {}
) {
  const [isMoving, { on: setIsMoving, off: cancelIsMoving }] = useToggle(false)
  useEffect(() => {
    if (disable) return
    const el = component.current!
    const offsetRect =
      // todo: 不更新的话，一滚动就没了
      moveBoundary === 'offsetParent' ? el.offsetParent?.getBoundingClientRect() : undefined
    attachPointer(el, {
      start() {
        onMoveStart?.({ el })
        setIsMoving()
        // TODO:此时应该更新offsetRect的, 或者用resizeObserver监控更新
      },
      move({ prev, curr }) {
        const dx = curr.x - prev.x
        const dy = curr.y - prev.y
        let computedDx = 0
        let computedDy = 0
        let moveboxRect: DOMRect | undefined = undefined
        if (direction === 'both' || direction === 'x') {
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
        if (direction === 'both' || direction === 'y') {
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
        onMove?.({ el, delta: computedDelta })
        changeTransform(el, { translate: computedDelta })
      },
      end({ speedVector }) {
        onMoveEnd?.({ el, speedVector })
        cancelIsMoving()
        if (canSlide) {
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
  return [isMoving, { on: setIsMoving, off: cancelIsMoving }]
}
