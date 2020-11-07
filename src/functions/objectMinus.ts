/**
 * 对象相剪（依据被减数的对象的key）
 * @example
 * objectMinus({a:1, b:2}, 'a') // {b:2}
 * objectMinus({a:1, b:2}, ['a','d']) // {b:2}
 * objectMinus({a:1, b:2}, {a:true}) // {b:2}
 * objectMinus({a:1, b:2}, {a:true, d:8}) // {b:2}
 */
import isArray from './isArray'
import isIn from './isIn'
import isString from './isString'
import objectFilter from './objectFilter'

/**
 *
 * @param obj 被剪裁的对象
 * @param key 需要剪裁的key
 */
export default function objectMinus<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K>
/**
 *
 * @param obj 被剪裁的对象
 * @param keys 需要剪裁的keys
 */
export default function objectMinus<T extends object, K extends Array<keyof T>>(
  obj: T,
  keys: K
): Omit<T, K[number]>
/**
 *
 * @param obj1 被剪裁的对象
 * @param obj2 剪裁对象
 */
export default function objectMinus<T extends object, U extends object>(
  obj1: T,
  obj2: U
): Omit<T, keyof U>
export default function objectMinus<T extends object, K extends keyof T | Array<keyof T> | object>(
  obj: T,
  param2: K
): any {
  const keys = isString(param2) ? [param2] : isArray(param2) ? param2 : Object.keys(param2)
  return objectFilter(obj, ([key]) => !isIn(key, keys))
}
