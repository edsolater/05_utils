import { Delta2dScale } from 'typings/typeConstants'
import areSame from '../../functions/areSame'
import calcHypotenuse from '../../functions/calcHypotenuse'
import extract from '../../functions/extract'
import calcDistance from '../../functions/getDistance'
import toArray from '../../functions/toArray'

/**
 * 获取专属于某个元素的触摸
 * @param ev 
 * @param el 
 */
function getTouchesInEvent(ev: TouchEvent, el: HTMLElement | null) {
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
  let touchIds: number[] = [] // ponterId 限定死了同时能作用的指针有且只有2个
  function touchstart(ev: TouchEvent) {
    const touchesOnElement = getTouchesInEvent(ev, el)
    if (touchesOnElement.length === 2) {
      touchIds = touchesOnElement.map(extract('identifier'))
      const dx = calcDistance(...touchesOnElement.map(extract('clientX')))
      const dy = calcDistance(...touchesOnElement.map(extract('clientY')))
      initDistance = calcHypotenuse(dx, dy)
      document.addEventListener('touchmove', touchmove)
      eventHandlers.start?.(ev)
    }
  }
  function touchmove(ev: TouchEvent) {
    const touchesOnElement = getTouchesInEvent(ev, el)
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
    document.removeEventListener('touchmove', touchmove)
    if ((touchIds.length = 2)) {
      lastScaling = currentScaling
      touchIds = []
      eventHandlers.end?.(ev, { scaleRate: lastScaling })
      currentScaling = 1
    }
  }
  el?.addEventListener('touchstart', touchstart)
  el?.addEventListener('touchend', touchend)
}

// TODO 可选地: 绑定 start/up 需要能自动 remove 掉 end/down，就很cool了
