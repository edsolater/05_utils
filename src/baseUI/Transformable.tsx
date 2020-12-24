import React, { FC, useEffect, useRef } from 'react'
import Div from './Div'
import { changeTranslate, inertialSlide, changeScaleDirectly } from 'helper/manageCss'
import { attachGestureScale, attachPointerMove } from 'helper/manageEvent'
import isHTMLElement from 'helper/domElement/isHTMLElement'
export type BoundingRect = {
  left: number
  top: number
  right: number
  bottom: number
}
const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight

const Transformable: FC<{
  movable?: boolean
  scalable?: boolean
  /** 开启惯性滑动 */
  canInertialSlide?: boolean
  /** 惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
  acc?: number
  /** 惯性滑动的最大初速度（的绝对值） */
  maxInitSpeed?: number
  /** 可滑动的范围 */
  moveArea?: BoundingRect | HTMLElement
}> = ({
  movable = true,
  scalable = true,
  canInertialSlide = true, // temp
  acc = 0.004,
  maxInitSpeed = 2,
  moveArea = { left: 0, top: 0, right: viewportWidth, bottom: viewportHeight },
  children,
}) => {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    movable &&
      attachPointerMove(box.current, {
        move(_, delta) {
          // TODO： 或者，保持对称，也包一层？
          changeTranslate(box.current!, { translate: delta })
        },
        end(_, speedVector) {
          if (canInertialSlide) {
            const movableArea = isHTMLElement(moveArea)
              ? moveArea.getBoundingClientRect()
              : moveArea
            inertialSlide(box.current!, {
              speedVector,
              acc,
              maxInitSpeed,
              boundingBox: movableArea,
            })
          }
        },
      })
    scalable &&
      attachGestureScale(box.current, {
        moving: (_, delta) => changeScaleDirectly(box.current!, delta),
      })
  }, [])

  return (
    <Div
      ref={box}
      className="movable"
      css={{
        width: 'max-content',
        display: 'grid',
        position: 'relative',
        transform: `${movable && 'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px))'} ${
          scalable && 'scale(var(--scale, 1))'
        }`,
        touchAction: 'none',
      }}
    >
      {children}
    </Div>
  )
}
export default Transformable
