import { fromPx, toPx } from 'style/cssUnits'

export default function changeSizeByDelta(
  el: HTMLElement | null,
  deltaPx: number,
  cssPropName: 'width' | 'height'
) {
  if (!el) return
  const newPx = toPx(fromPx(el.style[cssPropName]) + deltaPx)
  el.style[cssPropName] = newPx
}
