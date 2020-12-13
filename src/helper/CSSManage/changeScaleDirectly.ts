import { Delta2dScale } from '../../typings/typeConstants'
import setCSSVariable from '../../functions/setCSSVariable'

/**
 * 根据尺寸变化指数，重新设定元素样式的--scale
 * @param el 目标元素
 * @param scale 尺寸变化指数
 */
export default function changeScaleDirectly(el: HTMLElement, scale: Delta2dScale) {
  setCSSVariable(el, '--scale', scale.scaleRate)
}
