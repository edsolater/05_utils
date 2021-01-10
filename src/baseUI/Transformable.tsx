import React, { useEffect, useRef } from 'react'
import Div from './Div'
import { changeTranslate, inertialSlide, changeScaleDirectly } from 'helper/manageCss'
import { attachGestureScale, attachPointerMove } from 'helper/manageEvent'
import isHTMLElement from 'helper/domElement/isHTMLElement'
import { Direction, Vector } from 'typings/typeConstants'
import { mergeRefs } from 'helper/reactHelper/mergeRefs'
import { IFC } from 'typings/reactType'
type RootElement = HTMLDivElement
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
const Transformable: IFC<
  {
    /* ----------------------------------- 拖动 ----------------------------------- */

    movable?: boolean
    moveDirection?: Direction | 'both'
    onMoveStart?: (el: RootElement) => void
    onMoveEnd?: (el: RootElement, speedVector: Vector) => void

    /* ---------------------------------- 惯性滑动 ---------------------------------- */

    /** 开启惯性滑动 */
    canInertialSlide?: boolean
    /** （前提：已开启惯性滚动）惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
    acc?: number
    /** （前提：已开启惯性滚动）惯性滑动的最大初速度（的绝对值） */
    maxInitSpeed?: number
    /** （前提：已开启惯性滚动）可滑动的范围 */
    slideArea?: BoundingRect | HTMLElement
    onSlideEnd?: (el: RootElement) => void

    /* ---------------------------------- 大小变化 ---------------------------------- */

    scalable?: boolean
  },
  RootElement
> = ({
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
  children,
  domRef
}) => {
  const box = useRef<RootElement>(null)
  useEffect(() => {
    if (movable) {
      attachPointerMove(box.current, {
        start() {
          onMoveStart?.(box.current!)
        },
        move(_, delta) {
          const computedDelta: typeof delta = {
            dx: moveDirection === 'both' || moveDirection === 'x' ? delta.dx : 0,
            dy: moveDirection === 'both' || moveDirection === 'y' ? delta.dy : 0
          }
          // TODO： 或者，保持对称，也包一层？
          changeTranslate(box.current!, { translate: computedDelta })
        },
        end(_, speedVector) {
          onMoveEnd?.(box.current!, speedVector)
          if (canInertialSlide) {
            const movableArea = isHTMLElement(slideArea)
              ? slideArea.getBoundingClientRect()
              : slideArea
            inertialSlide(box.current!, {
              speedVector,
              acc,
              maxInitSpeed,
              boundingBox: movableArea,
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
      className='movable-wrapper'
      css={{
        width: 'max-content',
        display: 'grid',
        position: 'relative',
        touchAction: 'none',
        transform: `${movable && 'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px))'} ${
          scalable && 'scale(var(--scale, 1))'
        }`
      }}
    >
      {children}
    </Div>
  )
}
export default Transformable
