import React, { FC, useEffect, useRef } from 'react'
import Div from './Div'
import attachPointerMove from 'functions/attachPointerMove'
import { Delta2dScale, Delta2dTranslate, SpeedVector } from '../typings/typeConstants'
import setCSSVariable from '../functions/setCSSVariable'
import attachGestureScale from 'functions/attachGestureScale'
import calcHypotenuse from 'functions/calcHypotenuse'
import { staySameSign } from '../functions/math'
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
    const totalSpeedValue = calcHypotenuse(speedVector.x, speedVector.y)
    let lastTimestamp = performance.now()
    let lastVector = {
      x: speedVector.x * (totalSpeedValue > maxInitSpeed ? maxInitSpeed / totalSpeedValue : 1),
      y: speedVector.y * (totalSpeedValue > maxInitSpeed ? maxInitSpeed / totalSpeedValue : 1),
    }
    const accInX = -acc * (speedVector.x / calcHypotenuse(speedVector.x, speedVector.y)) // x方向上的摩擦力加速度
    const accInY = -acc * (speedVector.y / calcHypotenuse(speedVector.x, speedVector.y)) // y方向上的摩擦力加速度
    //TODO: 这个animationFrame的命名机制可以封装起来
    function animateFunction(timestamp: number) {
      const elapsed = timestamp - lastTimestamp
      lastTimestamp = timestamp
      const currentVector = {
        x: staySameSign(lastVector.x + accInX * elapsed, -accInX), // 速度应总是与加速度相反的方向(所以要保持符号相同)
        y: staySameSign(lastVector.y + accInY * elapsed, -accInY), // 速度应总是与加速度相反的方向(所以要保持符号相同)
      }
      const dx = ((lastVector.x + currentVector.x) / 2) * elapsed
      const dy = ((lastVector.y + currentVector.y) / 2) * elapsed
      lastVector = currentVector
      if (dx !== 0 || dy !== 0) {
        changeTranslate({ dx, dy })
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
