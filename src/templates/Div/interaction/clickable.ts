//约定：以后凡是feature的，第一属性一定是el（方便合成）
/** @mutable  */
export function attachClick(el: HTMLDivElement, events: ClickProps) {
  if (events.onClick)
    el.addEventListener('click', () => {
      events.onClick?.(el)
    })
}
export interface ClickProps {
  onClick?: (el: HTMLDivElement) => void
}
