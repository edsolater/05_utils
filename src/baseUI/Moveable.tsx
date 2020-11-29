import React, { FC, useEffect, useRef } from 'react'
import Div from './Div'
import attachPointerMove from 'functions/attachPointerMove'
import { Delta2dScale, Delta2dTranslate, SpeedVector, Location2d } from '../typings/typeConstants'
import setCSSVariable from '../functions/setCSSVariable'
import attachGestureScale from 'functions/attachGestureScale'
import calcHypotenuse from 'functions/calcHypotenuse'

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
  /**
   * 根据偏移量，重新设定--x与--y
   * @param delta 偏移量
   */
  function changeTranslate(delta: Delta2dTranslate) {
    setCSSVariable(box.current, '--x', (original) => Number(original) + delta.dx)
    setCSSVariable(box.current, '--y', (original) => Number(original) + delta.dy)
  }
  /**
   * 根据尺寸变化指数，重新设定--scale
   * @param scale 尺寸变化指数
   */
  function changeScaleDirectly(scale: Delta2dScale) {
    setCSSVariable(box.current, '--scale', scale.scaleRate)
  }
  /**
   * （用于惯性滑动）
   * 根据初始速度，设定--x与--y
   * @param speedVector 初始速度的向量表示（x，y坐标）
   */
  function changeTranslateByVector(speedVector: SpeedVector) {
    let lastTimestamp = performance.now()
    let lastVector = speedVector
    const a = -0.005 // 加速度
    const aInX = a * (speedVector.x / calcHypotenuse(speedVector.x, speedVector.y)) // x方向上的加速度
    const aInY = a * (speedVector.y / calcHypotenuse(speedVector.x, speedVector.y)) // y方向上的加速度
    //TODO: 这个animationFrame的命名机制可以封装起来
    function animateFunction(timestamp: number) {
      // console.log(4)
      //TODO 需要一点初中物理
      const elapsed = timestamp - lastTimestamp
      lastTimestamp = timestamp
      const currentVector = {
        x: lastVector.x + aInX * elapsed,
        y: lastVector.y + aInY * elapsed,
      }
      const dx = ((lastVector.x + currentVector.x) / 2) * elapsed
      const dy = ((lastVector.y + currentVector.y) / 2) * elapsed
      // console.log('dx: ', dx)
      // console.log('dy: ', dy)
      lastVector = currentVector
      if (dx > 0 || dy > 0) {
        changeTranslate({ dx: Math.max(dx, 0), dy: Math.max(dy, 0) })
        window.requestAnimationFrame(animateFunction)
      }
    }

    window.requestAnimationFrame(animateFunction)
  }
  useEffect(() => {
    moveable &&
      attachPointerMove(box.current, {
        move: (_, delta) => changeTranslate(delta),
        end: (_, speedVector) => inertialSlide && changeTranslateByVector(speedVector),
      })
    scaleable &&
      attachGestureScale(box.current, {
        moving: (_, delta) => changeScaleDirectly(delta),
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
