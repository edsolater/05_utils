import isArray from '../judgers/isArray'
import isObject from '../judgers/isObject'
import mergeArrays from '../array/mergeArrays'
import mergeObjects from './mergeObjects'

/**
 * 合并多个对象/数组
 */
function merge<T, U>(target1: T, target2: U): T & U
function merge<T, U, V>(target1: T, target2: U, target3: V): T & U & V
function merge<T, U, V, W>(target1: T, target2: U, target3: V, target4: W): T & U & V & W
function merge<T>(...targets: T[]): T
function merge(...targets: any[]) {
  if (targets.every(isArray)) {
    return mergeArrays(...targets)
  } else if (targets.every(isObject)) {
    return mergeObjects(...targets)
  }
}
export default merge
