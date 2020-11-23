import { Delta2dTranslate, Location2d, SpeedVector } from 'typings/typeConstants'
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
  let lastClientX = 0 // 去掉
  let lastClientY = 0 // 去掉
  let events:PointerEvent[] = []
  let lastEventFiredTime = 0 // 去掉
  let pointerId = 0 // ponterId 限定死了同时能作用的指针有且只有1个 // 去掉
  function pointerDown(ev: PointerEvent) {
    if (!pointerId) {
      pointerId = ev.pointerId
      lastClientX = ev.clientX
      lastClientY = ev.clientY
      lastEventFiredTime = ev.timeStamp
      el?.addEventListener('pointermove', pointerMove)
      el?.setPointerCapture(ev.pointerId)
    }
  }
  function pointerMove(ev: PointerEvent) {
    console.log(333)
    if (ev.pointerId === pointerId) {
      const deltaX = ev.clientX - lastClientX
      const deltaY = ev.clientY - lastClientY
      lastClientX = ev.clientX
      lastClientY = ev.clientY
      lastEventFiredTime = ev.timeStamp
      eventHandler.move(ev, { dx: deltaX, dy: deltaY })
    }
  }
  function pointerUp(ev: PointerEvent) {
    console.log(ev.pointerId)
    if (ev.pointerId === pointerId) {
      console.log(2)
      el?.removeEventListener('pointermove', pointerMove)
      pointerId = 0
      const deltaX = ev.clientX - lastClientX
      const deltaY = ev.clientY - lastClientY
      const deltaTime = ev.timeStamp - lastEventFiredTime
      console.log('last', ev.timeStamp, lastEventFiredTime)
      eventHandler.end?.(ev, { x: deltaX / deltaTime, y: deltaY / deltaTime })
    }
  }
  el?.addEventListener('pointerdown', pointerDown)
  el?.addEventListener('pointerup', pointerUp)
}
