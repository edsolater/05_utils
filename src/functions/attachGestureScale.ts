import { Delta2d, Delta2dTranslate, Delta2dScale, Location2d } from 'typings/typeConstants'
/**
 * 绑定元素的pointermove（pointerDown + pointerMove + pointerUp），但会自动清理，
 * @param el 目标元素
 * @param dragEventHandler
 */
export default function attachGestureScale(
  el: HTMLElement | null,
  dragEventHandler: (ev: PointerEvent, delta: Delta2dTranslate) => void,
  { dx = true, multiPointerDelay = 100 }: { dx?: boolean; multiPointerDelay?: number } = {}
) {
  // TODO: 感觉这种带有自动过期行为的Map，可以抽为一个数据结构，暂时简单点，用永不过期
  const activePointers = new Map<PointerEvent['pointerId'], PointerEvent>()
  let lastClientX = 0
  let lastClientY = 0
  let lastDistance = 0
  function pointerDown(ev: PointerEvent) {
    lastClientX = ev.clientX
    lastClientY = ev.clientY
    activePointers.set(ev.pointerId, ev)
    if (activePointers.size === 2) {
      // TODO: 这样的模式，也是一种 utils
      const clientLocations: Array<Location2d> = Array.from(activePointers.values(), ev => ({
        x: ev.clientX,
        y: ev.clientY
      }))
      lastDistance = Math.sqrt(
        clientLocations.map(({ x }) => x).reduce((a, b) => a - b, 0) ** 2 +
          clientLocations.map(({ y }) => y).reduce((a, b) => a - b, 0) ** 2
      )
    }
    el?.addEventListener('pointermove', pointerMove)
    el?.setPointerCapture(ev.pointerId)
  }
  function pointerMove(ev: PointerEvent) {
    const deltaX = ev.clientX - lastClientX
    const deltaY = ev.clientY - lastClientY
    lastClientX = ev.clientX
    lastClientY = ev.clientY
    activePointers.set(ev.pointerId, ev)
    dragEventHandler(ev, { dx: deltaX, dy: deltaY })
  }
  function pointerUp(ev: PointerEvent) {
    el?.removeEventListener('pointermove', pointerMove)
    // el?.releasePointerCapture(e.pointerId) 标准写明会自动清理
    activePointers.delete(ev.pointerId)
  }
  el?.addEventListener('pointerdown', pointerDown)
  el?.addEventListener('pointerup', pointerUp)
}
