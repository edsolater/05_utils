import { setCSSVariable } from 'style/cssVaraiable'
import { Delta2dTranslate } from 'typings/constants'
import { deleteElementStyle, setElementStyle } from './elementStyle'

/**
 * 根据偏移量，重新设定元素样式的--x与--y
 * @param el 目标元素
 * @param opts 改变量
 */
export default function   changeTransform(
  el: HTMLElement,
  opts: { translate?: Partial<Delta2dTranslate>; transition?: number }
) {
  if (opts.transition) {
    //TODO: 有缺陷，没有考虑已有transition的情况
    setElementStyle(el, 'transition', `${opts.transition}ms`)
    el.addEventListener('transitionend', () => {
      deleteElementStyle(el, 'transition')
    })
  }
  if (opts.translate && opts.translate.dx) {
    setCSSVariable(el, '--x', (original) => Number(original) + opts.translate!.dx!)
  }
  if (opts.translate && opts.translate.dy) {
    setCSSVariable(el, '--y', (original) => Number(original) + opts.translate!.dy!)
  }
}
