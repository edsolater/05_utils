import { Delta2d } from 'typings/constants'

/**
 * 绑定元素的drag事件（pointerDown + pointerMove + pointerUp，会禁用掉浏览器的默认事件），
 * 会触发时在document上绑定事件，但会自动清理，
 * 其实是定义pointerMove。
 * @param el 目标元素
 * @param dragEventHandler
 */
export default function attachDragHandler(
  el: HTMLElement | null,
  dragEventHandler: (ev: MouseEvent, delta: Delta2d) => void,
  options?: boolean | EventListenerOptions
) {
  /**
   * 记录上一次的屏幕位置
   */
  let lastClientX = 0
  let lastClientY = 0
  const preventedDragHandler = (e: MouseEvent) => {
    /**
     * 相对于上一次的偏移量
     */
    const deltaX = e.clientX - lastClientX
    const deltaY = e.clientY - lastClientY
    lastClientX = e.clientX
    lastClientY = e.clientY
    e.preventDefault()
    dragEventHandler(e, { dx: deltaX, dy: deltaY })
  }
  el?.addEventListener(
    'pointerdown',
    e => {
      e.preventDefault()
      lastClientX = e.clientX
      lastClientY = e.clientY
      document.addEventListener('pointermove', preventedDragHandler)
      document.addEventListener(
        'pointerup',
        () => document.removeEventListener('pointermove', preventedDragHandler),
        { once: true }
      )
    },
    options
  )
}
