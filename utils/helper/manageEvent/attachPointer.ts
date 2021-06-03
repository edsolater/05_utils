import { Delta2dTranslate, Location2d, SpeedVector } from '../../../typings/constants'
/**
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param eventHandlers
 */
export default function attachPointer<T extends HTMLElement | null>(
  el: T,
  eventHandlers: {
    start?: (i: { el: T; curr: Location2d }) => void
    move: (i: { el: T; delta: Delta2dTranslate; prev: Location2d; curr: Location2d }) => void
    end?: (i: { el: T; speedVector: SpeedVector }) => void
  }
) {
  const events: PointerEvent[] = []
  function pointerDown(ev: PointerEvent) {
    ev.stopPropagation()
    if (!events.length) {
      events.push(ev)
      el?.addEventListener('pointermove', pointerMove, { passive: true })
      el?.setPointerCapture(ev.pointerId)
      eventHandlers.start?.({ el, curr: { x: ev.clientX, y: ev.clientY } })
    }
  }
  function pointerMove(ev: PointerEvent) {
    if (events.length && ev.pointerId === events[events.length - 1].pointerId) {
      events.push(ev)
      const prevEvent = events[events.length - 2]
      eventHandlers.move({
        el,
        prev: { x: prevEvent.clientX, y: prevEvent.clientY },
        curr: { x: ev.clientX, y: ev.clientY },
        delta: { dx: ev.clientX - prevEvent.clientX, dy: ev.clientY - prevEvent.clientY }
      })
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
      eventHandlers.end?.({
        el,
        speedVector: { x: deltaX / deltaTime || 0, y: deltaY / deltaTime || 0 }
      })
      events.splice(0, events.length)
      el?.removeEventListener('pointermove', pointerMove)
    }
  }
  el?.addEventListener('pointerdown', pointerDown, { passive: true })
  el?.addEventListener('pointerup', pointerUp, { passive: true })
}
