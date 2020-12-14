/**
 * 基于index替换数组项（返回新数组）
 */
export default function replaceByIndex<T, U>(arr: U[], index: number, newValue: T) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
