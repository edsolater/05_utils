/**
 * 基于item替换数组项（返回新数组）
 */
export default function replaceByItem<T, U>(arr: U[], targetItem: U & any, newValue: T) {
  const index = arr.indexOf(targetItem)
  return index === -1 ? [...arr] : [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}
