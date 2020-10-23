/**
 * 纯函数
 * 取数组中的末项
 */
export default function getLastItem<T>(target: T[]): T {
  return target[target.length - 1]
}
