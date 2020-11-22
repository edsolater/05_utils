import { Delta2dScale } from 'typings/typeConstants'
import areSame from './areSame'
import calcHypotenuse from './calcHypotenuse'
import extract from './extract'
import calcDistance from './getDistance'
import toArray from './toArray'
/**
 * 处理双指缩放手势
 * @todo 暂且使用Touch，最后要使用大一统的Pointer
 * @param el 目标元素
 * @param eventHandler
 */
export default function attachGestureScale(
  el: HTMLElement | null,
  eventHandler: (ev: TouchEvent, delta: Delta2dScale) => void
) {
  // TODO: 感觉这种带有自动过期行为的Map，可以抽为一个数据结构，暂时简单点，用永不过期
  // const activePointers = new Map<TouchEvent['pointerId'], TouchEvent>()
  let initDistance = 0
  //TODO：scale orgin
  function touchStart(ev: TouchEvent) {
    if (ev.touches.length === 2 && areSame(...toArray(ev.touches).map(extract('target')))) {
      const dx = calcDistance(...toArray(ev.touches, extract('clientX')))
      const dy = calcDistance(...toArray(ev.touches, extract('clientY')))
      initDistance = calcHypotenuse(dx, dy)
      document?.addEventListener('touchmove', touchMove)
    }
  }
  function touchMove(ev: TouchEvent) {
    if (ev.touches.length === 2) {
      ev.stopPropagation()
      const dx = calcDistance(...toArray(ev.touches, extract('clientX')))
      const dy = calcDistance(...toArray(ev.touches, extract('clientY')))
      const newDistance = calcHypotenuse(dx, dy)
      eventHandler(ev, { scale: newDistance / initDistance })
    }
  }
  function touchEnd(ev: TouchEvent) {
    document.removeEventListener('touchmove', touchMove)
  }
  el?.addEventListener('touchstart', touchStart)
  el?.addEventListener('touchend', touchEnd)
}

