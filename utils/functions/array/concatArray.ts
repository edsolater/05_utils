/**
 * 合并多个数组（会返回新数组）
 * @example
 * concat([1], [2]) // [1, 2]
 */
function concatArray<T, U>(arr1: T, arr2: U): T | U
function concatArray<T, U, V>(arr1: T, arr2: U, arr3: V): T | U | V
function concatArray<T, U, V, W>(arr1: T, arr2: U, arr3: V, arr4: W): T | U | V | W
function concatArray<T>(...arr1s: T[]): T
function concatArray<T extends unknown[]>(...arrs: T[]): T {
  //@ts-expect-error
  return arrs.reduce((acc, arr) => acc.concat(arr), [])
}
export default concatArray
