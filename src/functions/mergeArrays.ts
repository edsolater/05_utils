/**
 * 合并多个数组（会返回新数组）
 */
function mergeArrays<T, U>(arr1: T, arr2: U): T & U
function mergeArrays<T, U, V>(arr1: T, arr2: U, arr3: V): T & U & V
function mergeArrays<T, U, V, W>(arr1: T, arr2: U, arr3: V, arr4: W): T & U & V & W
function mergeArrays<T extends unknown[]>(...arrs: T[]): T {
  //@ts-expect-error
  return arrs.reduce((acc, arr) => acc.concat(arr), [])
}
export default mergeArrays
const d = mergeArrays([1, 2], ['hello', 'hello'])
