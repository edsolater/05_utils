//约定：以后凡是feature的，第一属性一定是el（方便合成）
/** @mutable  */
export function attachHover(el: HTMLElement, events: HoverProps) {
  if (events.onHoverStart)
    el.addEventListener('pointerenter', () => {
      events.onHoverStart?.()
    })

  if (events.onHoverEnd)
    el.addEventListener('pointerleave', () => {
      events.onHoverEnd?.()
    })

  if (events.onHoverEnd)
    el.addEventListener('pointercancel', () => {
      events.onHoverEnd?.()
    })
}
export interface HoverProps {
  onHoverStart?: () => void
  onHoverEnd?: () => void
}
export const featurePropNames: Array<keyof HoverProps> = ['onHoverStart', 'onHoverEnd']
