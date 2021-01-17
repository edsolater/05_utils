import clamp from 'utils/math/clamp'

/**
 * DOM操作：等比例改变宽高
 * @param  el
 * @param  deltaWidth
 */
export default function changeSizeByDeltaWidth(
  el: HTMLElement,
  deltaWidth: number,
  { minRatio = 0, maxRatio = 10000 }: { minRatio?: number; maxRatio?: number } = {}
) {
  // TODO: 如果元素的style上没有width、height怎么办呢？
  const originalWidth = parseFloat(el.style['width'])
  const newWidth = clamp(
    minRatio * originalWidth,
    originalWidth + deltaWidth,
    maxRatio * originalWidth
  )
  const originalHeight = parseFloat(el.style['height'])
  const newHeight = originalHeight * (newWidth / originalWidth)

  el.style['width'] = newWidth + 'px'
  el.style['height'] = newHeight + 'px'
}
