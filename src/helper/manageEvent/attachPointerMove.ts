import { Delta2dTranslate, SpeedVector } from 'typings/typeConstants'
/**
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param eventHandler
 */
export default function attachPointerMove(
  el: HTMLElement | null,
  eventHandler: {
    move: (ev: PointerEvent, delta: Delta2dTranslate) => void
    end?: (ev: PointerEvent, speedVector: SpeedVector) => void
  }
) {
  const events: PointerEvent[] = []
  function pointerDown(ev: PointerEvent) {
    if (!events.length) {
      events.push(ev)
      el?.addEventListener('pointermove', pointerMove)
      el?.setPointerCapture(ev.pointerId)
    }
  }
  function pointerMove(ev: PointerEvent) {
    if (events.length && ev.pointerId === events[events.length - 1].pointerId) {
      events.push(ev)
      const deltaX = ev.clientX - events[events.length - 2].clientX
      const deltaY = ev.clientY - events[events.length - 2].clientY
      //TODO: 要把元素相对于当前视口的位置也放进去
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
      eventHandler.end?.(ev, { x: deltaX / deltaTime || 0, y: deltaY / deltaTime || 0 })
      events.splice(0, events.length)
      el?.removeEventListener('pointermove', pointerMove)
    }
  }
  el?.addEventListener('pointerdown', pointerDown)
  el?.addEventListener('pointerup', pointerUp)
}
