import isObjectLike from './isObjectOrArray'
import areSame from './areSame'
import areShallowEqualArray from './areShallowEqualArray'

/**
 * /**
 * 检测两个值（一般复杂对象字面量）是否值相同（浅比较）
 * @param val1 被比较的值
 * @param val2 匹配的目标值
 * @example
 * areDeepEqual([1, 2], [1, 2]) // true
 * areDeepEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) // true
 * areDeepEqual({ a: 1, b: { c: 2, d: 3 } }, { a: 1, b: { c: 2, d: 3 } }) // false
 */
export default function areShallowEqual(val1: unknown, val2: unknown) {
  return isObjectLike(val1) && isObjectLike(val2)
    ? areShallowEqualArray(Object.entries(val1).flat(), Object.entries(val2).flat())
    : areSame(val1, val2)
}
