import React, { useEffect, useRef } from 'react'
import Div from './Div'
import {
  changeTransform,
  inertialSlide,
  changeScaleDirectly,
  attachSizeIfNeeded,
  changeSizeByDeltaWidth
} from 'helper/manageStyle'
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
import { attachWheel } from 'helper/attachEventHandler'
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
type ResizeBy = 'wheel' | 'right-bottom dot'
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
    /**会放大缩小，但只是影响试图 */
    scalable?: boolean

    /**会放大缩小，会影响元素的大小 */
    resizable?: boolean
    /**放大缩小的触发器，有滚轮、鼠标拖拽点 */
    resizeBy?: ResizeBy | ResizeBy[]
    /**内部元素的形状，会影响鼠标拖拽点的位置 */
    elementShape?: 'rect' | 'circle'
    /**滚轮改变大小的速度 */
    resizeWheelSpeed?: number
    /**改变大小的下限 */
    resizeMinRatio?: number
    /**改变大小的上限 */
    resizeMaxRatio?: number
  },
  RootElement
> = ({
  movable = true,
  scalable = false,
  resizable = false,
  resizeBy = 'wheel',
  resizeWheelSpeed = 0.5,
  resizeMaxRatio = 50,
  resizeMinRatio = 0.8,
  elementShape = 'rect',
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
          let moveboxRect: DOMRect | undefined = undefined
          if (moveDirection === 'both' || moveDirection === 'x') {
            computedDx = dx
            if (offsetRect) {
              if (!moveboxRect) moveboxRect = box.current!.getBoundingClientRect()
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
              if (!moveboxRect) moveboxRect = box.current!.getBoundingClientRect()
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
          changeTransform(box.current!, { translate: computedDelta })
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
    if (resizable) {
      attachSizeIfNeeded(box.current!)
      attachWheel(box.current!, (ev, deltaY) => {
        changeSizeByDeltaWidth(box.current!, deltaY * resizeWheelSpeed, {
          minRatio: resizeMinRatio,
          maxRatio: resizeMaxRatio
        })
      })
    }
  }, [])

  return (
    <Div
      domRef={mergeRefs(domRef, box)}
      className={`movable-wrapper ${className}`} //这么写好像有点冗余
      css={[
        {
          position: 'relative',
          touchAction: 'none',
          transform: `${
            movable ? 'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px))' : ''
          } ${scalable ? 'scale(var(--scale, 1))' : ''}`
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
