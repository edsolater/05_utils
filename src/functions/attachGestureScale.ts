import { Delta2dScale } from 'typings/typeConstants'
import areSame from './areSame'
import calcHypotenuse from './calcHypotenuse'
import extract from './extract'
import calcDistance from './getDistance'
import toArray from './toArray'

function getTouchesInElement(ev: TouchEvent, el: HTMLElement | null) {
  //FIXME: 使用 parentElement
  return toArray(ev.touches).filter(touch =>
    areSame(el, (touch.target as HTMLElement).parentElement)
  )
}

/**
 * 处理双指缩放手势
 * @todo 暂且使用Touch，最后要使用大一统的PointerEvents
 * @param el 目标元素
 * @param eventHandler
 */
export default function attachGestureScale(
  el: HTMLElement | null,
  eventHandlers: {
    start?: (ev: TouchEvent) => void
    moving: (ev: TouchEvent, delta: Delta2dScale) => void
    end?: (ev: TouchEvent, delta: Delta2dScale) => void
  }
) {
  // TODO: 感觉这种带有自动过期行为的Map，可以抽为一个数据结构，暂时简单点，用永不过期
  // const activePointers = new Map<TouchEvent['pointerId'], TouchEvent>()
  let initDistance = 0
  let lastScaling = 1
  let currentScaling = 1
  let isScaling = false
  let touchIds = [0, 0]
  function touchstart(ev: TouchEvent) {
    const touchesOnElement = getTouchesInElement(ev, el)
    if (touchesOnElement.length === 2) {
      isScaling = true
      touchIds = touchesOnElement.map(extract('identifier'))
      const dx = calcDistance(...touchesOnElement.map(extract('clientX')))
      const dy = calcDistance(...touchesOnElement.map(extract('clientY')))
      initDistance = calcHypotenuse(dx, dy)
      addEventListeners(document, { touchmove })
      eventHandlers.start?.(ev)
    }
  }
  function touchmove(ev: TouchEvent) {
    const touchesOnElement = getTouchesInElement(ev, el)
    if (
      touchesOnElement.length === 2 &&
      touchesOnElement.every(({ identifier }) => touchIds.includes(identifier))
    ) {
      ev.stopPropagation()
      const dx = calcDistance(...touchesOnElement.map(extract('clientX')))
      const dy = calcDistance(...touchesOnElement.map(extract('clientY')))
      const newDistance = calcHypotenuse(dx, dy)
      currentScaling = lastScaling * (newDistance / initDistance)
      eventHandlers.moving(ev, { scaleRate: currentScaling })
    }
  }
  function touchend(ev: TouchEvent) {
    removeEventListeners(document, { touchmove })
    touchIds = []
    if (isScaling) {
      lastScaling = currentScaling
      eventHandlers.end?.(ev, { scaleRate: lastScaling })
      currentScaling = 1
      isScaling = false
    }
  }
  addEventListeners(el, { touchstart, touchend })
}

// TODO 可选地: 绑定 start/up 需要能自动 remove 掉 end/down，就很cool了
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
