import areSame from './areSame'
import haveSameKeys from './haveSameKeys'
import isArray from './isArray'
import isObjectLiteral from './isObjectLiteral'

/**
 * 检测两个值（一般复杂对象字面量）（内部只包括基本值、数组、对象字面量）是否值相同
 * @param val1 一个复合值
 * @param val2 另一个复合值
 * @example
 * areDeepEqual([1, 2], [1, 2]) // true
 * areDeepEqual({ a: 1, b: { c: 2, d: 3 } }, { a: 1, b: { c: 2, d: 3 } }) // true
 */
export default function areDeepEqual(val1: unknown, val2: unknown) {
  if (areSame(val1, val2)) return true
  if ((isObjectLiteral(val1) && isObjectLiteral(val2)) || (isArray(val1) && isArray(val2))) {
    return haveSameKeys(val1, val2)
      ? Object.keys(val1).every(key => areDeepEqual(val1[key], val2[key]))
      : false
  }
  return false
}
