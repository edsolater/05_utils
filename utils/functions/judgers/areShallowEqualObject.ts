import areShallowEqualArray from './areShallowEqualArray'

/**
 * 判断两个对象是否值相同（浅比较）
 * @param obj1 被比较的对象
 * @param obj2 期望目标
 * @example
 * areShallowEqualObject([1, 2], [1, 2]) // true
 * areShallowEqualObject({ a: 1 }, { a: 1 }) // true
 */
export default function areShallowEqualObject(obj1: object, obj2: object) {
  return areShallowEqualArray(Object.entries(obj1).flat(), Object.entries(obj2).flat())
}
