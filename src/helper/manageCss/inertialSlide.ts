import { SpeedVector } from '../../typings/constantss'
import calcHypotenuse from 'utils/math/calcHypotenuse'
import staySameSign from '../../utils/math/staySameSign'
import changeTransformTranslate from './changeTransform'
import { BoundingRect } from 'baseUI/Transformable'

/**
 * （用于惯性滑动）
 * 根据初始速度，设定--x与--y
 * 用到的 webAPI：requestAnimationFrame（JS添加惯性滑动的动画）
 * @param el 目标元素
 * @param speedVector 初始速度的向量表示（x，y坐标）
 */
export default function inertialSlide(
  el: HTMLElement,
  {
    speedVector,
    acc = 0.004,
    maxInitSpeed = 3,
    boundingBox,
    onSlideEnd
  }: {
    speedVector: SpeedVector
    acc?: number
    maxInitSpeed?: number
    boundingBox?: BoundingRect
    onSlideEnd?:()=>void
  }
) {
  const totalSpeedValue = calcHypotenuse(speedVector.x, speedVector.y)
  const accInX = -acc * (speedVector.x / calcHypotenuse(speedVector.x, speedVector.y)) // x方向上的摩擦力加速度
  const accInY = -acc * (speedVector.y / calcHypotenuse(speedVector.x, speedVector.y)) // y方向上的摩擦力加速度
  const rect = el.getBoundingClientRect()
  const elPosition: BoundingRect = {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom
  }
  let lastTimestamp = performance.now()
  let lastVector = {
    x: speedVector.x * (totalSpeedValue > maxInitSpeed ? maxInitSpeed / totalSpeedValue : 1),
    y: speedVector.y * (totalSpeedValue > maxInitSpeed ? maxInitSpeed / totalSpeedValue : 1)
  }

  //TODO: 这个animationFrame的命名机制可以封装起来
  function animateFunction(timestamp: number) {
    const elapsed = timestamp - lastTimestamp
    lastTimestamp = timestamp
    const currentVector = {
      x: staySameSign(lastVector.x + accInX * elapsed, -accInX),
      y: staySameSign(lastVector.y + accInY * elapsed, -accInY)
    }
    let dx = ((lastVector.x + currentVector.x) / 2) * elapsed
    let dy = ((lastVector.y + currentVector.y) / 2) * elapsed
    elPosition.left += dx
    elPosition.right += dx
    elPosition.top += dy
    elPosition.bottom += dy
    if (boundingBox && elPosition.left <= boundingBox.left) {
      dx += boundingBox.left - elPosition.left
      elPosition.left = boundingBox.left
    }
    if (boundingBox && elPosition.right >= boundingBox.right) {
      dx += boundingBox.right - elPosition.right
      elPosition.right = boundingBox.right
    }
    if (boundingBox && elPosition.top <= boundingBox.top) {
      dy += boundingBox.top - elPosition.top
      elPosition.top = boundingBox.top
    }
    if (boundingBox && elPosition.bottom >= boundingBox.bottom) {
      dy += boundingBox.bottom - elPosition.bottom
      elPosition.bottom = boundingBox.bottom
    }
    lastVector = currentVector
    if (dx !== 0 || dy !== 0) {
      changeTransformTranslate(el, { translate: { dx, dy } })
      window.requestAnimationFrame(animateFunction)
    } else {
      onSlideEnd?.()
    }
  }
  window.requestAnimationFrame(animateFunction)
}
