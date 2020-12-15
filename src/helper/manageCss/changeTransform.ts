import { Delta2dTranslate } from '../../typings/typeConstants'
import setCSSVariable from './setCSSVariable'

/**
 * 根据偏移量，重新设定元素样式的--x与--y
 * @param el 目标元素
 * @param delta 改变量
 */
export default function changeTransform(el: HTMLElement, delta: { translate?: Delta2dTranslate }) {
  if (delta.translate) {
    const translateInfo = delta.translate
    setCSSVariable(el, '--x', original => Number(original) + translateInfo.dx)
    setCSSVariable(el, '--y', original => Number(original) + translateInfo.dy)
  }
}

