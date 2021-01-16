/**
 * (纯函数)
 * 
 * 判断是否非`undefined`或`null`
 * 
 * @param value 被检测的值
 * @example
 * notNullish('') // true
 * notNullish(undefined) // false
 * notNullish([]) // true
 */
export default function notNullish<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}
