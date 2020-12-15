import React, { FC, useEffect, useRef } from 'react'
import Div from './Div'
import { changeTranslate, changeTranslateByVector, changeScaleDirectly } from 'helper/manageCss'
import { attachGestureScale, attachPointerMove } from 'helper/manageEvent'
import isHTMLElement from 'helper/domElement/isHTMLElement'

const Transformable: FC<{
  movable?: boolean
  scalable?: boolean
  /** 开启惯性滑动 */
  inertialSlide?: boolean
  /** 惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
  acc?: number
  /** 惯性滑动的最大初速度（的绝对值） */
  maxInitSpeed?: number
  /** TODO: 可滑动的范围 */
  moveArea?: { left: number; top: number; width: number; height: number } | HTMLElement
}> = ({
  movable = true,
  scalable = true,
  inertialSlide = true, // temp
  acc = 0.004,
  maxInitSpeed = 3,
  children,
  moveArea,
}) => {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    movable &&
      attachPointerMove(box.current, {
        move: (_, delta) => changeTranslate(box.current!, { translate: delta }),
        end: (_, speedVector) => {
          if (inertialSlide) {
            const movableArea = isHTMLElement(moveArea)
              ? moveArea.getBoundingClientRect()
              : moveArea
            changeTranslateByVector(box.current!, speedVector, {
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
        transform:
          'translate(calc(var(--x, 0) * 1px), calc(var(--y, 0) * 1px)) scale(var(--scale, 1))',
        touchAction: 'none',
      }}
    >
      {children}
    </Div>
  )
}
export default Transformable
