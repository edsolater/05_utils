/**
 * 判定目标值是否包含在目标数组中
 * @param val 需要判定的值
 * @param arr 数组（可能包含目标值）
 * @example
 * matchToArray(2, [1, 2, 3]) // true
 * matchToArray('hello', ['hello', 'world']) // true
 */
export default function matchToArray<T extends unknown>(val: T, arr: T[]) {
  return arr.includes(val)
}
