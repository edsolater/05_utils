import areShallowEqualArray from './areShallowEqualArray'
import isObject from './isObject'

/**
 * 判断两个对象是否具有相同的键
 * @param val1 被比较
 * @param val2 期望目标
 * @example
 * haveEqualKeys({ a: 1, b: 2, c: 3 }, { a: 7, b: 8, c: 9 }) // true
 */
export default function haveSameKeys(val1: unknown, val2: unknown) {
  return Boolean(
    isObject(val1) && isObject(val2) && areShallowEqualArray(Object.keys(val1), Object.keys(val2))
  )
}
