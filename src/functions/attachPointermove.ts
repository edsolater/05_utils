import { Delta2d } from 'typings/typeConstants'

/**
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param dragEventHandler
 */
export default function attachPointermove(
  el: HTMLElement | null,
  dragEventHandler: (ev: PointerEvent, delta: Delta2d) => void,
) {
  let lastClientX = 0
  let lastClientY = 0

  function downHandler(e: PointerEvent) {
    lastClientX = e.clientX
    lastClientY = e.clientY
    el?.addEventListener('pointermove', moveHandler)
    el?.setPointerCapture(e.pointerId)
  }
  function cancelHandler(e: PointerEvent) {
    el?.removeEventListener('pointermove', moveHandler)
    // el?.releasePointerCapture(e.pointerId) 标准写明会自动清理
  }
  const moveHandler = (e: PointerEvent) => {
    const deltaX = e.clientX - lastClientX
    const deltaY = e.clientY - lastClientY
    lastClientX = e.clientX
    lastClientY = e.clientY
    dragEventHandler(e, { dx: deltaX, dy: deltaY })
  }
  el?.addEventListener('pointerdown', downHandler)
  el?.addEventListener('pointerup', cancelHandler)
}
