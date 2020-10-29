/**
 * (纯函数)
 * 判断是否是否值
 * @param value 需要判断的值
 * @example
 * notNullish('') // true
 * notNullish(undefined) // false
 * notNullish([]) // true
 */
export default function notNullish<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}
