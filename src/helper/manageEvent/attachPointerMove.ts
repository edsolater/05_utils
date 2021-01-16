import { Delta2dTranslate, Location2d, SpeedVector } from 'typings/constantss'
/**
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param eventHandlers
 */
export default function attachPointerMove(
  el: HTMLElement | null,
  eventHandlers: {
    start?: (i: { curr: Location2d }) => void
    move: (i: { delta: Delta2dTranslate; prev: Location2d; curr: Location2d }) => void
    end?: (i: { speedVector: SpeedVector }) => void
  }
) {
  const events: PointerEvent[] = []
  function pointerDown(ev: PointerEvent) {
    if (!events.length) {
      events.push(ev)
      el?.addEventListener('pointermove', pointerMove)
      el?.setPointerCapture(ev.pointerId)
      eventHandlers.start?.({ curr: { x: ev.clientX, y: ev.clientY } })
    }
  }
  function pointerMove(ev: PointerEvent) {
    if (events.length && ev.pointerId === events[events.length - 1].pointerId) {
      events.push(ev)
      const prevEvent = events[events.length - 2]
      eventHandlers.move({
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
        speedVector: { x: deltaX / deltaTime || 0, y: deltaY / deltaTime || 0 }
      })
      events.splice(0, events.length)
      el?.removeEventListener('pointermove', pointerMove)
    }
  }
  el?.addEventListener('pointerdown', pointerDown)
  el?.addEventListener('pointerup', pointerUp)
}
