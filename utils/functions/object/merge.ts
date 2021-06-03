import isArray from '../judgers/isArray'
import isObjectLike from '../judgers/isObjectLike'
import concatArrays from '../array/concat'
import mergeObjects from './mergeObjects'

/**
 * 合并多个对象/数组【对象会浅复制成新对象，数组会链接成更长的新数组】
 * FIXME: 这个类型推断不对，并没有concat功效
 */
function merge<T, U>(target1: T, target2: U): T & U
function merge<T, U, V>(target1: T, target2: U, target3: V): T & U & V
function merge<T, U, V, W>(target1: T, target2: U, target3: V, target4: W): T & U & V & W
function merge<T>(...targets: T[]): T
function merge(...targets: any[]) {
  const validArray = targets.filter(isObjectLike)
  if (validArray.every(isArray)) {
    return concatArrays(...validArray)
  } else if (validArray.every(isObjectLike)) {
    return mergeObjects(...validArray)
  }
}
export default merge
