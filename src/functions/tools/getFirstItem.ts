/**
 * 纯函数
 * 取数组中的首项(为了与getLast保持对称性，才)
 */
export default function getFirstItem<T>(target: T[]): T {
  return target[0] 
}
