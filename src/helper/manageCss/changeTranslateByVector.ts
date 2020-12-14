import { SpeedVector } from '../../typings/typeConstants'
import calcHypotenuse from 'functions/math/calcHypotenuse'
import staySameSign from "../../functions/math/staySameSign"
import changeTranslate from './changeTranslate'

/**
 * （用于惯性滑动）
 * 根据初始速度，设定--x与--y
 * 用到的 webAPI：requestAnimationFrame（JS添加惯性滑动的动画）
 * @param el 目标元素
 * @param speedVector 初始速度的向量表示（x，y坐标）
 */
export default function changeTranslateByVector(
  el: HTMLElement,
  speedVector: SpeedVector,
  { acc = 0.004, maxInitSpeed = 3 }: { acc?: number; maxInitSpeed?: number } = {}
) {
  const totalSpeedValue = calcHypotenuse(speedVector.x, speedVector.y)
  let lastTimestamp = performance.now()
  let lastVector = {
    x: speedVector.x * (totalSpeedValue > maxInitSpeed ? maxInitSpeed / totalSpeedValue : 1),
    y: speedVector.y * (totalSpeedValue > maxInitSpeed ? maxInitSpeed / totalSpeedValue : 1)
  }
  const accInX = -acc * (speedVector.x / calcHypotenuse(speedVector.x, speedVector.y)) // x方向上的摩擦力加速度
  const accInY = -acc * (speedVector.y / calcHypotenuse(speedVector.x, speedVector.y)) // y方向上的摩擦力加速度

  //TODO: 这个animationFrame的命名机制可以封装起来
  function animateFunction(timestamp: number) {
    const elapsed = timestamp - lastTimestamp
    lastTimestamp = timestamp
    const currentVector = {
      x: staySameSign(lastVector.x + accInX * elapsed, -accInX),
      y: staySameSign(lastVector.y + accInY * elapsed, -accInY)
    }
    const dx = ((lastVector.x + currentVector.x) / 2) * elapsed
    const dy = ((lastVector.y + currentVector.y) / 2) * elapsed
    lastVector = currentVector
    if (dx !== 0 || dy !== 0) {
      changeTranslate(el, { dx, dy })
      window.requestAnimationFrame(animateFunction)
    }
  }
  window.requestAnimationFrame(animateFunction)
}
