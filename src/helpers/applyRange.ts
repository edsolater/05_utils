/**
 * (side-effect)
 * 将range对象应用到屏幕上
 * @param range Range对象
 */
export default function applyRange(range: Range) {
  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
