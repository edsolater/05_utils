import toPx from 'functions/toPx'
import pxToNumber from 'functions/pxToNumber'

export default function changeSizeByDelta(
  el: HTMLElement | null,
  deltaPx: number,
  cssPropName: 'width' | 'height'
) {
  if (!el) return
  const newPx = toPx(pxToNumber(el.style[cssPropName]) + deltaPx)
  el.style[cssPropName] = newPx
}
