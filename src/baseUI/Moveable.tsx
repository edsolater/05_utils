import Div from './Div'
import React, { FC, useEffect, useRef } from 'react'
import attachPointerMove from 'functions/attachPointerMove'
import { Delta2dScale, Delta2dTranslate } from '../typings/typeConstants'
import setCSSVariable from '../functions/setCSSVariable'
import attachGestureScale from 'functions/attachGestureScale'

const Moveable: FC<{
  moveable?: boolean
  scaleable?: boolean
  /** 惯性滑动 */
  inertialSlide?: boolean
  /** 摩擦系数 */
  firctionCoefficient?: number
}> = ({
  moveable = true,
  scaleable = false,
  inertialSlide = true, // temp
  firctionCoefficient = 1,
  children,
}) => {
  const box = useRef<HTMLDivElement>(null)
  function changeTranslate(delta: Delta2dTranslate) {
    setCSSVariable(box.current!, '--x', (original) => Number(original) + delta.dx)
    setCSSVariable(box.current!, '--y', (original) => Number(original) + delta.dy)
  }
  function changeScale(scale: Delta2dScale) {
    setCSSVariable(box.current!, '--scale', scale.scaleRate)
  }
  useEffect(() => {
    moveable &&
      attachPointerMove(box.current, {
        move: (_, delta) => changeTranslate(delta),
        end: (_, speedVector) => {
          console.log('speedVector: ', speedVector)
          return changeTranslate
        },
      })
    scaleable &&
      attachGestureScale(box.current, {
        moving: (_, delta) => changeScale(delta),
      })
  }, [])

  return (
    <Div
      ref={box}
      className="movable"
      css={{
        // TODO：具体的css尺寸要靠传进来的
        width: 100,
        height: 100,
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
export default Moveable
