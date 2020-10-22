/**
 * 纯函数
 * 取数组中的末项
 */
export default function lastItem<T>(target: Iterable<T>): T {
  return target[Array.from(target).length - 1]
}
