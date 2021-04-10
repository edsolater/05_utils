import attachGestureScale from 'helper/manageEvent/attachGestureScale'
import { mix } from 'style/cssParser'
import setCSSVariable from 'helper/manageStyle/setCSSVariable'
import { attachWheel } from 'helper/attachEventHandler'

/**
 * props定义声明
 */
export interface ScaleFeatureProps {
  /* ---------------------------------- 大小变化（） ---------------------------------- */
  /**会放大缩小，但只是影响试图 */
  scalable?: boolean
  /**能靠鼠标滚轮缩放 */
  canScaleByWheel?: boolean
  /**滚轮缩放的倍数（很小，小数点后3位才有效） */
  scaleWheelSpeed?: number
}

/**
 * props的字符串们
 */
export const scaleFeatureProps: (keyof ScaleFeatureProps)[] = [
  'scalable',
  'canScaleByWheel',
  'scaleWheelSpeed'
]

/** @mutable 具体实现  */
export function scaleFeatureCallback(
  el: HTMLDivElement,
  { scalable = false, canScaleByWheel = scalable, scaleWheelSpeed = 0.001 }: ScaleFeatureProps
) {
  if (scalable) {
    attachGestureScale(el, {
      moving: (_, delta) => setCSSVariable(el, '--scale', delta.scaleRate)
    })
    if (canScaleByWheel) {
      attachWheel(el, (_, deltaY) =>
        setCSSVariable(
          el,
          '--scale',
          (old) => (1 + deltaY * scaleWheelSpeed) * Number(old === '' ? 1 : old)
        )
      )
    }
  }
}

/**
 * style实现
 */
export const scaleFeatureStyle = ({ scalable = false }: ScaleFeatureProps) =>
  mix({
    scale: `${scalable ? 'var(--scale, 1)' : ''}`
  })
