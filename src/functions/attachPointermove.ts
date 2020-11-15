import { Delta2dTranslate } from 'typings/typeConstants'
/**
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param eventHandler
 */
export default function attachPointerMove(
  el: HTMLElement | null,
  eventHandler: (ev: PointerEvent, delta: Delta2dTranslate) => void
) {
  let lastClientX = 0
  let lastClientY = 0
  function pointerDown(ev: PointerEvent) {
    lastClientX = ev.clientX
    lastClientY = ev.clientY
    el?.addEventListener('pointermove', pointerMove)
    el?.setPointerCapture(ev.pointerId)
  }
  function pointerMove(ev: PointerEvent) {
    const deltaX = ev.clientX - lastClientX
    const deltaY = ev.clientY - lastClientY
    lastClientX = ev.clientX
    lastClientY = ev.clientY
    eventHandler(ev, { dx: deltaX, dy: deltaY })
  }
  function pointerUp(ev: PointerEvent) {
    el?.removeEventListener('pointermove', pointerMove)
    // el?.releasePointerCapture(e.pointerId) 标准写明会自动清理
  }
  el?.addEventListener('pointerdown', pointerDown)
  el?.addEventListener('pointerup', pointerUp)
}
