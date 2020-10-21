export default function applyRange(range: Range) {
  const selection = getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
