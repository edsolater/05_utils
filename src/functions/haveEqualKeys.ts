import areEqualArray from './areEqualArray'
import isObject from './isObject'

/**
 * 判断两个对象是否具有相同的键
 * @param val1 一个值
 * @param val2 另一个值
 * @example
 * haveEqualKeys({ a: 1, b: 2, c: 3 }, { a: 7, b: 8, c: 9 }) // true
 */
export default function haveEqualKeys(val1: {} | object, val2: {} | object) {
  return Boolean(
    isObject(val1) && isObject(val2) && areEqualArray(Object.keys(val1), Object.keys(val2))
  )
}
