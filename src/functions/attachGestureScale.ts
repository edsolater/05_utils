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
  // TODO：scale orgin
  function touchstart(ev: TouchEvent) {
    // FIXME 这有问题：屏幕中只能出现2根手指，才能生效
    if (ev.touches.length === 2 && areSame(...toArray(ev.touches).map(extract('target')))) {
      // TODO: 感觉需要增加灵活度，让extract也能接收一个对象数组
      const dx = calcDistance(...toArray(ev.touches, extract('clientX')))
      const dy = calcDistance(...toArray(ev.touches, extract('clientY')))
      initDistance = calcHypotenuse(dx, dy)
      addEventListeners(document, { touchmove })
    }
  }
  function touchmove(ev: TouchEvent) {
    if (ev.touches.length === 2) {
      ev.stopPropagation()
      const dx = calcDistance(...toArray(ev.touches, extract('clientX')))
      const dy = calcDistance(...toArray(ev.touches, extract('clientY')))
      const newDistance = calcHypotenuse(dx, dy)
      eventHandler(ev, { scale: newDistance / initDistance })
    }
  }
  function touchend() {
    removeEventListeners(document, { touchmove })
  }
  addEventListeners(el, { touchstart, touchend })
}

// TODO 可选地: 绑定 start/up 需要能自动 remove 掉 end/down
function addEventListeners(
  el: Document,
  events: Partial<{ [eventName in keyof DocumentEventMap]: any }>
)
function addEventListeners(
  el: HTMLElement | null,
  events: Partial<{ [eventName in keyof HTMLElementEventMap]: any }>
)
function addEventListeners(
  el: HTMLElement | null | Document,
  events: Partial<{ [eventName in keyof HTMLElementEventMap]: any }>
) {
  Object.entries(events).forEach(([eventName, handler]) => {
    el?.addEventListener(eventName, handler)
  })
}

function removeEventListeners(
  el: Document,
  events: Partial<{ [eventName in keyof DocumentEventMap]: any }>
)
function removeEventListeners(
  el: HTMLElement | null,
  events: Partial<{ [eventName in keyof HTMLElementEventMap]: any }>
)
function removeEventListeners(
  el: HTMLElement | null | Document,
  events: Partial<{ [eventName in keyof HTMLElementEventMap]: any }>
) {
  Object.entries(events).forEach(([eventName, handler]) => {
    el?.removeEventListener(eventName, handler)
  })
}
