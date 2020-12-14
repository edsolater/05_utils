/**
 * 返回剔除末项的新数组
 * @param arr 目标数组
 * @returns 剩余项的数组（浅拷贝）
 * @example
 * getHead([1,2,3]) // [1, 2]
 */
export default function getHead<T extends unknown[]>(arr: Partial<[...T, any]>): T[] {
  return arr.length > 1 ? arr.slice(0, arr.length - 1) : []
}
