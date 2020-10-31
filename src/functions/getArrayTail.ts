/**
 * 返回剔除第一项的新数组
 * @param arr 目标数组
 * @returns 剩余项的数组（浅拷贝）
 * @example
 * getArrayTail([1,2,3]) // [2,3]
 */
export default function getArrayTail<T extends unknown[]>(arr: Partial<[any, ...T]>): T[] {
  return arr.slice(1)
}
