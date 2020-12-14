import { Delta2dTranslate } from '../../typings/typeConstants'
import setCSSVariable from './setCSSVariable'

/**
 * 根据偏移量，重新设定元素样式的--x与--y
 * @param el 目标元素
 * @param delta 偏移量
 */
export default function changeTranslate(el: HTMLElement, delta: Delta2dTranslate) {
  setCSSVariable(el, '--x', original => Number(original) + delta.dx)
  setCSSVariable(el, '--y', original => Number(original) + delta.dy)
}
