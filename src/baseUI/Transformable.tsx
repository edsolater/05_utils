import React, { forwardRef, ReactNode, Ref, RefObject, useEffect, useRef } from 'react'
import Div from './Div'
import { changeTranslate, inertialSlide, changeScaleDirectly } from 'helper/manageCss'
import { attachGestureScale, attachPointerMove } from 'helper/manageEvent'
import isHTMLElement from 'helper/domElement/isHTMLElement'
import { Direction, Vector } from 'typings/typeConstants'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight

/**
 * 包裹一层div，使该元素与其子元素能被随意拖动
 * 注意：不可与draggable混淆
 */
const Transformable = forwardRef<
  any,
  {
    movable?: boolean
    moveDirection?: Direction | 'both'
    onMoveStart?: (elRef: RefObject<HTMLDivElement>) => void
    onMoveEnd?: (elRef: RefObject<HTMLDivElement>, speedVector: Vector) => void

    /** 开启惯性滑动 */
    canInertialSlide?: boolean
    /** （前提：已开启惯性滚动）惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
    acc?: number
    /** （前提：已开启惯性滚动）惯性滑动的最大初速度（的绝对值） */
    maxInitSpeed?: number
    /** （前提：已开启惯性滚动）可滑动的范围 */
    slideArea?: BoundingRect | HTMLElement
    onSlideEnd?: (elRef: RefObject<HTMLDivElement>) => void
    scalable?: boolean
  } & { children?: ReactNode }
>(
  (
    {
      movable = true,
      scalable = true,
      canInertialSlide = false, // temp
      acc = 0.004,
      maxInitSpeed = 2,
      slideArea = { left: 0, top: 0, right: viewportWidth, bottom: viewportHeight },
      moveDirection = 'both',
      onMoveStart,
      onMoveEnd,
      onSlideEnd,
      children
    },
    ref
  ) => {
    const box = useRef<HTMLDivElement>(null)
    useEffect(() => {
      movable &&
        attachPointerMove(box.current, {
          move(_, delta) {
            onMoveStart?.(box)
            const computedDelta: typeof delta = {
              dx: moveDirection === 'both' || moveDirection === 'x' ? delta.dx : 0,
              dy: moveDirection === 'both' || moveDirection === 'y' ? delta.dy : 0
            }
            // TODO： 或者，保持对称，也包一层？
            changeTranslate(box.current!, { translate: computedDelta })
          },
          end(_, speedVector) {
            onMoveEnd?.(box, speedVector)
            if (canInertialSlide) {
              const movableArea = isHTMLElement(slideArea)
                ? slideArea.getBoundingClientRect()
                : slideArea
              inertialSlide(box.current!, {
                speedVector,
                acc,
                maxInitSpeed,
                boundingBox: movableArea,
                onSlideEnd() {
                  onSlideEnd?.(box)
                }
              })
            }
          }
        })
      scalable &&
        attachGestureScale(box.current, {
          moving: (_, delta) => changeScaleDirectly(box.current!, delta)
        })
    }, [])

    return (
      <Div
        ref={mergeRefs([ref, box])}
        className='movable-wrapper'
        css={{
          width: 'max-content',
          display: 'grid',
          position: 'relative',
          transform: `${movable && 'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px))'} ${
            scalable && 'scale(var(--scale, 1))'
          }`,
          touchAction: 'none'
        }}
      >
        {children}
      </Div>
    )
  }
)
export default Transformable
