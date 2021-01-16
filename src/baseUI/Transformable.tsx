import React, { useEffect, useRef } from 'react'
import Div from './Div'
import { changeTranslate, inertialSlide, changeScaleDirectly } from 'helper/manageCss'
import { attachGestureScale, attachPointerMove } from 'helper/manageEvent'
import isHTMLElement from 'helper/domElement/isHTMLElement'
import { Delta2d, Delta2dTranslate, Direction, Vector } from 'typings/constants'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import { IFC } from 'typings/reactType'
import {
  DIRECTION_BOTTOM,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_TOP
} from 'constants/constants'
type RootElement = HTMLDivElement
export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
function asyncInvoke<T extends Array<any>>(fn: ((...any: T) => any) | undefined, ...args: T): void {
  if (fn) {
    window.requestIdleCallback(() => {
      fn(...args)
    })
  }
}
const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight
/**
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 */
const Transformable: IFC<
  {
    /* ----------------------------------- 拖动 ----------------------------------- */

    movable?: boolean
    moveDirection?: Direction | 'both'
    /** 可拖动的区域 */
    moveBoundary?: 'offsetParent' | 'none'
    onMoveStart?: (el: RootElement) => void
    onMoveEnd?: (el: RootElement, speedVector: Vector) => void
    onMove?: (el: RootElement, delta: Delta2dTranslate) => void
    onReachOffsetBoundary?: (el: RootElement, boundary: 'left' | 'top' | 'right' | 'bottom') => void

    /* ---------------------------------- 惯性滑动 ---------------------------------- */

    /** 开启惯性滑动 */
    canInertialSlide?: boolean
    /** （前提：已开启惯性滚动）惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
    acc?: number
    /** （前提：已开启惯性滚动）惯性滑动的最大初速度（的绝对值） */
    maxInitSpeed?: number
    onSlideEnd?: (el: RootElement) => void

    /* ---------------------------------- 大小变化 ---------------------------------- */

    scalable?: boolean
  },
  RootElement
> = ({
  movable = true,
  scalable = true,
  canInertialSlide = false,
  acc = 0.004,
  maxInitSpeed = 2,
  moveBoundary = 'offsetParent',
  moveDirection = 'both',
  onMoveStart,
  onMove,
  onReachOffsetBoundary,
  onMoveEnd,
  onSlideEnd,
  children,
  domRef,
  className,
  css,
  ...restProps
}) => {
  const box = useRef<RootElement>(null)
  useEffect(() => {
    if (movable) {
      const offsetRect =
        moveBoundary === 'offsetParent'
          ? box.current?.offsetParent?.getBoundingClientRect()
          : undefined
      attachPointerMove(box.current, {
        start() {
          onMoveStart?.(box.current!)
          // TODO:此时应该更新offsetRect的, 或者用resizeObserver监控更新
        },
        move({ prev, curr }) {
          const dx = curr.x - prev.x
          const dy = curr.y - prev.y
          let computedDx = 0
          let computedDy = 0
          const moveboxRect = box.current!.getBoundingClientRect()
          if (moveDirection === 'both' || moveDirection === 'x') {
            computedDx = dx
            if (offsetRect) {
              if (offsetRect.left > dx + moveboxRect.left) {
                computedDx = offsetRect.left - moveboxRect.left
                asyncInvoke(onReachOffsetBoundary, box.current!, DIRECTION_LEFT)
              } else if (offsetRect.right < dx + moveboxRect.right) {
                computedDx = offsetRect.right - moveboxRect.right
                asyncInvoke(onReachOffsetBoundary, box.current!, DIRECTION_RIGHT)
              }
            }
          }
          if (moveDirection === 'both' || moveDirection === 'y') {
            computedDy = dy
            if (offsetRect) {
              if (offsetRect.top > moveboxRect.top + dy) {
                computedDy = offsetRect.top - moveboxRect.top
                asyncInvoke(onReachOffsetBoundary, box.current!, DIRECTION_TOP)
              } else if (offsetRect.bottom < moveboxRect.bottom + dy) {
                computedDy = offsetRect.bottom - moveboxRect.bottom
                asyncInvoke(onReachOffsetBoundary, box.current!, DIRECTION_BOTTOM)
              }
            }
          }
          const computedDelta: Delta2dTranslate = {
            dx: computedDx,
            dy: computedDy
          }
          onMove?.(box.current!, computedDelta)
          changeTranslate(box.current!, { translate: computedDelta })
        },
        end({ speedVector }) {
          onMoveEnd?.(box.current!, speedVector)
          if (canInertialSlide) {
            inertialSlide(box.current!, {
              speedVector,
              acc,
              maxInitSpeed,
              boundingBox: offsetRect,
              onSlideEnd: () => {
                onSlideEnd?.(box.current!)
              }
            })
          }
        }
      })
    }
    if (scalable) {
      attachGestureScale(box.current, {
        moving: (_, delta) => changeScaleDirectly(box.current!, delta)
      })
    }
  }, [])

  return (
    <Div
      domRef={mergeRefs(domRef, box)}
      className={`movable-wrapper ${className}`} //这么写好像有点冗余
      css={[
        {
          width: 'max-content',
          display: 'grid',
          position: 'relative',
          touchAction: 'none',
          transform: `${movable && 'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px))'} ${
            scalable && 'scale(var(--scale, 1))'
          }`
        },
        css
      ]}
      {...restProps}
    >
      {children}
    </Div>
  )
}
export default Transformable
