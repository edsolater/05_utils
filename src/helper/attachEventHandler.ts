import { Delta2dTranslate, SpeedVector } from "typings/constants"
import attachSizeIfNeeded from "./manageStyle/attachSizeIfNeeded"

/**
 * DOM操作的封装
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param eventHandler
 */
export function attachPointerMove(
  el: HTMLElement,
  eventHandler: {
    move: (ev: PointerEvent, delta: Delta2dTranslate) => void
    end?: (ev: PointerEvent, speedVector: SpeedVector) => void
  }
) {
  const events: PointerEvent[] = []
  /**
   *
   * @param {Event} ev
   */
  function pointerDown(ev: PointerEvent) {
    if (!events.length) {
      events.push(ev)
      el?.addEventListener('pointermove', pointerMove)
      el?.setPointerCapture(ev.pointerId)
      ev.stopPropagation()
    }
  }
  function pointerMove(ev: PointerEvent) {
    if (events.length && ev.pointerId === events[events.length - 1].pointerId) {
      events.push(ev)
      const deltaX = ev.clientX - events[events.length - 2].clientX
      const deltaY = ev.clientY - events[events.length - 2].clientY
      eventHandler.move(ev, { dx: deltaX, dy: deltaY })
    }
  }
  function pointerUp(ev: PointerEvent) {
    if (events.length && ev.pointerId === events[events.length - 1].pointerId) {
      events.push(ev)
      const eventNumber = 4
      const fromPoint = events[events.length - eventNumber] ?? events[0]
      const deltaX = ev.clientX - fromPoint.clientX
      const deltaY = ev.clientY - fromPoint.clientY
      const deltaTime = ev.timeStamp - fromPoint.timeStamp
      eventHandler.end?.(ev, {
        x: deltaX / deltaTime || 0,
        y: deltaY / deltaTime || 0,
      })
      events.splice(0, events.length)
      el?.removeEventListener('pointermove', pointerMove)
    }
  }
  el?.addEventListener('pointerdown', pointerDown)
  el?.addEventListener('pointerup', pointerUp)
}

/**
 * DOM操作的封装
 * 绑定元素的wheel事件
 * @param el 目标元素
 * @param eventHandler 事件回调
 */
export function attachWheel(
  el: HTMLElement,
  eventHandler: (ev: WheelEvent, deltaY: number) => void
) {
  attachSizeIfNeeded(el)
  el.addEventListener('wheel', (ev) => {
    eventHandler(ev, ev.deltaY)
  })
}
