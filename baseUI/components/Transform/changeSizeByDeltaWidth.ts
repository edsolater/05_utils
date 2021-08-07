import clamp from '@edsolater/fnkit/dist/math/clamp'
import attachSizeIfNeeded from '../../../utils/helper/manageStyle/attachSizeIfNeeded'

//TODO: 这里操作的是真实的width/height，而不是--s这种scale()的缩放比例，是不是会与--x、--y不一致？
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
  attachSizeIfNeeded(el)
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
