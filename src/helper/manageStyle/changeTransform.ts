import { Delta2dTranslate } from 'typings/constants'
import setCSSVariable from './setCSSVariable'

/**
 * 根据偏移量，重新设定元素样式的--x与--y
 * @param el 目标元素
 * @param delta 改变量
 */
export default function changeTransform(el: HTMLElement, delta: { translate?: Delta2dTranslate }) {
  if (delta.translate && delta.translate.dx) {
    setCSSVariable(el, '--x', (original) => Number(original) + delta.translate!.dx!)
  }
  if (delta.translate && delta.translate.dy) {
    setCSSVariable(el, '--y', (original) => Number(original) + delta.translate!.dy!)
  }
}
