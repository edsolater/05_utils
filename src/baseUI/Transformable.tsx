import React, { FC, useEffect, useRef } from 'react'
import Div from './Div'
import { changeTranslate, changeTranslateByVector, changeScaleDirectly } from 'helper/manageCss'
import { attachGestureScale, attachPointerMove } from 'helper/manageEvent'
const Transformable: FC<{
  moveable?: boolean
  scaleable?: boolean
  /** 开启惯性滑动 */
  inertialSlide?: boolean
  /** 惯性滑动中，地面摩擦的加速度，即，速度变化的快慢 */
  acc?: number
  /** 惯性滑动的最大初速度（的绝对值） */
  maxInitSpeed?: number
  /** TODO: 可滑动的范围 */
  moveArea?: [top: number, left: number, width: number, height: number] | HTMLElement
}> = ({
  moveable = true,
  scaleable = true,
  inertialSlide = true, // temp
  acc = 0.004,
  maxInitSpeed = 3,
  children,
}) => {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    moveable &&
      attachPointerMove(box.current, {
        move: (_, delta) => changeTranslate(box.current!, delta),
        end: (_, speedVector) =>
          inertialSlide &&
          changeTranslateByVector(box.current!, speedVector, { acc, maxInitSpeed }),
      })
    scaleable &&
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
